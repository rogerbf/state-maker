const combineEnhancers = (...enhancers) => api =>
  enhancers.reduce((api, enhancer) => enhancer(api), api)

export default combineEnhancers
