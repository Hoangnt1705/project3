const { attendanceModel } = require('../models/lms.model.sequelize');
// const canvas = require('canvas');
const faceapi = require('face-api.js');
const path = require('path');
module.exports.attendanceController = (req, res) => {
    let idUserMatchAccount = req.user.id;
    let putInfoAccount = 'Verify successfully';
    console.log(path.join(__dirname, '../public/weights'));
    return attendanceModel(req, res, idUserMatchAccount, putInfoAccount, faceapi);
};
