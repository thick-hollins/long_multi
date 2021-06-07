function generatePair() {
  let first = Math.floor(Math.random() * 80) + 11;
  let second = Math.floor(Math.random() * 80) + 11;
  return {a: first, b: second, product: first * second}
}

function generateQuestion() {
  let pairs = [];
  const maxDiff = 800;
  const minDiff = 100;
  while (true) {
    let first = generatePair();
    let second = generatePair();
    let third = generatePair();
    let diff12 = Math.abs(first.product - second.product)
    let diff23 = Math.abs(second.product - third.product)
    let diff13 = Math.abs(first.product - third.product)
    if ( diff12 < maxDiff && diff12 > minDiff
         && diff23 < maxDiff && diff23 > minDiff
         && diff13 < maxDiff && diff13 > minDiff
    ) {
      return {answer1: first, answer2: second, answer3: third}
    }
  }  
}

function showQuestion() {
  let question = generateQuestion();
  let output = ['<div id="question-text">']
  let questionType = Math.floor(Math.random() * 3);
  if (questionType === 0) {
    output.push('Which is greatest?')
  } else if (questionType === 1) {
    output.push('Which is smallest?')
  } else if (questionType === 2) {
    output.push('Which is neither greatest nor smallest?')
  }
  output.push('</div>')
  output.push(`<style>
               .rectangle1 {
                 height: ${question.answer1.a / 3}vw;
                 width: ${question.answer1.b / 3}vw;
               }
               .rectangle2 {
                 height: ${question.answer2.a / 3}vw;
                 width: ${question.answer2.b / 3}vw;
               }
               .rectangle3 {
                 height: ${question.answer3.a / 3}vw;
                 width: ${question.answer3.b / 3}vw;
               }
               </style>`);
  output.push(`<div class="grid-wrapper">
                 <div class"b1">
                   <button id="btn1">${question.answer1.a} × ${question.answer1.b}</button>
                 </div>
                 <div class"b2">
                   <button id="btn2">${question.answer2.a} × ${question.answer2.b}</button>
                 </div>
                 <div class"b3">
                   <button id="btn3">${question.answer3.a} × ${question.answer3.b}</button>
                 </div>
                 <div class="r1">
                   <div class="rectangle rectangle1"></div>
                 </div>
                 <div class"r2">
                   <div class="rectangle rectangle2"></div>
                 </div>
                 <div class="r3">
                   <div class="rectangle rectangle3"></div>
                 </div>`
  );
  gameContainer.innerHTML = output.join('');
  
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  const btn3 = document.getElementById("btn3");
  
  btn1.onclick = function() {
    showResult(checkAnswer(question, questionType, 'answer1'));
  }
  btn2.onclick = function() {
    showResult(checkAnswer(question, questionType, 'answer2'));
  }
  btn3.onclick = function() {
    showResult(checkAnswer(question, questionType, 'answer3'));
  }
}

function checkAnswer(question, questionType, answer) {
  let questionArray = Object.entries(question)
                            .map(([name, pair]) => [name, pair.product])
  if (questionType === 0) {
    correctAnswer = questionArray.sort((a, b) => b[1] - a[1])[0][0]
  } else if (questionType === 1) {
    correctAnswer = questionArray.sort((a, b) => a[1] - b[1])[0][0]
  } else if (questionType === 2) {
    correctAnswer = questionArray.sort((a, b) => b[1] - a[1])[1][0] 
  }
  return answer === correctAnswer? true : false
}

function showResult(result) {
  let output = [];
  if (result) {
    output.push("<p>Correct</p>")
    correctCount += 1
  }
  else {
    output.push("<p>Incorrect</p>")
  }
  output.push(`<p>${correctCount} out of ${playCount} guesses correct</p>`)
  playCount += 1
  output.push('<button id="nextBtn">Next</button>')
  gameContainer.innerHTML = output.join('');
  const nextBtn = document.getElementById("nextBtn");
  nextBtn.onclick = function() {
    showQuestion();
  }
}

var playCount = 1;
var correctCount = 0;
const gameContainer = document.getElementById('game');
showQuestion();
