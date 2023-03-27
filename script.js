const playerScoreNum = document.querySelector('#playerScoreNum');
const cpuScoreNum = document.querySelector('#cpuScoreNum');
const result = document.querySelector('.result');
const select = document.querySelector('.select');
const player = document.querySelector('#player');
const cpu = document.querySelector('#cpu');
const msg = document.querySelector('.msg');
const playAgain = document.querySelector('.playAgain');
const gameOver = document.querySelector('.gameOver');
const gameOverMsg = document.querySelector('.gameOverMsg');

let cpuScore = 0;
let playerScore = 0;
let playerPick;
let cpuPick;


function rules(arg){
  const rulesModul = document.querySelector('.rules');

  if(arg === 'close'){
    rulesModul.style.display = "none";
  }else if(arg === 'open'){
    rulesModul.style.display = 'grid';
  }
}


function play(playerSelection){
  const choice = ['rock', 'paper', 'scissors'];
  const cpuSelection = choice[Math.floor(Math.random() * choice.length)];
  
  if(playerSelection === cpuSelection){
    updateUI('tie');
  }else if(playerSelection === 'paper' && cpuSelection === 'rock' ||
  playerSelection === 'rock' && cpuSelection === 'scissors' ||
    playerSelection === 'scissors' && cpuSelection === 'paper'){
      updateUI('player');
    }else{
      updateUI('cpu');
    }
    
    
  function updateUI(winner){
    select.style.display = 'none';
    fadeIn(result, 500);
      
    player.classList.add(`${playerSelection}_border`);
    document.querySelector('#playerImg').src = 'images/icon-' + playerSelection + '.svg';
    document.querySelector('#playerImg').alt = playerSelection;
    
    fadeIn(cpu, 1000);
    cpu.classList.add(`${cpuSelection}_border`)
    document.querySelector('#cpuImg').src = 'images/icon-' + cpuSelection + '.svg';
    document.querySelector('#cpuImg').alt = cpuSelection;
    
    playerPick = playerSelection;
    cpuPick = cpuSelection;
    
    if(winner === 'player'){
      playerScore++;
      
      setTimeout(() => {
        player.classList.add('winner')
      }, 1700);
      
      fadeIn(playAgain, 1500);
      
      msg.innerText = 'you win';
    }else if(winner === 'cpu'){
      cpuScore++;
      
      fadeIn(playAgain, 1500);
      
      setTimeout(() => {
        cpu.classList.add('winner')
      }, 1700);
      msg.innerText = 'you lose';
    }else{
      fadeIn(playAgain, 1500);
      msg.innerText = 'is draw';
      cpu.classList.remove('winner');
      player.classList.remove('winner');
    }

    setTimeout(() => {
      playerScoreNum.textContent = playerScore;
      cpuScoreNum.textContent = cpuScore;
      checkScore();
    }, 1700)
  }
}

function checkScore(){
  if(playerScore === 5){
    gameOverMsg.textContent = `You Win the CPU ${playerScore}:${cpuScore}`;
    gameOver.style.display = 'flex';
  }else if(cpuScore === 5){
    gameOverMsg.textContent = `You Lose the CPU Win ${playerScore}:${cpuScore}`;
    gameOver.style.display = 'flex';
  }
}

function resetScore(){
  playerScore = 0;
  cpuScore = 0;
  playerScoreNum.textContent = playerScore;
  cpuScoreNum.textContent = cpuScore;
  newRound();
}

function fadeIn(sel, time){
  setTimeout(() => {
    sel.style.display = 'flex';
    sel.style.opacity = 0;
    const fadeInInterval = setInterval(() => {
      sel.style.opacity = Number(sel.style.opacity) + 0.1;
      if(sel.style.opacity >= 1){
        clearInterval(fadeInInterval);
      }
    },50);
  },time);
}

function newRound(){
  select.style.display = 'grid';
  result.style.display = 'none';
  playAgain.style.display = 'none';
  cpu.style.display = 'none';
  gameOver.style.display = 'none';
  player.classList.remove(`${playerPick}_border`, 'winner');
  cpu.classList.remove(`${cpuPick}_border`, 'winner');
}

