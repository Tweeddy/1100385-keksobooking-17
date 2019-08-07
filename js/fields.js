'use strict';
(function () {
  var notice = document.querySelector('.notice');
  var form = notice.querySelector('.ad-form');
  var pricePerNight = form.querySelector('#price');
  var type = form.querySelector('#type');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var oneGuest = form.querySelector('#one');
  var twoGuests = form.querySelector('#two');
  var threeGuests = form.querySelector('#three');
  var noneGuests = form.querySelector('#none');
  var resetButton = document.querySelector('.ad-form__reset');
  var Price = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var typeChangeHandler = function (evt) {
    switch (evt.target.value) {
      case 'bungalo':
        pricePerNight.min = Price.BUNGALO;
        pricePerNight.placeholder = Price.BUNGALO;
        break;
      case 'flat':
        pricePerNight.min = Price.FLAT;
        pricePerNight.placeholder = Price.FLAT;
        break;
      case 'house':
        pricePerNight.min = Price.HOUSE;
        pricePerNight.placeholder = Price.HOUSE;
        break;
      case 'palace':
        pricePerNight.min = Price.PALACE;
        pricePerNight.placeholder = Price.PALACE;
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
      options[i].disabled = false;
    }
  };
  twoGuests.disabled = true;
  threeGuests.disabled = true;
  noneGuests.disabled = true;

  var roomNumberChangeHandler = function (evt) {
    reset();
    switch (evt.target.value) {
      case '1':
        twoGuests.disabled = true;
        threeGuests.disabled = true;
        noneGuests.disabled = true;
        break;
      case '2':
        threeGuests.disabled = true;
        noneGuests.disabled = true;
        break;
      case '3':
        noneGuests.disabled = true;
        break;
      case '100':
        capacity.value = noneGuests.value;
        oneGuest.disabled = true;
        twoGuests.disabled = true;
        threeGuests.disabled = true;
        break;
    }
  };
  var closePopupSuccess = function () {
    var successCard = document.querySelector('.success');
    if (successCard) {
      successCard.remove();
    }
    document.removeEventListener('click', closePopupSuccess);
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var onSuccessEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopupSuccess);
  };

  var successWindow = function () {
    var successBlock = document.querySelector('#success').content.querySelector('.success');
    var successModule = successBlock.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(successModule);
  };
  var onSuccess = function () {
    window.setup.inActiveHandler();
    successWindow();
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', closePopupSuccess);

  };
  type.addEventListener('change', typeChangeHandler);
  timeIn.addEventListener('change', timeInChangeHandler);
  timeOut.addEventListener('change', timeOutChangeHandler);
  roomNumber.addEventListener('change', roomNumberChangeHandler);
  resetButton.addEventListener('click', window.setup.inActiveHandler);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), onSuccess, window.setup.errorHandler);
  });
}());
