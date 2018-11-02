const expect = require(`expect`)
const { default: createState } = require(`../source/create-state`)

describe(`createState`, () => {
  it(`is a function`, () => {
    expect(createState).toEqual(expect.any(Function))
  })

  it(`returns an array with a setter and getter`, () => {
    const [ state, setState ] = createState()

    expect(state).toEqual(expect.any(Function))
    expect(setState).toEqual(expect.any(Function))
    expect(state.current).toEqual(undefined)
    expect(setState({ testing: [ 1, 2, 3 ] })).toEqual({ testing: [ 1, 2, 3 ] })
    expect(state.current).toEqual({ testing: [ 1, 2, 3 ] })
  })

  it(`sets initial state on initialization`, () => {
    const [ state, setState ] = createState({ testing: [ 1, 2, 3 ] })

    expect(state.current).toEqual({ testing: [ 1, 2, 3 ] })
  })

  it(`applies enhancers before returning the api`, () => {
    const enhancer = ([ getState, setState ]) => {
      let counter = 0

      return [
        () => {
          return {
            count: counter++,
            state: getState(),
          }
        },
        updatedState => {
          setState(updatedState)
          return true
        },
      ]
    }

    const [ state, setState ] = createState(enhancer)

    expect(state.current).toEqual({ count: 0, state: undefined })
    expect(state.current).toEqual({ count: 1, state: undefined })
    expect(setState({ testing: [ 1, 2, 3 ] })).toEqual(true)
    expect(state.current).toEqual({ count: 2, state: { testing: [ 1, 2, 3 ] } })
  })

  it(`returns a clone of the state`, () => {
    const [ getState, setState ] = createState()

    setState({ testing: [ 1, 2, 3 ] })

    const stateA = getState()

    setState({ testing: [ 1, 2, 3, 4 ] })

    const stateB = getState()

    expect(stateA).not.toEqual(stateB)
    expect(stateA).toEqual({ testing: [ 1, 2, 3 ] })
    expect(stateB).toEqual({ testing: [ 1, 2, 3, 4 ] })
  })
})
