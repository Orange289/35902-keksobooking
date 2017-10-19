'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  window.address = noticeForm.elements.address;
  var title = noticeForm.elements.title;
  var timeIn = noticeForm.elements.timein;
  var timeOut = noticeForm.elements.timeout;
  var type = noticeForm.elements.type;
  var price = noticeForm.elements.price;
  var minPrice = [0, 1000, 5000, 10000];
  var rooms = noticeForm.elements.rooms;
  var guests = noticeForm.elements.capacity;
  var roomsGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
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
        guests.value = roomsGuests[key][0];
      }
    }
  };

  var getRoomsNumber = function () {
    for (var key in roomsGuests) {
      if (roomsGuests[key].indexOf(guests.value) > -1) {
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
    window.address.addEventListener('invalid', setInvalidBorder(window.address));
    title.addEventListener('invalid', setInvalidBorder(title));
    price.addEventListener('invalid', setInvalidBorder(price));
  });
})()
