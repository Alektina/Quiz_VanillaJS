// end.js
const finalScoreText = document.getElementById('finalScore')
const username = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')

const mostRecentScore = localStorage.getItem('mostRecentScore')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScoreText.innerText = `Grattis! Din slutliga poäng är: ${mostRecentScore}`

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value
})

saveHighScore = (e) => {
  e.preventDefault()

  const score = {
    score: mostRecentScore,
    name: username.value,
  }

  highScores.push(score)
  highScores.sort((a, b) => b.score - a.score)
  highScores.splice(MAX_HIGH_SCORES)

  localStorage.setItem('highScores', JSON.stringify(highScores))
  window.location.assign('highscores.html')
}
