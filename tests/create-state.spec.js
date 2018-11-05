const expect = require(`expect`)
const { default: createState } = require(`../source/create-state`)

describe(`createState`, () => {
  it(`is a function`, () => {
    expect(createState).toEqual(expect.any(Function))
  })

  it(`returns a function`, () => {
    expect(createState()).toEqual(expect.any(Function))
  })

  it(`sets and gets state`, () => {
    const state = createState()()

    expect(state).toEqual(expect.any(Function))
    expect(state.current).toEqual(undefined)
    expect(state({ testing: [ 1, 2, 3 ] })).toEqual({ testing: [ 1, 2, 3 ] })
    expect(state.current).toEqual({ testing: [ 1, 2, 3 ] })
  })

  it(`sets initial state`, () => {
    const state = createState()({ testing: [ 1, 2, 3 ] })

    expect(state.current).toEqual({ testing: [ 1, 2, 3 ] })
  })

  it(`applies enhancers`, () => {
    const enhancer = ([ getState, state ]) => {
      let counter = 0

      return [
        () => {
          return {
            count: counter++,
            state: getState(),
          }
        },
        updatedState => {
          state(updatedState)
          return true
        },
      ]
    }

    const state = createState(enhancer)()

    expect(state.current).toEqual({ count: 0, state: undefined })
    expect(state.current).toEqual({ count: 1, state: undefined })
    expect(state({ testing: [ 1, 2, 3 ] })).toEqual(true)
    expect(state.current).toEqual({ count: 2, state: { testing: [ 1, 2, 3 ] } })
  })

  it(`returns a clone of the state`, () => {
    const state = createState()()

    state({ testing: [ 1, 2, 3 ] })

    const stateA = state.current

    state({ testing: [ 1, 2, 3, 4 ] })

    const stateB = state.current

    expect(stateA).not.toEqual(stateB)
    expect(stateA).toEqual({ testing: [ 1, 2, 3 ] })
    expect(stateB).toEqual({ testing: [ 1, 2, 3, 4 ] })
  })

  it(`throws when trying to write to .current`, () => {
    const state = createState()({ a: 1 })

    expect(state.current).toEqual({ a: 1 })
    expect(() => {
      state.current = { a: 2 }
    }).toThrow()
  })
})
