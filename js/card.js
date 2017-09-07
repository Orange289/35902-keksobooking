'use strict';

(function () {
  var lodgeTitle = document.querySelector('.lodge__title');
  var lodgeAddress = document.querySelector('.lodge__address');
  var lodgePrice = document.querySelector('.lodge__price');
  var lodgeType = document.querySelector('.lodge__type');
  var lodgeGuests = document.querySelector('.lodge__rooms-and-guests');
  var lodgeCheckin = document.querySelector('.lodge__checkin-time');
  var lodgeFeatures = document.querySelector('.lodge__features');
  var lodgeDescr = document.querySelector('.lodge__description');
  var lodgeAva = document.querySelector('.dialog__title img');

  var contentForOfferType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  window.fillDialog = function (d) {
    lodgeTitle.textContent = offers[d].offer.title;
    lodgeAddress.textContent = offers[d].offer.address;
    lodgePrice.innerHTML = offers[d].offer.price + '&#x20bd;/ночь';

    lodgeType.textContent = contentForOfferType[offers[d].offer.type];

    if ((offers[d].offer.guests === 1) && (offers[d].offer.rooms === 1)) {
      lodgeGuests.textContent = 'Для ' + offers[d].offer.guests + ' гостя в ' + offers[d].offer.rooms + ' комнатe';
    } else if (offers[d].offer.guests === 1) {
      lodgeGuests.textContent = 'Для ' + offers[d].offer.guests + ' гостя в ' + offers[d].offer.rooms + ' комнатах';
    } else if (offers[d].offer.rooms === 1) {
      lodgeGuests.textContent = 'Для ' + offers[d].offer.guests + ' гостей в ' + offers[d].offer.rooms + ' комнате';
    } else {
      lodgeGuests.textContent = 'Для ' + offers[d].offer.guests + ' гостей в ' + offers[d].offer.rooms + ' комнатах';
    }

    lodgeCheckin.textContent = 'Заезд после ' + offers[d].offer.checkin + ', выезд до ' + offers[d].offer.checkout + '';

    lodgeFeatures.innerHTML = '';

    for (var y = 0; y < offers[d].offer.features.length; y++) {
      var feature = '<span class="feature__image feature__image--' + offers[d].offer.features[y] + '"></span>';
      lodgeFeatures.innerHTML += feature;
    }

    lodgeDescr.textContent = offers[d].offer.description;
    lodgeAva.setAttribute('src', offers[d].author.avatar);

  };

})()
