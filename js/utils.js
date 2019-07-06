'use strict';
(function () {
  window.utils = {
    MIN_X: 0,
    MAX_X: 1135,
    MIN_Y: 130,
    MAX_Y: 630,
    getRandomNumber: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    },
    getRandomElement: function (array) {
      return array[this.getRandomNumber(0, array.length)];
    }
  };
}());
