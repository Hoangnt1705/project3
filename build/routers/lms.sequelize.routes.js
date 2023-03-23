"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// const fs = require('fs');
// const cookieParser = require('cookie-parser');
// const path = require('path');
// const uuid = require('uuid-v4');
var express = require('express');
var routerSequelize = express.Router();
var path = require('path');
/** 
 * 
 * @param {*} app : express app
 */
//config bodyParser
var bodyParser = require('body-parser');
routerSequelize.use(bodyParser.json());
routerSequelize.use(bodyParser.urlencoded({
  extended: true
}));
var multer = require('multer');
var upload = multer({
  storage: multer.memoryStorage()
});
var _require = require('../middlewares/jsonwebtoken-middleware.js'),
  middlewareTokenUser = _require.middlewareTokenUser,
  middlewareTokenAdmin = _require.middlewareTokenAdmin,
  verifyLoginAdmin = _require.verifyLoginAdmin,
  verifyLogin = _require.verifyLogin;
var _require2 = require('../middlewares/middleware.sequelize'),
  test = _require2.test;
//middleware import 
var _require3 = require('../service/tableSequelize'),
  Class = _require3.Class,
  Users = _require3.Users,
  RouteStudy = _require3.RouteStudy,
  Learn = _require3.Learn,
  Doc = _require3.Doc,
  PoolDocCompleted = _require3.PoolDocCompleted,
  Course = _require3.Course,
  PoolCourseCompleted = _require3.PoolCourseCompleted;
var _require4 = require('@babel/core/lib/config/files/index.js'),
  resolveShowConfigPath = _require4.resolveShowConfigPath;
