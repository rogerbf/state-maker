# state-maker

## usage

```javascript
import { createState } from "state-maker"

const createRobotsContainer = createState()
const robots = createRobotsContainer({ androids: [], industrial: [] })

console.log(robots.current)
// { androids: [], industrial: [] }

robots({
  ...robots.current,
  androids: [ ...robots.current.androids, `Data` ],
})({
  ...robots.current,
  industrial: [ ...robots.current.industrial, `Iceman` ],
})

console.log(robots.current)
// { androids: [ 'Data' ], industrial: [ 'Iceman' ] }
```
