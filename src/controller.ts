const ButtonInput = function () {
  let isButtonInputActive = false
  let isButtonInputDown = false

  return {
    setInput: (isDown: boolean) => {
      if (isButtonInputDown !== isDown) {
        isButtonInputActive = isDown
      }

      isButtonInputDown = isDown
    },
    isActive: () => isButtonInputActive
  }
}

const Controller = function () {
  const downButton = ButtonInput()
  const leftButton = ButtonInput()
  const rightButton = ButtonInput()
  const upButton = ButtonInput()
  const spaceButton = ButtonInput()

  const keyDownUp = (type: string, code: string) => {
    const isDown = type === 'keydown'

    switch (code) {
      case 'ArrowLeft':
        leftButton.setInput(isDown)
        break
      case 'ArrowUp':
        upButton.setInput(isDown)
        break
      case 'ArrowRight':
        rightButton.setInput(isDown)
        break
      case 'ArrowDown':
        downButton.setInput(isDown)
        break
      case 'Space':
        spaceButton.setInput(isDown)
        break
    }
  }

  return {
    keyDownUp,
    getLeftButton: () => ({ isActive: leftButton.isActive }),
    getRightButton: () => ({ isActive: rightButton.isActive }),
    getUpButton: () => ({ isActive: upButton.isActive }),
    getDownButton: () => ({ isActive: downButton.isActive }),
    getSpaceButton: () => ({ isActive: spaceButton.isActive })
  }
}

export default Controller
