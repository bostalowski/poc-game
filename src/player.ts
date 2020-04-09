import Vector, { VectorInterface } from '@tools/vector'
import Sprites from '@tools/sprites'
import { DrawMethodType, Shape } from './display'
const IdleSprites = require('../assets/character/idle.png').default

const Player = function (x: number = 0, y: number = 0) {
  let position = Vector(x, y)
  let velocity = Vector(0, 0)

  const sprites = Sprites({
    imagePath: IdleSprites,
    frameNumber: 12,
    animationTime: 1000,
    frameWidth: 21,
    frameHeight: 36
  })

  const size = 5

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

  const update = (timestamp: number) => {
    position = position.add(velocity.getX(), velocity.getY())
    if (sprites.isLoaded() && !sprites.isPlaying()) {
      sprites.start(timestamp)
    }
    sprites.update(timestamp)
    return objectInstance()
  }

  const render = (drawMethod: DrawMethodType) => {
    if (sprites.isLoaded()) {
      drawMethod(Shape.sprites, {
        sprites: sprites.getImage(),
        sx: sprites.getSX(),
        sy: sprites.getSY(),
        dx: position.getX(),
        dy: position.getY(),
        width: sprites.getFrameWidth(),
        height: sprites.getFrameHeight(),
        size
      })
    }

    return objectInstance()
  }

  const objectInstance = () => ({
    getWidth: () => sprites.getFrameWidth() * size,
    getHeight: () => sprites.getFrameHeight() * size,
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
