'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var map = document.querySelector('.tokyo__pin-map');
  var pin = map.querySelectorAll('.pin');

  // Отрисовка пина

  window.drawPins = function (mas) {
    var EL_WIDTH = 56;
    var EL_HEIGHT = 75;

    for (var i = 0; i < mas.length; i++) {
      var newPin = document.createElement('div');
      var elX = mas[i].location.x - EL_WIDTH / 2;
      var elY = mas[i].location.y - EL_HEIGHT;
      var elAva = mas[i].author.avatar;

      newPin.className = 'pin';
      newPin.setAttribute('style', 'left:' + elX + 'px; top:' + elY + 'px;');
      newPin.setAttribute('data-index', i);

      newPin.innerHTML = '<img src=' + elAva + ' class="rounded" width="40" height="40" tabindex="0">';

      fragment.appendChild(newPin);
    }

    map.appendChild(fragment);
  }

  // Взаимодействие с пином

  var pinActiveClass = 'pin--active';
  var offerDialog = document.querySelector('.dialog');
  var dialogCLose = offerDialog.querySelector('.dialog__close');
  var hiddenClass = 'hidden';
  var clickedEl = null;

  var addPinActive = function (el) {
    el.classList.add(pinActiveClass);
  };

  var removePinActive = function (el) {
    el.classList.remove(pinActiveClass);
  };

  var openDialog = function () {
    offerDialog.classList.remove(hiddenClass);
    document.addEventListener('keydown', function(e) {window.util.onEscPress(e, closeDialog)});
  };

  var closeDialog = function () {
    offerDialog.classList.add(hiddenClass);

    for (var q = 0; q < pin.length; q++) {
      removePinActive(pin[q]);
    }
    document.removeEventListener('keydown', function (e) {window.util.onEscPress(e, closeDialog)});
  };


  // Open dialog

  var onPinClick = function (e) {
    if (clickedEl) {
      removePinActive(clickedEl);
    }

    clickedEl = e.currentTarget;
    addPinActive(clickedEl);

    var pinIndex = clickedEl.dataset.index;
    window.fillDialog(pinIndex);

    openDialog();
  };

  for (var p = 0; p < pin.length; p++) {
    pin[p].addEventListener('click', onPinClick);
    pin[p].addEventListener('keydown', function (e) {window.util.onEntPress(e, onPinClick(e))});
  }

  // Close dialog

  var onCloseClick = function () {
    closeDialog();

    if (clickedEl) {
      removePinActive(clickedEl);
    }
  };

  dialogCLose.addEventListener('click', onCloseClick);

  dialogCLose.addEventListener('keydown', function (e) {window.util.onEntPress(e, closeDialog)});

})()
