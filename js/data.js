'use strict';

window.offers = [];

(function () {
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
    var masLength = window.util.getRandom(1, mas.length);
    var a = [];
    for (var t = 0; t < masLength; t++) {
      a.push(mas[t]);
    }
    return a;
  };

  var TITLE = ['Неуютное бунгало по колено в воде', 'Уютное бунгало далеко от моря', 'Некрасивый негостеприимный домик', 'Красивый гостевой домик', 'Маленький ужасный дворец', 'Огромный прекрасный дворец', 'Маленькая неуютная квартира', 'Большая уютная квартира'];
  var PRICE = window.util.getRandom(1000, 1000000);
  var TYPE = ['flat', 'bungalo', 'house'];
  var ROOMS = window.util.getRandom(1, 5);
  var GUESTS = window.util.getRandom(1, 10);
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTION = '';
  var PHOTOS = [];

  for (var index = 0; index < 8; index++) {

    var locationX = window.util.getRandom(300, 900);
    var locationY = window.util.getRandom(100, 500);
    var typeIndex = window.util.getRandom(0, 2);
    var chechinIndex = window.util.getRandom(0, 2);
    var checkoutIndex = window.util.getRandom(0, 2);

    window.offers.push({
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
})()
