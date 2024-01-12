const highScoreList = document.querySelector('#highScoresList')
let highScores = JSON.parse(localStorage.getItem('highScores')) || []

if (highScores.length === 0) {
  highScoreList.innerHTML = '<li>No high scores yet!</li>'
} else {
  highScoreList.innerHTML = highScores
    .map((score) => {
      return `<li class="high-score">${score.name} - ${score.score}</li>`
    })
    .join('')
}
