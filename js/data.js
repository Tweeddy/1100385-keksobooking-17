'use strict';
(function () {
  var PIN_OFFSET_X = 32;
  var PIN_OFFSET_Y = 87;
  var adress = document.querySelector('#address');
  var similarListElement = document.querySelector('.map__pins');

  window.data = {
    addAdress: function (adressX, adressY) {
      adress.value = (adressX + PIN_OFFSET_X) + ', ' + (adressY + PIN_OFFSET_Y);
    },
    renderNotes: function (note) {
      var pinTemplate = document.querySelector('#pin').content;
      var pin = pinTemplate.querySelector('.map__pin').cloneNode(true);
      pin.querySelector('img').src = note.author.avatar;
      pin.querySelector('img').alt = 'заголовок объявления';
      pin.style = 'left:' + note.location.x + 'px; top:' + note.location.y + 'px';
      return pin;
    },
    successHandler: function (notes) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < notes.length; i++) {
        fragment.appendChild(window.data.renderNotes(notes[i]));
      }
      similarListElement.appendChild(fragment);
    },
    errorHandler: function (errorMessage) {
      var errorTemplate = document.querySelector('#error').content.cloneNode(true);
      errorTemplate.querySelector('p').textContent = errorMessage;
      var promo = document.querySelector('main');
      promo.appendChild(errorTemplate);
    }
  };
}());
