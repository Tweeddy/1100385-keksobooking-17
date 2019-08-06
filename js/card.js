'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  var closePopup = function () {
    removeCard();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var removeCard = function () {
    var oldCard = document.querySelector('.map__card');
    if (oldCard) {
      oldCard.parentNode.removeChild(oldCard);
    }
  };

  var generateCard = function (cardData) {
    removeCard();
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var card = cardTemplate.cloneNode(true);
    var photos = card.querySelector('.popup__photos');
    var img = photos.querySelector('.popup__photo');
    card.querySelector('.popup__title').textContent = cardData.offer.title;
    card.querySelector('.popup__text--address').textContent = cardData.offer.address;
    card.querySelector('.popup__text--price ').textContent = cardData.offer.price + ' ₽/ночь.';
    switch (cardData.offer.type) {
      case 'flat':
        card.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'bungalo':
        card.querySelector('.popup__type').textContent = 'Бунгало';
        break;
      case 'house':
        card.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'palace':
        card.querySelector('.popup__type').textContent = 'Дворец';
        break;
    }
    card.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests;
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ' , выезд до ' + cardData.offer.checkout;
    card.querySelector('.popup__features').textContent = cardData.offer.features.join();
    card.querySelector('.popup__description').textContent = cardData.offer.description;
    card.querySelector('.popup__avatar').src = cardData.author.avatar;
    for (var i = 0; i < cardData.offer.photos.length; i++) {
      img = photos.querySelector('.popup__photo').cloneNode(true);
      img.src = cardData.offer.photos[i];
      photos.appendChild(img);
    }
    photos.removeChild(photos.children[0]);
    return card;
  };

  var render = function (data) {
    map.insertBefore(generateCard(data), mapFiltersContainer);
  };

  window.card = {
    renderCard: function (data) {
      render(data);
      document.addEventListener('keydown', onPopupEscPress);
      var closeButton = document.querySelector('.popup__close');
      closeButton.addEventListener('click', closePopup);
    },
    removePopup: function () {
      removeCard();
    }
  };
}());

