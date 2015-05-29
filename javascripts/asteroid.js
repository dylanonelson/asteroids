;(function () {
  COLOR = "red";
  RADII = [10, 15, 20];

  var Asteroid = Asteroids.Asteroid = function(pos, game) {
    Asteroids.MovingObject.call(this, pos);
    this.game = game;
    this.color = COLOR;
    this.radius = RADII[Math.floor(Math.random() * RADII.length)];
    this.vel = Asteroids.Util.randomVec(2);
    this.sprite = new Image();
    this.sprite.src = './images/asteroids.png';
    this.spriteX = Math.floor(Math.random() * 7) * 130;
    this.spriteY = Math.floor(Math.random() * 8) * 130;
  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function () {
    ctx.beginPath();

    ctx.drawImage(
      this.sprite, 
      this.spriteX, 
      this.spriteY, 
      130, 
      130, 
      this.pos[0] - this.radius * 1.5, 
      this.pos[1] - this.radius * 1.5, 
      this.radius * 3, 
      this.radius * 3
    );

  },

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      this.game.lives -= 1;
      otherObject.relocate();
    }
  };

})();
