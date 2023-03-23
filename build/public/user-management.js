"use strict";

var updateUser = document.querySelectorAll('.updateUser');
var idUpdate = document.querySelectorAll('.idUpdate');
var API = 'http://localhost/router/admin-dashboard/user-management/';
var _loop = function _loop(i) {
  updateUser[i].addEventListener('click', function (e) {
    e.preventDefault();
    var id = idUpdate[i].innerText;
    var idAll = API + id;
    window.location.href = idAll;
  });
};
for (var i = 0; i < updateUser.length; i++) {
  _loop(i);
}