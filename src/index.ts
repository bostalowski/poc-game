import Engine from './engine'
import Display, { Shape } from './display'
import Game from './game'
import Controller from './controller'
import Vector from './tools/vector'

/* This is the basic setup or "skeleton" of my program. It has three main parts:
the controller, display, and game logic. It also has an engine which combines the
three logical parts which are otherwise completely separate. One of the most important
aspects of programming is organization. Without an organized foundation, your code
will quickly become unruly and difficult to maintain. Separating code into logical
groups is also a principle of object oriented programming, which lends itself to
comprehensible, maintainable code as well as modularity. */

/* Since I am loading my scripts dynamically from the rabbit-trap.html, I am wrapping
my main JavaScript file in a load listener. This ensures that this code will not
execute until the document has finished loading and I have access to all of my classes. */
window.onload = () => {
  /////////////////
  //// OBJECTS ////
  /////////////////

  /* Usually I just write my logical sections into object literals, but the temptation
  to reference one inside of another is too great, and leads to sloppy coding.
  In an effort to attain cleaner code, I have written classes for each section
  and instantiate them here. */

  /* The controller handles user input. */
  const controller = Controller()
  // /* The display handles window resizing, as well as the on screen canvas. */
  const display = Display(document.querySelector('canvas'))
  // /* The game will eventually hold our game logic. */
  const game = Game()

  ///////////////////
  //// FUNCTIONS ////
  ///////////////////
  const onKeyDownUp = (event: KeyboardEvent) => {
    controller.keyDownUp(event.type, event.code)
  }

  const resize = () => {
    display.resize(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    )

    const worldWidth = document.documentElement.clientWidth * 0.95
    const worldHeight = document.documentElement.clientHeight * 0.95
    const worldX = (document.documentElement.clientWidth - worldWidth) / 2
    const worldY = (document.documentElement.clientHeight - worldHeight) / 2
    game.getWorld().setDimensions(worldX, worldY, worldWidth, worldHeight)

    render()
  }

  const render = () => {
    // render background
    display.drawRectangle({
      x: 0,
      y: 0,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      color: display.getBackgroundColor()
    })

    // render Game
    game.render(display.draw)

    display.render()
  }

  const update = (timestamp: number) => {
    if (controller.getUpButton().isActive()) {
    }
    if (controller.getDownButton().isActive()) {
    }
    if (controller.getLeftButton().isActive()) {
      game.getWorld().getPlayer().moveLeft()
    }
    if (controller.getRightButton().isActive()) {
      game.getWorld().getPlayer().moveRight()
    }
    if (controller.getSpaceButton().isActive()) {
      game.getWorld().getPlayer().jump()
    }

    game.update(timestamp)
  }

  ////////////////////
  //// INITIALIZE ////
  ////////////////////

  // 1000/30 = ~30 frames per second
  const engine = Engine(1000 / 30, update, render)

  window.addEventListener('resize', resize)
  window.addEventListener('keydown', onKeyDownUp)
  window.addEventListener('keyup', onKeyDownUp)

  resize()
  engine.start()
}
