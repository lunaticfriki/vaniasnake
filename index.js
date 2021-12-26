import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
} from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')
const message = document.querySelector('p')

window.addEventListener('keydown', () => {
  message.style.opacity = 0
})

function main(currentTime) {
  if (gameOver) {
    if (confirm('YOU LOST. PRESS OK TO RESTART')) {
      window.location = '/'
    }
    return
  }

  window.requestAnimationFrame(main)

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

  lastRenderTime = currentTime

  update()
  draw()
}

window.requestAnimationFrame(main)

function update() {
  updateSnake()
  updateFood()
  checkForDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkForDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
