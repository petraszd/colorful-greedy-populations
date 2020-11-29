var Game = {
  levels: [
    {
      delta: 0.35,
      increaseStep: 21,
      time: 150,
      populations: [
        {
          weight: 0.4,
          active: [[9, 9], [9, 10], [10, 9], [10, 10]]
        },
        {
          weight: 0.6,
          active: [[20, 20], [20, 21], [21, 20], [21, 21]]
        }
      ]
    },
    {
      delta: 0.25,
      increaseStep: 11,
      time: 250,
      populations: [
        {
          weight: 0.3,
          active: [[9, 9], [9, 10], [10, 9], [10, 10]]
        },
        {
          weight: 0.3,
          active: [[20, 20], [20, 21], [21, 20], [21, 21]]
        },
        {
          weight: 0.4,
          active: [[14, 28], [15, 28], [14, 29], [15, 29]]
        }
      ]
    },
    {
      delta: 0.15,
      increaseStep: 21,
      time: 200,
      populations: [
        {
          weight: 0.25,
          active: [[7, 7], [7, 8], [8, 7], [8, 8]]
        },
        {
          weight: 0.25,
          active: [[22, 7], [22, 8], [23, 7], [23, 8]]
        },
        {
          weight: 0.25,
          active: [[7, 22], [7, 23], [8, 22], [8, 23]]
        },
        {
          weight: 0.25,
          active: [[22, 22], [22, 23], [23, 22], [23, 23]]
        }
      ]
    }
  ],
  currentLevel: 0,

  init: function () {
    Game.loadResources();
  },

  loadResources: function () {
    var loaded = 0;
    for (var i = 0, color; color = ['green', 'blue', 'yellow', 'red'][i]; ++i) {
      var img = new Image();
      img.onload = function(){
        loaded++;
        if (loaded == 4) {
          Game.loaded();
        }
      }
      img.src = 'img/' + color + '-item.png';
      G.images.push(img);
    }
  },

  loaded: function () {
    UI.showStartButton();
  },

  loadLevel: function () {
    var level = Game.levels[Game.currentLevel];
    R.delta = level.delta;
    R.increaseStep = level.increaseStep;
    R.timeToVictory = level.time;

    Populations = [];
    for (var i = 0, pOpt; pOpt = level.populations[i]; ++i) {
      var p = makePopulation(i, pOpt.weight);

      for (var j = 0, coords; coords = pOpt.active[j]; ++j) {
        p.items[coords[0]][coords[1]].turnOn();
      }
      Populations.push(p);
    }

    UI.updateTimeToVictoty(R.timeToVictory);
    UI.updatePopulations();
  },

  startLevel: function () {
    Game.loadLevel();
    G.draw();

    for (var i = 0; i < 4; ++i) { // TODO: magic numbers
      UI.buttons[i].style.display = 'none';
    }
    for (var i = 0; i < Populations.length; ++i) {
      UI.buttons[i].style.display = 'block';
    }

    setTimeout(function () { Game.tick(); }, CONFIGS.TIMEOUT);
  },

  tick: function () {
    for (var i = 0, p; p = Populations[i]; ++i) {
      p.born();
    }

    for (var i = 0, left; left = Populations[i]; ++i) {
      for (var j = i + 1, right; right = Populations[j]; ++j) {
        left.fightWith(right);
      }
    }

    G.draw();

    // If extincted
    for (var i = 0, p; p = Populations[i]; ++i) {
      if (p.extincted()) {
        setTimeout(function () {
          UI.showEndScreen();
        }, CONFIGS.PAUSE_BEFORE_SCREEN);
        return;
      }
    }

    // If time runs out
    if (R.isWin()) {
      if (Game.currentLevel == Game.levels.length - 1) {
        Game.currentLevel = 0;
        setTimeout(function () {
          UI.showWinScreen();
        }, CONFIGS.PAUSE_BEFORE_SCREEN);
      } else {
        Game.currentLevel++;
        setTimeout(function () {
          UI.showNextScreen();
        }, CONFIGS.PAUSE_BEFORE_SCREEN);
      }
      return;
    }

    R.step();
    if ((R.timeToVictory + 1) % R.increaseStep == 0) {
      var index = Math.floor(Populations.length * Math.random());
      Game.increaseWeight(index);
    }

    setTimeout(function () { Game.tick(); }, CONFIGS.TIMEOUT);
  },

  increaseWeight: function (index) {
    if (Populations[index].weight > 0.95) {
      return;
    }

    for (var i = 0, p; p = Populations[i]; ++i) {
      if (i != index) {
        p.weight -= R.delta / (Populations.length - 1);
      }
    }
    Populations[index].weight += R.delta;

    UI.updatePopulations();
  },

  restart: function () {
    Game.currentLevel = 0;
    Game.startLevel();
  }
};

