'use strict';
(function () {
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
    errorHandler: function (errorMessage) {
      var errorTemplate = document.querySelector('#error').content.cloneNode(true);
      errorTemplate.querySelector('p').textContent = errorMessage;
      var promo = document.querySelector('main');
      promo.appendChild(errorTemplate);
    },
    successHandler: function (notes) {
      data = notes;
      updatePin();
    }
  };
}()
);
