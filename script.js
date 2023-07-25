const title = document.querySelector('.title');

// const playerScoreElement = document.querySelector('#playerScoreNum');
// const cpuScoreElement = document.querySelector('#cpuScoreNum');

const playerScoreNum = document.querySelector('#playerScoreNum');
const cpuScoreNum = document.querySelector('#cpuScoreNum');
const easySelect = document.querySelector('.easySelect');
const advancedSelect = document.querySelector('.advancedSelect');
const changeMode = document.querySelector('.changeMode');
const rulesImg = document.querySelector('.rules_img');
const result = document.querySelector('.result');
const player = document.querySelector('#player');
const cpu = document.querySelector('#cpu');
const msg = document.querySelector('.msg');
const playAgain = document.querySelector('.playAgain');
const gameOver = document.querySelector('.gameOver');
const gameOverMsg = document.querySelector('.gameOverMsg');

// User mode selection
let easyMode;
let advancedMode;

// Score
let playerScore = 0;
let cpuScore = 0;

//Users Picks
let playerPick;
let cpuPick;

// Show/hide rules modal
function rules(arg){
  const rulesModul = document.querySelector('.rules');

  if(arg === 'close'){
    rulesModul.style.display = "none";
  }else if(arg === 'open'){
    rulesModul.style.display = 'grid';
  }
}

// Show/hide change mode button
function changeModeBtn(arg){
  if(arg === 'close'){
    changeMode.style.display = 'none';
  }else if(arg === 'open'){
    changeMode.style.display = 'flex';
  }
}

// Generate a random CPU selection based on the game mode
function cpuRandom(){
  if(easyMode && !advancedMode){
    const choice = ['rock', 'paper', 'scissors'];
    return choice[Math.floor(Math.random() * choice.length)];
  }else if(advancedMode && !easyMode){
    const choice = ['rock', 'paper', 'scissors', 'spock', 'lizard'];
    return choice[Math.floor(Math.random() * choice.length)];
  }
}

// Handle game play logic
function play(playerSelection){
  cpuPick = cpuRandom();
  playerPick = playerSelection;

  if(playerPick === cpuPick){
    updateUI('tie');
  }else if(playerPick === 'paper' && cpuPick === 'rock' ||
    playerPick === 'paper' && cpuPick === 'spock' ||
    playerPick === 'rock' && cpuPick === 'scissors' ||
    playerPick === 'rock' && cpuPick === 'lizard' ||
    playerPick === 'scissors' && cpuPick === 'paper' ||
    playerPick === 'scissors' && cpuPick === 'lizard' ||
    playerPick === 'lizard' && cpuPick === 'spock' ||
    playerPick === 'lizard' && cpuPick === 'paper' ||
    playerPick === 'spock' && cpuPick === 'scissors' ||
    playerPick === 'spock' && cpuPick === 'rock'){
    updateUI('player');
  }else{
    updateUI('cpu');
  }
}

function updateUI(arg){
  if(arg === 'easy'){
    easySelect.style.display = 'grid';
    advancedSelect.style.display = 'none';
    changeMode.style.display = 'none';
    title.classList.add('easyTitle');
    title.classList.remove('advancedTitle');
    rulesImg.classList.add('rules_img_easy');
    rulesImg.classList.remove('rules_img_advanced');
    easyMode = true;
    advancedMode = false;
    resetScore();
  }else if(arg === 'advanced'){
    easySelect.style.display = 'none';
    advancedSelect.style.display = 'grid';
    changeMode.style.display = 'none';
    title.classList.add('advancedTitle');
    title.classList.remove('easyTitle');
    rulesImg.classList.add('rules_img_advanced');
    rulesImg.classList.remove('rules_img_easy');
    easyMode = false;
    advancedMode = true;
    resetScore();
  }else if(arg === 'tie' || arg === 'player' || arg === 'cpu'){
    if(easyMode && !advancedMode){
      easySelect.style.display = 'none';
    }else if(advancedMode && !easyMode){
      advancedSelect.style.display = 'none';
    }
    fadeIn(result,"grid", 500);

    player.classList.add(`${playerPick}_border`);
    document.querySelector('#playerImg').src = 'images/icon-' + playerPick + '.svg';
    document.querySelector('#playerImg').alt = playerPick;
      
    fadeIn(cpu,"flex", 1000);
    cpu.classList.add(`${cpuPick}_border`)
    document.querySelector('#cpuImg').src = 'images/icon-' + cpuPick + '.svg';
    document.querySelector('#cpuImg').alt = cpuPick;
    if(arg === 'tie'){
      setTimeout(() => {
        playAgain.style.visibility = 'visible';
        playAgain.style.opacity = 0;
        const fadeInInterval = setInterval(() => {
          playAgain.style.opacity = Number(playAgain.style.opacity) + 0.1;
          if(playAgain.style.opacity >= 1){
            clearInterval(fadeInInterval);
          }
        },50);
      },1500);
      msg.innerText = 'is draw';
      cpu.classList.remove('winner');
      player.classList.remove('winner');
    }else if(arg === 'player'){
      playerScore++;
      setTimeout(() => {
        player.classList.add('winner')
      }, 1700);
      setTimeout(() => {
        playAgain.style.visibility = 'visible';
        playAgain.style.opacity = 0;
        const fadeInInterval = setInterval(() => {
          playAgain.style.opacity = Number(playAgain.style.opacity) + 0.1;
          if(playAgain.style.opacity >= 1){
            clearInterval(fadeInInterval);
          }
        },50);
      },1500);
      msg.innerText = 'you win';
    }else if(arg === 'cpu'){
      cpuScore++;
      setTimeout(() => {
        playAgain.style.visibility = 'visible';
        playAgain.style.opacity = 0;
        const fadeInInterval = setInterval(() => {
          playAgain.style.opacity = Number(playAgain.style.opacity) + 0.1;
          if(playAgain.style.opacity >= 1){
            clearInterval(fadeInInterval);
          }
        },50);
      },1500);     
      setTimeout(() => {
        cpu.classList.add('winner')
      }, 1700);
      msg.innerText = 'you lose';
    }
    setTimeout(() => {
      playerScoreNum.textContent = playerScore;
      cpuScoreNum.textContent = cpuScore;
      setTimeout(() => {
        checkScore();
      }, 7000);
    }, 2000)
  }
}

function fadeIn(sel, dis, time){
  if(dis === "flex"){
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
  }else if(dis === "grid"){
    setTimeout(() => {
      sel.style.display = 'grid';
      sel.style.opacity = 0;
      const fadeInInterval = setInterval(() => {
        sel.style.opacity = Number(sel.style.opacity) + 0.1;
        if(sel.style.opacity >= 1){
          clearInterval(fadeInInterval);
        }
      },50);
    },time);
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

function newRound(){
  if(easyMode && !advancedMode){
    easySelect.style.display = 'grid';
  }else if(advancedMode && !easyMode){
    advancedSelect.style.display = 'grid';
  }
  result.style.display = 'none';
  playAgain.style.visibility = 'hidden';
  cpu.style.display = 'none';
  gameOver.style.display = 'none';
  player.classList.remove(`${playerPick}_border`, 'winner');
  cpu.classList.remove(`${cpuPick}_border`, 'winner');
}