import { collideObjectMethodType, DrawMethodType, Shape, VectorInterface } from './types'
import Vector from '@tools/vector'

export type PlatformType = (position: VectorInterface, width: number, height: number) => {
  collideObject: collideObjectMethodType
  update: (timestamp: number) => void
  render: (drawMethod: DrawMethodType) => void
}

const Platform: PlatformType = function(position, width, height) {
  const isPointsIntersect = (p1: {
    topLeft: VectorInterface
    bottomRight: VectorInterface
  }, p2: {
    topLeft: VectorInterface
    bottomRight: VectorInterface
  }) => {
    // If one rectangle is on left side of other or If one rectangle is above other
    return !((p1.topLeft.getX() > p2.bottomRight.getX() || p2.topLeft.getX() > p1.bottomRight.getX()) || (p1.topLeft.getY() > p2.bottomRight.getY() || p2.topLeft.getY() > p1.bottomRight.getY()))
  }

  const collideObject: collideObjectMethodType = (object) => {
    let collisionVelocityVector = Vector(0, 0)
    let isOnPlatform = false

    const objectPosition = object.position
    const objectVelocity = object.velocity
    const objectWidth = object.width
    const objectHeight = object.height

    const isIntersect = isPointsIntersect({
      topLeft: position,
      bottomRight: Vector(position.getX() + width, position.getY() + height)
    }, {
      topLeft: objectPosition.addVector(objectVelocity),
      bottomRight: Vector(objectPosition.getX() + objectWidth + objectVelocity.getX(), objectPosition.getY() + objectHeight + objectVelocity.getY())
    })

    if (isIntersect) {
      const hitFromLeft = objectPosition.getX() + objectWidth + objectVelocity.getX() > position.getX()
      const hitFromRight = objectPosition.getX() + objectVelocity.getX() < position.getX() + width
      const hitFromTop = objectPosition.getY() + objectHeight + objectVelocity.getY() > position.getY()
      const hitFromBottom = objectPosition.getY() + objectVelocity.getY() < position.getY() + height

      if (hitFromLeft && (objectPosition.getX() + objectWidth <= position.getX())) {
        const overflow = Math.abs(
          position.getX() - (objectPosition.getX() + objectWidth + objectVelocity.getX())
        )
        collisionVelocityVector = collisionVelocityVector.addVector(
          Vector(-overflow, 0)
        )
      }
      if (hitFromRight && (objectPosition.getX() >= position.getX() + width)) {
        const overflow = Math.abs(
          (position.getX() + width) - (objectPosition.getX() + objectVelocity.getX())
        )
        collisionVelocityVector = collisionVelocityVector.addVector(
          Vector(overflow, 0)
        )
      }
      if (hitFromTop && (objectPosition.getY() + objectHeight <= position.getY())) {
        const overflow = Math.abs(
          position.getY() - (objectPosition.getY() + objectHeight + objectVelocity.getY())
        )
        collisionVelocityVector = collisionVelocityVector.addVector(
          Vector(0, -overflow)
        )
        isOnPlatform = true
      }
      if (hitFromBottom && (objectPosition.getY() >= position.getY() + height)) {
        const overflow = Math.abs(
          position.getY() + height - (objectPosition.getY() + objectVelocity.getY())
        )
        collisionVelocityVector = collisionVelocityVector.addVector(
          Vector(0, overflow)
        )
      }
    }

    return {
      isOnPlatform,
      collisionVelocityVector
    }
  }

  const update = (timestamp: number) => {}

  const render = (drawMethod: DrawMethodType) => {
    drawMethod(Shape.rectangle, {
      x: position.getX(),
      y: position.getY(),
      width,
      height,
      color: 'red'
    })
  }

  return {
    collideObject,
    update,
    render
  }
}

export default Platform