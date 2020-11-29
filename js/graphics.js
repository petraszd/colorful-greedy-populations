/**
 * Graphics
 */
var G = {

  canvas: null,
  images: [],
  ctx: null,
  W: 600,
  H: 600,

  init: function () {
    G.canvas = document.getElementById('Canvas');
    G.ctx = G.canvas.getContext("2d");
  },

  draw: function () {
    G.ctx.clearRect(0, 0, G.W, G.H);

    for (var i = 0, p; p = Populations[i]; ++i) {
      G.drawPopulation(p);
    }
  },

  drawPopulation: function (p) {
    G.ctx.fillStyle = p.style;
    for (var y = 0; y < p.H; ++y) {
      for (var x = 0; x < p.W; ++x) {
        if (p.items[y][x].alive) {
          G.drawPoint(x, y, p.color);
        }
      }
    }
  },

  drawPoint: function (x, y, color) {
    G.ctx.drawImage(G.images[color], x * CONFIGS.ITEM_SIZE, y * CONFIGS.ITEM_SIZE, 20, 20)
  }
};

