import '../snake/snake.css'

class SnakeGame {
  constructor(rootElement) {
    this.rootElement = rootElement
    this.boardSize = 20
    this.score = 0
    this.snake = []
    this.direction = ''
    this.food = {}
    this.handleKeyPress = (event) => this.handleKeyPressEvent(event)
    this.interval = null

    this.initBoard()
    this.loadScore()
  }

  initBoard() {
    this.rootElement.innerHTML = ''
    this.rootElement.id = 'snake-game'

    const gameInfo = document.createElement('div')
    gameInfo.classList.add('game-info')

    this.scoreDisplay = document.createElement('div')
    this.scoreDisplay.id = 'snake-score'
    this.scoreDisplay.textContent = `Score: ${this.score}`

    this.messageDisplay = document.createElement('div')
    this.messageDisplay.id = 'snake-message'
    this.messageDisplay.textContent = ''

    const startButton = document.createElement('button')
    startButton.id = 'snake-start-button'
    startButton.textContent = 'Start Game'
    startButton.addEventListener('click', () => this.startGame())

    gameInfo.appendChild(this.scoreDisplay)
    gameInfo.appendChild(startButton)
    gameInfo.appendChild(this.messageDisplay)

    this.boardElement = document.createElement('div')
    this.boardElement.classList.add('snake-board')
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        const cellElement = document.createElement('div')
        cellElement.classList.add('snake-cell')
        cellElement.dataset.row = i
        cellElement.dataset.col = j
        this.boardElement.appendChild(cellElement)
      }
    }

    this.rootElement.appendChild(this.boardElement)
    this.rootElement.appendChild(gameInfo)
  }

  startGame() {
    // Reset the game state
    this.snake = [{ row: 10, col: 10 }]
    this.direction = 'right'
    this.score = 0
    this.updateBoard()
    this.placeFood()

    this.messageDisplay.textContent = ''

    document.addEventListener('keydown', this.handleKeyPress)

    if (this.interval) clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.moveSnake()
    }, 200)
  }

  stopGame() {
    clearInterval(this.interval)
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  resetGame() {
    this.stopGame()
    this.initBoard()
  }

  handleKeyPressEvent(event) {
    switch (event.key) {
      case 'ArrowUp':
        if (this.direction !== 'down') this.direction = 'up'
        break
      case 'ArrowDown':
        if (this.direction !== 'up') this.direction = 'down'
        break
      case 'ArrowLeft':
        if (this.direction !== 'right') this.direction = 'left'
        break
      case 'ArrowRight':
        if (this.direction !== 'left') this.direction = 'right'
        break
    }
  }

  moveSnake() {
    const head = { ...this.snake[0] }

    switch (this.direction) {
      case 'up':
        head.row -= 1
        break
      case 'down':
        head.row += 1
        break
      case 'left':
        head.col -= 1
        break
      case 'right':
        head.col += 1
        break
    }

    if (
      head.row < 0 ||
      head.row >= this.boardSize ||
      head.col < 0 ||
      head.col >= this.boardSize ||
      this.snake.some(
        (segment) => segment.row === head.row && segment.col === head.col
      )
    ) {
      this.messageDisplay.textContent = `Game Over! Your score was ${this.score}`
      this.saveScore()
      this.resetGame()
      return
    }

    this.snake.unshift(head)

    if (head.row === this.food.row && head.col === this.food.col) {
      this.score += 10
      this.scoreDisplay.textContent = `Score: ${this.score}`
      this.placeFood()
    } else {
      this.snake.pop()
    }

    this.updateBoard()
  }

  updateBoard() {
    this.boardElement.querySelectorAll('.snake-cell').forEach((cell) => {
      cell.classList.remove('snake-body', 'snake-food')
    })

    this.snake.forEach((segment) => {
      const cell = this.boardElement.querySelector(
        `[data-row='${segment.row}'][data-col='${segment.col}']`
      )
      if (cell) {
        cell.classList.add('snake-body')
      }
    })

    if (this.food) {
      const foodCell = this.boardElement.querySelector(
        `[data-row='${this.food.row}'][data-col='${this.food.col}']`
      )
      if (foodCell) {
        foodCell.classList.add('snake-food')
      }
    }
  }

  placeFood() {
    let foodPosition
    do {
      foodPosition = {
        row: Math.floor(Math.random() * this.boardSize),
        col: Math.floor(Math.random() * this.boardSize)
      }
    } while (
      this.snake.some(
        (segment) =>
          segment.row === foodPosition.row && segment.col === foodPosition.col
      )
    )

    this.food = foodPosition
    this.updateBoard()
  }

  saveScore() {
    localStorage.setItem('snakeScore', this.score)
  }

  loadScore() {
    const savedScore = localStorage.getItem('snakeScore')
    if (savedScore !== null) {
      this.score = parseInt(savedScore, 10)
      this.scoreDisplay.textContent = `Score: ${this.score}`
    }
  }
}

export default SnakeGame
