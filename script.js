// Initial Data
const progressBar = document.querySelector('.progress--bar')
const questionArea = document.querySelector('.questionArea')
const question = document.querySelector('.question')
const options = document.querySelector('.options')
const scoreArea = document.querySelector('.scoreArea')
const scoreText1 = document.querySelector('.scoreText1')
const scorePercentage = document.querySelector('.scorePct')
const scoreText2 = document.querySelector('.scoreText2')
const restartButton = document.querySelector('.scoreArea button')

let currentQuestion = 0
let correctAnswers = 0

showQuestion()

// Events
restartButton.addEventListener('click', resetEvent)

// Functions
function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion]

    let percentage = Math.floor((currentQuestion / questions.length) * 100)

    progressBar.style.width = `${percentage}%`

    scoreArea.style.display = 'none'
    questionArea.style.display = 'block'

    question.innerHTML = q.question

    let optionsHtml = ''
    for (let option in q.options) {
      optionsHtml += `<div data-op="${option}" class="option"><span>${parseInt(option) + 1}</span>${q.options[option]}</div>`
    }

    options.innerHTML = optionsHtml

    document.querySelectorAll('.options .option').forEach(item => {
      item.addEventListener('click', optionClickEvent)
    })
    return
  }
  finishQuiz()
}

function optionClickEvent(event) {
  let clickedOption = parseInt(event.target.getAttribute('data-op'))

  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++
  }

  currentQuestion++
  showQuestion()
}

function finishQuiz () {
  let points = Math.floor((correctAnswers / questions.length) * 100)

  if (points < 30) {
    scoreText1.innerHTML = 'Tá ruim hein...'
    scorePercentage.style.color = '#FF0000'
  } else if (points >= 30 && points < 70) {
    scoreText1.innerHTML = 'Muito bom.'
    scorePercentage.style.color = '#FFFF00'
  } else {
    scoreText1.innerHTML = 'Parabéns!'
    scorePercentage.style.color = '#0D630D'
  }

  scorePercentage.innerHTML = `Acertou ${points}%`
  scoreText2.innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`

  scoreArea.style.display = 'block'
  questionArea.style.display = 'none'
  progressBar.style.width = '100%'
}

function resetEvent () {
  correctAnswers = 0
  currentQuestion = 0
  showQuestion()
}
