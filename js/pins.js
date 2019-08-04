'use strict';
(function () {
  var PIN_X = 570;
  var PIN_Y = 375;
  var mainPin = document.querySelector('.map__pin--main');
  var active = false;
  mainPin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var mouseMoveHandler = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var mainPinLeft = mainPin.offsetLeft - shift.x;
      var mainPinTop = mainPin.offsetTop - shift.y;
      if (mainPinTop < window.utils.MIN_Y) {
        mainPinTop = window.utils.MIN_Y;
      }
      if (mainPinTop > window.utils.MAX_Y) {
        mainPinTop = window.utils.MAX_Y;
      }
      if (mainPinLeft < window.utils.MIN_X) {
        mainPinLeft = window.utils.MIN_X;
      }
      if (mainPinLeft > window.utils.MAX_X) {
        mainPinLeft = window.utils.MAX_X;
      }
      mainPin.style.top = mainPinTop + 'px';
      mainPin.style.left = mainPinLeft + 'px';
      window.data.addAdress(mainPinLeft, mainPinTop);
    };
    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      if (!active) {
        mainPin.addEventListener('click', window.setup.mapActiveHandler());
      }
      active = true;
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
  window.data.addAdress(PIN_X, PIN_Y);
}());
