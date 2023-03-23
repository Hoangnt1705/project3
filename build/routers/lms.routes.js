'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var fs = require('fs');
var cookieParser = require('cookie-parser');
var path = require('path');
var uuid = require('uuid-v4');
var _require = require('../utils/database.js'),
  db = _require.db;
var express = require('express');
var router = express.Router();
//config bodyParser
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));
var multer = require('multer');
// config firebase-admin
var firebase = require('firebase-admin');
var serviceAccount = require('../firebase/admin.json');
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  storageBucket: 'gs://projectmodule3-c6f1d.appspot.com'
});
var upload = multer({
  storage: multer.memoryStorage()
});
//middleware import 
var _require2 = require('../middlewares/jsonwebtoken-middleware.js'),
  middlewareTokenUser = _require2.middlewareTokenUser,
  verifyLoginHome = _require2.verifyLoginHome,
  middlewareTokenAdmin = _require2.middlewareTokenAdmin,
  verifyLoginAdmin = _require2.verifyLoginAdmin,
  verifyLogin = _require2.verifyLogin,
  scanStudentInvateLearn = _require2.scanStudentInvateLearn,
  checkProgress = _require2.checkProgress;
// controller import
var _require3 = require('../controllers/lms.user.controller.js'),
  userRegister = _require3.userRegister,
  userLogin = _require3.userLogin,
  routeStudyGet = _require3.routeStudyGet,
  courseGet = _require3.courseGet,
  controlPanelGet = _require3.controlPanelGet,
  home = _require3.home,
  adminLogin = _require3.adminLogin,
  homeAdmin = _require3.homeAdmin;
var _require4 = require('../service/tableSequelize'),
  Class = _require4.Class,
  Users = _require4.Users,
  RouteStudy = _require4.RouteStudy,
  Learn = _require4.Learn,
  Doc = _require4.Doc,
  PoolCourseCompleted = _require4.PoolCourseCompleted,
  PoolDocCompleted = _require4.PoolDocCompleted;

/**
 * 
 * @param {*} app : express app
 */
// api USER..............................................................

