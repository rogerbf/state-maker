const $$observable =
  (typeof Symbol === `function` && Symbol.observable) || `@@observable`

const makeObservable = ([ get, set ]) => {
  let observers = []

  const observableSet = updatedState => {
    set(updatedState)
    const state = get()

    for (let i = -1; ++i < observers.length; ) {
      observers[i].next(state)
    }

    return state
  }

  observableSet[$$observable] = () => ({
    subscribe(observer) {
      observers.push(observer)
      return {
        unsubscribe: () => {
          observers = observers.filter(x => x !== observer)
        },
      }
    },

    [$$observable]() {
      return this
    },
  })

  return [ get, observableSet ]
}

export default makeObservable
