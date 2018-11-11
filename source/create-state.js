const createState = (state, enhancer) => {
  const api = [
    () => state,
    updatedState => {
      state = updatedState
      return set
    },
  ]

  const [ get, set ] = enhancer ? enhancer(api) : api

  Object.defineProperty(set, `current`, {
    get,
  })

  return set
}

export default createState
