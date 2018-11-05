const expect = require(`expect`)
const { from } = require(`rxjs`)
const { createState, makeObservable } = require(process.env.NODE_ENV ===
`development`
  ? `../source`
  : `../`)

describe(`integration tests`, () => {
  it(`creates a state container`, () => {
    const state = createState()()

    expect(state.current).toEqual(undefined)
    expect(state({ testing: [ 1, 2, 3 ] })).toEqual({ testing: [ 1, 2, 3 ] })
    expect(state.current).toEqual({ testing: [ 1, 2, 3 ] })
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

    const state = createState(enhancer)()

    expect(state.current).toEqual({
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

    const state = createState(counter, makeObservable)({
      count: undefined,
      state: undefined,
    })

    const listener = jest.fn()
    const subscription = from(state).subscribe(listener)

    expect(state({ testing: [ 1, 2, 3 ] })).toEqual({
      count: 0,
      state: { testing: [ 1, 2, 3 ] },
    })
    expect(listener).toHaveBeenCalledWith({
      count: 0,
      state: { testing: [ 1, 2, 3 ] },
    })
    expect(state.current).toEqual({ count: 0, state: { testing: [ 1, 2, 3 ] } })

    expect(state({ testing: [ 1, 2, 3, 4 ] })).toEqual({
      count: 1,
      state: { testing: [ 1, 2, 3, 4 ] },
    })
    expect(listener).toHaveBeenCalledWith({
      count: 1,
      state: { testing: [ 1, 2, 3, 4 ] },
    })
    expect(state.current).toEqual({
      count: 1,
      state: { testing: [ 1, 2, 3, 4 ] },
    })

    subscription.unsubscribe()

    expect(state({ testing: [ 1, 2, 3, 4, 5 ] })).toEqual({
      count: 2,
      state: { testing: [ 1, 2, 3, 4, 5 ] },
    })
    expect(listener).toHaveBeenCalledTimes(2)
    expect(state.current).toEqual({
      count: 2,
      state: { testing: [ 1, 2, 3, 4, 5 ] },
    })
  })
})
