import Player from './player'
import Background from './background'
import Vector from './tools/vector'
import {
  collideObjectMethodType,
  DrawMethodType,
  Shape,
  VectorInterface,
  WorldType
} from './types'
import Platform from './platform'

const World: WorldType = function () {
  const backgroundColor = 'rgba(40,48,56)'
  const dimensions = {
    position: Vector(0, 0),
    width: 0,
    height: 0
  }
  const gravityVector = Vector(0, 5)
  const frictionMultiplierVector = Vector(1, 1)

  const background = Background()
  const player = Player(10, 0)
  const platforms = [Platform(Vector(300, 300), 200, 100)]

  const setDimensions = (
    position: VectorInterface,
    width: number,
    height: number
  ) => {
    Object.assign(dimensions, { position, width, height })
  }

  const collideWorld: collideObjectMethodType = ({
    position,
    velocity,
    width,
    height
  }) => {
    let collisionVelocityVector = Vector(0, 0)
    let isOnPlatform = false

    if (dimensions.position.getX() > position.getX() + velocity.getX()) {
      // should be inside (on left)
      const overflow = Math.abs(
        dimensions.position.getX() - (position.getX() + velocity.getX())
      )
      collisionVelocityVector = collisionVelocityVector.addVector(
        Vector(overflow, 0)
      )
    }
    if (
      dimensions.position.getX() + dimensions.width <
      position.getX() + velocity.getX() + width
    ) {
      // should be inside (on right)
      const overflow = Math.abs(
        dimensions.position.getX() +
          dimensions.width -
          (position.getX() + velocity.getX() + width)
      )
      collisionVelocityVector = collisionVelocityVector.addVector(
        Vector(-overflow, 0)
      )
    }
    if (dimensions.position.getY() > position.getY() + velocity.getY()) {
      // should be inside (on top)
      const overflow = Math.abs(
        dimensions.position.getY() - (position.getY() + velocity.getY())
      )
      collisionVelocityVector = collisionVelocityVector.addVector(
        Vector(0, overflow)
      )
    }
    if (
      dimensions.position.getY() + dimensions.height <
      position.getY() + velocity.getY() + height
    ) {
      // should be inside (on bottom)
      const overflow = Math.abs(
        dimensions.position.getY() +
          dimensions.height -
          (position.getY() + velocity.getY() + height)
      )
      collisionVelocityVector = collisionVelocityVector.addVector(
        Vector(0, -overflow)
      )
    }

    const newPosition = Vector(
      position.getX() + velocity.getX() + collisionVelocityVector.getX(),
      position.getY() + velocity.getY() + collisionVelocityVector.getY()
    )

    if (
      newPosition.getY() + height ===
      dimensions.position.getY() + dimensions.height
    ) {
      isOnPlatform = true
    }

    return {
      collisionVelocityVector,
      isOnPlatform
    }
  }

  const update = (timestamp: number) => {
    background.update(timestamp, dimensions)

    // add gravity to player
    player.addGravity(gravityVector)
    // add friction
    player.addFriction(frictionMultiplierVector)

    player.update(timestamp, [
      collideWorld,
      ...platforms.map((platform) => platform.collideObject)
    ])
  }

  const render = (drawMethod: DrawMethodType) => {
    drawMethod(Shape.rectangle, {
      x: dimensions.position.getX(),
      y: dimensions.position.getY(),
      width: dimensions.width,
      height: dimensions.height
    })
    background.render(drawMethod)
    player.render(drawMethod)
    platforms.forEach((platform) => platform.render(drawMethod))
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
