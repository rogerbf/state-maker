const { createState } = require(`../`)

const robots = createState({ androids: [], industrial: [] })

console.log(robots.current)

robots({
  ...robots.current,
  androids: [ ...robots.current.androids, `Data` ],
})({
  ...robots.current,
  industrial: [ ...robots.current.industrial, `Iceman` ],
})

console.log(robots.current)
