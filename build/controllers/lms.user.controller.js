"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var _require = require('../utils/database.js'),
  db = _require.db;
var _require2 = require('../models/lms.user.model.js'),
  modelUserRegister = _require2.modelUserRegister,
  modelUserLogin = _require2.modelUserLogin,
  routeStudyGetModel = _require2.routeStudyGetModel,
  courseGetModel = _require2.courseGetModel,
  controlPanelGetModel = _require2.controlPanelGetModel,
  modelHome = _require2.modelHome,
  modelAdminLogin = _require2.modelAdminLogin,
  modelHomeAdmin = _require2.modelHomeAdmin;
module.exports.userRegister = function (req, res, next) {
  var _req$body = req.body,
    email = _req$body.email,
    username = _req$body.username,
    password = _req$body.password,
    confirmPassword = _req$body.confirmPassword,
    role = _req$body.role;
  console.log(email, username, password, confirmPassword, role);
  return modelUserRegister(email, username, password, confirmPassword, role, req, res, next);
};
module.exports.userLogin = function (req, res, next) {
  var _req$body2 = req.body,
    username = _req$body2.username,
    password = _req$body2.password;
  findUser(username, function (err, user) {
    if (err) {
      // If there is an error, render the login form with an error message
      res.render('login.ejs', {
        error: 'An error occurred. Please try again later'
      });
    } else if (!user) {
      // If no user with the matching username is found, render the login form with an error message
      res.render('login.ejs', {
        error: 'Invalid username or password'
      });
    } else {
      return modelUserLogin(user, password, req, res, next);
    }
  });
};
module.exports.controlPanelGet = function (req, res) {
  var idUserMatchAccount = req.user.id;
  var putInfoAccount = 'Verify successfully';
  return controlPanelGetModel(req, res, idUserMatchAccount, putInfoAccount);
};
module.exports.courseGet = function (req, res) {
  return courseGetModel(req, res);
};
module.exports.routeStudyGet = function (req, res) {
  var putInfoAccount = 'Verify successfully';
  return routeStudyGetModel(req, res, putInfoAccount);
};
// login của admin
module.exports.adminLogin = function (req, res, next) {
  var _req$body3 = req.body,
    username = _req$body3.username,
    password = _req$body3.password;
  findAdmin(username, function (err, user) {
    if (err) {
      // If there is an error, render the login form with an error message
      res.render('admin-login.ejs', {
        error: 'An error occurred. Please try again later'
      });
    } else if (!user) {
      // If no user with the matching username is found, render the login form with an error message
      res.render('admin-login.ejs', {
        error: 'Invalid username or password'
      });
    } else {
      return modelAdminLogin(user, password, req, res, next);
    }
  });
};
module.exports.home = function (req, res) {
  return modelHome(req, res);
};
module.exports.homeAdmin = function (req, res) {
  return modelHomeAdmin(req, res);
};
//function callback
var findUser = function findUser(username, callback) {
  db.execute('select * from users where username = ?', [username]).then(function (response) {
    var _response = _slicedToArray(response, 1),
      rows = _response[0];
    var user = rows.find(function (element) {
      return element.username === username;
    });
    if (user && user.role === 'user') {
      console.log(user);
      return callback(null, response[0]);
    }
    return callback(null, null);
  })["catch"](function (err) {
    console.log(err);
    return callback(err, null);
  });
};
// validate của admin
var findAdmin = function findAdmin(username, callback) {
  db.execute('select * from users where username = ?', [username]).then(function (response) {
    var _response2 = _slicedToArray(response, 1),
      rows = _response2[0];
    var user = rows.find(function (element) {
      return element.username === username;
    });
    if (user && user.role === 'admin') {
      console.log(user);
      return callback(null, response[0]);
    }
    return callback(null, null);
  })["catch"](function (err) {
    console.log(err);
    return callback(err, null);
  });
};