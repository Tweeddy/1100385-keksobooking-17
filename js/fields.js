'use strict';
(function () {
  var notice = document.querySelector('.notice');
  var pricePerNight = notice.querySelector('#price');
  var type = notice.querySelector('#type');
  var timeIn = notice.querySelector('#timein');
  var timeOut = notice.querySelector('#timeout');
  var roomNumber = notice.querySelector('#room_number');
  var capacity = notice.querySelector('#capacity');
  var oneGuest = capacity.querySelector('#one');
  var twoGuests = capacity.querySelector('#two');
  var threeGuests = capacity.querySelector('#three');
  var noneGuests = capacity.querySelector('#none');
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
  var reset = function () {
    capacity.value = oneGuest.value;
    var options = capacity.querySelectorAll('option');
    for (var i = 0; i < options.length; i++) {
      options[i].removeAttribute('disabled');
    }
  };
  twoGuests.setAttribute('disabled', 'disabled');
  threeGuests.setAttribute('disabled', 'disabled');
  noneGuests.setAttribute('disabled', 'disabled');

  var roomNumberChangeHandler = function (evt) {
    reset();
    switch (evt.target.value) {
      case '1':
        twoGuests.setAttribute('disabled', 'disabled');
        threeGuests.setAttribute('disabled', 'disabled');
        noneGuests.setAttribute('disabled', 'disabled');
        break;
      case '2':
        threeGuests.setAttribute('disabled', 'disabled');
        noneGuests.setAttribute('disabled', 'disabled');
        break;
      case '3':
        noneGuests.setAttribute('disabled', 'disabled');
        break;
      case '100':
        capacity.value = noneGuests.value;
        oneGuest.setAttribute('disabled', 'disabled');
        twoGuests.setAttribute('disabled', 'disabled');
        threeGuests.setAttribute('disabled', 'disabled');
        break;
    }
  };

  type.addEventListener('change', typeChangeHandler);
  timeIn.addEventListener('change', timeInChangeHandler);
  timeOut.addEventListener('change', timeOutChangeHandler);
  roomNumber.addEventListener('change', roomNumberChangeHandler);
}());
