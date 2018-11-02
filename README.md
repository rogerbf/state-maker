# state-maker

## usage

```javascript
import { createState } from "state-maker"

const [ state, setState ] = createState()

console.log(state()) // undefined
console.log(state.current) // undefined

console.log(setState({ androids: [ `Data` ] })) // { androids: [ `Data` ] }

console.log(state()) // { androids: [ `Data` ] }
console.log(state.current) // { androids: [ `Data` ] }
```
