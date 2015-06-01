(function() {
  'use strict';

  var HEIGHT = 25;
  var WIDTH = 20;
  var RADIUS = 20;
  var COLOR = '#fff';
  var VEL = [0, 0];
  var MAX = 6;

  var Ship = window.Asteroids.Ship = function (pos, game) {
    Asteroids.MovingObject.call(this, pos);
    this.game = game;
    
    this.image = new Image();
    this.image.src = './images/ship.png';
    this.radius = RADIUS;
    
    this.vel = VEL;
    this.thrusts = [];
    this.orientation = Math.PI * 1.5;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function (ctx) {
    
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.orientation + Math.PI / 2);
    ctx.translate(this.pos[0] * -1, this.pos[1] * -1);

    ctx.drawImage(
      this.image,
      0,
      0,
      64,
      64,
      this.pos[0] - 30, 
      this.pos[1] - 30,
      60,
      60
    );

    ctx.restore();
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = VEL;
  };

  Ship.prototype.move = function () {
    this.vel = [0, 0]

    this.thrusts.forEach(function (thrust) {
      if (thrust.force === 0 ) {
        this.thrusts.splice(this.thrusts.indexOf(thrust), 1);
      } else {
        thrust.fire();
      }
    }.bind(this))

    this.pos[0] += this.vel[0]
    this.pos[1] += this.vel[1]

    this.pos = this.game.wrap(this.pos);
  };

  Ship.prototype.power = function () {
    var thrust = new window.Asteroids.Thrust(this, this.orientation, 500);
    this.thrusts.push(thrust);
    this._thrusters = true;
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
