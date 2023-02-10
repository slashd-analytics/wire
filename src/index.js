const clients = []
const listeners = {}

const def = {
    wireSenderEnabled:true,
    wireSenderName:'',
    wireReceiverAllowed: [],
    wireReceiverEnabled:true
}

const add = client => {
    if(!client.uid){
        console.warn('uid missing in client config')
    }
    for(const k in def){
        if(!client.hasOwnProperty(k)){
            client[k] = def[k]
        }
    }
    clients.push(client)
}

const remove = client => {
    const idx = clients.indexOf(client)
    clients.splice(idx, 1)
}

const send = (senderEvent, payload) => {
    const sender = clients.find(c => c.uid === payload.uid)

    // sender is not allowed to send
    if( !sender.wireSenderEnabled ) return 

    for(const lkey in listeners){
        
        const {evt, clb, uid} = listeners[lkey]
        const client = clients.find(c => c.uid === uid)

        // client exists, same event and sender is not the receiver
        if(client && evt === senderEvent && uid !== payload.uid){ 

            if( client.wireReceiverEnabled ){
                if(!client.wireReceiverAllowed || client.wireReceiverAllowed.length === 0){
                    clb(payload)
                }else{
                    if(client.wireReceiverAllowed.indexOf(sender.wireSenderName) >= 0){
                        clb(payload)
                    }
                }
            }
        }
    }
}

const on = (evt, uid, clb) => {
    listeners[uid + '__' + evt] = {evt, clb, uid}
}

const off = (evt, uid) => {
    listeners[uid + '__' + evt] = null
    delete listeners[uid + '__' + evt]
}


export default {add, remove, send, on, off}