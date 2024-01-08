const rockBut = document.querySelector('.rock');
const paperBut = document.querySelector('.paper');
const scissorBut = document.querySelector('.scissors');
const showScore = document.querySelector('.showScore'); 
const showMove = document.querySelector('.showMove');
const showResult = document.querySelector('.showResult');
const resetBut = document.querySelector('.reset');
const autoBut = document.querySelector('.autoPlay');

let result = '';

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
scoreDisplay();

// if (score === null) {
//   score = {
//     wins: 0,
//     losses: 0,
//     ties: 0
//   }
// }

function scoreDisplay(){
  showScore.innerHTML = `Wins: ${score.wins}  losses: ${score.losses} Ties: ${score.ties}`;
}

let isAutoPlaying = false;
let autoPlayId;
function autoPlay() {

  if(!isAutoPlaying){
    autoPlayId = setInterval(() => {
      const playerMove = randMoveFinder();
      resultFind(playerMove);
    }, 1000);
    autoBut.innerHTML = `Stop`;
    isAutoPlaying = true;
  }
  else{
    clearInterval(autoPlayId);
    isAutoPlaying = false;
    autoBut.innerHTML = `Auto Play`;
  }
}

function randMoveFinder() {

  let randMove = '';
  const randNumber = Math.random();

  if (randNumber >= 0 && randNumber < 1/3)
    randMove = 'rock';

  else if(randNumber >= 1/3 && randNumber < 2/3)
    randMove = 'paper';
  
  else if(randNumber >= 2/3 && randNumber < 1)
    randMove = 'scissors';

  return randMove;
}

function resultFind(playerMove) {
  const randMove = randMoveFinder();
  let displayPlayerImg = '';
  let displayComputerImg = '';

  if (playerMove === 'rock') {
    displayPlayerImg = '<img src="images/Rock-emoji.png" class="img">';
    if (randMove === 'rock')
      result = 'Tie.';
    else if (randMove === 'paper')
      result = 'You Lose.';
    else if (randMove === 'scissors')
      result = 'You Win.';
  }
  else if (playerMove === 'paper') {
    displayPlayerImg = '<img src="images/Paper-emoji.png" class="img">'
    if (randMove === 'rock')
      result = 'You Win.';
    else if (randMove === 'paper')
      result = 'Tie.';
    else if (randMove === 'scissors')
      result = 'You Lose.';
  }
  else if (playerMove === 'scissors') {
    displayPlayerImg = '<img src="images/Scissors-emoji.png" class="img">'
    if (randMove === 'rock')
      result = 'You Lose.';
    else if (randMove === 'paper')
      result = 'You Win.';
    else if (randMove === 'scissors')
      result = 'Tie.';
  }

  if (result === 'You Win.')
    score.wins += 1;
  else if (result === 'You Lose.') 
    score.losses += 1;
  else if (result === 'Tie.')
    score.ties +=1;

  localStorage.setItem('score', JSON.stringify(score));

  if (randMove === 'rock')
      displayComputerImg = '<img src="images/Rock-emoji.png" class="img">';
    else if (randMove === 'paper')
      displayComputerImg = '<img src="images/Paper-emoji.png" class="img">';
    else if (randMove === 'scissors')
      displayComputerImg = '<img src="images/Scissors-emoji.png" class="img">';

  showResult.innerHTML = `${result}`;
  showMove.innerHTML = `Your Move => ${displayPlayerImg} <br> Computer Move => ${displayComputerImg}`;
  scoreDisplay();
}

rockBut.addEventListener('click', () =>{
  
  resultFind('rock');
});

paperBut.addEventListener('click', () => {
  
  resultFind('paper');
});

scissorBut.addEventListener('click', () => {
  
  resultFind('scissors');
});

resetBut.addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  showResult.innerHTML = ``;
  showMove.innerHTML = ``;
  scoreDisplay();
});

autoBut.addEventListener('click', () => {
  autoPlay();
});
