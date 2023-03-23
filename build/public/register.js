"use strict";

var formPostRegister = document.getElementById('formPostRegister');
var email = document.getElementById('formPostRegister').email;
var username = document.getElementById('formPostRegister').username;
var password = document.getElementById('formPostRegister').password;
var role = document.getElementById('formPostRegister').role;
var confirmPassword = document.getElementById('formPostRegister').confirmPassword;
var API = 'http://localhost/router/api/v1/admin-register';
console.log(email);
formPostRegister.addEventListener('submit', function (e) {
  e.preventDefault();
  fetchPostRegister(API);
});
var fetchPostRegister = function fetchPostRegister(file) {
  fetch(file, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      username: username.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      role: role.value
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    window.location.href = 'http://localhost/router/admin-dashboard/user-management';
  })["catch"](function (err) {
    return console.log(err);
  });
};