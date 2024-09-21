import '../TicTacToe/tictactoe-2.css'

export function createTicTacToeGame() {
  //* DOM creation
  const appContainer = document.querySelector('#app')
  const gameDiv = document.createElement('div')
  gameDiv.classList = 'ticTacToe'
  const board = document.createElement('div')
  board.id = 'board'

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.dataset.index = i
    board.appendChild(cell)
    cell.addEventListener('click', cellClick)
  }

  const statusDisplay = document.createElement('div')
  statusDisplay.className = 'status'

  const resetButton = document.createElement('button')
  resetButton.id = 'reset-button'
  resetButton.textContent = 'Reset Game'
  resetButton.addEventListener('click', resetGame)

  gameDiv.appendChild(board)
  gameDiv.appendChild(statusDisplay)
  gameDiv.appendChild(resetButton)
  appContainer.appendChild(gameDiv)

  //* Game Logic
  let currentPlayer = 'X'
  let gameState = ['', '', '', '', '', '', '', '', '']
  let gameActive = true

  const winningMessage = () => `Player ${currentPlayer} has won!`
  const drawMessage = () => `draw!`
  const currentPlayerTurn = () => `${currentPlayer}'s turn`

  statusDisplay.textContent = currentPlayerTurn()

  function cellClick(event) {
    const cell = event.target
    const index = parseInt(cell.dataset.index)

    if (gameState[index] !== '' || !gameActive) {
      return
    }

    gameState[index] = currentPlayer
    cell.textContent = currentPlayer

    if (checkWinner()) {
      statusDisplay.textContent = winningMessage()
      gameActive = false
    } else if (isDraw()) {
      statusDisplay.textContent = drawMessage()
      gameActive = false
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
      statusDisplay.textContent = currentPlayerTurn()
    }
  }

  function isDraw() {
    return !gameState.includes('')
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i]
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        highlightWinningCells([a, b, c])
        return true
      }
    }
    return false
  }

  function highlightWinningCells(winningCells) {
    winningCells.forEach((pepito) => {
      const cell = document.querySelector(`.cell[data-index="${pepito}"]`)
      cell.classList.add('winner')
    })
  }

  function resetGame() {
    currentPlayer = 'X'
    gameState = ['', '', '', '', '', '', '', '', '']
    gameActive = true
    statusDisplay.textContent = `Turn: ${currentPlayer}`
    document.querySelectorAll('.cell').forEach((cell) => {
      cell.textContent = ''
      cell.removeEventListener('click', cellClick)
      cell.addEventListener('click', cellClick)
      cell.classList.remove('winner')
    })
  }
  return gameDiv
}
