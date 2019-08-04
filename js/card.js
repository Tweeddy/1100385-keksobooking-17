'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.cloneNode(true);
  var card = cardTemplate.querySelector('.popup');
  var closeButton = cardTemplate.querySelector('.popup__close');
  var photos = cardTemplate.querySelector('.popup__photos');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    card.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  closeButton.addEventListener('click', function () {
    closePopup();
  });
  window.card = {
    removePhotos: function () {
      var allPhotos = document.querySelectorAll('.popup__photo');
      for (var i = 1; i < allPhotos.length; i++) {
        photos.removeChild(photos.lastChild);
      }
    },
    generateCard: function (cardData) {
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
      this.removePhotos();
      for (var i = 0; i < cardData.offer.photos.length; i++) {
        var img = photos.querySelector('img').cloneNode(true);
        img.src = cardData.offer.photos[i];
        photos.appendChild(img);
      }
      photos.removeChild(photos.children[0]);
      return card;
    },
    renderCard: function (data) {
      map.insertBefore(window.card.generateCard(data), mapFiltersContainer);
      document.addEventListener('keydown', onPopupEscPress);
    }
  };
}());

