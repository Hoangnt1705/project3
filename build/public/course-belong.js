"use strict";

var API = 'http://localhost/router/course-detail/';
var level = document.querySelectorAll('.level');
var color = document.querySelectorAll('.color');
var itemCourse = document.querySelectorAll('.itemCourse');
var idCourse = document.querySelectorAll('.idCourse');
var _loop = function _loop(i) {
  itemCourse[i].addEventListener('click', function (e) {
    e.preventDefault();
    var id = idCourse[i].innerText;
    var idAll = API + id;
    window.location.href = idAll;
  });
};
for (var i = 0; i < itemCourse.length; i++) {
  _loop(i);
}
;
for (var _i = 0; _i < level.length; _i++) {
  if (level[_i].value === 'Normal') {
    color[_i].style.width = '30%';
    color[_i].style.background = '#95FF39';
  } else if (level[_i].value === 'Intermediate') {
    color[_i].style.width = '65%';
    color[_i].style.background = '#ff0';
  } else if (level[_i].value === 'Advanced') {
    color[_i].style.width = '100%';
    color[_i].style.background = '#FF0000';
  }
  ;
}
;
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