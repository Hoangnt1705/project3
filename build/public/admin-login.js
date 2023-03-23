"use strict";

var formPostLogin = document.getElementById('formPostLogin');
var username = document.getElementById('formPostLogin').username;
var password = document.getElementById('formPostLogin').password;
var API = 'http://localhost/router/api/v1/admin-login/';
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
    console.log(data);
    // localStorage.setItem('tokenAdmin', data.token);
    setTimeout(function () {
      window.location.href = 'http://localhost/router/admin-dashboard/';
    }, 500);
  })["catch"](function (err) {
    return alert(err);
  });
};
// const APITokenAdmin = 'http://localhost/router/admin-dashboard/'
// let getTokenAdmin = (file) => {
//     fetch(file, {
//         headers: {
//             'Authorization': `${localStorage.getItem('tokenAdmin')}`,
//             'Content-Type': 'application/json',
//         }
//     })
//         .then(response => console.log(response))
//         .catch(err => console.log(err));
// };
// APITokenAdmin(APITokenAdmin);