/**
 * Rules
 */
var R = {
  delta: 0.0,
  increaseStep: 99999,
  timeToVictory: 100000,

  init: function () {},

  step: function () {
    R.timeToVictory -= 1;
    UI.updateTimeToVictoty(R.timeToVictory);
  },

  isWin: function () {
    return R.timeToVictory <= 0;
  }
};

