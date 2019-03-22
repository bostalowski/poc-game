export default class Controller {
  constructor() {
    this.downButton = new ButtonInput()
    this.leftButton = new ButtonInput()
    this.rightButton = new ButtonInput()
    this.upButton = new ButtonInput()

    this.keyDownUp = this.keyDownUp.bind(this)
  }

  keyDownUp(event) {
    const down = (event.type === 'keydown')

    switch(event.keyCode) {
      case 37:
        this.leftButton.getInput(down)
        break
      case 38:
        this.upButton.getInput(down)
        break
      case 39:
        this.rightButton.getInput(down)
        break
      case 40:
        this.downButton.getInput(down)
        break
    }
  }
}

class ButtonInput {
  constructor() {
    this.active = false
    this.down = false
  }

  getInput(down) {
    if (this.down !== down) {
      this.active = down
    }

    this.down = down
  }
}