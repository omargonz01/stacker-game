// eventHandling.js
import { stackBtn, playAgainBtn, nextLevelBtn, endGameScreen, endGameText, levelCounter } from './elementSelection.js';
import { isGameOver, level, intervalTime } from './gameState.js';
import { main, updateGameInterval, onStack } from './gameLogic.js';

export function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = "YOU<br>WON!";
    endGameScreen.classList.add("win");
    if (level < 10) {
      // Show the "Next Level" button if the player hasn't reached level 10 yet
      nextLevelBtn.classList.remove("hidden");
      playAgainBtn.classList.add("hidden");
    } else {
      // Show the "Play Again" button if the player has reached level 10
      playAgainBtn.classList.remove("hidden");
      nextLevelBtn.classList.add("hidden");
    }
  } else {
    endGameText.innerHTML = "GAME<br>OVER";
    endGameScreen.classList.remove("win");
    // Show the "Play Again" button if the player lost
    playAgainBtn.classList.remove("hidden");
    nextLevelBtn.classList.add("hidden");
  }
  endGameScreen.classList.remove("hidden");
}

function onPlayAgain() {
  // Reset the game state
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

  // Check if the player lost or beat level 10
  if (isGameOver || level >= 10) {
    // Reset to level 1 and initial interval time if the player lost or beat level 10
    level = 1;
    intervalTime = 600;
  } else {
    // Increase the level and decrease the interval time if the player won
    level++;
    intervalTime -= 75;
  }

  isGameOver = false; // Reset isGameOver after checking if the player lost

  levelCounter.innerText = level; // Update the level counter

  // Update the game interval
  updateGameInterval();

  // Hide the end game screen
  endGameScreen.classList.add("hidden");
}

// Events
stackBtn.addEventListener("click", onStack);
nextLevelBtn.addEventListener("click", onPlayAgain);
playAgainBtn.addEventListener("click", onPlayAgain);
