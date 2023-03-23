"use strict";

//toast 
function toast(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$message = _ref.message,
    message = _ref$message === void 0 ? '' : _ref$message,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'info' : _ref$type,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 3000 : _ref$duration;
  var main = document.getElementById('toast');
  if (main) {
    var _toast = document.createElement('div');
    //auto remove toast
    var autoRemovedId = setTimeout(function () {
      main.removeChild(_toast);
    }, duration + 1000);
    //remove toast when click
    _toast.onclick = function (e) {
      if (e.target.closest('.toast_close')) {
        main.removeChild(_toast);
        clearTimeout(autoRemovedId);
      }
    };
    var icons = {
      success: 'fa-solid fa-circle-check',
      info: 'fa-solid fa-circle-check',
      warning: 'fa-solid fa-circle-exclamation',
      error: 'fa-solid fa-circle-exclamation'
    };
    var icon = icons[type];
    var delay = (duration / 1000).toFixed(2);
    _toast.classList.add('toast', "toast-".concat(type));
    _toast.style.animation = "slineInleft ease 1s, fadeOut linear 1s ".concat(delay, "s forwards");
    _toast.innerHTML = " <div class=\"toast_icon\">\n            <i class=\"".concat(icon, "\"></i>\n        </div>\n        <div class=\"toast_body\"> \n            <h3 class=\"toast_title\"> ").concat(title, "</h3>\n            <p class=\"toast_msg\">").concat(message, "</p>\n        </div>\n        <div class=\"toast_close\">\n            <i class=\"fa-sharp fa-solid fa-circle-xmark\"></i>\n        </div>");
    main.appendChild(_toast);
  }
}
var showSuccess = function showSuccess(text) {
  toast({
    title: 'Thành công',
    message: text,
    type: 'success',
    duration: 3000
  });
};
var showError = function showError(text) {
  toast({
    title: 'Thất bại',
    message: text,
    type: 'warning',
    duration: 3000
  });
};