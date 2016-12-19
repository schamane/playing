const Player = function() {
   var pos = this.position = {x: 0, y: 0};

   this.tileName = '@';

   this.moveTo = function(x,y) {
     pos.x = x;
     pos.y = y;
     this.position = pos;
   };

   this.draw = function(display) {
     display.draw(pos.x, pos.y, this.tileName, "rgba(1, 122, 212, 0.8)", "rgba(250, 250, 250, 0.2)");
   };
};

module.exports = Player;
