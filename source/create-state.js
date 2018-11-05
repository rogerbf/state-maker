const createState = (...enhancers) => initialState => {
  let state = initialState

  let [ get, set ] = enhancers.reduce((api, enhancer) => enhancer(api), [
    () => state,
    updatedState => {
      state = updatedState
      return set
    },
  ])

  Object.defineProperty(set, `current`, {
    get,
  })

  return set
}

export default createState
