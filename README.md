# state-maker

## usage

```javascript
import { createState } from "state-maker"

const state = createState()

console.log(state.current) // undefined

console.log(state({ androids: [ `Data` ] })) // { androids: [ `Data` ] }

console.log(state.current) // { androids: [ `Data` ] }
```
