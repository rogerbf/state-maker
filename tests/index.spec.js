const expect = require(`expect`)
const { from } = require(`rxjs`)
const { createState, makeObservable } = require(process.env.NODE_ENV ===
`development`
  ? `../source`
  : `../`)

describe(`integration tests`, () => {
  it(`creates a state container`, () => {
    const [ getState, setState ] = createState()

    expect(getState()).toEqual(undefined)
    expect(setState({ testing: [ 1, 2, 3 ] })).toEqual({ testing: [ 1, 2, 3 ] })
    expect(getState()).toEqual({ testing: [ 1, 2, 3 ] })
  })

  it(`creates a state container without initial state, with enhancer`, () => {
    const enhancer = ([ get, set ]) => {
      return [
        () => {
          return {
            retrieved: `2018-10-29T11:39:32.267Z`,
            state: get(),
          }
        },
        set,
      ]
    }

    const [ getState ] = createState(enhancer)

    expect(getState()).toEqual({
      retrieved: `2018-10-29T11:39:32.267Z`,
      state: undefined,
    })
  })

  it(`creates an observable state container with initial state`, () => {
    const counter = ([ get, set ]) => {
      let counter = 0
      return [
        get,
        update => {
          return set({
            count: counter++,
            state: update,
          })
        },
      ]
    }

    const [ getState, setState ] = createState(
      { count: undefined, state: undefined },
      counter,
      makeObservable
    )

    const listener = jest.fn()
    const subscription = from(setState).subscribe(listener)

    expect(setState({ testing: [ 1, 2, 3 ] })).toEqual({
      count: 0,
      state: { testing: [ 1, 2, 3 ] },
    })
    expect(listener).toHaveBeenCalledWith({
      count: 0,
      state: { testing: [ 1, 2, 3 ] },
    })
    expect(getState()).toEqual({ count: 0, state: { testing: [ 1, 2, 3 ] } })

    expect(setState({ testing: [ 1, 2, 3, 4 ] })).toEqual({
      count: 1,
      state: { testing: [ 1, 2, 3, 4 ] },
    })
    expect(listener).toHaveBeenCalledWith({
      count: 1,
      state: { testing: [ 1, 2, 3, 4 ] },
    })
    expect(getState()).toEqual({ count: 1, state: { testing: [ 1, 2, 3, 4 ] } })

    subscription.unsubscribe()

    expect(setState({ testing: [ 1, 2, 3, 4, 5 ] })).toEqual({
      count: 2,
      state: { testing: [ 1, 2, 3, 4, 5 ] },
    })
    expect(listener).toHaveBeenCalledTimes(2)
    expect(getState()).toEqual({
      count: 2,
      state: { testing: [ 1, 2, 3, 4, 5 ] },
    })
  })
})
