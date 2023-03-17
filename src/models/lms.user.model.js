const bcrypt = require('bcrypt');
const { db } = require('../utils/database.js');
const jwt = require('jsonwebtoken');
const secret = 'secret';
module.exports.courseGetModel = (req, res) => {
    return db.execute('select * from course')
        .then(response => {
            let [dataCourse] = response;
            console.log(dataCourse);
            let idUserMatchAccount = req.user.id;
            let putInfoAccount = 'Verify successfully';
            return db.execute('SELECT * FROM users WHERE id = ?', [idUserMatchAccount])
                .then(response => {
                    let [dataUser] = response;
                    console.log(dataUser);
                    return res.render('course.ejs', { dataCourse, putInfoAccount: putInfoAccount, dataUser });
                })
                .catch(err => res.status(404).json({ error: err, message: err.message }));
        })
        .catch(err => res.status(404).json({ err: err, message: 'Not found' }));
};

module.exports.controlPanelGetModel = (req, res, idUserMatchAccount, putInfoAccount) => {
    return db.execute('SELECT * FROM users WHERE id = ?', [idUserMatchAccount])
        .then(response => {
            let [dataUser] = response;
            console.log(dataUser);
            return res.render('control-panel.ejs', { putInfoAccount: putInfoAccount, dataUser });
        })
        .catch(err => res.status(404).json({ error: err, message: err.message }));
};
module.exports.routeStudyGetModel = (req, res, putInfoAccount) => {
    return db.execute('select * from route_study order by date_up desc')
        .then(response => {
            let [dataRoute] = response;
            let idUserMatchAccount = req.user.id;
            return db.execute('SELECT * FROM users WHERE id = ?', [idUserMatchAccount])
                .then(response => {
                    let [dataUser] = response;
                    console.log(dataUser);
                    return res.render('route-study.ejs', { putInfoAccount: putInfoAccount, dataRoute, dataUser });
                })
                .catch(err => res.status(404).json({ error: err, message: err.message }));
        })
        .catch(err => res.status(404).json({ err: err, message: 'Not found' }));
};

module.exports.modelUserRegister = (email, username, password, confirmPassword, role, req, res, next) => {
    return db.execute('select * from users')
        .then((response) => {
            const [rows] = response;
            let userCount = rows.length + 1;
            if (!validatePassword(password, confirmPassword)) {
                //If the password do not match, render the form with an error message
                res.render('register.ejs', { error: 'Password do not match' });
            }
            else if (validateUsername(username, rows)) {
                console.log({ error: 'Username duplicated' });
            }
            if (!validateUsername(username, rows) && validatePassword(password, confirmPassword)) {
                // If the form data is valid, hash the password
                bcrypt.hash(password, 10)
                    .then(hashedPassword => {
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
        })
        .catch(err => {
            next(err);
        });
};
module.exports.modelUserLogin = (user, password, req, res) => {
    // If a user with the matching username is found, compare the provided password to stored hash password
    console.log(user[0].role);
    return bcrypt.compare(password, user[0].password)
        .then(response => {
            // If the password match, set a cookie with the user's id and redirect to the dashboard 
            if (response) {
                let token = jwt.sign({ id: user[0].id, name: user[0].username }, secret, { expiresIn: '7d' });
                res.cookie('tokenUser', token, { httpOnly: true, secure: true, maxAge: 604800000 }).json('success');
                // req.session.LoginId = user[0].id;
            }
            else {
                // If the password do not match, render the login form with an error message
                res.render('login.ejs', { error: 'Invalid email or password' });
            }
        })
        .catch(err => console.log(err));
};
// đây là login của admin
module.exports.modelAdminLogin = (user, password, req, res) => {
    // If a user with the matching username is found, compare the provided password to stored hash password
    return bcrypt.compare(password, user[0].password)
        .then(response => {
            // If the password match, set a cookie with the user's id and redirect to the dashboard 
            if (response) {
                let token = jwt.sign({
                    id: user[0].id, name: user[0].username,
                    iat: Math.floor(Date.now() / 1000) - 30
                }, secret, { expiresIn: '7d' });
                res.cookie('tokenAdmin', token, { httpOnly: true, secure: true, maxAge: 604800000 }).json({ token });
                // req.session.LoginId = user[0].id;
            }
            else {
                // If the password do not match, render the login form with an error message
                res.render('admin-login.ejs', { error: 'Invalid email or password' });
            }
        })
        .catch(err => console.log(err));
};

module.exports.modelHome = (req, res) => {
    let { id } = req.user;
    console.log(id);
    return db.execute('select id, role from users')
        .then(response => {
            let [rows] = response;
            let user = rows.find(element => element.id === id);
            console.log(user);
            if (req.user && id && user.role === 'user') {
                getInfoUser(req, res);
            }
            else {
                res.status(404).json({ message: 'Invalid username or password' });
                res.redirect('/router/login');
            }
        })
        .catch(err => console.error(err));
};
module.exports.modelHomeAdmin = (req, res) => {
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
let validatePassword = (password, confirmPassword) => {
    console.log(password);
    return password === confirmPassword;
};
let validateUsername = (username, rows) => {
    let user = rows.find(element => element.username === username);
    console.log('user>>', user);
    return user;
};
let storeUser = (userCount, username, email, hashedPassword, role, req, res) => {
    return db.execute('INSERT INTO `lms_schema`.`users` (id, username, email, password, role) VALUES (?, ?, ?, ?, ?)', [userCount, username, email, hashedPassword, role])
        .then(response => {
            let [user] = response;
            res.status(200).json({ user: user, message: 'register successfully' });

        })
        .catch(err => {
            res.status(404).json({ err: err, message: 'Register fail' });
        });
};
let storeAdmin = (userCount, username, email, hashedPassword, role, req, res) => {
    return db.execute('INSERT INTO `lms_schema`.`users` (id, username, email, password, role) VALUES (?, ?, ?, ?, ?)', [userCount, username, email, hashedPassword, role])
        .then(response => {
            let [user] = response;
            res.status(200).json({ user: user, message: 'registelyr successfully' });
        })
        .catch(err => {
            res.status(404).json({ err: err, message: 'Register fail' });
        });
};
let getInfoUser = (req, res) => {
    let idUserMatchAccount = req.user.id;
    return db.execute('SELECT * FROM users WHERE id = ?', [idUserMatchAccount])
        .then(response => {
            let [dataUser] = response;
            let putInfoAccount = 'Verify successfully';
            return db.execute('select * from route_study order by date_up desc limit 6 ')
                .then(response => {
                    let [dataRouteStudyHome] = response;
                    return db.execute('select * from course order by date_up desc limit 8')
                        .then(response => {
                            let [dataCourseHome] = response;
                            return db.execute('select route_id, count(id_course) as id_course from course group by route_id ')
                                .then(response => {
                                    let [dataMatchCourseRoute] = response;
                                    console.log(dataMatchCourseRoute);
                                    let renderForm = { putInfoAccount: putInfoAccount, dataUser, dataRouteStudyHome, dataCourseHome, dataMatchCourseRoute };
                                    return res.render('index.ejs', renderForm);
                                });
                        })
                        .catch(err => res.status(404).json({ error: err, message: err.message }));

                })
                .catch(err => res.status(404).json({ error: err, message: err.message }));

        })
        .catch(err => res.status(404).json({ error: err, message: err.message }));
};