'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;
  window.utils = {
    MainPinCoordinate: {
      PIN_X: 570,
      PIN_Y: 375
    },
    MapCoordinate: {
      MIN_X: 0,
      MAX_X: 1135,
      MIN_Y: 130,
      MAX_Y: 630,
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    debounce: function (cb) {
      var lastTimeout;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    }
  };
}());
