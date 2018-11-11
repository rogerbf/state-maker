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

### enhancers

```javascript
import { createState, combineEnhancers, observableState } from "state-maker"
import { from } from "rxjs"

const addUpdated = ([ get, set ]) => [
  get,
  updatedState => {
    return set({
      updated: new Date(Date.now()).toISOString(),
      ...updatedState,
    })
  },
]

const captain = createState(
  undefined,
  combineEnhancers(addUpdated, observableState)
)

from(captain).subscribe(console.log)

captain({ name: `Jean Luc` })
// { updated: '2018-11-11T16:38:20.627Z', name: 'Jean Luc' }
```