const express = require('express');
const path = require('path');
/**
*
@param {*} app
*/
const configViewEngine = (app) => {
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');
    app.set('trust proxy', 1);
    app.use(express.static(path.join(__dirname, '../public')));
};
module.exports = configViewEngine;