export enum Shape {
  rectangle = 'Rectangle',
  sprites = 'Sprites'
}

export interface DrawRectangleMethodProps {
  x: number
  y: number
  width: number
  height: number
  color?: string
}

export interface DrawSpritesMethodProps {
  sprites: HTMLImageElement
  sx: number
  sy: number
  dx: number
  dy: number
  width: number
  height: number
  size?: number
  flip?: boolean
}

export type DrawRectangleMethodType = (props: DrawRectangleMethodProps) => void
export type DrawSpritesMethodType = (props: DrawSpritesMethodProps) => void

export type DrawMethodType = (
  shape: Shape,
  values: DrawRectangleMethodProps | DrawSpritesMethodProps
) => void

export type DisplayType = (
  canvas: HTMLCanvasElement
) => {
  getBackgroundColor: () => string
  draw: DrawMethodType
  render: () => void
  resize: (width: number, height: number) => void
}

export type collideObjectMethodType = (props: {
  position: VectorInterface
  velocity: VectorInterface
  width: number
  height: number
}) => {
  collisionVelocityVector: VectorInterface
  isOnPlatform: boolean
}

export type WorldType = () => {
  getBackgroundColor: () => string
  setDimensions: (x: number, y: number, width: number, height: number) => void
  getPlayer: () => PlayerInterface
  update: (timestamp: number) => void
  render: (drawMethod: DrawMethodType) => void
}

export interface PlayerInterface {
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

export type PlayerType = (x: number, y: number) => PlayerInterface

export interface VectorInterface {
  getX: () => number
  getY: () => number
  setX: (x: number) => VectorInterface
  setY: (y: number) => VectorInterface
  getAngle: () => number
  setAngle: (angle: number) => VectorInterface
  getLength: () => number
  setLength: (length: number) => VectorInterface
  add: (x: number, y: number) => VectorInterface
  subtract: (x: number, y: number) => VectorInterface
  multiply: (value: number) => VectorInterface
  multiplyBy: (multiplierVector: VectorInterface) => VectorInterface
  divide: (value: number) => VectorInterface
  addVector: (vector: VectorInterface) => VectorInterface
}

export type VectorType = (x: number, y: number) => VectorInterface

export interface SpritesProps {
  imagePath: string
  frameNumber: number
  animationTime: number
  frameWidth: number
  frameHeight: number
}

export type SpritesType = (
  props: SpritesProps
) => {
  getImage: () => HTMLImageElement
  getSX: () => number
  getSY: () => number
  getFrameWidth: () => number
  getFrameHeight: () => number
  isLoaded: () => boolean
  isPlaying: () => boolean
  start: (currentTimestamp: number) => void
  stop: () => void
  update: (currentTimestamp: number) => void
}