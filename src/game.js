'use strict'

import {Field, ItemType} from './field.js'
import * as sound from './sound.js'

export const Reason = Object.freeze({
  cancel: 'cancel',
  win: 'win',
  lose: 'lose'
});
// 혹시라도 문자열을 잘못넣을 수 있으니

export class GameBuilder {
  withCarrotCount(carrotCount) {
    this.carrotCount = carrotCount
    return this
  }

  withBugCount(bugCount) {
    this.bugCount =bugCount;
    return this
  }


  withGameDurationSec(gameDurationSec) {
    this.gameDurationSec = gameDurationSec;
    return this
  }

  build() {
    return new Game(this.carrotCount, this.bugCount, this.gameDurationSec)
  };
  //  >> Game class의 인스턴스를 리턴
}

class Game {
  constructor(carrotCount, bugCount, gameDurationSec) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameDurationSec = gameDurationSec;
    this.started = false;
    this.score = 0;
    this.timer = null;
    this.gameBtn = document.querySelector('.game__button');
    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      };
    });
    this.timerIndicator = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickListener((evnet) => {
      this.onItemClick(evnet);
    });
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop
  }

  onItemClick(item) {
    if (!this.started) {
      return;
    };
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      this.score === this.carrotCount && this.stop(Reason.win);
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  };

  start() {
    this.started = true;
    this.init();
    this.showStopButton();
    this.showTimerAndScore();
    this.startTimer();
    sound.playBackground();
    this.addFieldEvent();
  }

  stop(reason) {
    this.started = false;
    this.stopTimer();
    this.hideButton();
    sound.stopBackground();
    this.removeFieldEvent();
    this.onGameStop && this.onGameStop(reason);
  }

  init() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }

  showStopButton() {
    const icon = this.gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.gameBtn.style.visibility = 'visible';
  }

  showTimerAndScore() {
    this.timerIndicator.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  startTimer() {
    let remainingTimeSec = this.gameDurationSec;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(Reason.lose);
        sound.playBug();
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  hideButton() {
    this.gameBtn.style.visibility = 'hidden';
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.timerIndicator.innerHTML = `${minutes}:${seconds}`;
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }

  removeFieldEvent() {
    this.gameField.field.removeEventListener('click', this.gameField.onClick)
  }

  addFieldEvent() {
    this.gameField.field.addEventListener('click', this.gameField.onClick)
  }
}