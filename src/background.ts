import Sprites from '@tools/sprites'
import Vector from '@tools/vector'
import { BackgroundType, DrawMethodType, Shape, VectorInterface } from './types'

const plx1 = require('../assets/background/plx-1.png').default
const plx2 = require('../assets/background/plx-2.png').default
const plx3 = require('../assets/background/plx-3.png').default
const plx4 = require('../assets/background/plx-4.png').default
const plx5 = require('../assets/background/plx-5.png').default

const Background: BackgroundType = function () {
  const images = [
    Sprites({
      imagePath: plx1,
      frameNumber: 1,
      animationTime: 1,
      frameWidth: 100,
      frameHeight: 100
    }),
    Sprites({
      imagePath: plx2,
      frameNumber: 1,
      animationTime: 1,
      frameWidth: 384,
      frameHeight: 216
    }),
    Sprites({
      imagePath: plx3,
      frameNumber: 1,
      animationTime: 1,
      frameWidth: 384,
      frameHeight: 216
    }),
    Sprites({
      imagePath: plx4,
      frameNumber: 1,
      animationTime: 1,
      frameWidth: 384,
      frameHeight: 216
    }),
    Sprites({
      imagePath: plx5,
      frameNumber: 1,
      animationTime: 1,
      frameWidth: 384,
      frameHeight: 216
    })
  ]

  const dimensions = {
    position: Vector(0, 0),
    width: 0,
    height: 0
  }

  const update = (timestamp: number, newDimensions: {
    position: VectorInterface
    width: number
    height: number
  }) => {
    Object.assign(dimensions, newDimensions)
  }

  const render = (drawMethod: DrawMethodType) => {
    images.forEach(image => {
      drawMethod(Shape.image, {
        image: image.getImage(),
        sx: image.getSX(),
        sy: image.getSY(),
        width: image.getFrameWidth(),
        height: image.getFrameHeight(),
        dx: dimensions.position.getX(),
        dy: dimensions.position.getY(),
        dw: dimensions.width,
        dh: dimensions.height
      })
    })
  }

  return {
    update,
    render
  }
}

export default Background