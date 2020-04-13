import Vector from '@tools/vector'
import Sprites from '@tools/sprites'
import {
  collideObjectMethodType,
  DrawMethodType,
  PlayerType,
  Shape,
  VectorInterface
} from './types'

const IdleSprites = require('../assets/sprites/character/idle.png').default
const RunSprites = require('../assets/sprites/character/run.png').default
const JumpSprites = require('../assets/sprites/character/jump.png').default
const LandingSprites = require('../assets/sprites/character/landing.png')
  .default

const RUNNING_SPEED = 20
const JUMPING_SPEED = 50

const Player: PlayerType = function (x: number = 0, y: number = 0) {
  let position = Vector(x, y)
  let velocity = Vector(0, 0)
  let direction = Vector(1, 0)
  let isJumping = false
  let isRunning = false

  const width = 105
  const height = 180

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
    }),
    jump: Sprites({
      imagePath: JumpSprites,
      frameNumber: 1,
      animationTime: 1,
      frameWidth: 17,
      frameHeight: 34
    }),
    landing: Sprites({
      imagePath: LandingSprites,
      frameNumber: 1,
      animationTime: 1,
      frameWidth: 20,
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
    if (!isJumping) {
      isJumping = true
      velocity = velocity.add(0, -JUMPING_SPEED)
    }
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
    ////////////////////
    //// COLLISIONS ////
    ////////////////////
    let isOnPlatformList: Array<boolean> = []
    collideObjects.forEach((collideObjectFunction) => {
      const { collisionVelocityVector, isOnPlatform } = collideObjectFunction({
        position,
        velocity,
        width,
        height
      })
      velocity = velocity.addVector(collisionVelocityVector)
      isOnPlatformList.push(isOnPlatform)
    })

    isJumping = !isOnPlatformList.some((isOnPlatform) => isOnPlatform === true)

    //////////////////
    //// POSITION ////
    //////////////////

    position = position.add(velocity.getX(), velocity.getY())

    /////////////////
    //// STANCES ////
    /////////////////

    if (!isJumping) {
      // if is on ground : idle or running
      if (velocity.getX() === 0) {
        isRunning = false
        currentStance = stances.idle
      }
      if (isRunning) {
        currentStance = stances.run
      }
    } else {
      if (velocity.getY() <= 0) {
        currentStance = stances.jump
      } else {
        currentStance = stances.landing
      }
    }

    if (currentStance.isLoaded() && !currentStance.isPlaying()) {
      currentStance.start(timestamp)
    }
    currentStance.update(timestamp)

    // if on ground : no inertia
    if (!isJumping) {
      velocity = Vector(0, 0)
    } else {
      velocity = Vector(0, velocity.getY())
    }
  }

  const render = (drawMethod: DrawMethodType) => {
    if (currentStance.isLoaded()) {
      drawMethod(Shape.image, {
        image: currentStance.getImage(),
        sx: currentStance.getSX(),
        sy: currentStance.getSY(),
        width: currentStance.getFrameWidth(),
        height: currentStance.getFrameHeight(),
        dx: position.getX(),
        dy: position.getY(),
        dw: currentStance.getFrameWidth() * size,
        dh: currentStance.getFrameHeight() * size,
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
