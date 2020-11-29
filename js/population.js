var Populations = [];

/**
 * Population Item
 */
function makeItem() {
  var Item = {
    alive: false,
    nextState: false,

    init: function () { },

    turnOn: function () {
      Item.alive = true;
    },

    rechange: function () {
      Item.alive = Item.nextState;
    }
  };

  Item.init();
  return Item;
}

/**
 * Population
 */
function makePopulation(color, percent) {
  var P = {
    color: 'none',
    items: [],
    W: CONFIGS.WIDTH / CONFIGS.ITEM_SIZE,
    H: CONFIGS.HEIGHT / CONFIGS.ITEM_SIZE,
    weight: percent,

    init: function () {
      P.color = color;
      P.initItems();
    },

    initItems: function () {
      for (var y = 0; y < P.H; ++y) {
        P.items[y] = [];
        for (var x = 0; x < P.H; ++x) {
          P.items[y][x] = makeItem(); // TODO: some logic
        }
      }
    },

    set: function (x, y, c) {
      P.items[y][x].activate();
    },

    born: function () {
      for (var y = 0; y < P.H; ++y) {
        for (var x = 0; x < P.W; ++x) {
          if (P.items[y][x].alive) {
            P.items[y][x].nextState = true;
            continue;
          }

          if (P.getNeighboursCount(x, y) > 1 && Math.random() < P.weight) { // TODO: magic number
            P.items[y][x].nextState = true;
          } else {
            P.items[y][x].nextState = false;
          }
        }
      }

      P.commit();
    },

    getAliveItemsCount: function () {
      var n = 0;
      for (var y = 0; y < P.H; ++y) {
        for (var x = 0; x < P.W; ++x) {
          if (P.items[y][x].alive) {
            n++;
          }
        }
      }
      return n;
    },

    commit: function () {
      for (var y = 0; y < P.H; ++y) {
        for (var x = 0; x < P.W; ++x) {
          P.items[y][x].rechange();
        }
      }
    },

    getNeighboursCount: function (currentX, currentY) {
      var n = 0;
      for (var y = currentY - 1; y <= currentY + 1; ++y) {
        for (var x = currentX - 1; x <= currentX + 1; ++x) {
          if (x == currentX && y == currentY) {
            continue;
          }

          try {
            n += P.items[y][x].alive ? 1: 0;
          } catch (err) {
            // Do nothing
          }
        }
      }
      return n;
    },

    fightWith: function (other) {
      for (var y = 0; y < P.H; ++y) {
        for (var x = 0; x < P.W; ++x) {
          if (!P.items[y][x].alive || !other.items[y][x].alive) {
            continue;
          }

          // Both dies
          if (Math.random() < 0.3) { // TODO: magic number
            P.items[y][x].alive = false;
            other.items[y][x].alive = false;
            continue;
          }

          var iAmWinner = P.weight > other.weight;
          if (Math.random() < 0.2) { // TODO: magic number
            iAmWinner != iAmWinner;
          }

          if (iAmWinner) {
            P.items[y][x].alive = true;
            other.items[y][x].alive = false;
          } else {
            P.items[y][x].alive = false;
            other.items[y][x].alive = true;
          }
        }
      }
    },

    extincted: function () {
      for (var y = 0; y < P.H; ++y) {
        for (var x = 0; x < P.W; ++x) {
          if (P.items[y][x].alive) {
            return false;
          }
        }
      }
      return true;
    }
  }

  P.init();
  return P;
}

