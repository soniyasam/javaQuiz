const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which of the following function is used to find the first occurrence of a given string in another string?',
    answers: [
      { text: 'strchr()', correct: false },
      { text: 'strrchr()', correct: false },
      { text: 'strstr()', correct: true },
      { text: 'strnset()', correct: false }
    ]
  },
  {
    question: 'Which is used for storing pictures or graphics',
    answers: [
      { text: 'mbr', correct: false },
      { text: 'mar', correct: true },
      { text: 'frame buffer', correct: false },
      { text: 'sdram', correct: false }
    ]
  },
  {
    question: 'If the number of residents who own only Ford cars is 20, then what is the total number of residents who own only Palio and only Audi cars?',
    answers: [
      { text: '120', correct: false },
      { text: '100', correct: true },
      { text: '110', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'f the number of residents who own only Audi cars is 20, then what is the total number of persons who own at least two cars?',
    answers: [
      { text: '25', correct: false },
      { text: '75', correct: true }
    ]
  }
]
