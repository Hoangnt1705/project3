"use strict";

var APICourse = 'http://localhost/router/course/';
var itemRoute = document.querySelectorAll('.itemRoute');
var idRoute = document.querySelectorAll('.idRoute');
var _loop = function _loop(i) {
  itemRoute[i].addEventListener('click', function (e) {
    e.preventDefault();
    var id = idRoute[i].innerText;
    var idAll = APICourse + id;
    window.location.href = idAll;
  });
};
for (var i = 0; i < itemRoute.length; i++) {
  _loop(i);
}
setTimeout(function () {
  var nestedLoading = document.getElementById('nestedLoading');
  var spinHomeFirst = document.getElementById('spinHomeFirst');
  var spinnerCourse = document.createElement('div');
  spinnerCourse.setAttribute('id', 'spinnerCourse');
  spinnerCourse.innerHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
  nestedLoading.append(spinnerCourse);
  return setTimeout(function () {
    spinHomeFirst.style.display = 'block';
    spinnerCourse.remove();
  }, 1000);
}, 1);