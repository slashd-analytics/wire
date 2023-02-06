# Wire

**Wire** is a tiny library that allows different components communicate to each others by using a little event broadcaster.

The main purpose is to add syncing capability to specific components, with the possibility to include/exclude some instances in the overall sync flow.

Each component can be configured in order to orchestrate how the signals flow from one component to the others.

By default every component send messages to others that subscribe to a specific event type.

The following properties can be used, alongside the default values:
- `wireSenderEnabled: true ` enable/disable the ability of a specific component to send events
- `wireSenderName: ''` specify a sender name that is useful with `wireReceiverAllowed`
- `wireReceiverAllowed: []` specify sender names to receive events only from them
- `wireReceiverEnabled: true` enable/disable the ability of a specific component to receive events





https://user-images.githubusercontent.com/870788/217051507-ebb8dd5c-8dc2-467c-8d6e-7ed2b7347787.mp4





### Installation

With your favorite package manager:

```shell
npm install @slashd/wire
```

Then, use it in the browser:

```html
<script src="node_modules/dist/slashd-wire.min.js"></script>
```

or with ES6 in a module or within a bundler:

```js
import SlashdWire from '@slashd/wire'
```





### API

To implement such syncing capability, your component needs to implement some methods of the library, that are:

- `SlashdWire.add` to add a component into the library
- `SlashdWire.send` to send a specific event with payload in broadcast
- `SlashdWire.on` to subscribe a specific event in order to receive a payload

Events can be anything, such as `update`, `whatever`, etc, your call.

The only requirement is an UID per each component

Additional methods are:

- `SlashdWire.remove ` to remove a component from the broadcaster
- `SlashdWire.off` to unsubscribe from an event

Here a minimal component that implements the required methods:

```js
import SlashdWire from '@slashd/wire'

const Comp = () => {
  
  // minimal config
  const config = {
    wireSenderEnabled:true,
    wireSenderName:'',
    wireReceiverAllowed: [],
    wireReceiverEnabled:true,
    uid: Math.random()
  }
  
  // add it to the broadcaster
  SlashdWire.add(config)
  
  // send the 'update' event to other instances
  SlashdWire.send('update', {uid: config.uid, data})
  
  // receive the 'update' event from other instances
  SlashdWire.on('update', config.uid, payload => {
    // do something with the payload
  })
}


// make instances of the component
new Comp()
new Comp()
new Comp()
```



### Contribute

Install dependencies:

```shell
npm i
```


Start the watcher

```shell
npm start 
```

