const createState = (...enhancers) => initialState => {
  let state = initialState

  return enhancers
    .concat(([ get, set ]) => {
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
