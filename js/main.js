'use strict'; 
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var similarListElement = document.querySelector('.map__pins');

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var NOTES_COUNT = 8;
var MIN_X = 0;
var MAX_X = 1120;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

for (var AVATARS = [], i = 1; i <= NOTES_COUNT; i++) {
  AVATARS.push('img/avatars/user' + 0 + i + '.png');
}

var getRandomNumber = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}; 

var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length)];
};

var generateNotes = function () {
  var notes = [];
  var avatars = AVATARS.slice();

  for (i = 0; i < NOTES_COUNT; i++) {
    notes.push({
      author: {
        avatar: avatars.splice(getRandomNumber(0, avatars.length - 1), 1)[0]
      },
      offer: {
        type: getRandomElement(TYPES)
      },
      location: {
        x: getRandomNumber(MIN_X, MAX_X) + PIN_WIDTH / 2,
        y: getRandomNumber(MIN_Y, MAX_Y) + PIN_HEIGHT / 2
      }
    });
  }
  return notes;
};

var renderNotes = function () {
  var fragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin').content;
  var notes = generateNotes();
  for (i = 0; i < notes.length; i++) {
    var pin = pinTemplate.querySelector('.map__pin').cloneNode(true);
    var image = pin.querySelector('img');
    pin.style = 'left:' + notes[i].location.x + 'px; top:' + notes[i].location.y + 'px';
    image.src = notes[i].author.avatar;
    image.alt = 'заголовок объявления';
    fragment.appendChild(pin);
  }
  similarListElement.appendChild(fragment);
};
renderNotes();
