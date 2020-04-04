import Vector, { VectorInterface } from './tools/vector'
import { DrawMethodType, Shape } from './display'

const Player = function (x: number = 0, y: number = 0) {
  const width = 100
  const height = 100
  const color = 'red'
  let position = Vector(x, y)
  let velocity = Vector(0, 0)

  const setPosition = (newPosition: VectorInterface) => {
    position = newPosition
    return objectInstance()
  }

  const addVelocity = (newVelocity: VectorInterface) => {
    velocity = velocity.add(newVelocity.getX(), newVelocity.getY())
    return objectInstance()
  }

  const subtractVelocity = (newVelocity: VectorInterface) => {
    velocity = velocity.subtract(newVelocity.getX(), newVelocity.getY())
    return objectInstance()
  }

  const setVelocity = (newVelocity: VectorInterface) => {
    velocity = newVelocity
    return objectInstance()
  }

  const update = () => {
    position = position.add(velocity.getX(), velocity.getY())
    return objectInstance()
  }

  const render = (drawMethod: DrawMethodType) => {
    drawMethod(Shape.rectangle, {
      x: position.getX(),
      y: position.getY(),
      width,
      height,
      color
    })
    return objectInstance()
  }

  const objectInstance = () => ({
    getWidth: () => width,
    getHeight: () => height,
    getX: () => position.getX(),
    getY: () => position.getY(),
    getPosition: () => position,
    setPosition,
    getVelocity: () => velocity,
    setVelocity,
    addVelocity,
    subtractVelocity,
    update,
    render
  })

  return objectInstance()
}

export default Player