const expect = require(`expect`)
const { from } = require(`rxjs`)
const {
  default: makeObservable,
} = require(`../../source/enhancers/make-observable`)

describe(`makeObservable`, () => {
  it(`returns a subscribable setter`, () => {
    const get = jest.fn(() => ({ testing: [ 1, 2, 3 ] }))
    const set = jest.fn()

    const [ getState, setState ] = makeObservable([ get, set ])

    expect(getState).toEqual(get)
    expect(setState).toEqual(expect.any(Function))

    const observable = from(setState)

    expect(observable).toEqual(
      expect.objectContaining({ subscribe: expect.any(Function) })
    )

    const listener = jest.fn()
    const subscription = observable.subscribe(listener)

    expect(subscription).toEqual(
      expect.objectContaining({ unsubscribe: expect.any(Function) })
    )

    setState({ testing: [ 1, 2, 3 ] })

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith({ testing: [ 1, 2, 3 ] })

    subscription.unsubscribe()
    setState({ testing: [ 1, 2, 3 ] })

    expect(listener).toHaveBeenCalledTimes(1)
  })
})