// const { sequelize } = require('../service/connectSequelize');
// const classa = await Class.findByPk(7); đây là find theo primary key 
// let user = await classa.dataValues
// console.log(user);
Class.hasMany(Users);
Users.belongsTo(Class, {
  foreignKey: 'classIdClass'
});
RouteStudy.hasMany(Class);
Class.belongsTo(RouteStudy, {
  foreignKey: 'routeStudyIdRoute'
});
RouteStudy.hasMany(Course);
Course.belongsTo(RouteStudy, {
  foreignKey: 'routeStudyIdRoute'
});
Users.hasMany(Learn);
Learn.belongsTo(Users, {
  foreignKey: 'user_id'
});
Learn.hasMany(Doc);
Doc.belongsTo(Learn, {
  foreignKey: 'learn_id'
});
Course.hasMany(Doc);
Doc.belongsTo(Course, {
  foreignKey: 'courseIdCourse'
});
Course.hasMany(PoolDocCompleted);
PoolDocCompleted.belongsTo(Course, {
  foreignKey: 'courseIdCourse'
});
Doc.belongsToMany(Users, {
  through: 'pool_doc_completed',
  foreignkey: 'user_id'
});
PoolDocCompleted.belongsTo(Doc, {
  foreignKey: 'doc_id',
  otherKey: 'learn_id'
});
Doc.hasMany(PoolDocCompleted, {
  foreignKey: 'learn_id'
});
Doc.hasMany(PoolDocCompleted, {
  foreignKey: 'user_id'
});
// define table sequelize; 
var initRoutesSequelize = function initRoutesSequelize(app) {
  routerSequelize.post('/api/save-recognition', function (req, res) {
    var _req$body = req.body,
      name = _req$body.name,
      timestamp = _req$body.timestamp;
  });
  routerSequelize.get('/my-class', verifyLogin, middlewareTokenUser, /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
      var idUserMatchAccount, putInfoAccount, userMyClass, userMyClassStudyParse, dataUser, dataClass;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            idUserMatchAccount = req.user.id;
            putInfoAccount = 'Verify successfully';
            _context.next = 5;
            return Users.findByPk(idUserMatchAccount);
          case 5:
            userMyClass = _context.sent;
            userMyClassStudyParse = userMyClass.dataValues;
            dataUser = [];
            dataUser.push(userMyClassStudyParse);
            _context.next = 11;
            return Class.findOne({
              where: {
                id_class: userMyClassStudyParse.classIdClass
              }
            });
          case 11:
            dataClass = _context.sent;
            console.log(dataClass.dataValues);
            res.render('my-class.ejs', {
              putInfoAccount: putInfoAccount,
              dataUser: dataUser,
              dataClass: dataClass.dataValues
            });
            _context.next = 19;
            break;
          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            res.status(500).send({
              message: _context.t0
            });
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 16]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  routerSequelize.get('/point-history', verifyLogin, middlewareTokenUser, /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
      var idUserMatchAccount, putInfoAccount, userMyRouteStudy, userMyRouteStudyParse, dataUser;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            idUserMatchAccount = req.user.id;
            putInfoAccount = 'Verify successfully';
            _context2.next = 5;
            return Users.findByPk(idUserMatchAccount);
          case 5:
            userMyRouteStudy = _context2.sent;
            userMyRouteStudyParse = userMyRouteStudy.dataValues;
            dataUser = [];
            dataUser.push(userMyRouteStudyParse);
            res.render('point-history.ejs', {
              putInfoAccount: putInfoAccount,
              dataUser: dataUser
            });
            _context2.next = 15;
            break;
          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            res.status(500).send({
              message: _context2.t0
            });
          case 15:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 12]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  routerSequelize.get('/exam-history', verifyLogin, middlewareTokenUser, /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
      var idUserMatchAccount, putInfoAccount, userMyRouteStudy, userMyRouteStudyParse, dataUser;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            idUserMatchAccount = req.user.id;
            putInfoAccount = 'Verify successfully';
            _context3.next = 5;
            return Users.findByPk(idUserMatchAccount);
          case 5:
            userMyRouteStudy = _context3.sent;
            userMyRouteStudyParse = userMyRouteStudy.dataValues;
            dataUser = [];
            dataUser.push(userMyRouteStudyParse);
            res.render('exam-history.ejs', {
              putInfoAccount: putInfoAccount,
              dataUser: dataUser
            });
            _context3.next = 15;
            break;
          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            res.status(500).send({
              message: _context3.t0
            });
          case 15:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 12]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
  routerSequelize.get('/recently-course', verifyLogin, middlewareTokenUser, /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
      var idUserMatchAccount, putInfoAccount, userrRecently, userrRecentlyParse, dataUser, dataCourse, dataRecentlyCourse, dataRecentlyCourseConvert, dataRecentlyCourseConvertGetCourse, resultRecentlyCourse, dataLearn, dataPoolDocCompleted;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            idUserMatchAccount = req.user.id;
            putInfoAccount = 'Verify successfully';
            _context4.next = 5;
            return Users.findByPk(idUserMatchAccount);
          case 5:
            userrRecently = _context4.sent;
            userrRecentlyParse = userrRecently.dataValues;
            dataUser = [];
            dataUser.push(userrRecentlyParse);
            _context4.next = 11;
            return Course.findAll();
          case 11:
            dataCourse = _context4.sent;
            _context4.next = 14;
            return PoolDocCompleted.findAll({
              where: {
                courseIdCourse: dataCourse.map(function (course) {
                  return course.id_course;
                }),
                user_id: idUserMatchAccount,
                class_id: userrRecentlyParse.classIdClass
              },
              include: {
                model: Course,
                include: {
                  model: Doc
                }
              },
              order: [['date_up', 'DESC']],
              limit: 3
            });
          case 14:
            dataRecentlyCourse = _context4.sent;
            dataRecentlyCourseConvert = dataRecentlyCourse.map(function (recently) {
              return recently.course;
            });
            dataRecentlyCourseConvertGetCourse = dataRecentlyCourseConvert.map(function (course) {
              return course.dataValues;
            });
            resultRecentlyCourse = dataRecentlyCourseConvertGetCourse.reduce(function (acc, course) {
              if (!acc.find(function (c) {
                return c.id_course === course.id_course;
              })) {
                acc.push(course);
              }
              ;
              return acc;
            }, []);
            _context4.next = 20;
            return Learn.findAll();
          case 20:
            dataLearn = _context4.sent;
            _context4.next = 23;
            return PoolDocCompleted.findAll({
              where: {
                courseIdCourse: resultRecentlyCourse.map(function (course) {
                  return course.id_course;
                }),
                class_id: userrRecentlyParse.classIdClass,
                user_id: req.user.id,
                learn_id: dataLearn.map(function (learn) {
                  return learn.id_learn;
                })
              },
              raw: true
            });
          case 23:
            dataPoolDocCompleted = _context4.sent;
            if (resultRecentlyCourse.length !== 0) {
              res.render('recently-course.ejs', {
                putInfoAccount: putInfoAccount,
                dataUser: dataUser,
                resultRecentlyCourse: resultRecentlyCourse,
                dataPoolDocCompleted: dataPoolDocCompleted
              });
            } else {
              res.render('recently-course.ejs', {
                putInfoAccount: putInfoAccount,
                dataUser: dataUser,
                resultRecentlyCourse: undefined,
                dataPoolDocCompleted: undefined
              });
            }
            _context4.next = 31;
            break;
          case 27:
            _context4.prev = 27;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            res.status(500).send({
              message: _context4.t0
            });
          case 31:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 27]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
  routerSequelize.post('/api/v1/pool-course-completed/post', middlewareTokenUser, /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
      var _req$body2, idClassPoolCourse, idRoutePoolCourse, idCoursePoolCourse, currentDate, dateUp;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body2 = req.body, idClassPoolCourse = _req$body2.idClassPoolCourse, idRoutePoolCourse = _req$body2.idRoutePoolCourse, idCoursePoolCourse = _req$body2.idCoursePoolCourse;
            currentDate = new Date();
            dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
            _context5.next = 6;
            return PoolCourseCompleted.create({
              date_up: dateUp,
              class_id: idClassPoolCourse,
              userId: req.user.id,
              route_id: idRoutePoolCourse,
              course_id: idCoursePoolCourse
            }).then(function (response) {
              return res.status(200).json({
                message: response
              });
            });
          case 6:
            _context5.next = 12;
            break;
          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            res.status(500).send({
              message: _context5.t0
            });
          case 12:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 8]]);
    }));
    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
  routerSequelize.get('/my-router', verifyLogin, middlewareTokenUser, upload.none(), /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
      var idUserMatchAccount, putInfoAccount, userMyRouteStudy, userMyRouteStudyParse, dataUser, resultMyRouteStudy, dataRouteStudy, dataPoolCourseCompleted, routeStudyData;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            idUserMatchAccount = req.user.id;
            putInfoAccount = 'Verify successfully';
            _context6.next = 4;
            return Users.findByPk(idUserMatchAccount);
          case 4:
            userMyRouteStudy = _context6.sent;
            userMyRouteStudyParse = userMyRouteStudy.dataValues;
            dataUser = [];
            dataUser.push(userMyRouteStudyParse);
            _context6.next = 10;
            return Users.findOne({
              where: {
                id: req.user.id
              },
              include: {
                model: Class,
                attributes: ['id_class'],
                include: {
                  model: RouteStudy,
                  include: {
                    model: Course,
                    attributes: ['id_course']
                  }
                }
              }
            });
          case 10:
            resultMyRouteStudy = _context6.sent;
            _context6.next = 13;
            return RouteStudy.findAll();
          case 13:
            dataRouteStudy = _context6.sent;
            _context6.next = 16;
            return PoolCourseCompleted.findAll({
              where: {
                class_id: userMyRouteStudyParse.classIdClass,
                user_id: req.user.id,
                route_id: dataRouteStudy.map(function (route) {
                  return route.id_route;
                })
              },
              raw: true
            });
          case 16:
            dataPoolCourseCompleted = _context6.sent;
            if (resultMyRouteStudy && resultMyRouteStudy["class"] && resultMyRouteStudy["class"].route_study && resultMyRouteStudy["class"].route_study.courses) {
              routeStudyData = resultMyRouteStudy["class"].route_study.get({
                plain: true
              });
              res.render('my-router.ejs', {
                putInfoAccount: putInfoAccount,
                dataUser: dataUser,
                routeStudyData: routeStudyData,
                dataPoolCourseCompleted: dataPoolCourseCompleted
              });
            } else {
              res.render('my-router.ejs', {
                putInfoAccount: putInfoAccount,
                dataUser: dataUser,
                routeStudyData: undefined,
                dataPoolCourseCompleted: undefined
              });
            }
          case 18:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
  routerSequelize.get('/admin-dashboard/class', verifyLoginAdmin, function (req, res) {
    res.render('admin-dashboard-class.ejs');
  });
  routerSequelize.get('/course/:id', middlewareTokenUser, verifyLogin, /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
      var id, idUserMatchAccount, putInfoAccount, userAttendance, userAttendanceParse, dataUser, courseBelong, courseBelongConvert;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            id = req.params.id;
            idUserMatchAccount = req.user.id;
            putInfoAccount = 'Verify successfully';
            _context7.next = 6;
            return Users.findByPk(idUserMatchAccount);
          case 6:
            userAttendance = _context7.sent;
            userAttendanceParse = userAttendance.dataValues;
            dataUser = [];
            dataUser.push(userAttendanceParse);
            _context7.next = 12;
            return Course.findAll({
              where: {
                route_id: id
              }
            });
          case 12:
            courseBelong = _context7.sent;
            courseBelongConvert = courseBelong.map(function (courseOf) {
              return courseOf.dataValues;
            });
            res.render('course-belong.ejs', {
              courseBelongConvert: courseBelongConvert,
              dataUser: dataUser,
              putInfoAccount: putInfoAccount
            });
            _context7.next = 20;
            break;
          case 17:
            _context7.prev = 17;
            _context7.t0 = _context7["catch"](0);
            res.status(500).send({
              message: _context7.t0
            });
          case 20:
            ;
          case 21:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 17]]);
    }));
    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());
  routerSequelize.get('/test1', middlewareTokenUser, verifyLogin, test, function (req, res) {
    Learn.findAll({
      include: [{
        model: Doc
        // where: {id: sequelize.col('classIdClass')} // add in condition
      }]
    }).then(function (response) {
      console.log(response);
    })["catch"](function (err) {
      console.log(err);
      res.status(500).send({
        message: err
      });
    });
  });
  routerSequelize.get('/admin-dashboard/class/update/form/:id', verifyLoginAdmin, /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
      var id, dataClassParams, dataRouteStudy, dataRouteStudyConvert;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            id = req.params.id;
            _context8.next = 4;
            return Class.findByPk(id);
          case 4:
            dataClassParams = _context8.sent;
            _context8.next = 7;
            return RouteStudy.findAll();
          case 7:
            dataRouteStudy = _context8.sent;
            dataRouteStudyConvert = dataRouteStudy.map(function (route) {
              return route.dataValues;
            });
            console.log(dataClassParams.dataValues);
            res.render('admin-dashboard-class-update-form.ejs', {
              dataRouteStudyConvert: dataRouteStudyConvert,
              dataClassParams: dataClassParams.dataValues
            });
            _context8.next = 16;
            break;
          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](0);
            res.status(500).send({
              message: err
            });
          case 16:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 13]]);
    }));
    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }());
  routerSequelize.put('/api/admin-dashboard/class/update/:id', middlewareTokenAdmin, upload.none(), /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
      var _req$body3, className, typeClass, startCeremony, endDate, setRoute, currentDate, dateUp;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _req$body3 = req.body, className = _req$body3.className, typeClass = _req$body3.typeClass, startCeremony = _req$body3.startCeremony, endDate = _req$body3.endDate, setRoute = _req$body3.setRoute;
            console.log(className, typeClass, startCeremony, endDate, setRoute);
            currentDate = new Date();
            dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
            _context9.next = 7;
            return Class.update({
              class_name: className,
              date_up: dateUp,
              type_class: typeClass,
              routeStudyIdRoute: setRoute,
              user_admin_id: req.user.id,
              start_date: startCeremony,
              end_date: endDate
            }, {
              where: {
                id_class: req.params.id
              }
            });
          case 7:
            res.status(200).json({
              message: 'successfully'
            });
            _context9.next = 13;
            break;
          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9["catch"](0);
            res.status(500).send({
              message: _context9.t0
            });
          case 13:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 10]]);
    }));
    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }());
  routerSequelize.get('/admin-dashboard/class/update', verifyLoginAdmin, /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            Class.findAll({
              include: [{
                model: Users
                // where: {id: sequelize.col('classIdClass')} // add in condition
              }]
            }).then(function (response) {
              res.render('admin-dashboard-class-update.ejs', {
                data: response
              });
            })["catch"](function (err) {
              res.status(500).send({
                message: err
              });
            });
          case 1:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    }));
    return function (_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }());
  //.......api..............
  routerSequelize.post('/api/admin-dashboard/class/create', middlewareTokenAdmin, upload.none(), /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
      var _req$body4, className, typeClass, startCeremony, currentDate, dateUp;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _req$body4 = req.body, className = _req$body4.className, typeClass = _req$body4.typeClass, startCeremony = _req$body4.startCeremony;
            currentDate = new Date();
            dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
            _context11.prev = 3;
            _context11.next = 6;
            return Class.create({
              class_name: className,
              date_up: dateUp,
              type_class: typeClass,
              routeStudyIdRoute: 1,
              user_admin_id: req.user.id,
              start_date: startCeremony,
              end_date: null
            });
          case 6:
            res.send({
              message: 'Error creating class!'
            });
            _context11.next = 12;
            break;
          case 9:
            _context11.prev = 9;
            _context11.t0 = _context11["catch"](3);
            console.log(_context11.t0);
          case 12:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[3, 9]]);
    }));
    return function (_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }());
  routerSequelize.post('/api/v1/pool-doc-completed/post', middlewareTokenUser, /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
      var _req$body5, idDocPool, classIdPool, courseIdPool, learnIdPool, arrangeIdPool, currentDate, dateUp;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _req$body5 = req.body, idDocPool = _req$body5.idDocPool, classIdPool = _req$body5.classIdPool, courseIdPool = _req$body5.courseIdPool, learnIdPool = _req$body5.learnIdPool, arrangeIdPool = _req$body5.arrangeIdPool;
            currentDate = new Date();
            dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
            PoolDocCompleted.create({
              date_up: dateUp,
              user_id: req.user.id,
              class_id: Number(classIdPool),
              courseIdCourse: Number(courseIdPool),
              learn_id: Number(learnIdPool),
              docIdDoc: Number(idDocPool),
              arrangeId: Number(arrangeIdPool)
            }).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
              var userId, learnData, docData, completedDocs, completedDocIds, lessonReadings, currentDoc, currentIndex, unlocked, locked, unlockedCombineCheckButtonCompleted, lockedCombineCheckButtonCompleted, resultCombineCheckButtonCompleted, resultLessonReadings, userData;
              return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                while (1) switch (_context12.prev = _context12.next) {
                  case 0:
                    userId = req.user.id; // assuming that the user ID is stored in req.user.id
                    _context12.prev = 1;
                    _context12.next = 4;
                    return Learn.findAll({
                      include: [{
                        model: Doc
                      }]
                    });
                  case 4:
                    learnData = _context12.sent;
                    _context12.next = 7;
                    return Doc.findAll({
                      where: {
                        course_id: courseIdPool,
                        learn_id: learnData.map(function (learn) {
                          return learn.id_learn;
                        })
                      }
                    });
                  case 7:
                    docData = _context12.sent;
                    _context12.next = 10;
                    return PoolDocCompleted.findAll({
                      where: {
                        learn_id: learnData.map(function (learn) {
                          return learn.id_learn;
                        }),
                        courseIdCourse: courseIdPool,
                        user_id: userId
                      },
                      // Có thể
                      // dùng array để xử lý điều kiện where để truy xuất dữ liệu với sequelize
                      attributes: ['arrangeId']
                    });
                  case 10:
                    completedDocs = _context12.sent;
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
                    res.status(200).json({
                      data: userData.resultLessonReadings,
                      resultCombineCheckButtonCompleted: resultCombineCheckButtonCompleted
                    });
                    _context12.next = 29;
                    break;
                  case 26:
                    _context12.prev = 26;
                    _context12.t0 = _context12["catch"](1);
                    console.log(_context12.t0);
                  case 29:
                  case "end":
                    return _context12.stop();
                }
              }, _callee12, null, [[1, 26]]);
            })))["catch"](function (err) {
              return console.log(err);
            });
          case 4:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    }));
    return function (_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }());
  routerSequelize.get('/admin-dashboard/class/update/:id', middlewareTokenAdmin, upload.none(), function (req, res) {
    var id = req.params.id;
    Class.findByPk(id).then(function (response) {
      res.render('class-dashboard-class-update.ejs', {
        data: response
      });
    })["catch"](function (err) {
      res.status(500).json({
        message: err
      });
    });
  });
  //return router.......................
  return app.use('/router', routerSequelize);
};
module.exports = initRoutesSequelize;