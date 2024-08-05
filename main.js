import './style.css'
import TicTacToe from './components/TicTacToe/TicTacToe.js'
import WhacAMole from './components/WhaAMole/WhacAMole.js'
import SnakeGame from './components/snake/snake.js'
document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app')

  // Contenedor de botones
  const buttonContainer = document.createElement('div')
  buttonContainer.id = 'buttonContainer'
  const ticTacToeButton = document.createElement('button')
  ticTacToeButton.textContent = 'Tres en Raya'
  const whacAMoleButton = document.createElement('button')
  whacAMoleButton.textContent = 'Whac-A-Mole'
  const snakeButton = document.createElement('button')
  snakeButton.textContent = 'Snake'

  buttonContainer.appendChild(ticTacToeButton)
  buttonContainer.appendChild(whacAMoleButton)
  buttonContainer.appendChild(snakeButton)
  appContainer.appendChild(buttonContainer)

  // Contenedores de juegos
  const ticTacToeContainer = document.createElement('div')
  const whacAMoleContainer = document.createElement('div')
  const snakeContainer = document.createElement('div')
  appContainer.appendChild(ticTacToeContainer)
  appContainer.appendChild(whacAMoleContainer)
  appContainer.appendChild(snakeContainer)

  // Instancias de juegos
  const ticTacToe = new TicTacToe(ticTacToeContainer)
  const whacAMole = new WhacAMole(whacAMoleContainer)
  const snakeGame = new SnakeGame(snakeContainer)

  ticTacToeButton.addEventListener('click', () => {
    ticTacToeContainer.style.display = 'grid'
    whacAMoleContainer.style.display = 'none'
    snakeContainer.style.display = 'none'
    whacAMole.endGame(false)
  })

  whacAMoleButton.addEventListener('click', () => {
    ticTacToeContainer.style.display = 'none'
    whacAMoleContainer.style.display = 'grid'
    snakeContainer.style.display = 'none'
  })

  snakeButton.addEventListener('click', () => {
    ticTacToeContainer.style.display = 'none'
    whacAMoleContainer.style.display = 'none'
    snakeContainer.style.display = 'grid'
    snakeGame.resetGame()
  })

  // Mostrar inicialmente Tres en Raya
  ticTacToeContainer.style.display = 'grid'
  whacAMoleContainer.style.display = 'none'
  snakeContainer.style.display = 'none'
})
