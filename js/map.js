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
var TYPE = ['flat', 'bungalo', 'house'];
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
  newPin.setAttribute('data-index', i);

  newPin.innerHTML = '<img src=' + elAva + ' class="rounded" width="40" height="40" tabindex="0">';

  fragment.appendChild(newPin);
}

map.appendChild(fragment);

var lodgeTitle = document.querySelector('.lodge__title');
var lodgeAddress = document.querySelector('.lodge__address');
var lodgePrice = document.querySelector('.lodge__price');
var lodgeType = document.querySelector('.lodge__type');
var lodgeGuests = document.querySelector('.lodge__rooms-and-guests');
var lodgeCheckin = document.querySelector('.lodge__checkin-time');
var lodgeFeatures = document.querySelector('.lodge__features');
var lodgeDescr = document.querySelector('.lodge__description');
var lodgeAva = document.querySelector('.dialog__title img');

var pin = map.querySelectorAll('.pin');
var pinActiveClass = 'pin--active';
var offerDialog = document.querySelector('.dialog');
var dialogCLose = offerDialog.querySelector('.dialog__close');
var hiddenClass = 'hidden';
var clickedEl = null;

var contentForOfferType = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом'
};

var fillDialog = function (d) {
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

var KEY_ENTER = 13;
var KEY_ESC = 27;

var openDialog = function () {
  offerDialog.classList.remove(hiddenClass);
  document.addEventListener('keydown', onEscPress);
};

var closeDialog = function () {
  offerDialog.classList.add(hiddenClass);

  for (var q = 0; q < pin.length; q++) {
    removePinActive(pin[q]);
  }
  document.removeEventListener('keydown', onEscPress);
};

var addPinActive = function (el) {
  el.classList.add(pinActiveClass);
};

var removePinActive = function (el) {
  el.classList.remove(pinActiveClass);
};

// Open dialog

var onPinClick = function (e) {
  if (clickedEl) {
    removePinActive(clickedEl);
  }

  clickedEl = e.currentTarget;
  addPinActive(clickedEl);

  var pinIndex = clickedEl.dataset.index;
  fillDialog(pinIndex);

  openDialog();
};

for (var p = 0; p < pin.length; p++) {
  pin[p].addEventListener('click', onPinClick);

  pin[p].addEventListener('keydown', function (e) {
    if (e.keyCode === KEY_ENTER) {
      onPinClick(e);
    }
  });
}

// Close dialog

var onCloseClick = function () {
  closeDialog();

  if (clickedEl) {
    removePinActive(clickedEl);
  }
};

dialogCLose.addEventListener('click', onCloseClick);

var onEscPress = function (e) {
  if (e.keyCode === KEY_ESC) {
    closeDialog();
  }
};

dialogCLose.addEventListener('keydown', function (e) {
  if (e.keykode === KEY_ENTER) {
    closeDialog();
  }
});


// Заполнение формы

var noticeForm = document.querySelector('.notice__form');
var address = noticeForm.elements.address;
var title = noticeForm.elements.title;
var timeIn = noticeForm.elements.timein;
var timeOut = noticeForm.elements.timeout;
var type = noticeForm.elements.type;
var price = noticeForm.elements.price;
var minPrice = [0, 1000, 5000, 10000];
var rooms = noticeForm.elements.rooms;
var guests = noticeForm.elements.capacity;
var roomsGuests = {
  '1': '1',
  '2': '2',
  '3': '3',
  '100': '0'
};
var formSubmit = noticeForm.querySelector('.form__submit');

noticeForm.reset();

var getTimeOut = function () {
  var timeSelIndex = timeIn.selectedIndex;
  timeOut.selectedIndex = timeSelIndex;
};

timeIn.onchange = getTimeOut;

var getMinPrice = function () {
  var typeSelIndex = type.selectedIndex;
  price.setAttribute('min', minPrice[typeSelIndex]);
  price.setAttribute('placeholder', minPrice[typeSelIndex]);
};

type.onchange = getMinPrice;

var getGuestsNumber = function () {
  for (var key in roomsGuests) {
    if (rooms.value === key) {
      guests.value = roomsGuests[key];
    }
  }
};

var getRoomsNumber = function () {
  for (var key in roomsGuests) {
    if (guests.value === roomsGuests[key]) {
      rooms.value = key;
    }
  }
};

rooms.onchange = getGuestsNumber;
guests.onchange = getRoomsNumber;

var setInvalidBorder = function (el) {
  if ((el.validity.valueMissing) || (el.validity.tooShort) || (el.validity.tooLong)) {
    el.setAttribute('style', 'border: 2px solid red;');
  } else {
    el.setAttribute('style', 'border: 1px solid #d9d9d3;');
  }
};

formSubmit.addEventListener('click', function () {
  address.addEventListener('invalid', setInvalidBorder(address));
  title.addEventListener('invalid', setInvalidBorder(title));
  price.addEventListener('invalid', setInvalidBorder(price));
});
