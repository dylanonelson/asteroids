(function() {
  'use strict';

  var Thrust = window.Asteroids.Thrust = function (ship, direction, force) {
    this.ship = ship;
    this.direction = direction;
    this.force = force;
    this.increasing = true;
  };

  Thrust.prototype.fire = function () {
    this.ship.vel[0] += this.force / 100 * Math.cos(this.direction);
    this.ship.vel[1] += this.force / 100 * Math.sin(this.direction);
    this.force -= 10;
  };

})();