import '../WhaAMole/WhacAMole.css'

class WhacAMole {
  constructor(container) {
    this.container = container
    this.score = 0
    this.timer = 10
    this.gameOver = true
    this.holes = []
    this.moleInterval = null
    this.countdown = null

    this.initGame()
    this.loadScore()
  }

  initGame() {
    this.container.innerHTML = `
            <div class="game-info">
                <div id="score">Score: 0</div>
                <div id="timer">Time: 10s</div>
            </div>
            <button id="startButton">Start Game</button>
            <button id="endButton" disabled>End Game</button>
            <div class="game-container">
                <div class="hole" id="hole1"></div>
                <div class="hole" id="hole2"></div>
                <div class="hole" id="hole3"></div>
                <div class="hole" id="hole4"></div>
                <div class="hole" id="hole5"></div>
                <div class="hole" id="hole6"></div>
                <div class="hole" id="hole7"></div>
                <div class="hole" id="hole8"></div>
                <div class="hole" id="hole9"></div>
            </div>
        `

    this.holes = this.container.querySelectorAll('.hole')
    this.scoreDisplay = this.container.querySelector('#score')
    this.timerDisplay = this.container.querySelector('#timer')
    this.startButton = this.container.querySelector('#startButton')
    this.endButton = this.container.querySelector('#endButton')

    this.startButton.addEventListener('click', () => this.startGame())
    this.endButton.addEventListener('click', () => this.endGame())
  }

  comeout() {
    this.holes.forEach((hole) => {
      hole.classList.remove('mole')
      hole.removeEventListener('click', this.handleMoleClick.bind(this))
    })

    const random = this.holes[Math.floor(Math.random() * this.holes.length)]
    random.classList.add('mole')
    random.addEventListener('click', this.handleMoleClick.bind(this))
  }

  handleMoleClick(event) {
    if (!this.gameOver) {
      this.score++
      this.updateScoreDisplay()
      event.target.classList.remove('mole')
    }
  }

  startGame() {
    if (!this.gameOver) {
      this.endGame()
    }

    this.gameOver = false
    this.score = 0
    this.timer = 10
    this.updateScoreDisplay()
    this.timerDisplay.textContent = `Time: ${this.timer}s`

    this.startButton.disabled = true
    this.endButton.disabled = false

    this.countdown = setInterval(() => {
      this.timer--
      this.timerDisplay.textContent = `Time: ${this.timer}s`

      if (this.timer <= 0) {
        clearInterval(this.countdown)
        this.endGame()
      }
    }, 1000)

    this.moleInterval = setInterval(() => {
      if (!this.gameOver) this.comeout()
    }, 1000)
  }

  endGame() {
    clearInterval(this.countdown)
    clearInterval(this.moleInterval)
    this.gameOver = true
    this.saveScore()
    this.updateScoreDisplay()

    this.timer = 0
    this.timerDisplay.textContent = `Time: ${this.timer}s`
    this.startButton.disabled = false
    this.endButton.disabled = true

    this.holes.forEach((hole) => {
      hole.classList.remove('mole')
      hole.removeEventListener('click', this.handleMoleClick.bind(this))
    })
  }

  updateScoreDisplay() {
    this.scoreDisplay.textContent = `Score: ${this.score}`
  }

  saveScore() {
    localStorage.setItem('whacAMoleScore', this.score)
  }

  loadScore() {
    const savedScore = localStorage.getItem('whacAMoleScore')
    if (savedScore !== null) {
      this.score = parseInt(savedScore, 10)
      this.updateScoreDisplay()
    }
  }
}

export default WhacAMole
