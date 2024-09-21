import './style.css'
import { createTicTacToeGame } from './components/TicTacToe/tictactoe-2.js'
import { createWhacAMole } from './components/WhaAMole/WhacAMole-2.js'
import SnakeGame from './components/snake/snake.js'
document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app')

  // Contenedor de botones
  const buttonContainer = document.createElement('div')
  buttonContainer.id = 'buttonContainer'
  const buttonTictactoe = document.createElement('button')
  buttonTictactoe.textContent = 'Tic Tac Toe'
  const whacAMoleButton = document.createElement('button')
  whacAMoleButton.textContent = 'Whac-A-Mole'
  const snakeButton = document.createElement('button')
  snakeButton.textContent = 'Snake'

  buttonContainer.appendChild(buttonTictactoe)
  buttonContainer.appendChild(whacAMoleButton)
  buttonContainer.appendChild(snakeButton)
  appContainer.appendChild(buttonContainer)

  const gameContainer = document.createElement('div')
  appContainer.appendChild(gameContainer)

  // Contenedores de juegos
  const containerTicTacToe = document.createElement('div')
  const whacAMoleContainer = document.createElement('div')
  const snakeContainer = document.createElement('div')

  appContainer.appendChild(containerTicTacToe)
  appContainer.appendChild(whacAMoleContainer)
  appContainer.appendChild(snakeContainer)

  // Instancias de juegos
  const ticTacToeGame = createTicTacToeGame()
  const whacAMoleGame = createWhacAMole()
  const snakeGame = new SnakeGame(snakeContainer)

  function showGame(selectedGame) {
    containerTicTacToe.style.display = 'none'
    whacAMoleContainer.style.display = 'none'
    snakeContainer.style.display = 'none'

    if (selectedGame === 'ticTacToe') {
      containerTicTacToe.style.display = 'grid'
      containerTicTacToe.innerHTML = ''
      containerTicTacToe.appendChild(ticTacToeGame)
    } else if (selectedGame === 'whacAMoleGame') {
      whacAMoleContainer.style.display = 'grid'
      whacAMoleContainer.appendChild(whacAMoleGame)
    } else if (selectedGame === 'snake') {
      snakeContainer.style.display = 'grid'
    }
  }

  showGame('ticTacToe')

  buttonTictactoe.addEventListener('click', () => showGame('ticTacToe'))
  whacAMoleButton.addEventListener('click', () => showGame('whacAMoleGame'))
  snakeButton.addEventListener('click', () => showGame('snake'))
})
