const ButtonInput = function () {
  let mActive = false
  let mDown = false

  return {
    getInput: (down: boolean) => {
      if (mDown !== down) {
        mActive = down
      }

      mDown = down
    }
  }
}

const Controller = function () {
  const downButton = ButtonInput()
  const leftButton = ButtonInput()
  const rightButton = ButtonInput()
  const upButton = ButtonInput()

  const keyDownUp = (event: KeyboardEvent) => {
    const down = event.type === 'keydown'

    switch (event.code) {
      case 'ArrowLeft':
        leftButton.getInput(down)
        break
      case 'ArrowUp':
        upButton.getInput(down)
        break
      case 'ArrowRight':
        rightButton.getInput(down)
        break
      case 'ArrowDown':
        downButton.getInput(down)
        break
    }
  }

  return {
    keyDownUp
  }
}

export default Controller
