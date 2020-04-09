/**
 * Engine class to handle frame refresh
 */
const Engine = function (
  timeStep: number,
  update: (timestamp: number) => void,
  render: (timestamp: number) => void
) {
  // Amount of time that's accumulated since the last update.
  let engineAccumulatedTime = 0
  // reference to the Request Animation Frame
  let engineRequestAnimationFrame: number = null
  // The most recent timestamp of loop execution.
  let engineTime: number = 0
  // Whether or not the update function has been called since the last cycle.
  let engineUpdated = false

  /**
   * This is one cycle of the game loop
   */
  const run = (timestamp: number) => {
    engineAccumulatedTime += timestamp - engineTime
    engineTime = timestamp

    /* If the device is too slow, updates may take longer than our time step. If
    this is the case, it could freeze the game and overload the cpu. To prevent this,
    we catch a memory spiral early and never allow three full frames to pass without
    an update. This is not ideal, but at least the user won't crash their cpu. */
    if (engineAccumulatedTime >= timeStep * 3) {
      engineAccumulatedTime = timeStep
    }

    /* Since we can only update when the screen is ready to draw and requestAnimationFrame
    calls the run function, we need to keep track of how much time has passed. We
    store that accumulated time and test to see if enough has passed to justify
    an update. Remember, we want to update every time we have accumulated one time step's
    worth of time, and if multiple time steps have accumulated, we must update one
    time for each of them to stay up to speed. */
    while (engineAccumulatedTime >= timeStep) {
      engineAccumulatedTime -= timeStep
      update(timestamp)

      // If the game has updated, we need to draw it again.
      engineUpdated = true
    }

    /* This allows us to only draw when the game has updated. */
    if (engineUpdated) {
      engineUpdated = false
      render(timestamp)
    }

    engineRequestAnimationFrame = requestAnimationFrame(run)
  }

  const start = () => {
    engineAccumulatedTime = timeStep
    engineTime = window.performance.now()
    run(0)
  }

  const stop = () => {
    if (engineRequestAnimationFrame) {
      cancelAnimationFrame(engineRequestAnimationFrame)
    }
  }

  return {
    start,
    stop
  }
}

export default Engine
