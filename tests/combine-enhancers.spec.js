const expect = require(`expect`)
const { default: combineEnhancers } = require(`../source/combine-enhancers`)

describe(`combineEnhancers`, () => {
  it(`is a function`, () => {
    expect(combineEnhancers).toEqual(expect.any(Function))
  })

  it(`returns a function`, () => {
    expect(combineEnhancers()).toEqual(expect.any(Function))
  })

  it(`calls enhancer with api`, () => {
    const api = [ () => {}, () => {} ]
    const enhancer = jest.fn()
    const invoke = combineEnhancers(enhancer)
    invoke(api)

    expect(enhancer).toHaveBeenCalledWith(api)
  })

  it(`calls enhancers in order`, () => {
    const enhancerA = jest.fn(() => enhancerA)
    const enhancerB = jest.fn()

    const invoke = combineEnhancers(enhancerA, enhancerB)

    const api = [ () => {}, () => {} ]

    invoke(api)

    expect(enhancerA).toHaveBeenCalledWith(api)
    expect(enhancerB).toHaveBeenCalledWith(enhancerA)
  })
})
