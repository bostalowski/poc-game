import {
  DisplayType,
  DrawMethodType,
  DrawRectangleMethodProps,
  DrawRectangleMethodType,
  DrawImageMethodProps,
  DrawImageMethodType,
  Shape
} from './types'

/* This Display class contains the screen resize event handler and also handles
drawing colors to the buffer and then to the display. */
const Display: DisplayType = function (canvas: HTMLCanvasElement) {
  const displayBuffer = document.createElement('canvas').getContext('2d')
  const displayContext = canvas.getContext('2d')
  const backgroundColor = 'rgba(200,200,200)'

  const drawRectangle: DrawRectangleMethodType = ({
    x,
    y,
    width,
    height,
    color = '#ffffff'
  }) => {
    displayBuffer.fillStyle = color
    displayBuffer.fillRect(x, y, width, height)
  }

  const drawImage: DrawImageMethodType = ({
    image,
    sx,
    sy,
    width,
    height,
    dx,
    dy,
    dw,
    dh,
    flip = false
  }) => {
    displayBuffer.save()
    if (flip) {
      displayBuffer.translate(dx + dw, dy)
      displayBuffer.scale(-1, 1)
    }
    displayBuffer.drawImage(
      image,
      sx,
      sy,
      width,
      height,
      flip ? 0 : dx,
      flip ? 0 : dy,
      dw,
      dh
    )
    displayBuffer.restore()
  }

  const draw: DrawMethodType = (shape, values) => {
    if (shape === Shape.rectangle) {
      drawRectangle(values as DrawRectangleMethodProps)
    }
    if (shape === Shape.image) {
      drawImage(values as DrawImageMethodProps)
    }
  }

  const render = () => {
    displayContext.clearRect(
      0,
      0,
      displayContext.canvas.width,
      displayContext.canvas.height
    )

    displayContext.drawImage(
      displayBuffer.canvas,
      0,
      0,
      displayBuffer.canvas.width,
      displayBuffer.canvas.height,
      0,
      0,
      displayContext.canvas.width,
      displayContext.canvas.height
    )
  }

  const resize = (width: number, height: number) => {
    displayContext.canvas.height = height
    displayContext.canvas.width = width
    displayBuffer.canvas.height = height
    displayBuffer.canvas.width = width
  }

  return {
    getBackgroundColor: () => backgroundColor,
    draw,
    render,
    resize
  }
}

export default Display
