const { createState, combineEnhancers, observableState } = require(`../`)
const { from } = require(`rxjs`)

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
