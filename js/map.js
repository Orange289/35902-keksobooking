'use strict';

var getRandom = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var similarAnnouncements = [
  {
    'author': {
      'avatar': 'img/avatars/user02.png'
    },

    'offer': {
      'title': 'Неуютное бунгало по колено в воде',
      'address': '' + location.x + ', ' + location.y + '',
      'price': 10001,
      'type': 'bungalo',
      'rooms': 2,
      'guests': 3,
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['wifi', 'washer', 'elevator'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': getRandom(300, 900),
      'y': getRandom(100, 500)
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user01.png'
    },

    'offer': {
      'title': 'Уютное бунгало далеко от моря',
      'address': '' + location.x + ', ' + location.y + '',
      'price': 235928,
      'type': 'bungalo',
      'rooms': 3,
      'guests': 6,
      'checkin': '13:00',
      'checkout': '14:00',
      'features': ['dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': getRandom(300, 900),
      'y': getRandom(100, 500)
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user03.png'
    },

    'offer': {
      'title': 'Некрасивый негостеприимный домик',
      'address': '' + location.x + ', ' + location.y + '',
      'price': 234551,
      'type': 'house',
      'rooms': 3,
      'guests': 3,
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['wifi', 'parking', 'washer', 'elevator'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': getRandom(300, 900),
      'y': getRandom(100, 500)
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user04.png'
    },

    'offer': {
      'title': 'Красивый гостевой домик',
      'address': '' + location.x + ', ' + location.y + '',
      'price': 58293,
      'type': 'house',
      'rooms': 4,
      'guests': 7,
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': getRandom(300, 900),
      'y': getRandom(100, 500)
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user05.png'
    },

    'offer': {
      'title': 'Маленький ужасный дворец',
      'address': '' + location.x + ', ' + location.y + '',
      'price': 1245,
      'type': 'house',
      'rooms': 5,
      'guests': 4,
      'checkin': '13:00',
      'checkout': '14:00',
      'features': ['dishwasher'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': getRandom(300, 900),
      'y': getRandom(100, 500)
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user06.png'
    },

    'offer': {
      'title': 'Огромный прекрасный дворец',
      'address': '' + location.x + ', ' + location.y + '',
      'price': 199999,
      'type': 'house',
      'rooms': 5,
      'guests': 10,
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'conditioner'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': getRandom(300, 900),
      'y': getRandom(100, 500)
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user07.png'
    },

    'offer': {
      'title': 'Маленькая неуютная квартира',
      'address': '' + location.x + ', ' + location.y + '',
      'price': 999999,
      'type': 'flat',
      'rooms': 1,
      'guests': 1,
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': getRandom(300, 900),
      'y': getRandom(100, 500)
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user08.png'
    },

    'offer': {
      'title': 'Большая уютная квартира',
      'address': '' + location.x + ', ' + location.y + '',
      'price': 12461,
      'type': 'flat',
      'rooms': 5,
      'guests': 4,
      'checkin': '13:00',
      'checkout': '14:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': getRandom(300, 900),
      'y': getRandom(100, 500)
    }
  }
];

var fragment = document.createDocumentFragment();
var map = document.querySelector('.tokyo__pin-map');

for (var i = 0; i < similarAnnouncements.length; i++) {
  var newPin = document.createElement('div');
  var EL_WIDTH = 56;
  var EL_HEIGHT = 75;
  var elX = similarAnnouncements[i].location.x - EL_WIDTH / 2;
  var elY = similarAnnouncements[i].location.y - EL_HEIGHT;
  var elAva = similarAnnouncements[i].author.avatar;

  newPin.className = 'pin';
  newPin.setAttribute('style', 'left:' + elX + 'px; top:' + elY + 'px;');
  newPin.innerHTML = '<img src=' + elAva + ' class="rounded" width="40" height="40">';

  fragment.appendChild(newPin);
}

map.appendChild(fragment);


var lodgeTemplate = document.querySelector('#lodge-template');
// var newDialog = lodgeTemplate.content.querySelector('.dialog__panel').cloneNode(true);
var mainAn = similarAnnouncements[0];
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
lodgePrice.textContent = mainAn.offer.price + '&#x20bd;/ночь';

if (mainAn.offer.type === 'flat') {
  lodgeType.textContent = 'Квартира';
} else if (mainAn.offer.type === 'bungalo') {
  lodgeType.textContent = 'Бунгало';
} else {
  lodgeType.textContent = 'Дом';
}

lodgeGuests.textContent = 'Для ' + mainAn.offer.guests + ' гостей в ' + mainAn.offer.rooms + ' комнатах';
lodgeCheckin.textContent = 'Заезд после ' + mainAn.offer.checkin + ', выезд до ' + mainAn.offer.checkout + '';

for (var j = 0; j < mainAn.offer.features.length; j++) {
  var feature = document.createElement('span');
  feature.className = 'feature__image';
}

lodgeDescr.textContent = mainAn.offer.description;
lodgeAva.setAttribute('src', mainAn.author.avatar);
