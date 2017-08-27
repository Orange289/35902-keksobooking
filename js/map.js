'use strict';

var getRandom = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var getAddress = function (x, y) {
  var addr = '' + x + ', ' + y + '';
  return addr;
};

var getAvatar = function (num) {
  var ava = 'img/avatars/user0' + num + '.png';
  return ava;
};

var avatars = [];

for (var k = 0; k < 8; k++) {

  avatars.push(getAvatar(k + 1));

}

var getFeatures = function (mas) {
  var masLength = getRandom(1, mas.length);
  var a = [];
  for (var t = 0; t < masLength; t++) {
    a.push(mas[t]);
  }
  return a;
};

var TITLE = ['Неуютное бунгало по колено в воде', 'Уютное бунгало далеко от моря', 'Некрасивый негостеприимный домик', 'Красивый гостевой домик', 'Маленький ужасный дворец', 'Огромный прекрасный дворец', 'Маленькая неуютная квартира', 'Большая уютная квартира'];
var PRICE = getRandom(1000, 1000000);
var TYPE = ['bungalo', 'house', 'flat'];
var ROOMS = getRandom(1, 5);
var GUESTS = getRandom(1, 10);
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = '';
var PHOTOS = [];

var offers = [];

for (var index = 0; index < 8; index++) {

  var locationX = getRandom(300, 900);
  var locationY = getRandom(100, 500);
  var typeIndex = getRandom(0, 2);
  var chechinIndex = getRandom(0, 2);
  var checkoutIndex = getRandom(0, 2);

  offers.push({
    author: {
      avatar: avatars[index]
    },
    offer: {
      title: TITLE[index],
      address: getAddress(locationX, locationY),
      price: PRICE,
      type: TYPE[typeIndex],
      rooms: ROOMS,
      guests: GUESTS,
      checkin: CHECKIN[chechinIndex],
      checkout: CHECKOUT[checkoutIndex],
      features: getFeatures(FEATURES),
      description: DESCRIPTION,
      photos: PHOTOS
    },
    location: {
      x: locationX,
      y: locationY
    }
  });
}

var fragment = document.createDocumentFragment();
var map = document.querySelector('.tokyo__pin-map');

for (var i = 0; i < offers.length; i++) {
  var newPin = document.createElement('div');
  var EL_WIDTH = 56;
  var EL_HEIGHT = 75;
  var elX = offers[i].location.x - EL_WIDTH / 2;
  var elY = offers[i].location.y - EL_HEIGHT;
  var elAva = offers[i].author.avatar;

  newPin.className = 'pin';
  newPin.setAttribute('style', 'left:' + elX + 'px; top:' + elY + 'px;');
  newPin.innerHTML = '<img src=' + elAva + ' class="rounded" width="40" height="40">';

  fragment.appendChild(newPin);
}

map.appendChild(fragment);

var mainAn = offers[0];

var lodgeTitle = document.querySelector('.lodge__title');
var lodgeAddress = document.querySelector('.lodge__address');
var lodgePrice = document.querySelector('.lodge__price');
var lodgeType = document.querySelector('.lodge__type');
var lodgeGuests = document.querySelector('.lodge__rooms-and-guests');
var lodgeCheckin = document.querySelector('.lodge__checkin-time');
var lodgeFeatures = document.querySelector('.lodge__features');
var lodgeDescr = document.querySelector('.lodge__description');
var lodgeAva = document.querySelector('.dialog__title img');

lodgeTitle.textContent = mainAn.offer.title;
lodgeAddress.textContent = mainAn.offer.address;
lodgePrice.innerHTML = mainAn.offer.price + '&#x20bd;/ночь';

if (mainAn.offer.type === 'flat') {
  lodgeType.textContent = 'Квартира';
} else if (mainAn.offer.type === 'bungalo') {
  lodgeType.textContent = 'Бунгало';
} else {
  lodgeType.textContent = 'Дом';
}

if ((mainAn.offer.guests === 1) && (mainAn.offer.rooms === 1)) {
  lodgeGuests.textContent = 'Для ' + mainAn.offer.guests + ' гостя в ' + mainAn.offer.rooms + ' комнатe';
} else if (mainAn.offer.guests === 1) {
  lodgeGuests.textContent = 'Для ' + mainAn.offer.guests + ' гостя в ' + mainAn.offer.rooms + ' комнатах';
} else if (mainAn.offer.rooms === 1) {
  lodgeGuests.textContent = 'Для ' + mainAn.offer.guests + ' гостей в ' + mainAn.offer.rooms + ' комнате';
} else {
  lodgeGuests.textContent = 'Для ' + mainAn.offer.guests + ' гостей в ' + mainAn.offer.rooms + ' комнатах';
}

lodgeCheckin.textContent = 'Заезд после ' + mainAn.offer.checkin + ', выезд до ' + mainAn.offer.checkout + '';

lodgeFeatures.innerHTML = '';

for (var j = 0; j < mainAn.offer.features.length; j++) {
  var feature = '<span class="feature__image feature__image--' + mainAn.offer.features[j] + '"></span>';
  lodgeFeatures.innerHTML += feature;
}

lodgeDescr.textContent = mainAn.offer.description;
lodgeAva.setAttribute('src', mainAn.author.avatar);
