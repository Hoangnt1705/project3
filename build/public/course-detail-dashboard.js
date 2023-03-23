"use strict";

var updateRoute = document.querySelectorAll('.updateCourse');
var idUpdate = document.querySelectorAll('.idUpdate');
var API = 'http://localhost/router/admin-dashboard/course-detail/update/';
var _loop = function _loop(i) {
  updateRoute[i].addEventListener('click', function (e) {
    e.preventDefault();
    var id = idUpdate[i].innerText;
    var idAll = API + id;
    window.location.href = idAll;
  });
};
for (var i = 0; i < updateRoute.length; i++) {
  _loop(i);
}