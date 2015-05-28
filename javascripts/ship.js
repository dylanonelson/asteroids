(function() {
  'use strict';

  var HEIGHT = 25;
  var WIDTH = 20;
  var RADIUS = 8;
  var COLOR = '#fff';
  var VEL = 0;
  var MAX = 6;

  var Ship = window.Asteroids.Ship = function (pos, game) {
    Asteroids.MovingObject.call(this, pos);
    this.height = HEIGHT;
    this.width = WIDTH;
    this.radius = RADIUS;
    this.color = COLOR;
    this.vel = VEL;
    this.game = game;
    this.orientation = Math.PI * 1.5;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function (ctx) {
    
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.orientation + Math.PI / 2);
    ctx.translate(this.pos[0] * -1, this.pos[1] * -1);

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.lineTo(
      this.pos[0] - (this.width / 2),
      this.pos[1] + this.radius
    );
    ctx.lineTo(
      this.pos[0],
      this.pos[1] - this.height
    );
    ctx.lineTo(
      this.pos[0] + (this.width / 2),
      this.pos[1] + this.radius
    );
    ctx.lineTo(
      this.pos[0],
      this.pos[1] + this.radius
    );

    ctx.fill();
    ctx.restore();
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = VEL;
  };

  Ship.prototype.move = function () {
    this.pos[0] += this.vel * Math.cos(this.orientation);
    this.pos[1] += this.vel * Math.sin(this.orientation);
    this.pos = this.game.wrap(this.pos);
  };

  Ship.prototype.power = function () {
    if(this.vel <= MAX) {
      this.vel += 1;
    }
  };

  Ship.prototype.decelerate = function () {
    if(this.vel > 0) {
      this.vel -= 1;
    }
  };

  Ship.prototype.rotate = function (shift) {
    if (shift === 1) {
      this.orientation -= Math.PI / 6;
    } else {
      this.orientation += Math.PI / 6;
    }
  };

  Ship.prototype.fireBullet = function () {
    var bulletVelocity = [
      8 * Math.cos(this.orientation),
      8 * Math.sin(this.orientation)
    ];
    var bullet = new Asteroids.Bullet(this.pos, bulletVelocity, this.game);
  };
})();
