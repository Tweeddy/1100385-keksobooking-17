'use strict';
(function () {
  var data = [];
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var fields = document.querySelectorAll('fieldset');
  var mainPin = document.querySelector('.map__pin--main');
  var filters = document.querySelector('.map__filters');
  var onErrorEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  var closePopup = function () {
    var errorCard = document.querySelector('.error');
    if (errorCard) {
      errorCard.remove();
    }
    document.removeEventListener('keydown', onErrorEscPress);
    document.removeEventListener('click', closePopup);
    window.setup.inActiveHandler();
  };
  var errorWindow = function (errorMessage) {
    var errorBlock = document.querySelector('#error').content.querySelector('.error');
    var errorText = document.querySelector('#error').content.querySelector('.error__message');
    errorText.textContent = errorMessage;
    var errorModule = errorBlock.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(errorModule);
  };
  for (var i = 0; i < fields.length; i++) {
    fields[i].disabled = true;
  }
  window.filters.inactive();
  window.setup = {
    mapActiveHandler: function () {
      window.load(window.setup.successHandler, window.setup.errorHandler);
      map.classList.remove('map--faded');
      for (i = 0; i < fields.length; i++) {
        fields[i].disabled = false;
      }
      form.classList.remove('ad-form--disabled');
    },

    inActiveHandler: function () {
      map.classList.add('map--faded');
      form.reset();
      filters.reset();
      form.classList.add('ad-form--disabled');
      for (i = 0; i < fields.length; i++) {
        fields[i].disabled = true;
      }
      window.data.remove();
      window.data.addAdress(window.utils.MainPinCoordinate.PIN_X, window.utils.MainPinCoordinate.PIN_Y);
      mainPin.style.left = '570px';
      mainPin.style.top = '375px';
      window.filters.inactive();
      window.card.remove();
      mainPin.addEventListener('click', window.setup.mapActiveHandler);
      document.removeEventListener('click', this.inActiveHandler);
    },
    errorHandler: function (errorMessage) {
      errorWindow(errorMessage);
      document.addEventListener('keydown', onErrorEscPress);
      document.addEventListener('click', closePopup);
    },
    successHandler: function (notes) {
      data = notes;
      window.data.render(data);
      window.filters.filterPins(data);
    }
  };
}()
);
