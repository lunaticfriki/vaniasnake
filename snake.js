import { getInputDirection } from './input.js'

let SNAKE_SPEED = 5
const snakeBody = [{ x: 11, y: 11 }]
let newSegments = 0

const currentSpeed = document.getElementById('currentSpeed')
currentSpeed.innerHTML = SNAKE_SPEED

const btnIncrease = document.getElementById('increase')
const btnDecrease = document.getElementById('decrease')

btnIncrease.addEventListener('click', upSpeed)
btnDecrease.addEventListener('click', downSpeed)

function upSpeed() {
  SNAKE_SPEED += 1 && SNAKE_SPEED < 30
  currentSpeed.innerHTML = SNAKE_SPEED
  if (SNAKE_SPEED === 30) {
    btnIncrease.disabled = true
  } else {
    btnDecrease.disabled = false
  }
}

function downSpeed() {
  SNAKE_SPEED -= 1 && SNAKE_SPEED > 5
  currentSpeed.innerHTML = SNAKE_SPEED
  if (SNAKE_SPEED === 5) {
    btnDecrease.disabled = true
  } else {
    btnIncrease.disabled = false
  }
}

function update() {
  addSegments()
  const inputDirection = getInputDirection()

  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }

  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y
}

function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart = segment.x
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement)
  })
}

function expandSnake(amount) {
  newSegments += amount
}

function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false
    return equalPositions(segment, position)
  })
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }

  newSegments = 0
}

function getSnakeHead() {
  return snakeBody[0]
}

function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true })
}

export {
  SNAKE_SPEED,
  update,
  draw,
  expandSnake,
  onSnake,
  getSnakeHead,
  snakeIntersection,
}
