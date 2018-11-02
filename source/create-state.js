const createState = (initialState, ...enhancers) => {
  if (typeof initialState === `function`) {
    enhancers.unshift(initialState)
    initialState = undefined
  }

  let state = initialState

  return enhancers
    .concat(([ get, set ]) => {
      const stateContainer = {}

      Object.defineProperty(set, `current`, {
        get,
      })

      return set
    })
    .reduce((api, enhancer) => enhancer(api), [
      () => state,
      update => {
        state = update
        return state
      },
    ])
}

export default createState
