// gameLogic.js
import { gridMatrix, currentRowIndex, barDirection, barSize, isGameOver, score, level, intervalTime } from './gameState.js';
import { endGame } from './eventHandling.js';
import { grid } from './elementSelection.js';

export function draw() {
  // first, make sure to reset display when function is called
  grid.innerHTML = "";
  gridMatrix.forEach(function (rowContent) {
    rowContent.forEach(function (cellContent) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (cellContent === 1) {
        cell.classList.add("bar");
      }
      grid.appendChild(cell);
    });
  });
}

export function checkWin() {
  if (currentRowIndex === 0) {
    clearInterval(gameInterval);
    endGame(true);
    isGameOver = false; // Reset isGameOver to false when the player wins
  }
}

export function checkLost() {
  const currentRow = gridMatrix[currentRowIndex];
  const prevRow = gridMatrix[currentRowIndex + 1];
  if (!prevRow) return;
  for (let i = 0; i < currentRow.length; i++) {
    if (currentRow[i] === 1 && prevRow[i] === 0) {
      currentRow[i] = 0;
      barSize--;
    }
    if (barSize === 0) {
      clearInterval(gameInterval);
      endGame(false);
      isGameOver = true; // Set isGameOver to true when the player loses
    }
  }
}

export function updateScore() {
  score += barSize;
  scoreCounter.innerText = score.toString().padStart(5, 0);
}

export function onStack() {
  checkWin();
  checkLost();
  if (isGameOver) return;
  updateScore();
  currentRowIndex--;
  barDirection = "right";
  for (let i = 0; i < barSize; i++) {
    gridMatrix[currentRowIndex][i] = 1;
  }
}

export function moveRight(currentRow) {
  currentRow.pop();
  currentRow.unshift(0);
}

export function moveLeft(currentRow) {
  currentRow.shift();
  currentRow.push(0);
}

export function moveBar() {
  let currentRow = gridMatrix[currentRowIndex];
  if (barDirection === "right") {
    moveRight(currentRow);
    let lastElement = currentRow[currentRow.length - 1];
    if (lastElement === 1) {
      barDirection = "left";
    }
  } else if (barDirection === "left") {
    moveLeft(currentRow);
    let firstElement = currentRow[0];
    if (firstElement === 1) {
      barDirection = "right";
    }
  }
}

export function main() {
  moveBar();
  draw();
}

export function updateGameInterval() {
  clearInterval(gameInterval);
  gameInterval = setInterval(main, intervalTime);
}

export let gameInterval = setInterval(main, intervalTime);