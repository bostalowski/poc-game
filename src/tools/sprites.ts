interface SpritesProps {
  imagePath: string,
  frameNumber: number,
  animationTime: number,
  frameWidth: number,
  frameHeight: number
}

export type SpritesType = (props: SpritesProps) => {
  getImage: () => HTMLImageElement
  getSX: () => number
  getSY: () => number
  getFrameWidth: () => number
  getFrameHeight: () => number
  isLoaded: () => boolean
  isPlaying: () => boolean
  start: (currentTimestamp: number) => void
  update: (currentTimestamp: number) => void
}

const Sprites: SpritesType = ({
  imagePath,
  frameNumber,
  animationTime,
  frameWidth,
  frameHeight
}) => {
  let isLoaded = false
  const image = new Image()
  image.src = imagePath
  image.onload = () => (isLoaded = true)
  const frameTime = animationTime / frameNumber

  let isPlaying = false
  let sx = 0
  let sy = 0
  let initTimestamp = 0
  let currentStep = 0

  const start = (currentTimestamp: number) => {
    initTimestamp = currentTimestamp
    isPlaying = true
  }

  const update = (currentTimestamp: number) => {
    const elapsedTime = currentTimestamp - initTimestamp
    currentStep = Math.floor(elapsedTime / frameTime) % frameNumber
    const x = currentStep * frameWidth
    const rowNumber = Math.floor(x / image.width)
    sx = x - (image.width * rowNumber)
    sy = frameHeight * rowNumber
  }

  return {
    getImage: () => image,
    getSX: () => sx,
    getSY: () => sy,
    getFrameWidth: () => frameWidth,
    getFrameHeight: () => frameHeight,
    isLoaded: () => isLoaded,
    isPlaying: () => isPlaying,
    start,
    update
  }
}

export default Sprites
