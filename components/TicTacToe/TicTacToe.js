import '../TicTacToe/TicTacToe.css'
class TicTacToe {
  constructor(rootElement) {
    this.rootElement = rootElement
    this.board = Array(9).fill(null)
    this.currentPlayer = 'X'
    this.isGameActive = true
    this.initBoard()
  }

  initBoard() {
    this.rootElement.innerHTML = ''
    this.rootElement.id = 'tic-tac-toe'

    const gameInfo = document.createElement('div')
    gameInfo.classList.add('game-info')

    this.turnDisplay = document.createElement('div')
    this.turnDisplay.id = 'turn'
    this.turnDisplay.textContent = `Turn: ${this.currentPlayer}`

    const resetButton = document.createElement('button')
    resetButton.id = 'resetButton'
    resetButton.textContent = 'Reset Game'
    resetButton.addEventListener('click', () => this.resetGame())

    gameInfo.appendChild(this.turnDisplay)
    gameInfo.appendChild(resetButton)

    // tabla
    this.boardElement = document.createElement('div')
    this.boardElement.classList.add('board')

    this.board.forEach((cell, index) => {
      const cellElement = document.createElement('div')
      cellElement.classList.add('cell')
      cellElement.dataset.index = index
      cellElement.addEventListener('click', () => this.handleCellClick(index))
      this.boardElement.appendChild(cellElement)
    })

    this.rootElement.appendChild(this.boardElement)
    this.rootElement.appendChild(gameInfo)
  }

  handleCellClick(index) {
    if (!this.isGameActive || this.board[index]) return

    this.board[index] = this.currentPlayer
    this.updateBoard()

    if (this.checkWinner()) {
      this.turnDisplay.textContent = `Player ${this.currentPlayer} wins!`
      this.endGame()
      this.isGameActive = false
    } else if (this.board.every((cell) => cell)) {
      this.turnDisplay.textContent = 'Draw!'
      this.endGame()
      this.isGameActive = false
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
      this.turnDisplay.textContent = `Turn: ${this.currentPlayer}`
    }
  }

  updateBoard() {
    this.boardElement.querySelectorAll('.cell').forEach((cell, index) => {
      cell.textContent = this.board[index]
    })
  }

  checkWinner() {
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

    return winningCombinations.some((combination) => {
      const [a, b, c] = combination
      return (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      )
    })
  }

  endGame() {
    this.boardElement.querySelectorAll('.cell').forEach((cell) => {
      cell.removeEventListener('click', () =>
        this.handleCellClick(cell.dataset.index)
      )
    })
  }

  resetGame() {
    this.board = Array(9).fill(null)
    this.currentPlayer = 'X'
    this.isGameActive = true
    this.updateBoard()
    this.turnDisplay.textContent = `Turn: ${this.currentPlayer}`
    this.boardElement.querySelectorAll('.cell').forEach((cell, index) => {
      cell.addEventListener('click', () => this.handleCellClick(index))
    })
  }
}

export default TicTacToe
