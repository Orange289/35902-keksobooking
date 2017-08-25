'use strict';

var getRandom = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var location = {
  x: getRandom(300, 900),
  y: getRandom(100,500)
}

var AVATAR = ['img/avatars/user02.png', 'img/avatars/user01.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLE = ['Неуютное бунгало по колено в воде', 'Уютное бунгало далеко от моря', 'Некрасивый негостеприимный домик', 'Красивый гостевой домик', 'Маленький ужасный дворец', 'Огромный прекрасный дворец', 'Маленькая неуютная квартира', 'Большая уютная квартира'];
var ADDRESS = '' + location.x + ', ' + location.y + '';
var PRICE = getRandom(1000, 1000000);
var TYPE = ['bungalo', 'bungalo', 'house', 'house', 'house', 'house', 'flat', 'flat'];
var ROOMS = getRandom(1, 5);
var GUESTS = getRandom(1, 10);
var CHECKIN = ['12:00', '13:00', '14:00', '12:00', '13:00', '14:00', '12:00', '13:00'];
var CHECKOUT = ['12:00', '13:00', '14:00', '12:00', '13:00', '14:00', '12:00', '13:00'];
var FEATURES = [
  ['wifi', 'washer', 'elevator'],
  ['dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  ['wifi', 'parking', 'washer', 'elevator'],
  ['dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  ['wifi', 'parking', 'washer', 'elevator'],
  ['wifi', 'dishwasher', 'parking', 'washer', 'conditioner'],
  ['wifi', 'dishwasher'],
  ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
];
var DESCRIPTION = '';
var PHOTOS = [];

var offers = [];

for (var index = 0; index < 8; index++) {
  offers.push({
    author: {
      avatar: AVATAR[index]
    },
    offer: {
      title: TITLE[index],
      address: ADDRESS[index],
      price: PRICE,
      type: TYPE[index],
      rooms: ROOMS,
      guests: GUESTS,
      checkin: CHECKIN[index],
      checkout: CHECKOUT[index],
      features: FEATURES[index],
      description: DESCRIPTION,
      photos: PHOTOS
    },
    location: location
  })
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


var lodgeTemplate = document.querySelector('#lodge-template');
// var newDialog = lodgeTemplate.content.querySelector('.dialog__panel').cloneNode(true);
var mainAn = offers[0];
// var currentDialog = document.querySelector('.dialog__panel');

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

lodgeGuests.textContent = 'Для ' + mainAn.offer.guests + ' гостей в ' + mainAn.offer.rooms + ' комнатах';
lodgeCheckin.textContent = 'Заезд после ' + mainAn.offer.checkin + ', выезд до ' + mainAn.offer.checkout + '';

lodgeFeatures.innerHTML = '';

for (var j = 0; j < mainAn.offer.features.length; j++) {
  var feature = '<span class="feature__image feature__image--' + mainAn.offer.features[j] + '"></span>';
  lodgeFeatures.innerHTML += feature;
}

lodgeDescr.textContent = mainAn.offer.description;
lodgeAva.setAttribute('src', mainAn.author.avatar);
