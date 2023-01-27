const { db } = require('../utils/database.js');
const { modelUserRegister, modelUserLogin, modelHome, modelAdminLogin, modelHomeAdmin } = require('../models/lms.user.model.js');

module.exports.userRegister = (req, res, next) => {
    let { email, username, password, confirmPassword, role } = req.body;
    console.log(email, username, password, confirmPassword, role);
    return modelUserRegister(email, username, password, confirmPassword, role, req, res, next);
}
module.exports.userLogin = (req, res, next) => {
    const { username, password } = req.body;
    findUser(username, function (err, user) {
        if (err) {
            // If there is an error, render the login form with an error message
            res.render('login.ejs', { error: 'An error occurred. Please try again later' })
        }
        else if (!user) {
            // If no user with the matching username is found, render the login form with an error message
            res.render('login.ejs', { error: 'Invalid username or password' });
        }
        else {
            return modelUserLogin(user, password, req, res, next);
        };
    });
};
// login của admin
module.exports.adminLogin = (req, res, next) => {
    const { username, password } = req.body;
    findAdmin(username, function (err, user) {
        if (err) {
            // If there is an error, render the login form with an error message
            res.render('admin-login.ejs', { error: 'An error occurred. Please try again later' })
        }
        else if (!user) {
            // If no user with the matching username is found, render the login form with an error message
            res.render('admin-login.ejs', { error: 'Invalid username or password' });
        }
        else {
            return modelAdminLogin(user, password, req, res, next);
        };
    });
};
module.exports.home = (req, res) => {
    return modelHome(req, res);
};
module.exports.homeAdmin = (req, res) => {
    return modelHomeAdmin(req, res);
};
//function callback
let findUser = (username, callback) => {
    db.execute('select * from users where username = ?', [username])
        .then(response => {
            let [rows] = response;
            let user = rows.find(element => element.username === username)
            if (user && user.role === 'user') {
                console.log(user);
                return callback(null, response[0]);
            }
            return callback(null, null);
        })
        .catch(err => {
            console.log(err);
            return callback(err, null);
        });
};
// validate của admin
let findAdmin = (username, callback) => {
    db.execute('select * from users where username = ?', [username])
        .then(response => {
            let [rows] = response;
            let user = rows.find(element => element.username === username)
            if (user && user.role === 'admin') {
                console.log(user);
                return callback(null, response[0]);
            }
            return callback(null, null);
        })
        .catch(err => {
            console.log(err);
            return callback(err, null);
        });
};