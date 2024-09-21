import '../WhaAMole/WhacAMole-2.css'

export function createWhacAMole() {
  let score = 0
  let timeLeft = 10
  let moleTimer
  let countdownTimer
  let gameActive = false

  const gameDiv = document.createElement('div')
  gameDiv.classList = 'whacAMole-2'

  const spanDiv = document.createElement('div')
  spanDiv.className = 'spanDiv'
  const scoreDisplay = document.createElement('span')
  scoreDisplay.id = 'score'
  scoreDisplay.textContent = `Score: ${score}`
  const timeDisplay = document.createElement('span')
  timeDisplay.id = 'time'
  timeDisplay.textContent = `time: ${timeLeft}`

  spanDiv.appendChild(scoreDisplay)
  spanDiv.appendChild(timeDisplay)
  gameDiv.appendChild(spanDiv)

  const buttonContainer = document.createElement('div')
  buttonContainer.className = 'buttonContainer'
  const startButton = document.createElement('button')
  startButton.textContent = 'Start Game'
  startButton.className = 'button'
  const endButton = document.createElement('button')
  endButton.className = 'button'
  endButton.textContent = 'End Game'

  const board = document.createElement('div')
  board.id = 'board'

  buttonContainer.appendChild(startButton)
  buttonContainer.appendChild(endButton)
  gameDiv.appendChild(buttonContainer)
  gameDiv.appendChild(board)

  function createBoard() {
    board.innerHTML = ''
    for (let i = 0; i < 9; i++) {
      const hole = document.createElement('div')
      hole.classList.add('hole')
      hole.dataset.index = i
      hole.addEventListener('click', hitMole)
      board.appendChild(hole)
    }
  }

  function startGame() {
    if (gameActive) return
    gameActive = true
    score = 0
    timeLeft = 10
    scoreDisplay.textContent = `Score: ${score}`
    timeDisplay.textContent = `Time: ${timeLeft}`

    startButton.disabled = true
    endButton.disabled = false

    createBoard()
    moleTimer = setInterval(randomMole, 1000)
    countdownTimer = setInterval(countdown, 1000)
  }

  function endGame() {
    clearInterval(moleTimer)
    clearInterval(countdownTimer)
    gameActive = false
    startButton.disabled = false
    endButton.disabled = true
    alert(`Juego terminado! Tu puntuación es: ${score}`)
  }

  function countdown() {
    timeLeft--
    timeDisplay.textContent = `Time: ${timeLeft}`
    if (timeLeft <= 0) {
      endGame()
    }
  }

  function randomMole() {
    const holes = document.querySelectorAll('.hole')
    holes.forEach((hole) => hole.classList.remove('mole'))

    const randomIndex = Math.floor(Math.random() * holes.length)
    holes[randomIndex].classList.add('mole')
  }

  function hitMole(event) {
    if (event.target.classList.contains('mole')) {
      score++
      scoreDisplay.textContent = `Score: ${score}`
      event.target.classList.remove('mole')
    }
  }
  startButton.addEventListener('click', startGame)
  endButton.addEventListener('click', endGame)

  document.addEventListener('DOMContentLoaded', () => {
    whacAMoleGame()
  })

  return gameDiv
}
