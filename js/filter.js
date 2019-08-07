'use strict';

(function () {
  var data;
  var filters = document.querySelector('.map__filters');
  var selects = filters.querySelectorAll('select');
  var field = filters.querySelector('fieldset');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = filters.querySelectorAll('.map__checkbox');

  var HousingPriceMap = {
    middle: {
      min: 10000,
      max: 50000
    },
    low: {
      min: 0,
      max: 10000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  function filterByType(pin) {
    return (
      housingType.value === 'any' ||
      pin.offer.type === housingType.value
    );
  }

  function filterByPrice(pin) {
    var price = housingPrice.value;
    var limit = HousingPriceMap[price];
    return (
      price === 'any' ||
      (pin.offer.price >= limit.min && pin.offer.price < limit.max)
    );
  }

  function filterByHousingRoomsCount(pin) {
    return (
      housingRooms.value === 'any' ||
      pin.offer.rooms.toString() === housingRooms.value
    );
  }

  function filterByHousingGuestsCount(pin) {
    return (
      housingGuests.value === 'any' ||
      pin.offer.guests.toString() === housingGuests.value
    );
  }

  function getCheckedElements(array) {
    var newArray = [];

    array.forEach(function (item) {
      if (item.checked) {
        newArray.push(item);
      }
    });

    return newArray;
  }

  function filterByFeatures(item) {
    var features = getCheckedElements(housingFeatures);

    for (var i = 0; i < features.length; i++) {
      if (item.offer.features.indexOf(features[i].value) === -1) {
        return false;
      }
    }
    return true;
  }
  var filtersChangeHandler = function () {
    window.card.remove();
    window.filters.filterPins(data);
  };

  filters.addEventListener('change', filtersChangeHandler);

  window.filters = {
    active: function () {
      field.disabled = false;
      for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = false;
      }
      filters.classList.add('.ad-form--disabled');
    },
    inactive: function () {
      field.disabled = true;
      for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = true;
      }
      filters.classList.add('.ad-form--disabled');
    },
    filterPins: function (pins) {
      data = pins;
      var selected = data.filter(function (pin) {
        return (
          filterByType(pin) &&
          filterByPrice(pin) &&
          filterByHousingRoomsCount(pin) &&
          filterByHousingGuestsCount(pin) &&
          filterByFeatures(pin)
        );
      });
      window.utils.debounce(function () {
        window.data.render(selected);
      });
    }
  };
})();
