'use strict';
(function () {
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
  type.addEventListener('change', typeChangeHandler);
  timeIn.addEventListener('change', timeInChangeHandler);
  timeOut.addEventListener('change', timeOutChangeHandler);
}());
