'use strict';
(function () {
  var PIN_OFFSET_X = 32;
  var PIN_OFFSET_Y = 87;
  var PINS_NUMBER = 5;
  var adress = document.querySelector('#address');
  var similarListElement = document.querySelector('.map__pins');

  window.data = {
    addAdress: function (adressX, adressY) {
      adress.setAttribute('disabled', 'disabled');
      adress.value = (adressX + PIN_OFFSET_X) + ', ' + (adressY + PIN_OFFSET_Y);
    },
    generateNotes: function (note) {
      var pinTemplate = document.querySelector('#pin').content;
      var pin = pinTemplate.querySelector('.map__pin').cloneNode(true);
      pin.addEventListener('click', function () {
        window.card.renderCard(note);
      });
      pin.querySelector('img').src = note.author.avatar;
      pin.querySelector('img').alt = 'заголовок объявления';
      pin.style = 'left:' + note.location.x + 'px; top:' + note.location.y + 'px';
      return pin;
    },
    removeNotes: function () {
      var allPins = document.querySelectorAll('.map__pin');
      for (var i = 1; i < allPins.length; i++) {
        similarListElement.removeChild(similarListElement.lastChild);
      }
    },
    renderNotes: function (notes) {
      window.data.removeNotes();
      var fragment = document.createDocumentFragment();
      var takeNumber = notes.length > PINS_NUMBER ? PINS_NUMBER : notes.length;
      for (var i = 0; i < takeNumber; i++) {
        fragment.appendChild(window.data.generateNotes(notes[i]));
      }
      similarListElement.appendChild(fragment);
    },
  };
}());
