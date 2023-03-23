"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var bcrypt = require('bcrypt');
var _require = require('../utils/database.js'),
  db = _require.db;
var jwt = require('jsonwebtoken');
var secret = 'secret';
module.exports.courseGetModel = function (req, res) {
  return db.execute('select * from course').then(function (response) {
    var _response = _slicedToArray(response, 1),
      dataCourse = _response[0];
    console.log(dataCourse);
    var idUserMatchAccount = req.user.id;
    var putInfoAccount = 'Verify successfully';
    return db.execute('SELECT * FROM users WHERE id = ?', [idUserMatchAccount]).then(function (response) {
      var _response2 = _slicedToArray(response, 1),
        dataUser = _response2[0];
      console.log(dataUser);
      return res.render('course.ejs', {
        dataCourse: dataCourse,
        putInfoAccount: putInfoAccount,
        dataUser: dataUser
      });
    })["catch"](function (err) {
      return res.status(404).json({
        error: err,
        message: err.message
      });
    });
  })["catch"](function (err) {
    return res.status(404).json({
      err: err,
      message: 'Not found'
    });
  });
};
module.exports.controlPanelGetModel = function (req, res, idUserMatchAccount, putInfoAccount) {
  return db.execute('SELECT * FROM users WHERE id = ?', [idUserMatchAccount]).then(function (response) {
    var _response3 = _slicedToArray(response, 1),
      dataUser = _response3[0];
    console.log(dataUser);
    return res.render('control-panel.ejs', {
      putInfoAccount: putInfoAccount,
      dataUser: dataUser
    });
  })["catch"](function (err) {
    return res.status(404).json({
      error: err,
      message: err.message
    });
  });
};
module.exports.routeStudyGetModel = function (req, res, putInfoAccount) {
  return db.execute('select * from route_study order by date_up desc').then(function (response) {
    var _response4 = _slicedToArray(response, 1),
      dataRoute = _response4[0];
    var idUserMatchAccount = req.user.id;
    return db.execute('SELECT * FROM users WHERE id = ?', [idUserMatchAccount]).then(function (response) {
      var _response5 = _slicedToArray(response, 1),
        dataUser = _response5[0];
      console.log(dataUser);
      return res.render('route-study.ejs', {
        putInfoAccount: putInfoAccount,
        dataRoute: dataRoute,
        dataUser: dataUser
      });
    })["catch"](function (err) {
      return res.status(404).json({
        error: err,
        message: err.message
      });
    });
  })["catch"](function (err) {
    return res.status(404).json({
      err: err,
      message: 'Not found'
    });
  });
};
module.exports.modelUserRegister = function (email, username, password, confirmPassword, role, req, res, next) {
  return db.execute('select * from users').then(function (response) {
    var _response6 = _slicedToArray(response, 1),
      rows = _response6[0];
    var userCount = rows.length + 1;
    if (!validatePassword(password, confirmPassword)) {
      //If the password do not match, render the form with an error message
      res.render('register.ejs', {
        error: 'Password do not match'
      });
    } else if (validateUsername(username, rows)) {
      console.log({
        error: 'Username duplicated'
      });
    }
    if (!validateUsername(username, rows) && validatePassword(password, confirmPassword)) {
      // If the form data is valid, hash the password
      bcrypt.hash(password, 10).then(function (hashedPassword) {
        // If the password is hashed successfully, store the email, hashed 
        // password, and role in the database 
        if (role === 'admin') {
          console.log('role', role, userCount, username, email, hashedPassword);
          return storeAdmin(userCount, username, email, hashedPassword, role, req, res);
        }
        return storeUser(userCount, username, email, hashedPassword, role, req, res);
      });
      // req.session.userId = userCount;
    }
  })["catch"](function (err) {
    next(err);
  });
};
module.exports.modelUserLogin = function (user, password, req, res) {
  // If a user with the matching username is found, compare the provided password to stored hash password
  console.log(user[0].role);
  return bcrypt.compare(password, user[0].password).then(function (response) {
    // If the password match, set a cookie with the user's id and redirect to the dashboard 
    if (response) {
      var token = jwt.sign({
        id: user[0].id,
        name: user[0].username
      }, secret, {
        expiresIn: '7d'
      });
      res.cookie('tokenUser', token, {
        httpOnly: true,
        secure: true,
        maxAge: 604800000
      }).json('success');
      // req.session.LoginId = user[0].id;
    } else {
      // If the password do not match, render the login form with an error message
      res.render('login.ejs', {
        error: 'Invalid email or password'
      });
    }
  })["catch"](function (err) {
    return console.log(err);
  });
};
// đây là login của admin
module.exports.modelAdminLogin = function (user, password, req, res) {
  // If a user with the matching username is found, compare the provided password to stored hash password
  return bcrypt.compare(password, user[0].password).then(function (response) {
    // If the password match, set a cookie with the user's id and redirect to the dashboard 
    if (response) {
      var token = jwt.sign({
        id: user[0].id,
        name: user[0].username,
        iat: Math.floor(Date.now() / 1000) - 30
      }, secret, {
        expiresIn: '7d'
      });
      res.cookie('tokenAdmin', token, {
        httpOnly: true,
        secure: true,
        maxAge: 604800000
      }).json({
        token: token
      });
      // req.session.LoginId = user[0].id;
    } else {
      // If the password do not match, render the login form with an error message
      res.render('admin-login.ejs', {
        error: 'Invalid email or password'
      });
    }
  })["catch"](function (err) {
    return console.log(err);
  });
};
module.exports.modelHome = function (req, res) {
  var id = req.user.id;
  console.log(id);
  return db.execute('select id, role from users').then(function (response) {
    var _response7 = _slicedToArray(response, 1),
      rows = _response7[0];
    var user = rows.find(function (element) {
      return element.id === id;
    });
    console.log(user);
    if (req.user && id && user.role === 'user') {
      getInfoUser(req, res);
    } else {
      res.status(404).json({
        message: 'Invalid username or password'
      });
      res.redirect('/router/login');
    }
  })["catch"](function (err) {
    return console.error(err);
  });
};
module.exports.modelHomeAdmin = function (req, res) {
  res.render('admin-dashboard.ejs');
  // let { username } = req.user
  // console.log(id);
  // return db.execute('select id, role from users')
  //     .then(response => {
  //         let [rows] = response;
  //         let user = rows.find(element => element.id === id)
  //         if (user.role === 'admin') {
  //             res.render('admin-dashboard.ejs');
  //         }   
  //         else {
  //             res.status(404).json({message: 'Invalid username or password'});
  //             // res.redirect('/router/admin-login');
  //         };
  //     })
  //     .catch(err => console.error(err));
};

