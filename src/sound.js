const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

export function playCarrot() {
  carrotSound.currentTime = 0;
  carrotSound.play();
}

export function playAlert() {
  alertSound.play();
}

export function playBug() {
  bugSound.play();
}

export function playBackground() {
  bgSound.play();
}

export function stopBackground() {
  bgSound.currentTime = 0;
  bgSound.pause();
}

export function playWin() {
  winSound.play();
}