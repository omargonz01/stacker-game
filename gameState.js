export let gridMatrix = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0],
];
export let currentRowIndex = gridMatrix.length - 1;
export let barDirection = "right";
export let barSize = 3;
export let isGameOver = false;
export let score = 0;
export let level = 1;
export let intervalTime = 600;
