'use strict';
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var NOTES_COUNT = 8;
var MIN_X = 0;
var MAX_X = 1135;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_X = 570;
var PIN_Y = 375;
var PIN_OFFSET_X = 32;
var PIN_OFFSET_Y = 87;
for (var AVATARS = [], i = 1; i <= NOTES_COUNT; i++) {
  AVATARS.push('img/avatars/user' + 0 + i + '.png');
}
var map = document.querySelector('.map');
var forms = document.querySelector('.ad-form');
var similarListElement = document.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');
var adress = document.querySelector('#address');
var fields = document.querySelectorAll('fieldset');


for (i = 0; i < fields.length; i++) {
  fields[i].setAttribute('disabled', 'disabled');
}

var mapActiveHandler = function () {
  active = true;
  map.classList.remove('map--faded');
  forms.classList.remove('ad-form--disabled');
  for (i = 0; i < fields.length; i++) {
    fields[i].removeAttribute('disabled');
  }
  renderNotes();
  mainPin.removeEventListener('click', mapActiveHandler);
};

var addAdress = function (adressX, adressY) {
  adress.value = (adressX + PIN_OFFSET_X) + ', ' + (adressY + PIN_OFFSET_Y);
};

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

var notice = document.querySelector('.notice');
var pricePerNight = notice.querySelector('#price');
var type = notice.querySelector('#type');
var timeIn = notice.querySelector('#timein');
var timeOut = notice.querySelector('#timeout');

var typeChangeHandler = function (evt) {
  switch (evt.target.value) {
    case 'bungalo':
      pricePerNight.setAttribute('min', '0');
      pricePerNight.setAttribute('placeholder', '0');
      break;
    case 'flat':
      pricePerNight.setAttribute('min', '1000');
      pricePerNight.setAttribute('placeholder', '1000');
      break;
    case 'house':
      pricePerNight.setAttribute('min', '5000');
      pricePerNight.setAttribute('placeholder', '5000');
      break;
    case 'palace':
      pricePerNight.setAttribute('min', '10000');
      pricePerNight.setAttribute('placeholder', '10000');
      break;
  }
};

var timeInChangeHandler = function () {
  timeOut.value = timeIn.value;
};

var timeOutChangeHandler = function () {
  timeIn.value = timeOut.value;
};

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
    if (mainPinTop < MIN_Y) {
      mainPinTop = MIN_Y;
    }
    if (mainPinTop > MAX_Y) {
      mainPinTop = MAX_Y;
    }
    if (mainPinLeft < MIN_X) {
      mainPinLeft = MIN_X;
    }
    if (mainPinLeft > MAX_X) {
      mainPinLeft = MAX_X;
    }
    mainPin.style.top = mainPinTop + 'px';
    mainPin.style.left = mainPinLeft + 'px';
    addAdress(mainPinLeft, mainPinTop);
  };
  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();
    if (!active) {
      mainPin.addEventListener('click', mapActiveHandler);
    }
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };
  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
});
addAdress(PIN_X, PIN_Y);
type.addEventListener('change', typeChangeHandler);
timeIn.addEventListener('change', timeInChangeHandler);
timeOut.addEventListener('change', timeOutChangeHandler);
