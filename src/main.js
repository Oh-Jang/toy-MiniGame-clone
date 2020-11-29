'use strict';

import PopUp from './pop_up.js'
import {GameBuilder, Reason} from './game.js'
import * as sound from './sound.js'

const game = new GameBuilder()
  .withCarrotCount(3)
  .withBugCount(2)
  .withGameDurationSec(3)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      sound.playAlert();
      message = 'Replay❓';
      break;
    case Reason.win:
      sound.playWin();
      message = 'YOU WON🎇';
      break;
    case Reason.lose:
      sound.playBug();
      message = 'YOU LOST💣';
      break;
  };
  gameFinishBanner.showWithText(message);
})

const gameFinishBanner = new PopUp();
gameFinishBanner.setOnclickEvent(() => {
  game.start();
});
