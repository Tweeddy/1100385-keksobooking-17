'use strict'
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var AVATARS_NUMBER = 8;
var MIN_X = 0;
var MAX_X = 1050;
var MIN_Y = 130;
var MAX_Y = 630;

/*var getRandomNumber = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  };
*/

var getRandomNumber = function (massiv) {
    var min = massiv[0];
    var max = massiv.length;

    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);

    console.log('odin' + massiv);
    console.log('dua' + rand);
    return rand;

}

var getArray = function(j) {
    var mas = [];
    for (var i = 0; i < AVATARS_NUMBER; i++) {
        mas[i] = i+1;
    }
    console.log(mas);
    var arr = mas.slice();
    return arr;
}
getRandomNumber(getArray());


var generateNote = function () {
    var note = {};
    note.author = {};
    note.author.avatar = 'img/avatars/users' + '0' + getRandomNumber(1, AVATARS_NUMBER); //это осталось от старой функции
    note.offer = {};
    note.offer.type = TYPE[getRandomNumber(0, TYPE.length - 1)];
    note.location = {};
    note.location.x = getRandomNumber (MIN_X, MAX_X);
    note.location.y = getRandomNumber(MIN_Y, MAX_Y);
    //console.log('x = ' + note.location.x);
    //console.log('y = ' + note.location.y);
    return note;
}

var createNote = function () {
    var noteList = [];
    for (var i = 0; i < AVATARS_NUMBER ; i++) {
        var noteObject = generateNote();
        noteList[i] = noteObject;
    }
   // console.log(noteList);
    return noteList;
}
//createNote();
/*
var pinTemplate = document.querySelector('#pin');
console.log(pinTemplate);

var renderNote = function () {
    var pinElement = pinTemplate.cloneNode(true);

    var pin = pinElement.content.querySelector('.map__pin');
    pin.style =  'left:' + generateNote().location.x + 'px; top:' + generateNote().location.y + 'px';
    
    pinElement.img.src = 'generateNote().author.avatar';
    return pinElement;

}

var fragment = document.createDocumentFragment();

var list = createNote();

for (var i = 0; i < list.length; i++) {
    fragment.appendChild(renderNote(list[i]));
  }

  var similarListElement = document.querySelector('.map__pins');
  similarListElement.appendChild(fragment);

*/







