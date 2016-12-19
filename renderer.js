const tileNames = {
  dig: '•',
  box: '×',
  player: '@'
};

const Player = require('./engine/player');

const Game = {
    display: null,
    player: null,
    map: {},

    options: {
        layout: "tile",
        bg: "transparent",
        tileWidth: 12,
        tileHeight: 12,
        tileSet: null,
        tileMap: {},
        tileColorize: true,
        //forceSquareRatio:true,
        width: 120,
        height: 80
    },

    init: function() {
        this._loadTiles(this._init);
    },

    _init: function() {
        let cont = document.querySelector("#container");

        this.display = new ROT.Display(this.options);
        cont.appendChild(this.display.getContainer());


        this.initPlayer();

        this._generateMap();

    },

    initPlayer: function() {
        this.player = new Player();
    },

    _loadTiles: function(cb) {
        let tilemap = this.options.tileMap,
            image = new Image();
        image.onload = () => {
          this.options.tileSet = image;
          cb.call(this);
        };
        image.src = './data/img/cogmind_tiles_grayscale_debris.png';


        tilemap[tileNames.dig] = [13, 6];
        tilemap[tileNames.box] = [169, 6];
        tilemap[tileNames.player] = [169, 27];
    },

    _generateMap: function() {
        let digger = new ROT.Map.Digger(),
            freeCells = [],
            digCallback;

        digCallback = function(x, y, value) {
            if (value) {
                return;
            }

            let key = x + "," + y;
            this.map[key] = tileNames.dig;
            freeCells.push(key);
        };
        digger.create(digCallback.bind(this));

        this._generateBoxes(freeCells);

        this.placePlayer(freeCells);

        this._drawWholeMap();
    },

    placePlayer: function(freeCells) {
        let index = Math.floor(ROT.RNG.getUniform() * freeCells.length),
            key = freeCells.splice(index, 1)[0].split(',');
        this.player.moveTo(key[0],key[1]);
    },

    _generateBoxes: function(freeCells) {
        let i = 0, index, key;
        for (; i < 10; i++) {
            index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            key = freeCells.splice(index, 1)[0];
            this.map[key] = tileNames.box;
        }
    },

    _drawWholeMap: function() {
        let key, parts, x, y, t;
        for (key in this.map) {
            parts = key.split(",");
            x = parseInt(parts[0]);
            y = parseInt(parts[1]);
            t = this.map[key];
            if(t === tileNames.dig) {
              this.display.draw(x, y, t, "transparent", "rgba(250, 250, 250, 0.1)");
            } else {
              this.display.draw(x, y, t, "rgba(12, 122, 112, 0.8)", "rgba(250, 250, 250, 0.2)");
            }
          }
        this.player.draw(this.display);
    }
};

Game.init();
