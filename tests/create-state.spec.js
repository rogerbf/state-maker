const expect = require(`expect`)
const { default: createState } = require(`../source/create-state`)

describe(`createState`, () => {
  it(`is a function`, () => {
    expect(createState).toEqual(expect.any(Function))
  })

  it(`returns an array with a setter and getter`, () => {
    expect(createState()).toEqual([ expect.any(Function), expect.any(Function) ])

    const [ getState, setState ] = createState()

    expect(getState()).toEqual(undefined)
    expect(setState({ testing: [ 1, 2, 3 ] })).toEqual({ testing: [ 1, 2, 3 ] })
    expect(getState()).toEqual({ testing: [ 1, 2, 3 ] })
  })

  it(`sets initial state on initialization`, () => {
    const [ getState, setState ] = createState({ testing: [ 1, 2, 3 ] })

    expect(getState()).toEqual({ testing: [ 1, 2, 3 ] })
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

    const [ getState, setState ] = createState(enhancer)

    expect(getState()).toEqual({ count: 0, state: undefined })
    expect(getState()).toEqual({ count: 1, state: undefined })
    expect(setState({ testing: [ 1, 2, 3 ] })).toEqual(true)
    expect(getState()).toEqual({ count: 2, state: { testing: [ 1, 2, 3 ] } })
  })
})
