'use strict';
(function () {
  var PINS_NUMBER = 5;
  var PinOffset = {
    X: 32,
    Y: 87
  };
  var adress = document.querySelector('#address');
  var listOfSimilarPins = document.querySelector('.map__pins');

  window.data = {
    addAdress: function (adressX, adressY) {
      adress.value = (adressX + PinOffset.X) + ', ' + (adressY + PinOffset.Y);
    },
    generate: function (note) {
      var pinTemplate = document.querySelector('#pin').content;
      var pin = pinTemplate.querySelector('.map__pin').cloneNode(true);
      pin.addEventListener('click', function () {
        window.card.render(note);
      });
      pin.querySelector('img').src = note.author.avatar;
      pin.querySelector('img').alt = 'заголовок объявления';
      pin.style = 'left:' + note.location.x + 'px; top:' + note.location.y + 'px';
      return pin;
    },
    remove: function () {
      var allPins = document.querySelectorAll('.map__pin');
      for (var i = 1; i < allPins.length; i++) {
        listOfSimilarPins.removeChild(listOfSimilarPins.lastChild);
      }
    },
    render: function (notes) {
      window.data.remove();
      var fragment = document.createDocumentFragment();
      var takeNumber = notes.length > PINS_NUMBER ? PINS_NUMBER : notes.length;
      for (var i = 0; i < takeNumber; i++) {
        fragment.appendChild(window.data.generate(notes[i]));
      }
      listOfSimilarPins.appendChild(fragment);
      window.filters.active();
    },
  };
}());
