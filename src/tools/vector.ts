export interface VectorInterface {
  getX: () => number
  getY: () => number
  setX: (x: number) => VectorInterface
  setY: (y: number) => VectorInterface
  getAngle: () => number
  setAngle: (angle: number) => VectorInterface
  getLength: () => number
  setLength: (length: number) => VectorInterface
  add: (x: number, y: number) => VectorInterface
  subtract: (x: number, y: number) => VectorInterface
  multiply: (value: number) => VectorInterface
  divide: (value: number) => VectorInterface
  addVector: (vector: VectorInterface) => VectorInterface
}

export type VectorType = (x: number, y: number) => VectorInterface

const preciseValue = (value: number) =>
  Math.abs(parseFloat(value.toFixed(2))) < 0.1
    ? 0
    : parseFloat(value.toFixed(2))

const Vector: VectorType = (x: number, y: number) =>
  (function (x: number, y: number) {
    const setX = (newX: number) => Vector(newX, y)
    const setY = (newY: number) => Vector(x, newY)

    const getLength = () => {
      return Math.hypot(x, y)
    }

    const setLength = (length: number) => {
      const angle = getAngle()
      const newX = Math.cos(angle) * length
      const newY = Math.sin(angle) * length

      return Vector(newX, newY)
    }

    const getAngle = () => {
      return Math.atan2(y, x)
    }

    const setAngle = (angle: number) => {
      const length = getLength()
      const newX = Math.cos(angle) * length
      const newY = Math.sin(angle) * length

      return Vector(newX, newY)
    }

    const add = (vectorX: number, vectorY: number) => {
      return Vector(x + vectorX, y + vectorY)
    }

    const addVector = (newVector: VectorInterface) => {
      return add(newVector.getX(), newVector.getY())
    }

    const subtract = (vectorX: number, vectorY: number) => {
      return Vector(x - vectorX, y - vectorY)
    }

    const multiply = (value: number) => {
      return Vector(x * value, y * value)
    }

    const divide = (value: number) => {
      return Vector(x / value, y / value)
    }

    return {
      getX: () => x,
      getY: () => y,
      setX,
      setY,
      getAngle,
      setAngle,
      getLength,
      setLength,
      add,
      subtract,
      multiply,
      divide,
      addVector
    }
  })(preciseValue(x), preciseValue(y))

export default Vector
