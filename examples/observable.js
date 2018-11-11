const { createState, observableState } = require(`../`)
const { from } = require(`rxjs`)

const state = createState(undefined, observableState)

const subscription = from(state).subscribe(console.log)

state(`beep`)
state(`boop`)

subscription.unsubscribe()

state(`goodbye`)

console.log(`state:`, state.current)
