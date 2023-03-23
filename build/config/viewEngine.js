"use strict";

var express = require('express');
var path = require('path');
/**
*
@param {*} app
*/
var configViewEngine = function configViewEngine(app) {
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.set('trust proxy', 1);
  app.use(express["static"](path.join(__dirname, '../public')));
};
module.exports = configViewEngine;