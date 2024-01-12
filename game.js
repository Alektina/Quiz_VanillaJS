const TIMER_START = 100
const TIME_PENALTY = 10
const MAX_QUESTIONS = 6

let timer = TIMER_START
let score = 0

const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const scoreText = document.querySelector('#score')
const progressText = document.querySelector('#progressText')
const progressBarFull = document.querySelector('#progressBarFull')
const timerText = document.getElementById('timer')

let currentQuestion = {}
let acceptingAnswers = true
let questionCounter = 0
let availableQuestions = []

const questions = [
  {
    question: 'Vad är huvudstaden i Frankrike?',
    choice1: 'London',
    choice2: 'Paris',
    choice3: 'Rom',
    choice4: 'Berlin',
    answer: 2,
  },
  {
    question: 'Vad är 22 + 3?',
    choice1: '33',
    choice2: '25',
    choice3: '45',
    choice4: '56',
    answer: 2,
  },
  {
    question: 'Vilket år startade andra världskriget??',
    choice1: '1939',
    choice2: '1935',
    choice3: '1945',
    choice4: '1941',
    answer: 1,
  },
  {
    question: 'Vilken planet är närmast solen?',
    choice1: 'Mars',
    choice2: 'Venus',
    choice3: 'Jupiter',
    choice4: 'Merkurius',
    answer: 4,
  },
  {
    question: 'Vem skrev boken Pride and Prejudice?',
    choice1: 'Charles Dickens',
    choice2: 'Emily Brontë',
    choice3: 'Jane Austen',
    choice4: 'George Eliot',
    answer: 3,
  },
  {
    question: 'Vilket land producerar mest kaffe i världen?',
    choice1: 'Colombia',
    choice2: 'Brasilien',
    choice3: 'Etiopien',
    choice4: 'Vietnam',
    answer: 2,
  },
]

updateTimerDisplay = (time) => {
  timerText.innerText = time
}

startTimer = () => {
  const countdown = setInterval(() => {
    if (timer <= 0 || questionCounter >= MAX_QUESTIONS) {
      clearInterval(countdown)
      endGame()
    } else {
      timer--
      updateTimerDisplay(timer)
    }
  }, 1000)
}

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
  startTimer()
}

getNewQuestion = () => {
  if (
    availableQuestions.length === 0 ||
    questionCounter >= MAX_QUESTIONS ||
    timer <= 0
  ) {
    localStorage.setItem('mostRecentScore', timer > 0 ? timer : 0)
    return window.location.assign('/end.html')
  }
  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

  const questionIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionIndex]
  question.innerText = currentQuestion.question

  choices.forEach((choice) => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionIndex, 1)
  acceptingAnswers = true
}

updateScore = () => {
  scoreText.innerText = timer
}

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return
    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
    } else {
      timer = Math.max(0, timer - TIME_PENALTY)
    }

    selectedChoice.parentElement.classList.add(classToApply)
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
      updateScore()
      if (timer <= 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', timer)
        window.location.assign('/end.html')
      }
    }, 1000)
  })
})

startGame()
