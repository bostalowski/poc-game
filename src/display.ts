/* This Display class contains the screen resize event handler and also handles
drawing colors to the buffer and then to the display. */
const Display = function (canvas: HTMLCanvasElement) {
  const displayBuffer = document.createElement('canvas').getContext('2d')
  const displayContext = canvas.getContext('2d')

  const renderColor = (color: string) => {
    displayBuffer.fillStyle = color
    displayBuffer.fillRect(
      0,
      0,
      displayBuffer.canvas.width,
      displayBuffer.canvas.height
    )
  }

  const render = () =>
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

  const resize = () => {
    const height = document.documentElement.clientHeight
    const width = document.documentElement.clientWidth

    displayContext.canvas.height = height
    displayContext.canvas.width = width

    render()
  }

  return {
    renderColor,
    render,
    resize
  }
}

export default Display
