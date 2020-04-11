import Player from './player'
import { DrawMethodType, Shape } from './display'
import Vector, { VectorInterface } from './tools/vector'

export type collideObjectMethodType = (props: {
  position: VectorInterface
  velocity: VectorInterface
  width: number
  height: number
}) => VectorInterface

const World = function () {
  const backgroundColor = 'rgba(40,48,56)'
  const dimensions = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
  const gravityVector = Vector(0, 25)
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
    let collideVector = Vector(0, 0)
    if (dimensions.x > position.getX() + velocity.getX()) {
      // should be inside (on left)
      const overflow = Math.abs(
        dimensions.x - (position.getX() + velocity.getX())
      )
      collideVector = collideVector.addVector(
        velocity.add(-(velocity.getX() - overflow), 0)
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
      collideVector = collideVector.addVector(
        velocity.add(-(velocity.getX() + overflow), 0)
      )
    }
    if (dimensions.y > position.getY() + velocity.getY()) {
      // should be inside (on top)
      const overflow = Math.abs(
        dimensions.y - (position.getY() + velocity.getY())
      )
      collideVector = collideVector.addVector(
        velocity.add(0, -(velocity.getY() - overflow))
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
      collideVector = collideVector.addVector(
        velocity.add(0, -(velocity.getY() + overflow))
      )
    }

    return collideVector
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
