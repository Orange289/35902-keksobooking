'use strict';

(function () {
  var KEY_ENTER = 13;
  var KEY_ESC = 27;

  window.util = {
    getRandom : function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },

    onEscPress : function (e, action) {
      if (e.keyCode === KEY_ESC) {
        action();
      }
    },

    onEntPress : function (e, action) {
      if (e.keykode === KEY_ENTER) {
        action();
      }
    },

    addPinActive : function (el, activeClass) {
      el.classList.add(activeClass);
    },

    removePinActive : function (el, activeClass) {
      el.classList.remove(activeClass);
    }

  }

})()
