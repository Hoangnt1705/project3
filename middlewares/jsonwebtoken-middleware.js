const jwt = require('jsonwebtoken');
const secret = 'secret';
const { db } = require('../utils/database.js');
const localStorage = require('localstorage-memory');
// global.localStorage = new LocalStorage();
// cách thức xác nhận trong jwt 
// The jwt.verify method uses a secret or public key as a parameter to verify the signature of a JSON Web Token (JWT). The secret or public key is used to ensure the integrity of the JWT, by verifying that it was not tampered with.
// When the JWT is generated, a secret key is used to create a digital signature for the token, which is added to the token as the third part. When the JWT is received by the server, the jwt.verify method uses the secret key that was used to create the signature to verify that the signature on the token is valid, and the token has not been tampered with. If the signature is invalid, the jwt.verify method will throw an error.
// The secret key is known only by the server and the client and should be kept secret. If an attacker were to obtain the secret key, they could create a token with the same signature, and gain access to the protected resources.
// The use of a secret key ensures that the token can only be verified by the intended recipient (server) and ensures that the data in the JWT has not been tampered with.
module.exports.middlewareTokenUser = (req, res, next) => {
    // get token in the req.cookie
    console.log("tokenUserMiddle>>", req.headers.cookie);
    let tokens = req.headers.cookie.split(';');
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i].trim();
        let [name, value] = token.split('=');
        // sử dụng array destructurings để phân ra name và value dựa trên split '=', khi sử dụng name 
        // dưới switch case thì sẽ dựa vào name để lấy value đó
        if (!name) return res.status(500).json("Access denied, no token provided")
        try {

            switch (name) {
                case 'tokenUser':
                    let decode = jwt.verify(value, secret);
                    req.user = decode;
                    console.log("decode>>", decode);
                    next();
                    break;
                default:
                    break;
            }
        } catch (error) {
            return res.status(404).json({ message: error });
        };
    };
};

module.exports.verifyLogin = (req, res, next) => {
    let openDoorName = [];
    let openDoorValue = [];
    let tokens = req.headers.cookie.split(';');
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i].trim();
        let [name, value] = token.split('=');
        openDoorName.push(name);
        if (openDoorName.indexOf('tokenUser') !== -1) {
            openDoorValue.push(value);
        };
    };
    jwt.verify(openDoorValue[0], secret, (err, claims) => {
        if (err) {
            res.redirect('/router/login');
        }
        if (openDoorName.indexOf('tokenUser') !== -1 && claims) {
            db.execute('select id from users where id = ? ', [claims.id])
                .then(response => {
                    let [verifyLast] = response;
                    if (verifyLast) {
                        next();
                    };
                })
                .catch(err => {
                    res.status(404).json({ message: err });
                });
        };
    });
}


module.exports.verifyLoginHome = (req, res, next) => {
    let openDoorName = [];
    let openDoorValue = [];
    let putInfoAccount;
    let tokens = req.headers.cookie.split(';');
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i].trim();
        let [name, value] = token.split('=');
        openDoorName.push(name);
        if (openDoorName.indexOf('tokenUser') !== -1) {
            openDoorValue.push(value);
        };
    };
    // gọi tên biến mẹ mà đang ở trong method async chính trong biến đó thì sẽ báo lỗi before initialization
    // vd: let decode = jwt.verify(value, secret, (err, claims)=> { return decode });
    jwt.verify(openDoorValue[0], secret, (err, claims) => {
        if (err) {
            console.log("checkMiss>>", openDoorName.indexOf('tokenUser'));
            putInfoAccount = `Đăng nhập`;
            return db.execute('select * from route_study limit 6')
                .then(response => {
                    let [dataRouteStudyHome] = response;
                    return db.execute('select * from course limit 8')
                        .then(response => {
                            let [dataCourseHome] = response;
                            return db.execute('select route_id, count(id_course) as id_course from course group by route_id')
                                .then(response => {
                                    let [dataMatchCourseRoute] = response;
                                    console.log(dataMatchCourseRoute);
                                    let renderForm = { putInfoAccount: putInfoAccount, dataRouteStudyHome, dataCourseHome, dataMatchCourseRoute }
                                    return res.render('index.ejs', renderForm)
                                })
                        })
                        .catch(err => res.status(404).json({ error: err, message: err.message }));

                })
                .catch(err => res.status(404).json({ error: err, message: err.message }));
        }
        if (openDoorName.indexOf('tokenUser') !== -1 && claims) {
            db.execute('select id from users where id = ? ', [claims.id])
                .then(response => {
                    let [verifyLast] = response;
                    if (verifyLast) {
                        next();
                    };
                })
                .catch(err => {
                    res.status(404).json({ message: err });
                });
        };
    });
}
// admin.......................................................................
module.exports.middlewareTokenAdmin = (req, res, next) => {
    let tokens = req.headers.cookie.split(';');
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i].trim();
        let [name, value] = token.split('=');
        if (!name) return res.status(500).json("Access denied, no token provided");
        try {
            switch (name) {
                case 'tokenAdmin':
                    let decode = jwt.verify(value, secret);
                    req.user = decode
                    console.log("decoded Admin", decode);
                    next();
                    break;
                default:
                    break;
            };
        }
        catch (err) {
            return res.status(404).json({ message: error });
        };
    };
};
module.exports.verifyLoginAdmin = (req, res, next) => {
    let openDoorName = [];
    let openDoorValue = [];
    let tokens = req.headers.cookie.split(';');
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i].trim();
        let [name, value] = token.split('=');
        openDoorName.push(name);
        if (openDoorName.indexOf('tokenAdmin') !== -1) {
            openDoorValue.push(value);
        };
    };
    jwt.verify(openDoorValue[0], secret, (err, claims) => {
        if (err) {
            console.log("checkAdmin 88", openDoorName.indexOf('tokenAdmin'));
            return res.redirect('/router/admin-login');
        }
        if (openDoorName.indexOf('tokenAdmin') !== -1 && claims) {
            db.execute('select id from users where id = ?', [claims.id])
                .then(response => {
                    let [verifyLast] = response;
                    if (verifyLast) {
                        next();
                    };
                })
                .catch(err => {
                    res.status(404).json({ message: err });
                });
        };
    });
};


// Middleware to check if user has completed previous lesson
module.exports.checkProgress = (req, res, next) => {
    console.log(req.user);

    if (!req.user) {
        res.send('Please log in to access the lesson.');
    } else {
        const currentLesson = req.params.id;
        console.log(currentLesson);
        db.execute(`SELECT completed_docs FROM users WHERE username = ?`, [req.user.name])
            .then(response => {
                let [user] = response;
                let userChunkIncludes = user[0].completed_docs.split(',');
                console.log(userChunkIncludes.includes(currentLesson));
            })
            .catch(err => res.status(200).json({ message: err }));



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