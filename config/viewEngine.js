const express = require('express');
/**
*
@param {*} app
*/
const configViewEngine = (app) => {
    app.set('view engine', 'ejs');
    app.set('trust proxy', 1);
    app.use(express.static('public'));

};
module.exports = configViewEngine;