var initRoutes = function initRoutes(app) {
  router.get('/', verifyLoginHome, middlewareTokenUser, home);
  router.get('/route-study', verifyLogin, middlewareTokenUser, routeStudyGet);
  router.get('/course', verifyLogin, middlewareTokenUser, courseGet);
  router.get('/control-panel', verifyLogin, middlewareTokenUser, controlPanelGet);
  router.get('/api/course/query', function (req, res) {
    var nameCourse = req.query.nameCourse;
    var arrayNameCourse = [];
    var nameCourseParseLowerCase = nameCourse.trim().toLowerCase();
    console.log(nameCourseParseLowerCase);
    db.execute('select * from course').then(function (response) {
      var _response = _slicedToArray(response, 1),
        dataDestructuring = _response[0];
      dataDestructuring.forEach(function (element) {
        if (element.course_name.trim().toLowerCase().includes(nameCourseParseLowerCase)) {
          return arrayNameCourse.push(element);
        }
      });
      res.status(200).json({
        data: arrayNameCourse,
        message: 'Successfullys'
      });
    })["catch"](function (err) {
      return res.status(500).json({
        message: 'Server Not Found' + err
      });
    });
  });
  router.get('/course-detail/:id', verifyLogin, middlewareTokenUser, function (req, res) {
    var id = req.params.id;
    console.log(id);
    var idUserMatchAccount = req.user.id;
    var putInfoAccount = 'Verify successfully';
    return db.execute('SELECT * FROM users WHERE id = ?', [idUserMatchAccount]).then(function (response1) {
      var _response2 = _slicedToArray(response1, 1),
        dataUser = _response2[0];
      return db.execute('select * from course, route_study where id_course = ? and course.route_id = route_study.id_route', [id]).then(function (response2) {
        var _response3 = _slicedToArray(response2, 1),
          dataCourse = _response3[0];
        return db.execute('select course_detail.description_detail, course_detail.teacher, course_detail.ta, course_detail.we_learn from course_detail, course where course_detail.id_detail = course.id_course and course.id_course = ?', [id]).then(function (response3) {
          var _response4 = _slicedToArray(response3, 1),
            dataCourseDetail = _response4[0];
          return db.execute('select id_learn, title, detail_id from learn, course_detail where learn.detail_id = course_detail.id_detail and course_detail.id_detail = ?', [id]).then(function (response4) {
            var _response5 = _slicedToArray(response4, 1),
              dataLearn = _response5[0];
            return db.execute('select id_doc, doc_name, url, learn_id from doc, learn where doc.learn_id = learn.id_learn').then(function (response5) {
              var _response6 = _slicedToArray(response5, 1),
                dataDoc = _response6[0];
              return db.execute("select id, username, full_name, id_route, id_course, id_class as class from users, classes, route_study, course\n                                                where users.classIdClass = id_class and id_route = route_study_id and course.route_id = route_study.id_route and id_course =  ?", [id]).then(function (response6) {
                var _response7 = _slicedToArray(response6, 1),
                  dataInvateClass = _response7[0];
                var openkeyLearn;
                var dataScanStudentInvate = dataInvateClass.find(function (element) {
                  return element.id === req.user.id;
                });
                dataScanStudentInvate ? openkeyLearn = true : openkeyLearn = false;
                return res.render('course-detail.ejs', {
                  putInfoAccount: putInfoAccount,
                  dataUser: dataUser,
                  dataLearn: dataLearn,
                  dataDoc: dataDoc,
                  dataCourse: dataCourse,
                  dataCourseDetail: dataCourseDetail,
                  dataInvateClass: dataInvateClass,
                  openkeyLearn: openkeyLearn
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
  });
  router.get('/learn/:id', verifyLogin, middlewareTokenUser, scanStudentInvateLearn, function (req, res) {
    var id = req.params.id;
    var userId = req.user.id; // assuming that the user ID is stored in req.user.id
    var putInfoAccount = 'Verify successfully';
    return db.execute('SELECT * FROM users WHERE id = ?', [userId]).then(function (response) {
      var _response8 = _slicedToArray(response, 1),
        dataUser = _response8[0];
      return db.execute('select * from course, route_study where id_course = ? and course.route_id = route_study.id_route', [id]).then(function (response) {
        var _response9 = _slicedToArray(response, 1),
          dataCourse = _response9[0];
        return db.execute('select id_learn, title, detail_id from learn, course_detail where learn.detail_id = course_detail.id_detail and course_detail.id_detail = ?', [id]).then( /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(response) {
            var _response10, dataLearn, learnData, docData, completedDocs, completedDocIds, lessonReadings, currentDoc, currentIndex, unlocked, locked, unlockedCombineCheckButtonCompleted, lockedCombineCheckButtonCompleted, resultCombineCheckButtonCompleted, resultLessonReadings, userData, dataRouteStudy, dataPoolCourseCompleted, dataPoolCourseCompletedPlain;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _response10 = _slicedToArray(response, 1), dataLearn = _response10[0];
                  _context.prev = 1;
                  _context.next = 4;
                  return Learn.findAll({
                    include: [{
                      model: Doc
                    }]
                  });
                case 4:
                  learnData = _context.sent;
                  _context.next = 7;
                  return Doc.findAll({
                    where: {
                      course_id: id,
                      learn_id: learnData.map(function (learn) {
                        return learn.id_learn;
                      })
                    }
                  });
                case 7:
                  docData = _context.sent;
                  _context.next = 10;
                  return PoolDocCompleted.findAll({
                    where: {
                      learn_id: learnData.map(function (learn) {
                        return learn.id_learn;
                      }),
                      courseIdCourse: id,
                      user_id: userId
                    },
                    // Có thể
                    // dùng array để xử lý điều kiện where để truy xuất dữ liệu với sequelize
                    attributes: ['arrangeId']
                  });
                case 10:
                  completedDocs = _context.sent;
                  completedDocIds = completedDocs.map(function (doc) {
                    return doc.arrangeId;
                  });
                  lessonReadings = docData.map(function (doc) {
                    return doc.dataValues;
                  });
                  lessonReadings.sort(function (a, b) {
                    return a.id_arrange - b.id_arrange;
                  });
                  currentDoc = lessonReadings.find(function (doc) {
                    return !completedDocIds.includes(doc.id_arrange);
                  });
                  currentIndex = lessonReadings.indexOf(currentDoc);
                  unlocked = lessonReadings.slice(0, currentIndex + 1).map(function (doc) {
                    return _objectSpread(_objectSpread({}, doc), {}, {
                      locked: false
                    });
                  });
                  locked = lessonReadings.slice(currentIndex + 1).map(function (doc) {
                    return _objectSpread(_objectSpread({}, doc), {}, {
                      locked: true
                    });
                  });
                  unlockedCombineCheckButtonCompleted = lessonReadings.slice(0, currentIndex).map(function (doc) {
                    return _objectSpread(_objectSpread({}, doc), {}, {
                      lockButtonCompleted: true
                    });
                  });
                  lockedCombineCheckButtonCompleted = lessonReadings.slice(currentIndex).map(function (doc) {
                    return _objectSpread(_objectSpread({}, doc), {}, {
                      lockButtonCompleted: false
                    });
                  });
                  resultCombineCheckButtonCompleted = [].concat(_toConsumableArray(unlockedCombineCheckButtonCompleted), _toConsumableArray(lockedCombineCheckButtonCompleted));
                  resultLessonReadings = [].concat(_toConsumableArray(unlocked), _toConsumableArray(locked));
                  userData = {
                    userId: userId,
                    resultLessonReadings: resultLessonReadings
                  };
                  _context.next = 25;
                  return RouteStudy.findAll();
                case 25:
                  dataRouteStudy = _context.sent;
                  _context.next = 28;
                  return PoolCourseCompleted.findOne({
                    where: {
                      class_id: dataUser[0].classIdClass,
                      user_id: userId,
                      route_id: dataRouteStudy.map(function (route) {
                        return route.id_route;
                      }),
                      course_id: id
                    }
                  });
                case 28:
                  dataPoolCourseCompleted = _context.sent;
                  if (dataPoolCourseCompleted) {
                    dataPoolCourseCompletedPlain = dataPoolCourseCompleted.get({
                      plain: true
                    });
                  } else {
                    dataPoolCourseCompletedPlain = undefined;
                  }
                  console.log(dataRouteStudy);
                  return _context.abrupt("return", res.render('learn.ejs', {
                    putInfoAccount: putInfoAccount,
                    dataUser: dataUser,
                    dataLearn: dataLearn,
                    dataCourse: dataCourse,
                    dataDoc: userData.resultLessonReadings,
                    resultCombineCheckButtonCompleted: resultCombineCheckButtonCompleted,
                    dataPoolCourseCompletedPlain: dataPoolCourseCompletedPlain
                  }));
                case 34:
                  _context.prev = 34;
                  _context.t0 = _context["catch"](1);
                  console.log(_context.t0);
                  res.status(500).json({
                    message: 'Internal Server Error'
                  });
                case 38:
                case "end":
                  return _context.stop();
              }
            }, _callee, null, [[1, 34]]);
          }));
          return function (_x2) {
            return _ref.apply(this, arguments);
          };
        }())["catch"](function (err) {
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
  });
  router.get('/login', function (req, res) {
    res.render('login.ejs');
  });
  router.post('/api/v1/users-login', upload.none(), userLogin);
  router.get('/logout', function (req, res) {
    // res.cookie("logoutId", { expires: new Date(1), httpOnly: true });
    res.clearCookie('tokenUser');
    // delete thì phải delete theo tên token mình đặt
    res.redirect('/router/login');
  });
  router.get('/test', function (req, res) {
    res.render('test.ejs');
  });

  // api ADMIN ......................................................
  //..............................(GET)..............................
  router.get('/dashboard-register', verifyLoginAdmin);
  router.get('/dashboard-register', verifyLoginAdmin, function (req, res) {
    res.render('register.ejs');
  });
  router.get('/admin-login', function (req, res) {
    res.render('admin-login.ejs');
  });
  router.get('/admin-dashboard/route-study', verifyLoginAdmin, function (req, res) {
    res.render('route-study-dashboard.ejs');
    console.log(req.headers);
  });
  router.get('/admin-dashboard', verifyLoginAdmin, middlewareTokenAdmin, homeAdmin);
  router.get('/admin-dashboard/route-study/update', verifyLoginAdmin, function (req, res) {
    db.execute('select * from route_study').then(function (response) {
      var _response11 = _slicedToArray(response, 1),
        data = _response11[0];
      res.render('route-study-update-dashboard.ejs', {
        data: data
      });
    })["catch"](function (err) {
      return res.status(404).json({
        err: err,
        message: 'Not found'
      });
    });
  });
  router.get('/admin-dashboard/route-study/post', verifyLoginAdmin, middlewareTokenAdmin, function (req, res) {
    res.render('route-study-post-dashboard.ejs');
  });
  router.get('/admin-dashboard/route-study/update/:id', verifyLoginAdmin, function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.execute('select * from route_study where id_route = ? ', [id]).then(function (response) {
      var _response12 = _slicedToArray(response, 1),
        data = _response12[0];
      console.log(data);
      res.render('route-study-update-form-dashboard.ejs', {
        data: data
      });
    })["catch"](function (err) {
      return res.status(404).json({
        err: err,
        message: 'Not found Route'
      });
    });
  });
  router.get('/admin-dashboard/course/post', verifyLoginAdmin, function (req, res) {
    db.execute('select id_route, route_name from route_study').then(function (response) {
      var _response13 = _slicedToArray(response, 1),
        data = _response13[0];
      console.log(response);
      return res.render('course-dashboard.ejs', {
        data: data
      });
    })["catch"](function (err) {
      return res.status(500).json({
        error: err,
        message: err.message
      });
    });
  });
  router.get('/admin-dashboard/course/update', verifyLoginAdmin, function (req, res) {
    db.execute("select course.id_course, course.date_up, course.course_name, course.image_course,\n    course.description_course, course.level, course.time_learn_course, course.route_id, course.user_id,\n    route_study.route_name from course, route_study where route_study.id_route = course.route_id").then(function (response) {
      var _response14 = _slicedToArray(response, 1),
        data = _response14[0];
      return res.render('course-dashboard-update.ejs', {
        data: data
      });
    });
  });
  router.get('/admin-dashboard/course/update/:id', verifyLoginAdmin, function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.execute("select course.id_course, course.date_up, course.course_name, course.image_course,\n    course.description_course, course.level, course.time_learn_course, course.route_id, course.user_id,\n    route_study.route_name from course, route_study where route_study.id_route = course.route_id and\n     id_course = ? ", [id]).then(function (response) {
      var _response15 = _slicedToArray(response, 1),
        data = _response15[0];
      console.log(data);
      db.execute('select route_study.route_name from route_study').then(function (response) {
        var _response16 = _slicedToArray(response, 1),
          dataAddInRoute = _response16[0];
        res.render('course-dashboard-update-form.ejs', {
          data: data,
          dataAddInRoute: dataAddInRoute
        });
      })["catch"](function (err) {
        return res.status(404).json({
          err: err,
          message: 'Not found Route'
        });
      });
    })["catch"](function (err) {
      return res.status(404).json({
        err: err,
        message: 'Not found Route'
      });
    });
  });
  router.get('/admin-dashboard/user-management', verifyLoginAdmin, function (req, res) {
    db.execute('select * from users').then(function (response) {
      var _response17 = _slicedToArray(response, 1),
        dataUser = _response17[0];
      console.log(dataUser);
      res.render('user-management.ejs', {
        dataUser: dataUser
      });
    })["catch"](function (err) {
      return res.status(404).json({
        error: err,
        status: 'Not found'
      });
    });
  });
  router.get('/admin-dashboard/user-management/:id', verifyLoginAdmin, function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.execute('select * from users where id = ? ', [id]).then(function (response) {
      var _response18 = _slicedToArray(response, 1),
        data = _response18[0];
      console.log(data);
      db.execute('select route_study.route_name from route_study').then(function (response) {
        var _response19 = _slicedToArray(response, 1),
          dataAddInRoute = _response19[0];
        res.render('user-management-form-update.ejs', {
          data: data,
          dataAddInRoute: dataAddInRoute
        });
      })["catch"](function (err) {
        return res.status(404).json({
          err: err,
          message: 'Not found Route'
        });
      });
    })["catch"](function (err) {
      return res.status(404).json({
        err: err,
        message: 'Not found Users'
      });
    });
  });
  router.get('/admin-dashboard/course-detail/post', verifyLoginAdmin, function (req, res) {
    db.execute('select * from course').then(function (response) {
      var _response20 = _slicedToArray(response, 1),
        dataDetail = _response20[0];
      res.render('course-detail-dashboard-post.ejs', {
        dataDetail: dataDetail
      });
    })["catch"](function (err) {
      return res.status(404).json({
        err: err,
        message: 'Not found Course-detail'
      });
    });
  });
  router.get('/admin-dashboard/course-detail/update', verifyLoginAdmin, function (req, res) {
    db.execute('select * from course_detail').then(function (response) {
      var _response21 = _slicedToArray(response, 1),
        dataDetail = _response21[0];
      console.log(dataDetail);
      res.render('course-detail-dashboard.ejs', {
        dataDetail: dataDetail
      });
    })["catch"](function (err) {
      return res.status(404).json({
        err: err,
        message: 'Not found Course-detail'
      });
    });
  });
  router.get('/admin-dashboard/course-detail/update/:id', verifyLoginAdmin, function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.execute('select * from course_detail where id_detail = ? ', [id]).then(function (response) {
      var _response22 = _slicedToArray(response, 1),
        data = _response22[0];
      db.execute('select course.course_name from course').then(function (response) {
        var _response23 = _slicedToArray(response, 1),
          dataAddInCourse = _response23[0];
        console.log(dataAddInCourse);
        res.render('course-detail-dashboard-update-form.ejs', {
          data: data,
          dataAddInCourse: dataAddInCourse
        });
      })["catch"](function (err) {
        return res.status(404).json({
          err: err,
          message: 'Not found Course'
        });
      });
    })["catch"](function (err) {
      return res.status(404).json({
        err: err,
        message: 'Not found Course Detail'
      });
    });
  });
  router.get('/admin-dashboard/learn/update', verifyLoginAdmin, function (req, res) {
    db.execute('select * from learn').then(function (response) {
      var _response24 = _slicedToArray(response, 1),
        dataLearn = _response24[0];
      console.log(dataLearn);
      res.render('learn-dashboard.ejs', {
        dataLearn: dataLearn
      });
    })["catch"](function (err) {
      return res.status(404).json({
        error: err,
        status: 'Not found'
      });
    });
  });
  router.get('/admin-dashboard/learn/update/:id', verifyLoginAdmin, function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.execute('select * from learn where id_learn = ? ', [id]).then(function (response) {
      var _response25 = _slicedToArray(response, 1),
        data = _response25[0];
      console.log(data);
      db.execute('select course.course_name, course.id_course from course, course_detail where course.id_course = course_detail.id_detail').then(function (response) {
        var _response26 = _slicedToArray(response, 1),
          dataAddInCourse = _response26[0];
        res.render('learn-dashboard-update-form.ejs', {
          data: data,
          dataAddInCourse: dataAddInCourse
        });
      })["catch"](function (err) {
        return res.status(404).json({
          err: err,
          message: 'Not found Route'
        });
      });
    })["catch"](function (err) {
      return res.status(404).json({
        err: err,
        message: 'Not found Users'
      });
    });
  });
  router.get('/admin-dashboard/learn/post', verifyLoginAdmin, function (req, res) {
    db.execute('select course.course_name, course.id_course from course, course_detail where course.id_course = course_detail.id_detail').then(function (response) {
      var _response27 = _slicedToArray(response, 1),
        dataAddInCourse = _response27[0];
      res.render('learn-dashboard-post.ejs', {
        dataAddInCourse: dataAddInCourse
      });
    })["catch"](function (err) {
      return res.status(404).json({
        err: err,
        message: 'Not found Route'
      });
    });
  });
  router.get('/admin-dashboard/doc/', verifyLoginAdmin, function (req, res) {
    db.execute('SELECT * FROM lms_schema.doc').then(function (response) {
      var _response28 = _slicedToArray(response, 1),
        dataDoc = _response28[0];
      console.log(dataDoc);
      db.execute('select course_name, id_course from course').then(function (response) {
        var _response29 = _slicedToArray(response, 1),
          dataCourse = _response29[0];
        db.execute('select title from learn').then(function (response) {
          var _response30 = _slicedToArray(response, 1),
            dataLearn = _response30[0];
          res.render('doc-dashboard.ejs', {
            dataDoc: dataDoc,
            dataCourse: dataCourse,
            dataLearn: dataLearn
          });
        })["catch"](function (err) {
          return res.status(404).json({
            err: err,
            message: 'Not found Route'
          });
        });
      })["catch"](function (err) {
        return res.status(404).json({
          err: err,
          message: 'Not found Route'
        });
      });
    })["catch"](function (err) {
      return res.status(404).json({
        error: err,
        status: 'Not found'
      });
    });
  });
  router.get('/admin-dashboard/doc/update', verifyLoginAdmin, function (req, res) {
    db.execute('select * from learn').then(function (responseLearn) {
      var _responseLearn = _slicedToArray(responseLearn, 1),
        dataLearn = _responseLearn[0];
      db.execute('select * from doc order by id_arrange').then(function (responseDoc) {
        var _responseDoc = _slicedToArray(responseDoc, 1),
          dataDoc = _responseDoc[0];
        res.render('doc-dashboard-update.ejs', {
          dataLearn: dataLearn,
          dataDoc: dataDoc
        });
      })["catch"](function (err) {
        return res.status(500).json({
          message: err + 'Doc'
        });
      });
    })["catch"](function (err) {
      return res.status(500).json({
        message: err + 'Learn'
      });
    });
  });
  router.get('/admin-dashboard/doc/update-form/:id', verifyLoginAdmin, function (req, res) {
    var id = req.params.id;
    db.execute('select * from doc where id_doc = ?', [id]).then(function (response) {
      var _response31 = _slicedToArray(response, 1),
        data = _response31[0];
      db.execute('select id_course, course_name from course ').then(function (responseCourse) {
        var _responseCourse = _slicedToArray(responseCourse, 1),
          dataCourse = _responseCourse[0];
        db.execute('select id_learn, title from learn ').then(function (responseLearn) {
          var _responseLearn2 = _slicedToArray(responseLearn, 1),
            dataLearn = _responseLearn2[0];
          res.render('doc-dashboard-update-form.ejs', {
            data: data,
            dataLearn: dataLearn,
            dataCourse: dataCourse
          });
        })["catch"](function (err) {
          return res.status(500).json({
            message: err
          });
        });
      })["catch"](function (err) {
        return res.status(500).json({
          message: err
        });
      });
    })["catch"](function (err) {
      return res.status(500).json({
        message: err
      });
    });
  });
  router.get('admin-dashboard/course-detail/post', function (req, res) {});
  //...................(POST);..........................................

  router.post('/api/admin-dashboard/doc/post/image-change', middlewareTokenAdmin, upload.single('pdfDocUpdate'), function (req, res) {
    var pdfDoc = req.file;
    console.log(pdfDoc);
    var metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuid()
      },
      contentType: pdfDoc.mimetype,
      cacheControl: 'public, max-age=31536000'
    };
    var bucket = firebase.storage().bucket();
    var filePath = "doc-file/".concat(uuid() + '--' + pdfDoc.originalname);
    var blob = bucket.file(filePath);
    var blobStream = blob.createWriteStream({
      gzip: true,
      metadata: metadata
    });
    blobStream.on('error', function (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error uploading file to Firebase'
      });
    });
    blobStream.on('finish', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var publicUrl, pdfUrl, _pdfUrl, valuePdfUrl;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            // Get the public URL of the file
            publicUrl = "https://storage.googleapis.com/".concat(bucket.name, "/").concat(blob.name);
            _context2.next = 3;
            return blob.getSignedUrl({
              action: 'read',
              expires: '03-09-2024'
            });
          case 3:
            pdfUrl = _context2.sent;
            _pdfUrl = _slicedToArray(pdfUrl, 1), valuePdfUrl = _pdfUrl[0];
            res.status(200).json({
              message: 'File uploaded to Firebase successfully',
              url: valuePdfUrl
            });
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    })));
    blobStream.end(pdfDoc.buffer);
  });
  router.post('/api/admin-dashboard/doc/post/pdf', upload.single('pdfDoc'), /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
      var pdfDoc, metadata, bucket, filePath, blob, blobStream;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            pdfDoc = req.file;
            console.log(pdfDoc);
            metadata = {
              metadata: {
                firebaseStorageDownloadTokens: uuid()
              },
              contentType: pdfDoc.mimetype,
              cacheControl: 'public, max-age=31536000'
            };
            bucket = firebase.storage().bucket();
            filePath = "doc-file/".concat(uuid() + '--' + pdfDoc.originalname);
            blob = bucket.file(filePath);
            blobStream = blob.createWriteStream({
              gzip: true,
              metadata: metadata
            });
            blobStream.on('error', function (error) {
              console.log(error);
              res.status(500).json({
                message: 'Error uploading file to Firebase'
              });
            });
            blobStream.on('finish', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
              var publicUrl, pdfUrl, _pdfUrl2, valuePdfUrl;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    // Get the public URL of the file
                    publicUrl = "https://storage.googleapis.com/".concat(bucket.name, "/").concat(blob.name);
                    _context3.next = 3;
                    return blob.getSignedUrl({
                      action: 'read',
                      expires: '03-09-2024'
                    });
                  case 3:
                    pdfUrl = _context3.sent;
                    _pdfUrl2 = _slicedToArray(pdfUrl, 1), valuePdfUrl = _pdfUrl2[0];
                    res.status(200).json({
                      message: 'File uploaded to Firebase successfully',
                      url: valuePdfUrl
                    });
                  case 6:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            })));
            blobStream.end(pdfDoc.buffer);
          case 10:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }());
  router.post('/api/admin-dashboard/doc/post', middlewareTokenAdmin, upload.array(), function (req, res) {
    // Outputs the key/value pairs
    console.log(req.body);
    var _req$body = req.body,
      course = _req$body.course,
      detail = _req$body.detail,
      docName = _req$body.docName,
      active = _req$body.active,
      locking = _req$body.locking,
      pdfDoc = _req$body.pdfDoc;
    db.execute('select id_doc from `doc`').then(function (lengthId) {
      var _lengthId = _slicedToArray(lengthId, 1),
        total = _lengthId[0];
      //Define an array with some values, including missing parts
      var arrayIdLength = total.map(function (element) {
        return element.id_doc;
      });
      // Sort the array in ascending order
      arrayIdLength.sort(function (a, b) {
        return a - b;
      });
      // Create a new array to store the filled-in values
      var newArrIdLength = [];
      var idpushDb;
      // Loop through the sorted array
      for (var i = 0; i < arrayIdLength.length; i++) {
        // Add the current value to the new array
        newArrIdLength.push(arrayIdLength[i]);
        // Check if the next value is missing

        if (arrayIdLength[i] + 1 !== arrayIdLength[i + 1] && arrayIdLength[i + 1] !== undefined) {
          // Calculate the missing value and add it to the new array 
          var missingValue = arrayIdLength[i] + 1;
          idpushDb = missingValue;
          newArrIdLength.push(missingValue);
        }
      }
      if (idpushDb === undefined && arrayIdLength.indexOf(1) === -1) {
        idpushDb = 1;
      } else if (idpushDb === undefined && arrayIdLength.indexOf(1) !== -1) {
        idpushDb = total.length + 1;
      }
      var userUp = req.user.id;
      var currentDate = new Date();
      var arrange = 999;
      var dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
      var formPost = [idpushDb, docName, dateUp, pdfDoc, active, course, detail, locking, arrange, userUp];
      db.execute('INSERT INTO `lms_schema`.`doc` (`id_doc`, `doc_name`, `date_up`, `url`, `active`, `course_id`, `learn_id`, `lock`, `id_arrange`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ', formPost).then(function (response) {
        var _response32 = _slicedToArray(response, 1),
          dataUpload = _response32[0];
        console.log('upload successfully', dataUpload);
        res.status(200).json({
          message: 'upload successfully',
          upload: dataUpload
        });
      })["catch"](function (err) {
        console.log(err);
      });
    });
  });
  router.post('/api/admin-dashboard/course/post', middlewareTokenAdmin, upload.array(), function (req, res) {
    console.log('aaaa');
    console.log(req.body);
    var _req$body2 = req.body,
      courseName = _req$body2.courseName,
      descriptionCourse = _req$body2.descriptionCourse,
      levelCourse = _req$body2.levelCourse,
      timeLearnCourse = _req$body2.timeLearnCourse,
      addInrouteStudy = _req$body2.addInrouteStudy,
      imagePost = _req$body2.imagePost;
    console.log(courseName, imagePost, descriptionCourse, levelCourse, timeLearnCourse, addInrouteStudy);
    db.execute('select count(id_course) as id from `course`').then(function (lengthId) {
      var _lengthId2 = _slicedToArray(lengthId, 1),
        total = _lengthId2[0];
      var id = total[0].id + 1;
      var userUp = req.user.id;
      var currentDate = new Date();
      var dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
      var formPost = [id, dateUp, courseName, imagePost, descriptionCourse, levelCourse, timeLearnCourse, addInrouteStudy, userUp];
      db.execute('INSERT INTO `lms_schema`.`course` (`id_course`, `date_up`, `course_name`, `image_course`, `description_course`, `level`, `time_learn_course`, `route_id`, `user_id`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?) ', formPost).then(function (response) {
        var _response33 = _slicedToArray(response, 1),
          dataUpload = _response33[0];
        console.log('upload successfully', dataUpload);
        res.status(200).json({
          message: 'upload successfully',
          upload: dataUpload
        });
      })["catch"](function (err) {
        console.log(err);
      });
    });
  });
  router.post('/api/admin-dashboard/course/post/image', middlewareTokenAdmin, upload.single('imageCourse'), function (req, res) {
    var imageCourse = req.file;
    var metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuid()
      },
      contentType: imageCourse.mimetype,
      cacheControl: 'public, max-age=31536000'
    };
    var bucket = firebase.storage().bucket();
    var filePath = "imageCourse/".concat(uuid() + '--' + imageCourse.originalname);
    var blob = bucket.file(filePath);
    var blobStream = blob.createWriteStream({
      gzip: true,
      metadata: metadata
    });
    blobStream.on('error', function (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error uploading file to Firebase'
      });
    });
    blobStream.on('finish', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var publicUrl, imageCourseUrl, _imageCourseUrl, valueImageCourseUrl;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            // Get the public URL of the file
            publicUrl = "https://storage.googleapis.com/".concat(bucket.name, "/").concat(blob.name);
            _context5.next = 3;
            return blob.getSignedUrl({
              action: 'read',
              expires: '03-09-2024'
            });
          case 3:
            imageCourseUrl = _context5.sent;
            _imageCourseUrl = _slicedToArray(imageCourseUrl, 1), valueImageCourseUrl = _imageCourseUrl[0];
            res.status(200).json({
              message: 'File uploaded to Firebase successfully',
              url: valueImageCourseUrl
            });
            console.log(valueImageCourseUrl);
            // saveFileImage(valueImageRouteStudyUrl);
          case 7:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    })));
    blobStream.end(imageCourse.buffer);
  });
  router.post('/api/admin-dashboard/route-study/post', middlewareTokenAdmin, upload.array(), function (req, res) {
    // Outputs the key/value pairs
    var _req$body3 = req.body,
      nameRouteStudy = _req$body3.nameRouteStudy,
      descriptionRouteStudy = _req$body3.descriptionRouteStudy,
      totalLearnTimeRouteStudy = _req$body3.totalLearnTimeRouteStudy,
      imagePost = _req$body3.imagePost;
    console.log(nameRouteStudy, descriptionRouteStudy, totalLearnTimeRouteStudy, imagePost);
    db.execute('select count(id_route) as id from `route_study`').then(function (lengthId) {
      var _lengthId3 = _slicedToArray(lengthId, 1),
        total = _lengthId3[0];
      var id = total[0].id + 1;
      var userUp = req.user.id;
      var currentDate = new Date();
      var dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
      var formPost = [id, nameRouteStudy, descriptionRouteStudy, totalLearnTimeRouteStudy, imagePost, dateUp, userUp];
      db.execute('INSERT INTO `route_study`(`id_route`, `route_name`, `description_route`, `total_time_route`, `image_route`, `date_up`, `user_id`) VALUES(?, ?, ?, ?, ?, ?, ?) ', formPost).then(function (response) {
        var _response34 = _slicedToArray(response, 1),
          dataUpload = _response34[0];
        console.log('upload successfully', dataUpload);
        res.status(200).json({
          message: 'upload successfully',
          upload: dataUpload
        });
      })["catch"](function (err) {
        console.log(err);
      });
    });
  });
  router.post('/api/admin-dashboard/learn/post', middlewareTokenAdmin, upload.array(), function (req, res) {
    // Outputs the key/value pairs
    console.log(req.body);
    var _req$body4 = req.body,
      addInCourse = _req$body4.addInCourse,
      titleLearn = _req$body4.titleLearn,
      ratingContent = _req$body4.ratingContent,
      ratingNumber = _req$body4.ratingNumber;
    db.execute('select count(id_learn) as id from `learn`').then(function (lengthId) {
      var _lengthId4 = _slicedToArray(lengthId, 1),
        total = _lengthId4[0];
      var id = total[0].id + 1;
      var userUp = req.user.id;
      var currentDate = new Date();
      var dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
      var formPost = [id, titleLearn, dateUp, ratingContent, ratingNumber, addInCourse, userUp];
      db.execute('INSERT INTO `lms_schema`.`learn` (`id_learn`, `title`, `date_up`, `rating_content`, `rating_number`, `detail_id`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?)', formPost).then(function (response) {
        var _response35 = _slicedToArray(response, 1),
          dataUpload = _response35[0];
        console.log('upload successfully', dataUpload);
        res.status(200).json({
          message: 'upload successfully',
          upload: dataUpload
        });
      })["catch"](function (err) {
        console.log(err);
      });
    });
  });
  router.post('/api/admin-dashboard/route-study/post/image', middlewareTokenAdmin, upload.single('imageRouteStudy'), function (req, res) {
    var imageRouteStudy = req.file;
    var metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuid()
      },
      contentType: imageRouteStudy.mimetype,
      cacheControl: 'public, max-age=31536000'
    };
    var bucket = firebase.storage().bucket();
    var filePath = "imageRouteStudy/".concat(uuid() + '--' + imageRouteStudy.originalname);
    var blob = bucket.file(filePath);
    var blobStream = blob.createWriteStream({
      gzip: true,
      metadata: metadata
    });
    blobStream.on('error', function (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error uploading file to Firebase'
      });
    });
    blobStream.on('finish', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var publicUrl, imageRouteStudyUrl, _imageRouteStudyUrl, valueImageRouteStudyUrl;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            // Get the public URL of the file
            publicUrl = "https://storage.googleapis.com/".concat(bucket.name, "/").concat(blob.name);
            _context6.next = 3;
            return blob.getSignedUrl({
              action: 'read',
              expires: '03-09-2024'
            });
          case 3:
            imageRouteStudyUrl = _context6.sent;
            _imageRouteStudyUrl = _slicedToArray(imageRouteStudyUrl, 1), valueImageRouteStudyUrl = _imageRouteStudyUrl[0];
            res.status(200).json({
              message: 'File uploaded to Firebase successfully',
              url: valueImageRouteStudyUrl
            });
            console.log(valueImageRouteStudyUrl);
            // saveFileImage(valueImageRouteStudyUrl);
          case 7:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    })));
    blobStream.end(imageRouteStudy.buffer);
  });
  router.post('/api/admin-dashboard/route-study/post/image-change', middlewareTokenAdmin, upload.single('imageUpdate'), function (req, res) {
    var imageUpdate = req.file;
    var metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuid()
      },
      contentType: imageUpdate.mimetype,
      cacheControl: 'public, max-age=31536000'
    };
    var bucket = firebase.storage().bucket();
    var filePath = "imageRouteStudyUpdate/".concat(uuid() + '--' + imageUpdate.originalname);
    var blob = bucket.file(filePath);
    var blobStream = blob.createWriteStream({
      gzip: true,
      metadata: metadata
    });
    blobStream.on('error', function (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error uploading file to Firebase'
      });
    });
    blobStream.on('finish', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var publicUrl, imageRouteStudyUrl, _imageRouteStudyUrl2, valueImageRouteStudyUrl;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            // Get the public URL of the file
            publicUrl = "https://storage.googleapis.com/".concat(bucket.name, "/").concat(blob.name);
            _context7.next = 3;
            return blob.getSignedUrl({
              action: 'read',
              expires: '03-09-2024'
            });
          case 3:
            imageRouteStudyUrl = _context7.sent;
            _imageRouteStudyUrl2 = _slicedToArray(imageRouteStudyUrl, 1), valueImageRouteStudyUrl = _imageRouteStudyUrl2[0];
            res.status(200).json({
              message: 'File uploaded to Firebase successfully',
              url: valueImageRouteStudyUrl
            });
            console.log(valueImageRouteStudyUrl);
            // saveFileImage(valueImageRouteStudyUrl);
          case 7:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    })));
    blobStream.end(imageUpdate.buffer);
  });
  router.post('/api/admin-dashboard/course/post/image-change', middlewareTokenAdmin, upload.single('imageCourseUpdate'), function (req, res) {
    var imageCourseUpdate = req.file;
    var metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuid()
      },
      contentType: imageCourseUpdate.mimetype,
      cacheControl: 'public, max-age=31536000'
    };
    var bucket = firebase.storage().bucket();
    var filePath = "imageCourseUpdate/".concat(uuid() + '--' + imageCourseUpdate.originalname);
    var blob = bucket.file(filePath);
    var blobStream = blob.createWriteStream({
      gzip: true,
      metadata: metadata
    });
    blobStream.on('error', function (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error uploading file to Firebase'
      });
    });
    blobStream.on('finish', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var publicUrl, imageRouteStudyUrl, _imageRouteStudyUrl3, valueImageRouteStudyUrl;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            // Get the public URL of the file
            publicUrl = "https://storage.googleapis.com/".concat(bucket.name, "/").concat(blob.name);
            _context8.next = 3;
            return blob.getSignedUrl({
              action: 'read',
              expires: '03-09-2024'
            });
          case 3:
            imageRouteStudyUrl = _context8.sent;
            _imageRouteStudyUrl3 = _slicedToArray(imageRouteStudyUrl, 1), valueImageRouteStudyUrl = _imageRouteStudyUrl3[0];
            res.status(200).json({
              message: 'File uploaded to Firebase successfully',
              url: valueImageRouteStudyUrl
            });
            console.log(valueImageRouteStudyUrl);
            // saveFileImage(valueImageRouteStudyUrl);
          case 7:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    })));
    blobStream.end(imageCourseUpdate.buffer);
  });
  router.post('/api/admin-dashboard/user-management/post/image-change', middlewareTokenAdmin, upload.single('avataUserUpdate'), function (req, res) {
    var avataUserUpdate = req.file;
    var metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuid()
      },
      contentType: avataUserUpdate.mimetype,
      cacheControl: 'public, max-age=31536000'
    };
    var bucket = firebase.storage().bucket();
    var filePath = "avataUserUpdate/".concat(uuid() + '--' + avataUserUpdate.originalname);
    var blob = bucket.file(filePath);
    var blobStream = blob.createWriteStream({
      gzip: true,
      metadata: metadata
    });
    blobStream.on('error', function (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error uploading file to Firebase'
      });
    });
    blobStream.on('finish', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      var publicUrl, imageRouteStudyUrl, _imageRouteStudyUrl4, valueImageRouteStudyUrl;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            // Get the public URL of the file
            publicUrl = "https://storage.googleapis.com/".concat(bucket.name, "/").concat(blob.name);
            _context9.next = 3;
            return blob.getSignedUrl({
              action: 'read',
              expires: '03-09-2024'
            });
          case 3:
            imageRouteStudyUrl = _context9.sent;
            _imageRouteStudyUrl4 = _slicedToArray(imageRouteStudyUrl, 1), valueImageRouteStudyUrl = _imageRouteStudyUrl4[0];
            res.status(200).json({
              message: 'File uploaded to Firebase successfully',
              url: valueImageRouteStudyUrl
            });
            console.log(valueImageRouteStudyUrl);
          case 7:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    })));
    blobStream.end(avataUserUpdate.buffer);
  });
  router.post('/api/admin-dashboard/course-detail/post', middlewareTokenAdmin, upload.array(), function (req, res) {
    var _req$body5 = req.body,
      addInCourse = _req$body5.addInCourse,
      descriptionDetail = _req$body5.descriptionDetail,
      weLearn = _req$body5.weLearn,
      teacher = _req$body5.teacher,
      ta = _req$body5.ta;
    var userUp = req.user.id;
    var currentDate = new Date();
    var dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
    var formPost = [addInCourse, dateUp, descriptionDetail, weLearn, teacher, ta, userUp];
    console.log(formPost);
    db.execute('INSERT INTO `lms_schema`.`course_detail` (`id_detail`,`date_up`, `description_detail`, `we_learn`, `teacher`, `ta`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?)', formPost).then(function (response) {
      var _response36 = _slicedToArray(response, 1),
        dataPost = _response36[0];
      res.status(200).json({
        Message: 'Post successfully',
        status: dataPost
      });
    })["catch"](function (err) {
      return res.status(404).json({
        message: err.message,
        status: err.status
      });
    });
  });

  //......................................(PUT)....................................................................

  router.put('/api/admin-dashboard/course-detail/update/:id', middlewareTokenAdmin, upload.array(), function (req, res) {
    var _req$body6 = req.body,
      addInCourseChange = _req$body6.addInCourseChange,
      courseNameUpdate = _req$body6.courseNameUpdate,
      weLearn = _req$body6.weLearn,
      teacher = _req$body6.teacher,
      ta = _req$body6.ta;
    var userId = req.user.id;
    var currentDate = new Date();
    var dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
    var formPut = [dateUp, courseNameUpdate, weLearn, teacher, ta, userId, addInCourseChange];
    return db.execute('UPDATE `lms_schema`.`course_detail` SET `date_up` = ?, `description_detail` = ?, `we_learn` = ?, `teacher` = ?, `ta` = ?, `user_id` = ? WHERE (`id_detail` = ?)', formPut).then(function (response) {
      var _response37 = _slicedToArray(response, 1),
        data = _response37[0];
      console.log('updateIfIsContainImage', data);
      return res.status(200).json({
        message: 'Update Successfully',
        status: data
      });
    })["catch"](function (err) {
      return res.status(500).json({
        message: err.message,
        status: err.status
      });
    });
  });
  router.put('/api/admin-dashboard/learn/update/:id', middlewareTokenAdmin, upload.array(), function (req, res) {
    var id = req.params.id;
    var _req$body7 = req.body,
      addInCourse = _req$body7.addInCourse,
      titleLearn = _req$body7.titleLearn,
      ratingContent = _req$body7.ratingContent,
      ratingNumber = _req$body7.ratingNumber;
    console.log(addInCourse, titleLearn, ratingContent, ratingNumber);
    var formPut = [titleLearn, ratingContent, ratingNumber, addInCourse, id];
    return db.execute('UPDATE `lms_schema`.`learn` SET `title` = ?, `rating_content` = ?, `rating_number` = ?, `detail_id` = ? WHERE (`id_learn` = ?)', formPut).then(function (response) {
      var _response38 = _slicedToArray(response, 1),
        data = _response38[0];
      console.log('updateIfIsContainImage', data);
      return res.status(200).json({
        message: 'Update Successfully',
        status: data
      });
    })["catch"](function (err) {
      return res.status(500).json({
        message: err.message,
        status: err.status
      });
    });
  });
  router.put('/api/admin-dashboard/user-management/:id', middlewareTokenAdmin, upload.array(), function (req, res) {
    var id = req.params.id;
    var _req$body8 = req.body,
      username = _req$body8.username,
      fullName = _req$body8.fullName,
      email = _req$body8.email,
      dob = _req$body8.dob,
      phoneNumber = _req$body8.phoneNumber,
      gender = _req$body8.gender,
      role = _req$body8.role,
      classBelongs = _req$body8.classBelongs,
      setRoute = _req$body8.setRoute,
      imageUpdate = _req$body8.imageUpdate;
    console.log(classBelongs);
    console.log(req.body);
    db.execute('select * from route_study where id_route = ?', [id]).then(function (response) {
      var _response39 = _slicedToArray(response, 1),
        data = _response39[0];
      if (imageUpdate) {
        var formhasImage = [username, fullName, email, imageUpdate, dob, phoneNumber, gender, Number(classBelongs), role, setRoute, id];
        return db.execute('UPDATE `lms_schema`.`users` SET `username` = ?, `full_name` = ?, `email` = ?, `avatarUrl` = ?, `dob` = ?, `phone_number` = ?, `gender` = ?, `classIdClass` = ?, `role` = ?, `set_route` = ? WHERE (`id` = ?)', formhasImage).then(function (response) {
          var _response40 = _slicedToArray(response, 1),
            data = _response40[0];
          return res.status(200).json({
            message: 'Update Successfully',
            status: data
          });
        })["catch"](function (err) {
          return res.status(500).json({
            message: err.message,
            status: err.status
          });
        });
      }
      var formNotHasImage = [username, fullName, email, dob, phoneNumber, gender, Number(classBelongs), role, setRoute, id];
      return db.execute('UPDATE `lms_schema`.`users` SET `username` = ?, `full_name` = ?, `email` = ?, `dob` = ?, `phone_number` = ?, `gender` = ?, `classIdClass` = ?, `role` = ?, `set_route` = ? WHERE (`id` = ?)', formNotHasImage).then(function (response) {
        var _response41 = _slicedToArray(response, 1),
          data = _response41[0];
        return res.status(200).json({
          message: 'Update Successfully',
          status: data
        });
      })["catch"](function (err) {
        return res.status(500).json({
          message: err.message,
          status: err.status
        });
      });
    })["catch"](function (err) {
      return res.status(404).json({
        error: err,
        message: 'Not found'
      });
    });
  });
  router.put('/api/admin-dashboard/route-study/update/:id', middlewareTokenAdmin, upload.array(), function (req, res) {
    var id = req.params.id;
    var currentDate = new Date();
    var dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
    var _req$body9 = req.body,
      routeNameUpdate = _req$body9.routeNameUpdate,
      descriptionUpdate = _req$body9.descriptionUpdate,
      imageUpdate = _req$body9.imageUpdate,
      totalTimeUpdate = _req$body9.totalTimeUpdate;
    console.log(routeNameUpdate, descriptionUpdate, totalTimeUpdate);
    db.execute('select * from route_study where id_route = ?', [id]).then(function (response) {
      var _response42 = _slicedToArray(response, 1),
        data = _response42[0];
      console.log(data);
      if (imageUpdate) {
        return db.execute('update lms_schema.route_study set route_name = ?, date_up = ?, description_route = ?, image_route = ?, total_time_route = ? where id_route = ?', [routeNameUpdate, dateUp, descriptionUpdate, imageUpdate, totalTimeUpdate, id]).then(function (response) {
          var _response43 = _slicedToArray(response, 1),
            data = _response43[0];
          console.log('updateIfIsContainImage', data);
          return res.status(200).json({
            message: 'Update Successfully',
            status: data
          });
        })["catch"](function (err) {
          return res.status(500).json({
            message: err.message,
            status: err.status
          });
        });
      }
      return db.execute('update lms_schema.route_study set route_name = ?, date_up = ?, description_route = ?, total_time_route = ? where id_route = ?', [routeNameUpdate, dateUp, descriptionUpdate, totalTimeUpdate, id]).then(function (response) {
        var _response44 = _slicedToArray(response, 1),
          data = _response44[0];
        console.log('updateIfIsNotContainImage', data);
        return res.status(200).json({
          message: 'Update Successfully',
          status: data
        });
      })["catch"](function (err) {
        return res.status(500).json({
          message: err.message,
          status: err.status
        });
      });
    })["catch"](function (err) {
      return res.status(404).json({
        error: err,
        message: 'Not found'
      });
    });
  });
  router.put('/api/admin-dashboard/course/update/:id', middlewareTokenAdmin, upload.array(), function (req, res) {
    console.log(req.body);
    var id = req.params.id;
    var currentDate = new Date();
    var dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
    var _req$body10 = req.body,
      addInRouteChange = _req$body10.addInRouteChange,
      courseNameUpdate = _req$body10.courseNameUpdate,
      descriptionUpdate = _req$body10.descriptionUpdate,
      levelCourseUpdate = _req$body10.levelCourseUpdate,
      imageUpdate = _req$body10.imageUpdate,
      totalTimeUpdate = _req$body10.totalTimeUpdate;
    var formUpdate = [dateUp, courseNameUpdate, imageUpdate, descriptionUpdate, levelCourseUpdate, totalTimeUpdate, addInRouteChange, id];
    db.execute('select * from course where id_course = ?', [id]).then(function (response) {
      var _response45 = _slicedToArray(response, 1),
        data = _response45[0];
      console.log(data);
      if (imageUpdate) {
        return db.execute('UPDATE `lms_schema`.`course` SET `date_up` = ?, `course_name` = ?, `image_course` = ?, `description_course` = ?, `level` = ?, `time_learn_course` = ?, `route_id` = ? WHERE `id_course` = ?', formUpdate).then(function (response) {
          var _response46 = _slicedToArray(response, 1),
            data = _response46[0];
          console.log('updateIfIsContainImage', data);
          return res.status(200).json({
            message: 'Update Successfully',
            status: data
          });
        })["catch"](function (err) {
          return res.status(500).json({
            message: err.message,
            status: err.status
          });
        });
      }
      return db.execute('UPDATE `lms_schema`.`course` SET `date_up` = ?, `course_name` = ?, `description_course` = ?, `level` = ?, `time_learn_course` = ?, `route_id` = ? WHERE `id_course` = ?', [dateUp, courseNameUpdate, descriptionUpdate, levelCourseUpdate, totalTimeUpdate, addInRouteChange, id]).then(function (response) {
        var _response47 = _slicedToArray(response, 1),
          data = _response47[0];
        console.log('updateIfIsNotContainImage', data);
        return res.status(200).json({
          message: 'Update Successfully',
          status: data
        });
      })["catch"](function (err) {
        return res.status(500).json({
          message: err.message,
          status: err.status
        });
      });
    })["catch"](function (err) {
      return res.status(404).json({
        error: err,
        message: 'Not found'
      });
    });
  });
  router.put('/api/admin-dashboard/doc/update/:id', middlewareTokenAdmin, upload.array(), function (req, res) {
    console.log(req.body);
    var id = req.params.id;
    var currentDate = new Date();
    var dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
    var _req$body11 = req.body,
      addInCourseChange = _req$body11.addInCourseChange,
      addInLearnChange = _req$body11.addInLearnChange,
      docNameUpdate = _req$body11.docNameUpdate,
      locking = _req$body11.locking,
      arrange = _req$body11.arrange,
      imageUpdate = _req$body11.imageUpdate;
    var formUpdate = [dateUp, docNameUpdate, imageUpdate, locking, arrange, addInCourseChange, addInLearnChange, id];
    db.execute('select * from doc where id_doc = ?', [id]).then(function (response) {
      var _response48 = _slicedToArray(response, 1),
        data = _response48[0];
      console.log(data);
      if (imageUpdate) {
        return db.execute('UPDATE `lms_schema`.`doc` SET `date_up` = ?, `doc_name` = ?, `url` = ?, `lock` = ?, `id_arrange` = ?, `course_id` = ?, `learn_id` = ? WHERE `id_doc` = ?', formUpdate).then(function (response) {
          var _response49 = _slicedToArray(response, 1),
            data = _response49[0];
          return res.status(200).json({
            message: 'Update Successfully',
            status: data
          });
        })["catch"](function (err) {
          return res.status(500).json({
            message: err.message,
            status: err.status
          });
        });
      }
      return db.execute('UPDATE `lms_schema`.`doc` SET `date_up` = ?, `doc_name` = ?, `lock` = ?, `id_arrange` = ?, `course_id` = ?, `learn_id` = ? WHERE `id_doc` = ?', [dateUp, docNameUpdate, locking, arrange, addInCourseChange, addInLearnChange, id]).then(function (response) {
        var _response50 = _slicedToArray(response, 1),
          data = _response50[0];
        return res.status(200).json({
          message: 'Update Successfully',
          status: data
        });
      })["catch"](function (err) {
        return res.status(500).json({
          message: err.message,
          status: err.status
        });
      });
    })["catch"](function (err) {
      return res.status(404).json({
        error: err,
        message: 'Not found'
      });
    });
  });
  router.post('/api/admin-dashboard/user-management', function (req, res) {});
  router.post('/api/v1/admin-register', upload.none(), userRegister);
  router.post('/api/v1/admin-login', upload.none(), adminLogin);
  return app.use('/router', router);
};
// function callback................................................................
var saveFilePdf = function saveFilePdf(pdfUrl) {
  db.execute('select count(id_doc) as id_doc from doc').then(function (response) {
    var _response51 = _slicedToArray(response, 1),
      idDoc = _response51[0];
    var id = idDoc[0].id_doc + 1;
    db.execute('INSERT INTO `lms_schema`.`doc` (`id_doc`, `url`) VALUES (?, ?)', [id, pdfUrl]).then(function (response) {
      console.log(response);
    })["catch"](function (err) {
      console.log(err);
    });
  })["catch"](function (err) {
    console.log(err);
  });
};
var saveImageRouteStudy = function saveImageRouteStudy(imageRouteStudy) {
  db.execute('insert into route_study (id_route, image_route, user_id) values (?, ?, ?)').then(function (response) {
    return console.log(response);
  })["catch"](function (err) {
    return console.log(err);
  });
};
module.exports = initRoutes;