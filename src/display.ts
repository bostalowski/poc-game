export enum Shape {
  rectangle = 'Rectangle',
  circle = 'Circle'
}

interface DrawRectangleMethodProps {
  x: number
  y: number
  width: number
  height: number
  color?: string
}

export type DrawRectangleMethodType = (props: DrawRectangleMethodProps) => void

export type DrawMethodType = (
  shape: Shape,
  values: DrawRectangleMethodProps
) => void

/* This Display class contains the screen resize event handler and also handles
drawing colors to the buffer and then to the display. */
const Display = function (canvas: HTMLCanvasElement) {
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

  const draw: DrawMethodType = (shape, values) => {
    if (shape === Shape.rectangle) {
      drawRectangle(values)
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
    drawRectangle,
    getBackgroundColor: () => backgroundColor,
    draw,
    render,
    resize
  }
}

export default Display
