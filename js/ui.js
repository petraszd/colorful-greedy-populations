var UI = {
  blue: null,
  green: null,
  yellow: null,
  red: null,

  buttons: [],

  tick: null,
  canClick: null,
  timeToVictory: null,

  startBtn: null,
  endBtn: null,
  nextBtn: null,
  winBtn: null,

  startScreen: null,
  nextScreen: null,
  winScreeen: null,
  endScreen: null,

  init: function () {
    UI.buttons[0] = document.getElementById('Green');
    UI.buttons[1] = document.getElementById('Blue');
    UI.buttons[2] = document.getElementById('Yellow');
    UI.buttons[3] = document.getElementById('Red');

    for (var i = 0, btn; btn = UI.buttons[i]; ++i) {
      // Cheat to make attach `btn` and `i` to closure.
      // Because JavaScript is not Lisp...
      (function (button, index) {
        button.addEventListener('click', function (e) {
          if (index < Populations.length) {
            Game.increaseWeight(index);
          }
        }, false);
      }) (btn, i);
    }

    UI.timeToVictory = document.getElementById('TimeToVictory');

    // Info screens
    UI.startScreen = document.getElementById('StartScreen');
    UI.nextScreen = document.getElementById('NextScreen');
    UI.winScreeen = document.getElementById('WinScreen');
    UI.endScreen = document.getElementById('EndScreen');

    // Buttons
    UI.startBtn = document.getElementById('StartButton');
    UI.startBtn.addEventListener('click', function (e) {
      UI.hideScreens();
      Game.startLevel();
    }, false);

    UI.endBtn = document.getElementById('EndButton');
    UI.endBtn.addEventListener('click', function (e) {
      UI.hideScreens();
      Game.startLevel();
    }, false);

    UI.nextBtn = document.getElementById('NextButton');
    UI.nextBtn.addEventListener('click', function (e) {
      UI.hideScreens();
      Game.startLevel();
    }, false);

    UI.winBtn = document.getElementById('WinButton');
    UI.winBtn.addEventListener('click', function (e) {
      UI.hideScreens();
      UI.showStartScreen();
    }, false);
  },

  hideScreens: function () {
    UI.startScreen.style.display = 'none';
    UI.nextScreen.style.display = 'none';
    UI.winScreeen.style.display = 'none';
    UI.endScreen.style.display = 'none';
  },

  showNextScreen: function () {
    UI.hideScreens();
    UI.nextScreen.style.display = 'block';
  },

  showStartScreen: function () {
    UI.hideScreens();
    UI.startScreen.style.display = 'block';
  },

  showEndScreen: function () {
    UI.hideScreens();
    UI.endScreen.style.display = 'block';
  },

  showWinScreen: function () {
    UI.hideScreens();
    UI.winScreeen.style.display = 'block';
  },

  updateTimeToVictoty: function (left) {
    if (left <= 30 && left % 5 == 0) {
      if (UI.timeToVictory.style.fontSize = '20px') {
        UI.timeToVictory.style.fontSize = '30px';
        UI.timeToVictory.style.paddingTop = '27px';
      } else {
        UI.timeToVictory.style.fontSize = '20px';
        UI.timeToVictory.style.paddingTop = '32px';
      }
    } else {
      UI.timeToVictory.style.fontSize = '20px';
      UI.timeToVictory.style.paddingTop = '32px';
    }
    UI.timeToVictory.innerHTML = '' + left.toFixed(0);
  },

  updatePopulations: function () {
    for (var i = 0, p; p = Populations[i]; ++i) {
      op = 0.2 + 0.9 * Populations[i].weight;
      UI.buttons[i].style.opacity = op;
      UI.buttons[i].style.filter  = "alpha(opacity=" + (op * 100) + ")";
    }
  },

  showStartButton: function () {
    UI.startBtn.style.display = '';
  }
};

