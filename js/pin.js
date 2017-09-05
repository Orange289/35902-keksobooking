'use strict';

(function () {
  // Отрисовка пина

  var EL_WIDTH = 56;
  var EL_HEIGHT = 75;

  for (var i = 0; i < offers.length; i++) {
    var newPin = document.createElement('div');
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

  // Взаимодействие с пином

  var pin = map.querySelectorAll('.pin');
  var pinActiveClass = 'pin--active';
  var offerDialog = document.querySelector('.dialog');
  var dialogCLose = offerDialog.querySelector('.dialog__close');
  var hiddenClass = 'hidden';
  var clickedEl = null;

  var openDialog = function () {
    offerDialog.classList.remove(hiddenClass);
    document.addEventListener('keydown', window.util.onEscPress(e, closeDialog));
  };

  var closeDialog = function () {
    offerDialog.classList.add(hiddenClass);

    for (var q = 0; q < pin.length; q++) {
      window.util.removePinActive(pin[q], pinActiveClass);
    }
    document.removeEventListener('keydown', window.util.onEscPress(e, closeDialog));
  };

  // Open dialog

  var onPinClick = function (e) {
    if (clickedEl) {
      window.util.removePinActive(clickedEl, pinActiveClass);
    }

    clickedEl = e.currentTarget;
    window.util.addPinActive(clickedEl, pinActiveClass);

    var pinIndex = clickedEl.dataset.index;
    fillDialog(pinIndex);

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
      window.util.removePinActive(clickedEl, pinActiveClass);
    }
  };

  dialogCLose.addEventListener('click', onCloseClick);

  dialogCLose.addEventListener('keydown', function (e) {window.util.onEntPress(e, closeDialog)});

})()
