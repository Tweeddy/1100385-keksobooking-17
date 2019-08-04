'use strict';
(function () {
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var fields = document.querySelectorAll('fieldset');
  var mainPin = document.querySelector('.map__pin--main');
  for (var i = 0; i < fields.length; i++) {
    fields[i].setAttribute('disabled', 'disabled');
  }
  var data = [];
  var getTypeValue = function (housetypeChangeHandler) {
    var type = document.querySelector('#housing-type');
    type.addEventListener('change', housetypeChangeHandler);
    return type;
  };
  var updatePin = function () {
    window.data.renderNotes(data);
    getTypeValue(function (evt) {
      var selected = data
      .filter(function (it) {
        return it.offer.type === evt.target.value;
      });
      window.data.renderNotes(selected);
      if (evt.target.value === 'any') {
        window.data.renderNotes(data);
      }
    });
  };
  window.setup = {
    mapActiveHandler: function () {
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      for (i = 0; i < fields.length; i++) {
        fields[i].removeAttribute('disabled');
      }
      window.load(window.setup.successHandler, window.setup.errorHandler);
      mainPin.removeEventListener('click', this.mapActiveHandler);
    },
    inActiveHandler: function () {
      map.classList.add('map--faded');
      form.classList.add('ad-form--disabled');
      for (i = 0; i < fields.length; i++) {
        fields[i].setAttribute('disabled', 'disabled');
      }
      document.removeEventListener('click', this.inActiveHandler);
    },
    errorHandler: function (errorMessage) {
      var errorTemplate = document.querySelector('#error').content.cloneNode(true);
      errorTemplate.querySelector('p').textContent = errorMessage;
      var promo = document.querySelector('main');
      promo.appendChild(errorTemplate);
      document.addEventListener('click', function () {
        promo.removeChild(promo.lastChild);
        window.setup.inActiveHandler();
      });
    },
    successHandler: function (notes) {
      data = notes;
      updatePin();
    }
  };
}()
);
