var questions = [{
    title: "JavaScript is useful for which of the following actions?",
    choices: ["Communicating with other coders", "Making webpages dynamic and interactive", "Speeding up the process of coding"],
    answer: "Making webpages dynamic and interactive"
  },
  {
    title: "Which function is used to cycle through an array of choices and produce a desired outcome?",
    choices: ["Of Loop", "At Loop", "For Loop", "Froot Loop"],
    answer: "For Loop"
  },
  {
    title: "What is the correct way to connect a javascript code to an HTML file?",
    choices: ["Copy the html link into javascript", "Paste the javascript link from the Javascript website into your HTML", "Use style = javascript", "Copy the javascript link into the HTML file",],
    answer: "Copy the javascript link into the HTML file"
  },
  {
    title: "What is the function of an array in JavaScript?",
    choices: ["Hold many different values in one", "Shuffling the values", "Relaying information to other scripts", ""],
    answer: "Hold many different values in one"
  },
];

var playerName = "";
var playerScore = 0;
var currentQuestion = 0;
var timeLeft = 0;

function initializeQuestion() {
  var currentQ = questions[currentQuestion];
  showTimeLeft()
  document.querySelector('#question-title').innerHTML = currentQ.title
  document.querySelector('#game-score').innerHTML = playerScore

  flushButtons();

  for (var i = 0; i < currentQ.choices.length; i++) {
    addButton(currentQ.choices[i], currentQ.answer);
  }
}

function addButton(choice, rightAnswer) {
  var el = document.createElement('div');
  // add classes on element here

  el.setAttribute('data-choice', choice);
  el.innerHTML = choice;

  el.addEventListener('click', onButtonClick);

  document.querySelector('#answer-buttons-block').appendChild(el)
}

function onButtonClick(e) {
  var target = e.target;
  var answered = target.getAttribute('data-choice')

  if (answered == questions[currentQuestion].answer) {
    playerScore += 1;
  } else {
    playerScore -= 1;
    timeLeft -= 15;

    if (playerScore < 0)
      playerScore = 0;
  }

  currentQuestion += 1;

  if (currentQuestion >= questions.length) {
    endGame()
  } else {
    initializeQuestion()
  }
}

function flushButtons() {
  var userChoice = document.querySelector('#answer-buttons-block')
  var choices = userChoice.querySelectorAll('div[data-choices]')

  for (var i = 0; i < choices.length; i++) {
    choices[i].removeEventListener('click', onButtonClick)
  }

  document.querySelector('#answer-buttons-block').innerHTML = ''
}

function initializeGame() {
  playerName = document.querySelector('#name').value;

  document.querySelector('#main-game').removeAttribute('style')
  document.querySelector('#intro').setAttribute('style', 'display:none;')
  initializeTimer();
  initializeQuestion();
}

function initializeTimer() {
  timerID = window.setInterval(tick, 1000)
  timeLeft = 100;
}

function tick() {
  timeLeft --;
  showTimeLeft()

  if (timeLeft <= 0) {
    endGame()
  }
}

function showTimeLeft() {
  var minutes = Math.floor(timeLeft / 60)
  var seconds = (timeLeft - (minutes * 60))

  document.querySelector('#timer').innerHTML = minutes + ":" + seconds;
}

function endGame() {
  window.clearInterval(timerID)
  document.querySelector('#end').removeAttribute('style')
  document.querySelector('#main-game').setAttribute('style', 'display:none;')

  var scores = JSON.parse(localStorage.getItem('scores') || '[]')
  var scoreStr = '<table>'
  scores.push({
    name: playerName,
    score: playerScore
  })

  localStorage.setItem('scores', JSON.stringify(scores))

  for (var i = 0; i < scores.length; i++) {
      scoreStr += `<tr><td>${scores[i].name}</td><td>${scores[i].score}</td></tr>`
      // scoreStr += '<td>'+scores+'</td>'
  }

  scoreStr += '</table>'

  document.querySelector('#end-score').innerHTML = scoreStr

}

function reset() {
  document.querySelector('#intro').removeAttribute('style')
  document.querySelector('#end').setAttribute('style', 'display:none;')
  document.querySelector('#name').value = ''
  playerName = ''
  playerScore = 0
  currentQuestion = 0
}