import Player from './player'
import { DrawMethodType, Shape } from './display'
import Vector from './tools/vector'

const World = function () {
  const backgroundColor = 'rgba(40,48,56)'
  const dimensions = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
  const gravity = Vector(0, 3)
  const friction = Vector(0.5, 0)

  const player = Player(300, 200)

  const setDimensions = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    Object.assign(dimensions, { x, y, width, height })
    return objectInstance()
  }

  const collidePlayer = () => {
    let playerPosition = player.getPosition()
    let playerVelocity = player.getVelocity()
    if (player.getX() < dimensions.x) {
      playerPosition = Vector(dimensions.x, playerPosition.getY())
      playerVelocity = Vector(
        -playerVelocity.getX() / 10,
        playerVelocity.getY()
      )
    }
    if (player.getX() + player.getWidth() > dimensions.x + dimensions.width) {
      playerPosition = Vector(
        dimensions.x + dimensions.width - player.getWidth(),
        playerPosition.getY()
      )
      playerVelocity = Vector(
        -playerVelocity.getX() / 10,
        playerVelocity.getY()
      )
    }
    if (player.getY() < dimensions.y) {
      playerPosition = Vector(playerPosition.getX(), dimensions.y)
      playerVelocity = Vector(playerVelocity.getX(), -playerVelocity.getY() / 4)
    }
    if (player.getY() + player.getHeight() > dimensions.y + dimensions.height) {
      playerPosition = Vector(
        playerPosition.getX(),
        dimensions.y + dimensions.height - player.getHeight()
      )
      playerVelocity = Vector(playerVelocity.getX(), -playerVelocity.getY() / 4)
    }

    player.setPosition(playerPosition)
    player.setVelocity(playerVelocity)
  }

  const update = () => {
    // add gravity to player
    player.addVelocity(gravity)
    // add friction
    let playerVelocity = player.getVelocity()
    playerVelocity = playerVelocity.setLength(
      playerVelocity.getLength() - friction.getLength()
    )
    player.setVelocity(playerVelocity)

    player.update()

    collidePlayer()
  }

  const render = (drawMethod: DrawMethodType) => {
    drawMethod(Shape.rectangle, dimensions)
    player.render(drawMethod)
  }

  const objectInstance = () => {
    return {
      getBackgroundColor: () => backgroundColor,
      getDimensions: () => dimensions,
      setDimensions,
      getPlayer: () => player,
      update,
      render
    }
  }

  return objectInstance()
}

export default World
