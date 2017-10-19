'use strict';

(function () {
  window.drawPins(window.offers);
  window.actionsPin();

  var pinMain = window.map.querySelector('.pin__main');
  var pinMainWidth = pinMain.offsetWidth;
  var pinMainHeight = pinMain.offsetHeight;

  window.tokyo = document.querySelector('.tokyo');
  var MIN_X_SHIFT = 116;
  var minX = window.tokyo.offsetLeft;
  var minY = window.tokyo.offsetTop + MIN_X_SHIFT;
  var maxX = window.tokyo.offsetWidth;
  var maxY = window.tokyo.offsetHeight;

  pinMain.addEventListener('mousedown', function (e) {
    e.preventDefault();

    var startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var xShift = pinMain.offsetLeft + pinMainWidth / 2;
      var yShift = pinMain.offsetTop + pinMainHeight;

      if (xShift < minX) {
        pinMain.style.left = minX - pinMainWidth + 'px';
      } else if (xShift > maxX) {
        pinMain.style.left = maxX - pinMainWidth + 'px';
      }
      else if (yShift < minY) {
        pinMain.style.top = minY + 'px';
      } else if (yShift > maxY) {
        pinMain.style.top = maxY - pinMainHeight + 'px';
      }

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

      window.address.value = 'x:' + xShift + ', y:' + yShift + '';

    }

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})()
