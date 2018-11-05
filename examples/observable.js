const { createState, makeObservable } = require(`../`)
const { from } = require(`rxjs`)

const state = createState(makeObservable)()

const subscription = from(state).subscribe(console.log)

state(`beep`)
state(`boop`)

subscription.unsubscribe()

state(`goodbye`)

console.log(`state:`, state.current)
