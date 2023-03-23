"use strict";

var formPostLogin = document.getElementById('formPostLogin');
var username = document.getElementById('formPostLogin').username;
var password = document.getElementById('formPostLogin').password;
var API = 'http://localhost/router/api/v1/users-login/';
formPostLogin.addEventListener('submit', function (e) {
  e.preventDefault();
  fetchPostLogin(API);
});
var fetchPostLogin = function fetchPostLogin(file) {
  fetch(file, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    alert(data);
    setTimeout(function () {
      window.location.href = 'http://localhost/router/';
    }, 500);
  })["catch"](function (err) {
    return alert(err);
  });
};