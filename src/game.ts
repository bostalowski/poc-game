const Game = function () {
  let gameColor = 'rgb(0,0,0)'
  const gameColors = [0, 0, 0]
  const gameShifts = [1, 1, 1]

  const update = () => {
    for (let index = 0; index < 3; index++) {
      let color = gameColors[index]
      let shift = gameShifts[index]

      if (color + shift > 255 || color + shift < 0) {
        shift =
          shift < 0
            ? Math.floor(Math.random() * 2) + 1
            : Math.floor(Math.random() * -2) - 1
      }

      color += shift
      gameColors[index] = color
      gameShifts[index] = shift
    }

    gameColor = `rgb(${gameColors[0]},${gameColors[1]},${gameColors[2]})`
  }

  return {
    update,
    getColor: () => gameColor
  }
}

export default Game
