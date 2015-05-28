(function() {
  'use strict';

  var HEIGHT = 25;
  var WIDTH = 20;
  var RADIUS = 8;
  var COLOR = "blue";
  var VEL = [0, 0];
  var MAX = 10;

  var Ship = window.Asteroids.Ship = function (pos, game) {
    Asteroids.MovingObject.call(this, pos);
    this.height = HEIGHT;
    this.width = WIDTH;
    this.radius = RADIUS;
    this.color = COLOR;
    this.vel = VEL;
    this.game = game;
    this.orientation = Math.PI;
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
    this.pos[0] += this.vel[0] * Math.cos(this.orientation);
    this.pos[1] += this.vel[1] * Math.sin(this.orientation);
    this.pos = this.game.wrap(this.pos);
  };

  Ship.prototype.power = function () {
    if(Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1],2)) <= MAX) {
      this.vel[0] += 1;
      this.vel[1] += 1;
    }
  };

  Ship.prototype.decelerate = function () {
    if(Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1],2)) <= 0.000001) {
      this.vel[0] = 0;
      this.vel[1] = 0;
      return;
    }
    this.vel[0] -= 1;
    this.vel[1] -= 1
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
      (6 + this.vel[0]) * Math.cos(this.orientation),
      (6 + this.vel[1]) * Math.sin(this.orientation),
      this.vel[0],
      this.vel[1]
    ];
    var bullet = new Asteroids.Bullet(this.pos, bulletVelocity, this.game);
  };
})();
