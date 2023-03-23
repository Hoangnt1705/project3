"use strict";

var APITokenAdmin = 'http://localhost/router/admin-dashboard/';
var getTokenAdmin = function getTokenAdmin(file) {
  fetch(file, {
    headers: {
      'Authorization': "".concat(localStorage.getItem('tokenAdmin')),
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    return console.log(response);
  })["catch"](function (err) {
    return console.log(err);
  });
};
getTokenAdmin(APITokenAdmin);