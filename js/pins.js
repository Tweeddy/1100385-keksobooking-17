'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var active = false;
  var onMainPinEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, window.setup.mapActiveHandler);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
  };
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
      if (mainPinTop < window.utils.MapCoordinate.MIN_Y) {
        mainPinTop = window.utils.MapCoordinate.MIN_Y;
      }
      if (mainPinTop > window.utils.MapCoordinate.MAX_Y) {
        mainPinTop = window.utils.MapCoordinate.MAX_Y;
      }
      if (mainPinLeft < window.utils.MapCoordinate.MIN_X) {
        mainPinLeft = window.utils.MapCoordinate.MIN_X;
      }
      if (mainPinLeft > window.utils.MapCoordinate.MAX_X) {
        mainPinLeft = window.utils.MapCoordinate.MAX_X;
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
  mainPin.addEventListener('keydown', onMainPinEnterPress);
  window.data.addAdress(window.utils.MainPinCoordinate.PIN_X, window.utils.MainPinCoordinate.PIN_Y);
}());
