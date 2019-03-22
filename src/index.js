import Engine from './engine'
import Display from './display'
import Game from './game'
import Controller from './controller'

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
window.onload = event => {
  ///////////////////
  //// FUNCTIONS ////
  ///////////////////



  /////////////////
  //// OBJECTS ////
  /////////////////

  /* Usually I just write my logical sections into object literals, but the temptation
  to reference one inside of another is too great, and leads to sloppy coding.
  In an effort to attain cleaner code, I have written classes for each section
  and instantiate them here. */

  /* The controller handles user input. */
  const controller = new Controller()
  // /* The display handles window resizing, as well as the on screen canvas. */
  const display = new Display(document.querySelector("canvas"))
  // /* The game will eventually hold our game logic. */
  const game = new Game()
  /* The engine is where the above three sections can interact. */
  const engine     = new Engine(
    1000/30, () =>
    {
      display.renderColor(game.color)
      display.render()
    },
    () => game.update())

  ////////////////////
  //// INITIALIZE ////
  ////////////////////

  window.addEventListener("resize",  display.resize)
  window.addEventListener("keydown", controller.keyDownUp)
  window.addEventListener("keyup",   controller.keyDownUp)

  display.resize()
  engine.start()
}