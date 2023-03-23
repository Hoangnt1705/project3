"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var jwt = require('jsonwebtoken');
var secret = 'secret';
var _require = require('../utils/database.js'),
  db = _require.db;
var localStorage = require('localstorage-memory');
// global.localStorage = new LocalStorage();
// cách thức xác nhận trong jwt 
// The jwt.verify method uses a secret or public key as a parameter to verify the signature of a JSON Web Token (JWT). The secret or public key is used to ensure the integrity of the JWT, by verifying that it was not tampered with.
// When the JWT is generated, a secret key is used to create a digital signature for the token, which is added to the token as the third part. When the JWT is received by the server, the jwt.verify method uses the secret key that was used to create the signature to verify that the signature on the token is valid, and the token has not been tampered with. If the signature is invalid, the jwt.verify method will throw an error.
// The secret key is known only by the server and the client and should be kept secret. If an attacker were to obtain the secret key, they could create a token with the same signature, and gain access to the protected resources.
// The use of a secret key ensures that the token can only be verified by the intended recipient (server) and ensures that the data in the JWT has not been tampered with.
module.exports.middlewareTokenUser = function (req, res, next) {
  // get token in the req.cookie
  console.log('tokenUserMiddle>>', req.headers.cookie);
  var tokens = req.headers.cookie.split(';');
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i].trim();
    var _token$split = token.split('='),
      _token$split2 = _slicedToArray(_token$split, 2),
      name = _token$split2[0],
      value = _token$split2[1];
    // sử dụng array destructurings để phân ra name và value dựa trên split '=', khi sử dụng name 
    // dưới switch case thì sẽ dựa vào name để lấy value đó
    if (!name) return res.status(500).json('Access denied, no token provided');
    try {
      switch (name) {
        case 'tokenUser':
          var decode = jwt.verify(value, secret);
          req.user = decode;
          console.log('decode>>', decode);
          next();
          break;
        default:
          break;
      }
    } catch (error) {
      return res.status(404).json({
        status: 'Aaa',
        message: error
      });
    }
  }
};
module.exports.verifyLogin = function (req, res, next) {
  var openDoorName = [];
  var openDoorValue = [];
  var tokens = req.headers.cookie.split(';');
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i].trim();
    var _token$split3 = token.split('='),
      _token$split4 = _slicedToArray(_token$split3, 2),
      name = _token$split4[0],
      value = _token$split4[1];
    openDoorName.push(name);
    if (openDoorName.indexOf('tokenUser') !== -1) {
      openDoorValue.push(value);
    }
  }
  jwt.verify(openDoorValue[0], secret, function (err, claims) {
    if (err) {
      res.redirect('/router/login');
    }
    if (openDoorName.indexOf('tokenUser') !== -1 && claims) {
      db.execute('select id from users where id = ? ', [claims.id]).then(function (response) {
        var _response = _slicedToArray(response, 1),
          verifyLast = _response[0];
        if (verifyLast) {
          next();
        }
      })["catch"](function (err) {
        res.status(404).json({
          message: err
        });
      });
    }
  });
};
module.exports.verifyLoginHome = function (req, res, next) {
  var openDoorName = [];
  var openDoorValue = [];
  var putInfoAccount;
  var tokens = req.headers.cookie.split(';');
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i].trim();
    var _token$split5 = token.split('='),
      _token$split6 = _slicedToArray(_token$split5, 2),
      name = _token$split6[0],
      value = _token$split6[1];
    openDoorName.push(name);
    if (openDoorName.indexOf('tokenUser') !== -1) {
      openDoorValue.push(value);
    }
  }
  // gọi tên biến mẹ mà đang ở trong method async chính trong biến đó thì sẽ báo lỗi before initialization
  // vd: let decode = jwt.verify(value, secret, (err, claims)=> { return decode });
  jwt.verify(openDoorValue[0], secret, function (err, claims) {
    if (err) {
      console.log('checkMiss>>', openDoorName.indexOf('tokenUser'));
      putInfoAccount = 'Đăng nhập';
      return db.execute('select * from route_study limit 6').then(function (response) {
        var _response2 = _slicedToArray(response, 1),
          dataRouteStudyHome = _response2[0];
        return db.execute('select * from course limit 8').then(function (response) {
          var _response3 = _slicedToArray(response, 1),
            dataCourseHome = _response3[0];
          return db.execute('select route_id, count(id_course) as id_course from course group by route_id').then(function (response) {
            var _response4 = _slicedToArray(response, 1),
              dataMatchCourseRoute = _response4[0];
            console.log(dataMatchCourseRoute);
            var renderForm = {
              putInfoAccount: putInfoAccount,
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
    }
    if (openDoorName.indexOf('tokenUser') !== -1 && claims) {
      db.execute('select id from users where id = ? ', [claims.id]).then(function (response) {
        var _response5 = _slicedToArray(response, 1),
          verifyLast = _response5[0];
        if (verifyLast) {
          next();
        }
      })["catch"](function (err) {
        res.status(404).json({
          message: err
        });
      });
    }
  });
};
// admin.......................................................................
module.exports.middlewareTokenAdmin = function (req, res, next) {
  var tokens = req.headers.cookie.split(';');
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i].trim();
    var _token$split7 = token.split('='),
      _token$split8 = _slicedToArray(_token$split7, 2),
      name = _token$split8[0],
      value = _token$split8[1];
    if (!name) return res.status(500).json('Access denied, no token provided');
    try {
      switch (name) {
        case 'tokenAdmin':
          var decode = jwt.verify(value, secret);
          req.user = decode;
          console.log('decoded Admin', decode);
          next();
          break;
        default:
          break;
      }
    } catch (err) {
      return res.status(404).json({
        message: error
      });
    }
  }
};
module.exports.verifyLoginAdmin = function (req, res, next) {
  var openDoorName = [];
  var openDoorValue = [];
  var tokens = req.headers.cookie.split(';');
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i].trim();
    var _token$split9 = token.split('='),
      _token$split10 = _slicedToArray(_token$split9, 2),
      name = _token$split10[0],
      value = _token$split10[1];
    openDoorName.push(name);
    if (openDoorName.indexOf('tokenAdmin') !== -1) {
      openDoorValue.push(value);
    }
  }
  jwt.verify(openDoorValue[0], secret, function (err, claims) {
    if (err) {
      console.log('checkAdmin 88', openDoorName.indexOf('tokenAdmin'));
      return res.redirect('/router/admin-login');
    }
    if (openDoorName.indexOf('tokenAdmin') !== -1 && claims) {
      db.execute('select id from users where id = ?', [claims.id]).then(function (response) {
        var _response6 = _slicedToArray(response, 1),
          verifyLast = _response6[0];
        if (verifyLast) {
          next();
        }
      })["catch"](function (err) {
        res.status(404).json({
          message: err
        });
      });
    }
  });
};

// Middleware to check if user has completed previous lesson
module.exports.checkProgress = function (req, res, next) {
  if (!req.user) {
    res.send('Please log in to access the lesson.');
  } else {
    var currentLesson = req.params.id;
    console.log(currentLesson);
    db.execute('SELECT completed_docs FROM users WHERE username = ?', [req.user.name]).then(function (response) {
      var _response7 = _slicedToArray(response, 1),
        user = _response7[0];
      var userChunkIncludes = user[0].completed_docs.split(',');
      console.log(userChunkIncludes.includes(currentLesson));
    })["catch"](function (err) {
      return res.status(200).json({
        message: err
      });
    });

    // , (err, user) => {
    //     if (err) throw err;
    //     if (user[0].completed_lessons.includes(currentLesson - 1)) {
    //         next();
    //     } else {
    //         res.send(`Please complete Lesson ${currentLesson - 1} before accessing this lesson.`);
    //     }
    // });
  }
};

module.exports.scanStudentInvateLearn = function (req, res, next) {
  var id = req.params.id;
  db.execute("select id, username, full_name, id_route, id_course, id_class as class from users, classes, route_study, course\n    where users.classIdClass = id_class and id_route = route_study_id and course.route_id = route_study.id_route and id_course =  ?", [id]).then(function (response) {
    var _response8 = _slicedToArray(response, 1),
      data = _response8[0];
    console.log(data);
    var dataFind = data.find(function (element) {
      return element.id === req.user.id;
    });
    dataFind ? next() : res.redirect("/router/course-detail/".concat(req.params.id));
  })["catch"](function (err) {
    return res.status(500).json({
      message: err
    });
  });
};