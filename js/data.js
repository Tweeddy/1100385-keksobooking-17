'use strict';
(function () {
  var NOTES_COUNT = 8;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_OFFSET_X = 32;
  var PIN_OFFSET_Y = 87;
  for (var AVATARS = [], i = 1; i <= NOTES_COUNT; i++) {
    AVATARS.push('img/avatars/user' + 0 + i + '.png');
  }
  var adress = document.querySelector('#address');
  var similarListElement = document.querySelector('.map__pins');
  window.data = {
    addAdress: function (adressX, adressY) {
      adress.value = (adressX + PIN_OFFSET_X) + ', ' + (adressY + PIN_OFFSET_Y);
    },
    generateNotes: function () {
      var notes = [];
      var avatars = AVATARS.slice();

      for (i = 0; i < NOTES_COUNT; i++) {
        notes.push({
          author: {
            avatar: avatars.splice(window.utils.getRandomNumber(0, avatars.length - 1), 1)[0]
          },
          offer: {
            type: window.utils.getRandomElement(TYPES)
          },
          location: {
            x: window.utils.getRandomNumber(window.utils.MIN_X, window.utils.MAX_X) + PIN_WIDTH / 2,
            y: window.utils.getRandomNumber(window.utils.MIN_Y, window.utils.MAX_Y) + PIN_HEIGHT / 2
          }
        });
      }
      return notes;
    },
    renderNotes: function () {
      var fragment = document.createDocumentFragment();
      var pinTemplate = document.querySelector('#pin').content;
      var notes = this.generateNotes();
      for (i = 0; i < notes.length; i++) {
        var pin = pinTemplate.querySelector('.map__pin').cloneNode(true);
        var image = pin.querySelector('img');
        pin.style = 'left:' + notes[i].location.x + 'px; top:' + notes[i].location.y + 'px';
        image.src = notes[i].author.avatar;
        image.alt = 'заголовок объявления';
        fragment.appendChild(pin);
      }
      similarListElement.appendChild(fragment);
    }
  };
}());
