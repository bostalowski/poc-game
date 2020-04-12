import World from './world'
import { DrawMethodType } from './types'

const Game = function () {
  const world = World()

  const update = (timestamp: number) => {
    world.update(timestamp)
    return objectInstance()
  }

  const render = (drawMethod: DrawMethodType) => {
    world.render(drawMethod)
    return objectInstance()
  }

  const objectInstance = () => ({
    getWorld: () => world,
    update,
    render
  })

  return objectInstance()
}

export default Game
