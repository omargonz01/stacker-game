// Select HTML elements
const grid = document.querySelector('.grid');
const stackBtn = document.querySelector('.stack');
const scoreCounter = document.querySelector('.score-counter');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const nextLevelBtn = document.querySelector('.next-level');
const playAgainBtn = document.querySelector('.play-again');
const levelCounter = document.querySelector('.level-counter');

// Game Matrix
let gridMatrix = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0], // this is starting currentRowIndex
];

// set variables to keep track of game
let currentRowIndex = gridMatrix.length - 1;
let barDirection = 'right';
let barSize = 3;
let isGameOver = false;
let score = 0;

// New variables for level and interval time
let level = 1;
let intervalTime = 600;
let gameInterval = setInterval(main, intervalTime);

function draw() {
  // first, make sure to reset display when function is called
  grid.innerHTML = "";
  gridMatrix.forEach(function(rowContent) {
    rowContent.forEach(function (cellContent) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (cellContent === 1) {
        cell.classList.add('bar');
      }
      grid.appendChild(cell);
    });
  });
}

// Game Logic & Controls
function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = 'YOU<br>WON!';
    endGameScreen.classList.add('win');
    if (level < 10) {
      // Show the "Next Level" button if the player hasn't reached level 10 yet
      nextLevelBtn.classList.remove('hidden');
      playAgainBtn.classList.add('hidden');
    } else {
      // Show the "Play Again" button if the player has reached level 10
      playAgainBtn.classList.remove('hidden');
      nextLevelBtn.classList.add('hidden');
    }
  } else {
    endGameText.innerHTML = 'GAME<br>OVER';
    endGameScreen.classList.remove('win');
    // Show the "Play Again" button if the player lost
    playAgainBtn.classList.remove('hidden');
    nextLevelBtn.classList.add('hidden');
  }
  endGameScreen.classList.remove('hidden');
}

function checkWin() {
  if (currentRowIndex === 0) {
    isGameOver = true;
    clearInterval(gameInterval);
    endGame(true);
  }
}

function checkLost() {
  const currentRow = gridMatrix[currentRowIndex];
  const prevRow = gridMatrix[currentRowIndex + 1];
  if (!prevRow) return;
  for (let i = 0; i <currentRow.length; i ++) {
    if (currentRow[i] === 1 && prevRow[i] === 0) {
      currentRow[i] = 0;
      barSize--;
    }
    if (barSize === 0) {
      isGameOver = true;
      clearInterval(gameInterval);
      endGame(false);
    }
  }
}

function updateScore() {
  score += barSize;
  scoreCounter.innerText = score.toString().padStart(5, 0);
}

function onStack() {
  checkWin();
  checkLost();
  if (isGameOver) return;
  updateScore();
  currentRowIndex--;
  barDirection = 'right';
  for (let i = 0; i < barSize; i++) {
    gridMatrix[currentRowIndex][i] = 1;
  }
}

function moveRight(currentRow) {
  currentRow.pop();
  currentRow.unshift(0);
}

function moveLeft(currentRow) {
  currentRow.shift();
  currentRow.push(0);
}

function moveBar() {
  const currentRow = gridMatrix[currentRowIndex];
  if (barDirection === 'right') {
    moveRight(currentRow);
    const lastElement = currentRow[currentRow.length -1];
    if(lastElement === 1) {
      barDirection = 'left';
    }
  } else if (barDirection === 'left') {
    moveLeft(currentRow);
    const firstElement = currentRow[0];
    if (firstElement === 1) {
      barDirection = 'right';
    }
  }
}

// Initial draw of first page load.
draw();

function main() {
  moveBar();
  draw();
}

function onPlayAgain() {
  // Reset the game state
  isGameOver = false;
  currentRowIndex = gridMatrix.length - 1;
  barSize = 3;
  score = 0;
  // Increase the level and speed, or reset to level 1 if level 10 is reached
  if (level < 10) {
    level++;
    intervalTime -= 50;
  } else {
    level = 1;
    intervalTime = 600;
  }
  // Update the game interval
  updateGameInterval();
  // Hide the end game screen
  endGameScreen.classList.add('hidden');
}

// Events
stackBtn.addEventListener('click', onStack);
nextLevelBtn.addEventListener('click', onPlayAgain);
playAgainBtn.addEventListener('click', onPlayAgain);

// New functions for level and speed
function updateGameInterval() {
  clearInterval(gameInterval);
  gameInterval = setInterval(main, intervalTime);
}
function onPlayAgain() {
  // Reset the game state
  isGameOver = false;
  currentRowIndex = gridMatrix.length - 1;
  barSize = 3;
  score = 0;
  
  // Reset the gridMatrix
  gridMatrix = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0], // this is the new starting currentRowIndex
  ];
  
  // Increase the level and speed, or reset to level 1 if level 10 is reached
  if (level < 10) {
    level++;
    intervalTime -= 50;
  } else {
    level = 1;
    intervalTime = 600;
  }
  levelCounter.innerText = level;
  
  // Update the game interval
  updateGameInterval();
  
  // Hide the end game screen
  endGameScreen.classList.add('hidden');
}
