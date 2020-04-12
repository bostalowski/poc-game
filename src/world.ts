import Player from './player'
import Vector from './tools/vector'
import {
  collideObjectMethodType,
  DrawMethodType,
  Shape,
  WorldType
} from './types'

const World: WorldType = function () {
  const backgroundColor = 'rgba(40,48,56)'
  const dimensions = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
  const gravityVector = Vector(0, 10)
  const frictionMultiplierVector = Vector(1, 1)

  const player = Player(300, 200)

  const setDimensions = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    Object.assign(dimensions, { x, y, width, height })
  }

  const collideWorld: collideObjectMethodType = ({
    position,
    velocity,
    width,
    height
  }) => {
    let collisionVelocityVector = Vector(0, 0)
    let isOnPlatform = false

    if (dimensions.x > position.getX() + velocity.getX()) {
      // should be inside (on left)
      const overflow = Math.abs(
        dimensions.x - (position.getX() + velocity.getX())
      )
      collisionVelocityVector = collisionVelocityVector.addVector(
        Vector(velocity.getX() - (velocity.getX() - overflow), 0)
      )
    }
    if (
      dimensions.x + dimensions.width <
      position.getX() + velocity.getX() + width
    ) {
      // should be inside (on right)
      const overflow = Math.abs(
        dimensions.x +
          dimensions.width -
          (position.getX() + velocity.getX() + width)
      )
      collisionVelocityVector = collisionVelocityVector.addVector(
        Vector(velocity.getX() - (velocity.getX() + overflow), 0)
      )
    }
    if (dimensions.y > position.getY() + velocity.getY()) {
      // should be inside (on top)
      const overflow = Math.abs(
        dimensions.y - (position.getY() + velocity.getY())
      )
      collisionVelocityVector = collisionVelocityVector.addVector(
        Vector(0, velocity.getY() - (velocity.getY() - overflow))
      )
    }
    if (
      dimensions.y + dimensions.height <
      position.getY() + velocity.getY() + height
    ) {
      // should be inside (on bottom)
      const overflow = Math.abs(
        dimensions.y +
          dimensions.height -
          (position.getY() + velocity.getY() + height)
      )
      collisionVelocityVector = collisionVelocityVector.addVector(
        Vector(0, velocity.getY() - (velocity.getY() + overflow))
      )
    }

    const newPosition = Vector(
      position.getX() + velocity.getX() + collisionVelocityVector.getX(),
      position.getY() + velocity.getY() + collisionVelocityVector.getY()
    )

    if (newPosition.getY() + height === dimensions.y + dimensions.height) {
      isOnPlatform = true
    }

    return {
      collisionVelocityVector,
      isOnPlatform
    }
  }

  const update = (timestamp: number) => {
    // add gravity to player
    player.addGravity(gravityVector)
    // add friction
    player.addFriction(frictionMultiplierVector)

    player.update(timestamp, [collideWorld])
  }

  const render = (drawMethod: DrawMethodType) => {
    drawMethod(Shape.rectangle, dimensions)
    player.render(drawMethod)
  }

  return {
    getBackgroundColor: () => backgroundColor,
    setDimensions,
    getPlayer: () => player,
    update,
    render
  }
}

export default World