// tạo function clause bởi vì nó có this và nếu muốn dùng nó làm đối số phải truyền function clause này vào
// function handleFormSubmission
// function handleLoginForm
var validatePassword = function validatePassword(password, confirmPassword) {
  console.log(password);
  return password === confirmPassword;
};
var validateUsername = function validateUsername(username, rows) {
  var user = rows.find(function (element) {
    return element.username === username;
  });
  console.log('user>>', user);
  return user;
};
var storeUser = function storeUser(userCount, username, email, hashedPassword, role, req, res) {
  return db.execute('INSERT INTO `lms_schema`.`users` (id, username, email, password, role) VALUES (?, ?, ?, ?, ?)', [userCount, username, email, hashedPassword, role]).then(function (response) {
    var _response8 = _slicedToArray(response, 1),
      user = _response8[0];
    res.status(200).json({
      user: user,
      message: 'register successfully'
    });
  })["catch"](function (err) {
    res.status(404).json({
      err: err,
      message: 'Register fail'
    });
  });
};
var storeAdmin = function storeAdmin(userCount, username, email, hashedPassword, role, req, res) {
  return db.execute('INSERT INTO `lms_schema`.`users` (id, username, email, password, role) VALUES (?, ?, ?, ?, ?)', [userCount, username, email, hashedPassword, role]).then(function (response) {
    var _response9 = _slicedToArray(response, 1),
      user = _response9[0];
    res.status(200).json({
      user: user,
      message: 'registelyr successfully'
    });
  })["catch"](function (err) {
    res.status(404).json({
      err: err,
      message: 'Register fail'
    });
  });
};
var getInfoUser = function getInfoUser(req, res) {
  var idUserMatchAccount = req.user.id;
  return db.execute('SELECT * FROM users WHERE id = ?', [idUserMatchAccount]).then(function (response) {
    var _response10 = _slicedToArray(response, 1),
      dataUser = _response10[0];
    var putInfoAccount = 'Verify successfully';
    return db.execute('select * from route_study order by date_up desc limit 6 ').then(function (response) {
      var _response11 = _slicedToArray(response, 1),
        dataRouteStudyHome = _response11[0];
      return db.execute('select * from course order by date_up desc limit 8').then(function (response) {
        var _response12 = _slicedToArray(response, 1),
          dataCourseHome = _response12[0];
        return db.execute('select route_id, count(id_course) as id_course from course group by route_id ').then(function (response) {
          var _response13 = _slicedToArray(response, 1),
            dataMatchCourseRoute = _response13[0];
          console.log(dataMatchCourseRoute);
          var renderForm = {
            putInfoAccount: putInfoAccount,
            dataUser: dataUser,
            dataRouteStudyHome: dataRouteStudyHome,
            dataCourseHome: dataCourseHome,
            dataMatchCourseRoute: dataMatchCourseRoute
          };
          return res.render('index.ejs', renderForm);
        });
      })["catch"](function (err) {
        return res.status(404).json({
          error: err,
          message: err.message
        });
      });
    })["catch"](function (err) {
      return res.status(404).json({
        error: err,
        message: err.message
      });
    });
  })["catch"](function (err) {
    return res.status(404).json({
      error: err,
      message: err.message
    });
  });
};