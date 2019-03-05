window.onload = function() {
  const canvas = document.getElementById("canvas")
  const context = canvas.getContext("2d")
  const width = canvas.width = window.innerWidth
  const height = canvas.height = window.innerHeight

  let centerY = height * .5,
    centerX = width * .5,
    baseAlpha = 0.5,
    offset = 0.5,
    speed = 0.1,
    angle = 0;

  const redraw = (timestamp) => {
    console.log('redraw', timestamp)
    drawPending = false
    // Do drawing ...

    let alpha = baseAlpha + Math.sin(angle) * offset

    context.fillStyle = "rgba(0, 0, 0, " + alpha + ")"

    context.clearRect(0, 0, width, height)
    context.beginPath()
    context.arc(centerX, centerY, 100, 0, Math.PI * 2, false)
    context.fill()

    angle += speed

    // context.clearRect(0, 0, width, height);

    requestAnimationFrame(requestRedraw)
  }

  let drawPending = false
  const requestRedraw = () => {
    if (!drawPending) {
      drawPending = true
      requestAnimationFrame(redraw)
    }
  }

  requestRedraw()
}