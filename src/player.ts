import Vector, { VectorInterface } from '@tools/vector'
import Sprites from '@tools/sprites'
import { DrawMethodType, Shape } from './display'
import { collideObjectMethodType } from './world'

const IdleSprites = require('../assets/sprites/character/idle.png').default
const RunSprites = require('../assets/sprites/character/run.png').default

export type PlayerType = (
  x: number,
  y: number
) => {
  getWidth: () => number
  getHeight: () => number
  getX: () => number
  getY: () => number
  getPosition: () => VectorInterface
  setPosition: (vector: VectorInterface) => void
  getVelocity: () => VectorInterface
  setVelocity: (vector: VectorInterface) => void
  moveLeft: () => void
  moveRight: () => void
  jump: () => void
  addGravity: (vector: VectorInterface) => void
  addFriction: (multiplierVector: VectorInterface) => void
  update: (
    timestamp: number,
    collideObjects: Array<collideObjectMethodType>
  ) => void
  render: (drawMethod: DrawMethodType) => void
}

const RUNNING_SPEED = 15
const JUMPING_SPEED = 100

const Player: PlayerType = function (x: number = 0, y: number = 0) {
  let position = Vector(x, y)
  let velocity = Vector(0, 0)
  let direction = Vector(1, 0)
  let isJumping = false
  let isRunning = false

  const stances = {
    idle: Sprites({
      imagePath: IdleSprites,
      frameNumber: 12,
      animationTime: 1000,
      frameWidth: 21,
      frameHeight: 36
    }),
    run: Sprites({
      imagePath: RunSprites,
      frameNumber: 8,
      animationTime: 1000,
      frameWidth: 23,
      frameHeight: 35
    })
  }

  let currentStance = stances.idle

  const size = 5

  const setPosition = (newPosition: VectorInterface) => {
    position = newPosition
  }

  const setVelocity = (newVelocity: VectorInterface) => {
    velocity = newVelocity
  }

  const moveLeft = () => {
    direction = Vector(-1, 0)
    move()
  }

  const moveRight = () => {
    direction = Vector(1, 0)
    move()
  }

  const move = () => {
    isRunning = true
    velocity = velocity.add(RUNNING_SPEED * direction.getX(), 0)
  }

  const jump = () => {
    isJumping = true
    velocity = velocity.add(0, -JUMPING_SPEED)
  }

  const addGravity = (gravityVector: VectorInterface) => {
    velocity = velocity.addVector(gravityVector)
  }

  const addFriction = (frictionMultiplierVector: VectorInterface) => {
    velocity = velocity.multiplyBy(frictionMultiplierVector)
  }

  const update = (
    timestamp: number,
    collideObjects: Array<collideObjectMethodType>
  ) => {
    // check action
    if (velocity.getX() === 0) {
      isRunning = false
      currentStance = stances.idle
    }
    if (isRunning) {
      currentStance = stances.run
    }

    if (currentStance.isLoaded() && !currentStance.isPlaying()) {
      currentStance.start(timestamp)
    }
    currentStance.update(timestamp)

    // collisionDetection
    collideObjects.forEach((collideObjectFunction) => {
      const collisionVelocityVector = collideObjectFunction({
        position,
        velocity,
        width: currentStance.getFrameWidth() * size,
        height: currentStance.getFrameHeight() * size
      })
      velocity = velocity.addVector(collisionVelocityVector)
    })
    position = position.add(velocity.getX(), velocity.getY())

    // no inertia
    velocity = Vector(0, 0)
  }

  const render = (drawMethod: DrawMethodType) => {
    if (currentStance.isLoaded()) {
      drawMethod(Shape.sprites, {
        sprites: currentStance.getImage(),
        sx: currentStance.getSX(),
        sy: currentStance.getSY(),
        dx: position.getX(),
        dy: position.getY(),
        width: currentStance.getFrameWidth(),
        height: currentStance.getFrameHeight(),
        size,
        flip: direction.getX() === -1
      })
    }
  }

  return {
    getWidth: () => currentStance.getFrameWidth() * size,
    getHeight: () => currentStance.getFrameHeight() * size,
    getX: () => position.getX(),
    getY: () => position.getY(),
    getPosition: () => position,
    setPosition,
    getVelocity: () => velocity,
    setVelocity,
    moveLeft,
    moveRight,
    jump,
    addGravity,
    addFriction,
    update,
    render
  }
}

export default Player
