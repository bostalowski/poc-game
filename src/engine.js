/**
 * Engine class to handle frame refresh
 */
export default class Engine {
  constructor (timeStep, update, render) {
    // Amount of time that's accumulated since the last update.
    this.accumulatedTime = 0
    // reference to the Request Animation Frame
    this.requestAnimationFrame = null
    // The most recent timestamp of loop execution.
    this.time = null
    // 1000/30 = 30 frames per second
    this.timeStep = timeStep

    // Whether or not the update function has been called since the last cycle.
    this.updated = false

    // The update function
    this.update = update
    // The render function
    this.render = render

    this.run = this.run.bind(this)
  }

  /**
   * This is one cycle of the game loop
   */
  run(timestamp = 0) {
    this.accumulatedTime += timestamp - (this.time !== null ? this.time : 0)
    this.time = timestamp

    /* If the device is too slow, updates may take longer than our time step. If
    this is the case, it could freeze the game and overload the cpu. To prevent this,
    we catch a memory spiral early and never allow three full frames to pass without
    an update. This is not ideal, but at least the user won't crash their cpu. */
    if (this.accumulatedTime >= this.timeStep * 3) {
      this.accumulatedTime = this.timeStep
    }

    /* Since we can only update when the screen is ready to draw and requestAnimationFrame
    calls the run function, we need to keep track of how much time has passed. We
    store that accumulated time and test to see if enough has passed to justify
    an update. Remember, we want to update every time we have accumulated one time step's
    worth of time, and if multiple time steps have accumulated, we must update one
    time for each of them to stay up to speed. */
    while(this.accumulatedTime >= this.timeStep) {
      this.accumulatedTime -= this.timeStep

      this.update(timestamp)

      // If the game has updated, we need to draw it again.
      this.updated = true
    }

    /* This allows us to only draw when the game has updated. */
    if (this.updated) {
      this.updated = false
      this.render(timestamp)
    }

    this.requestAnimationFrame = requestAnimationFrame(this.run)
  }

  start() {
    this.accumulatedTime = this.timeStep;
    this.time = window.performance.now();
    this.run()
  }

  stop() {
    if (this.requestAnimationFrame) {
      cancelAnimationFrame(this.requestAnimationFrame)
    }
  }
}