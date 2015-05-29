;(function() {
  'use strict';

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.scoreSpans = document.getElementsByClassName('score');
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    var render = (function() {
      if (this.game.lives === 0 || this.game.asteroids.length === 0) {
        clearInterval(intervalId);
        var modal = document.getElementById('play-again-modal');
        modal.className = 'modal';
      }
      this.game.step();
      this.game.draw(this.ctx);

      [].forEach.call(this.scoreSpans, function (span) {
        span.textContent = this.game.score;
      }.bind(this));

      document.getElementById('lives').textContent = this.game.lives;
    }).bind(this);
    var intervalId = window.setInterval(render, 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    key('i, up', function() {
      this.game.ship.power();
    }.bind(this));

    key('l, right', function () {
      this.game.ship.rotate(-1);
    }.bind(this));

    key('j, left', function () {
      this.game.ship.rotate(1);
    }.bind(this));

    key('k, down', function () {
      this.game.ship.relocate();
    }.bind(this));

    key('a, space', function () {
      this.game.ship.fireBullet();
    }.bind(this));
  };

  GameView.prototype.unbindKeyHandlers = function () {
    key.unbind('i, up');
    key.unbind('l, right');
    key.unbind('j, left');
    key.unbind('k, down');
    key.unbind('a, space');
  };

})();
