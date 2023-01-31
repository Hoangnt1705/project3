const cookieParser = require('cookie-parser');
const pdfjs = require('pdfjs-dist');
const path = require('path');
const canvas = require('canvas');
const uuid = require('uuid-v4');
const { db } = require('../utils/database.js');
const express = require('express');
const router = express.Router();
//config bodyParser
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const fs = require('fs');
const multer = require('multer');
// config firebase-admin
const firebase = require('firebase-admin');
const serviceAccount = require('../firebase/admin.json');
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    storageBucket: "gs://projectmodule3-c6f1d.appspot.com"
});
const upload = multer({ storage: multer.memoryStorage() });
//middleware import 
const { middlewareTokenUser, verifyLoginHome, middlewareTokenAdmin, verifyLoginAdmin, verifyLogin, checkProgress } = require('../middlewares/jsonwebtoken-middleware.js');
// controller import
const { userRegister, userLogin, home, adminLogin, homeAdmin } = require('../controllers/lms.user.controller.js');
const { log } = require('console');
// api USER..............................................................


router.get('/', verifyLoginHome, middlewareTokenUser, home);

router.get('/route-study', verifyLogin, middlewareTokenUser, (req, res) => {
    let putInfoAccount = `Verify successfully`;
    return db.execute('select * from route_study')
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
        .catch(err => res.status(404).json({ err: err, message: "Not found" }));

});
router.get('/course', verifyLogin, middlewareTokenUser, (req, res) => {
    return db.execute('select * from course')
        .then(response => {
            let [dataCourse] = response;
            console.log(dataCourse);
            let idUserMatchAccount = req.user.id;
            let putInfoAccount = `Verify successfully`;
            return db.execute('SELECT * FROM users WHERE id = ?', [idUserMatchAccount])
                .then(response => {
                    let [dataUser] = response;
                    console.log(dataUser);
                    return res.render('course.ejs', { dataCourse, putInfoAccount: putInfoAccount, dataUser });
                })
                .catch(err => res.status(404).json({ error: err, message: err.message }));
        })
        .catch(err => res.status(404).json({ err: err, message: "Not found" }));

});
router.get('/control-panel', verifyLogin, middlewareTokenUser, (req, res) => {
    let idUserMatchAccount = req.user.id;
    let putInfoAccount = `Verify successfully`;
    return db.execute('SELECT * FROM users WHERE id = ?', [idUserMatchAccount])
        .then(response => {
            let [dataUser] = response;
            console.log(dataUser);
            return res.render('control-panel.ejs', { putInfoAccount: putInfoAccount, dataUser });
        })
        .catch(err => res.status(404).json({ error: err, message: err.message }));
});
router.get('/course-detail/:id', verifyLogin, middlewareTokenUser, (req, res) => {
    let { id } = req.params;
    console.log(id);
    let idUserMatchAccount = req.user.id;
    let putInfoAccount = `Verify successfully`;
    return db.execute('SELECT * FROM users WHERE id = ?', [idUserMatchAccount])
        .then(response => {
            let [dataUser] = response;
            return db.execute('select * from course, route_study where id_course = ? and course.route_id = route_study.id_route', [id])
                .then(response => {
                    let [dataCourse] = response;
                    return db.execute('select course_detail.description_detail, course_detail.teacher, course_detail.ta, course_detail.we_learn from course_detail, course where course_detail.id_detail = course.id_course and course.id_course = ?', [id])
                        .then(response => {
                            let [dataCourseDetail] = response;
                            console.log("dataCourseDetail", dataCourseDetail[0]);
                            return db.execute('select id_learn, title, detail_id from learn, course_detail where learn.detail_id = course_detail.id_detail and course_detail.id_detail = ?', [id])
                                .then(response => {
                                    let [dataLearn] = response;
                                    return db.execute('select id_doc, doc_name, url, learn_id from doc, learn where doc.learn_id = learn.id_learn')
                                        .then(response => {
                                            let [dataDoc] = response;
                                            return res.render('course-detail.ejs', { putInfoAccount: putInfoAccount, dataUser, dataLearn, dataDoc, dataCourse, dataCourseDetail });
                                        })
                                        .catch(err => res.status(404).json({ error: err, message: err.message }));

                                })
                                .catch(err => res.status(404).json({ error: err, message: err.message }));

                        })
                        .catch(err => res.status(404).json({ error: err, message: err.message }));

                })
                .catch(err => res.status(404).json({ error: err, message: err.message }));
        })
        .catch(err => res.status(404).json({ error: err, message: err.message }));

});
router.get('/learn/:id', verifyLogin, middlewareTokenUser, (req, res) => {
    let { id } = req.params;
    let idUserMatchAccount = req.user.id;
    let putInfoAccount = `Verify successfully`;
    return db.execute('SELECT * FROM users WHERE id = ?', [idUserMatchAccount])
        .then(response => {
            let [dataUser] = response;
            return db.execute('select * from course, route_study where id_course = ? and course.route_id = route_study.id_route', [id])
                .then(response => {
                    let [dataCourse] = response;
                    console.log("dataCourse", dataCourse);
                    return db.execute('select id_learn, title, detail_id from learn, course_detail where learn.detail_id = course_detail.id_detail and course_detail.id_detail = ?', [id])
                        .then(response => {
                            let [dataLearn] = response;
                            return db.execute('select id_doc, doc_name, url, learn_id from doc, learn where doc.learn_id = learn.id_learn')
                                .then(response => {
                                    let [dataDoc] = response;
                                    return res.render('learn.ejs', { putInfoAccount: putInfoAccount, dataUser, dataLearn, dataDoc, dataCourse });
                                })
                                .catch(err => res.status(404).json({ error: err, message: err.message }));
                        })
                        .catch(err => res.status(404).json({ error: err, message: err.message }));
                })
                .catch(err => res.status(404).json({ error: err, message: err.message }));
        })

        .catch(err => res.status(404).json({ error: err, message: err.message }));
});
router.get('/login', (req, res) => {
    res.render('login.ejs')
});
router.post('/api/v1/users-login', upload.none(), userLogin);
router.get('/logout', (req, res) => {
    // res.cookie("logoutId", { expires: new Date(1), httpOnly: true });
    res.clearCookie("tokenUser");
    // delete thì phải delete theo tên token mình đặt
    res.redirect('/router/login');
});
router.get('/test', (req, res) => {
    res.render('test.ejs')
});

// api ADMIN ......................................................
//..............................(GET)..............................
router.get('/dashboard-register', verifyLoginAdmin, (req, res) => {
    res.render('register.ejs');
});
router.get('/admin-login', (req, res) => {
    res.render('admin-login.ejs');
});
router.get('/admin-dashboard/route-study', verifyLoginAdmin, (req, res) => {
    res.render('route-study-dashboard.ejs');
    console.log(req.headers);
});
router.get('/admin-dashboard', verifyLoginAdmin, middlewareTokenAdmin, homeAdmin);
router.get('/admin-dashboard/route-study/update', verifyLoginAdmin, (req, res) => {
    db.execute('select * from route_study')
        .then(response => {
            let [data] = response;
            res.render('route-study-update-dashboard.ejs', { data: data });
        })
        .catch(err => res.status(404).json({ err: err, message: "Not found" }));
});
router.get('/admin-dashboard/route-study/post', verifyLoginAdmin, middlewareTokenAdmin, (req, res) => {
    res.render('route-study-post-dashboard.ejs');
});
router.get('/admin-dashboard/route-study/update/:id', verifyLoginAdmin, (req, res) => {
    let { id } = req.params;
    console.log(id);
    db.execute('select * from route_study where id_route = ? ', [id])
        .then(response => {
            let [data] = response;
            console.log(data);
            res.render('route-study-update-form-dashboard.ejs', { data: data });
        })
        .catch(err => res.status(404).json({ err: err, message: "Not found Route" }));
});
router.get('/admin-dashboard/course/post', (req, res) => {
    db.execute(`select id_route, route_name from route_study`)
        .then(response => {
            [data] = response;
            console.log(data);
            return res.render('course-dashboard.ejs', { data: data });
        })
        .catch(err => res.status(500).json({ error: err, message: err.message }));
});
router.get('/admin-dashboard/course/update', verifyLoginAdmin, (req, res) => {
    db.execute(`select course.id_course, course.date_up, course.course_name, course.image_course,
    course.description_course, course.level, course.time_learn_course, course.route_id, course.user_id,
    route_study.route_name from course, route_study where route_study.id_route = course.route_id`)
        .then(response => {
            let [data] = response;
            return res.render('course-dashboard-update.ejs', { data: data });
        });
});
router.get('/admin-dashboard/course/update/:id', verifyLoginAdmin, (req, res) => {
    let { id } = req.params;
    console.log(id);
    db.execute(`select course.id_course, course.date_up, course.course_name, course.image_course,
    course.description_course, course.level, course.time_learn_course, course.route_id, course.user_id,
    route_study.route_name from course, route_study where route_study.id_route = course.route_id and
     id_course = ? `, [id])
        .then(response => {
            let [data] = response;
            console.log(data);
            db.execute('select route_study.route_name from route_study')
                .then(response => {
                    let [dataAddInRoute] = response;
                    res.render('course-dashboard-update-form.ejs', { data: data, dataAddInRoute });
                })
                .catch(err => res.status(404).json({ err: err, message: "Not found Route" }));

        })
        .catch(err => res.status(404).json({ err: err, message: "Not found Route" }));
});

router.get('/admin-dashboard/user-management', verifyLoginAdmin, (req, res) => {
    db.execute('select * from users')
        .then(response => {
            let [dataUser] = response;
            console.log(dataUser);
            res.render('user-management.ejs', { dataUser });
        })
        .catch(err => res.status(404).json({ error: err, status: "Not found" }));
});
router.get('/admin-dashboard/user-management/:id', verifyLoginAdmin, (req, res) => {
    let { id } = req.params;
    console.log(id);
    db.execute(`select * from users where id = ? `, [id])
        .then(response => {
            let [data] = response;
            console.log(data);
            db.execute('select route_study.route_name from route_study')
                .then(response => {
                    let [dataAddInRoute] = response;
                    res.render('user-management-form-update.ejs', { data: data, dataAddInRoute });
                })
                .catch(err => res.status(404).json({ err: err, message: "Not found Route" }));

        })
        .catch(err => res.status(404).json({ err: err, message: "Not found Users" }));
});
router.get('/admin-dashboard/learn/update', verifyLoginAdmin, (req, res) => {
    db.execute('select * from learn')
        .then(response => {
            let [dataLearn] = response;
            console.log(dataLearn);
            res.render('learn-dashboard.ejs', { dataLearn });
        })
        .catch(err => res.status(404).json({ error: err, status: "Not found" }));
});
router.get('/admin-dashboard/learn/update/:id', verifyLoginAdmin, (req, res) => {
    let { id } = req.params;
    console.log(id);
    db.execute(`select * from learn where id_learn = ? `, [id])
        .then(response => {
            let [data] = response;
            console.log(data);
            db.execute('select course.course_name from course, course_detail where course.id_course = course_detail.id_detail')
                .then(response => {
                    let [dataAddInCourse] = response;
                    res.render('learn-dashboard-update-form.ejs', { data: data, dataAddInCourse });
                })
                .catch(err => res.status(404).json({ err: err, message: "Not found Route" }));

        })
        .catch(err => res.status(404).json({ err: err, message: "Not found Users" }));
});

router.get('/admin-dashboard/learn/post', verifyLoginAdmin, (req, res) => {
    db.execute('select course.course_name from course, course_detail where course.id_course = course_detail.id_detail')
        .then(response => {
            let [dataAddInCourse] = response;
            res.render('learn-dashboard-post.ejs', { dataAddInCourse });
        })
        .catch(err => res.status(404).json({ err: err, message: "Not found Route" }));

});

router.get('/admin-dashboard/doc/', verifyLoginAdmin, (req, res) => {
    db.execute('SELECT * FROM lms_schema.doc')
        .then(response => {
            let [dataDoc] = response;
            console.log(dataDoc);
            db.execute('select title from learn')
                .then(response => {
                    let [dataLearn] = response;
                    res.render('doc-dashboard.ejs', { dataDoc, dataLearn });
                })
                .catch(err => res.status(404).json({ err: err, message: "Not found Route" }));

        })
        .catch(err => res.status(404).json({ error: err, status: "Not found" }));
});


router.get('admin-dashboard/course-detail/post', (req, res) => {
})
//...................(POST);..........................................
router.post('/api/admin-dashboard/doc/post/pdf', upload.single('pdfDoc'), async (req, res) => {
    const pdfDoc = req.file;
    console.log(pdfDoc);
    const metadata = {
        metadata: {
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: pdfDoc.mimetype,
        cacheControl: 'public, max-age=31536000'
    }

    const bucket = firebase.storage().bucket();
    const filePath = `doc-file/${uuid() + '--' + pdfDoc.originalname}`
    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream({
        gzip: true,
        metadata: metadata
    });
    blobStream.on('error', (error) => {
        console.log(error);
        res.status(500).json({ message: 'Error uploading file to Firebase' });
    })
    blobStream.on('finish', async () => {
        // Get the public URL of the file
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        const pdfUrl = await blob.getSignedUrl({
            action: 'read',
            expires: '03-09-2024'
        });
        const [valuePdfUrl] = pdfUrl;
        res.status(200).json({ message: 'File uploaded to Firebase successfully', url: valuePdfUrl });

    })
    blobStream.end(pdfDoc.buffer);

});

router.post('/api/admin-dashboard/doc/post', middlewareTokenAdmin, upload.array(), (req, res) => {
    // Outputs the key/value pairs
    console.log(req.body);
    let { detail, docName, active, pdfDoc } = req.body;
    db.execute('select count(id_doc) as id from `doc`')
        .then(lengthId => {
            let [total] = lengthId
            let id = total[0].id + 1;
            console.log("id", id);
            const userUp = req.user.id;
            const currentDate = new Date();
            const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
            let formPost = [id, docName, dateUp, pdfDoc, active, detail, userUp];
            db.execute('INSERT INTO `lms_schema`.`doc` (`id_doc`, `doc_name`, `date_up`, `url`, `active`, `learn_id`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?) ', formPost)
                .then(response => {
                    let [dataUpload] = response;
                    console.log("upload successfully", dataUpload);
                    res.status(200).json({ message: "upload successfully", upload: dataUpload });
                })
                .catch(err => {
                    console.log(err);
                });
        });
});

router.post('/api/admin-dashboard/course/post', middlewareTokenAdmin, upload.array(), (req, res) => {
    console.log("aaaa");
    console.log(req.body);
    let { courseName, descriptionCourse, levelCourse, timeLearnCourse, addInrouteStudy, imagePost } = req.body;
    console.log(courseName, imagePost, descriptionCourse, levelCourse, timeLearnCourse, addInrouteStudy);
    db.execute('select count(id_course) as id from `course`')
        .then(lengthId => {
            let [total] = lengthId
            let id = total[0].id + 1;
            const userUp = req.user.id;
            const currentDate = new Date();
            const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
            let formPost = [id, dateUp, courseName, imagePost, descriptionCourse, levelCourse, timeLearnCourse, addInrouteStudy, userUp];
            db.execute('INSERT INTO `lms_schema`.`course` (`id_course`, `date_up`, `course_name`, `image_course`, `description_course`, `level`, `time_learn_course`, `route_id`, `user_id`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?) ', formPost)
                .then(response => {
                    let [dataUpload] = response;
                    console.log("upload successfully", dataUpload);
                    res.status(200).json({ message: "upload successfully", upload: dataUpload });
                })
                .catch(err => {
                    console.log(err);
                });
        });
})
router.post('/api/admin-dashboard/course/post/image', middlewareTokenAdmin, upload.single('imageCourse'), (req, res) => {
    let imageCourse = req.file;
    const metadata = {
        metadata: {
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: imageCourse.mimetype,
        cacheControl: 'public, max-age=31536000'
    };
    const bucket = firebase.storage().bucket();
    const filePath = `imageCourse/${uuid() + '--' + imageCourse.originalname}`
    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream({
        gzip: true,
        metadata: metadata
    });
    blobStream.on('error', err => {
        console.log(err);
        res.status(500).json({ message: 'Error uploading file to Firebase' });
    })
    blobStream.on('finish', async () => {
        // Get the public URL of the file
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        const imageCourseUrl = await blob.getSignedUrl({
            action: 'read',
            expires: '03-09-2024'
        });
        const [valueImageCourseUrl] = imageCourseUrl;
        res.status(200).json({ message: 'File uploaded to Firebase successfully', url: valueImageCourseUrl });
        console.log(valueImageCourseUrl);
        // saveFileImage(valueImageRouteStudyUrl);
    })
    blobStream.end(imageCourse.buffer);
});
router.post('/api/admin-dashboard/route-study/post', middlewareTokenAdmin, upload.array(), (req, res) => {
    // Outputs the key/value pairs
    let { nameRouteStudy, descriptionRouteStudy, totalLearnTimeRouteStudy, imagePost } = req.body;
    console.log(nameRouteStudy, descriptionRouteStudy, totalLearnTimeRouteStudy, imagePost);
    db.execute('select count(id_route) as id from `route_study`')
        .then(lengthId => {
            let [total] = lengthId
            let id = total[0].id + 1;
            const userUp = req.user.id;
            const currentDate = new Date();
            const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
            let formPost = [id, nameRouteStudy, descriptionRouteStudy, totalLearnTimeRouteStudy, imagePost, dateUp, userUp];
            db.execute('INSERT INTO `route_study`(`id_route`, `route_name`, `description_route`, `total_time_route`, `image_route`, `date_up`, `user_id`) VALUES(?, ?, ?, ?, ?, ?, ?) ', formPost)
                .then(response => {
                    let [dataUpload] = response;
                    console.log("upload successfully", dataUpload);
                    res.status(200).json({ message: "upload successfully", upload: dataUpload });
                })
                .catch(err => {
                    console.log(err);
                });
        });
});
router.post('/api/admin-dashboard/learn/post', middlewareTokenAdmin, upload.array(), (req, res) => {
    // Outputs the key/value pairs
    console.log(req.body);
    let { addInCourse, titleLearn, ratingContent, ratingNumber } = req.body;
    db.execute('select count(id_learn) as id from `learn`')
        .then(lengthId => {
            let [total] = lengthId
            let id = total[0].id + 1;
            const userUp = req.user.id;
            const currentDate = new Date();
            const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
            let formPost = [id, titleLearn, dateUp, ratingContent, ratingNumber, addInCourse, userUp];
            db.execute('INSERT INTO `lms_schema`.`learn` (`id_learn`, `title`, `date_up`, `rating_content`, `rating_number`, `detail_id`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?)', formPost)
                .then(response => {
                    let [dataUpload] = response;
                    console.log("upload successfully", dataUpload);
                    res.status(200).json({ message: "upload successfully", upload: dataUpload });
                })
                .catch(err => {
                    console.log(err);
                });
        });
});
router.post('/api/admin-dashboard/route-study/post/image', middlewareTokenAdmin, upload.single('imageRouteStudy'), (req, res) => {
    let imageRouteStudy = req.file;
    const metadata = {
        metadata: {
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: imageRouteStudy.mimetype,
        cacheControl: 'public, max-age=31536000'
    };
    const bucket = firebase.storage().bucket();
    const filePath = `imageRouteStudy/${uuid() + '--' + imageRouteStudy.originalname}`
    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream({
        gzip: true,
        metadata: metadata
    });
    blobStream.on('error', err => {
        console.log(err);
        res.status(500).json({ message: 'Error uploading file to Firebase' });
    })
    blobStream.on('finish', async () => {
        // Get the public URL of the file
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        const imageRouteStudyUrl = await blob.getSignedUrl({
            action: 'read',
            expires: '03-09-2024'
        });
        const [valueImageRouteStudyUrl] = imageRouteStudyUrl;
        res.status(200).json({ message: 'File uploaded to Firebase successfully', url: valueImageRouteStudyUrl });
        console.log(valueImageRouteStudyUrl);
        // saveFileImage(valueImageRouteStudyUrl);
    })
    blobStream.end(imageRouteStudy.buffer);
});
router.post('/api/admin-dashboard/route-study/post/image-change', middlewareTokenAdmin, upload.single('imageUpdate'), (req, res) => {
    let imageUpdate = req.file;
    const metadata = {
        metadata: {
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: imageUpdate.mimetype,
        cacheControl: 'public, max-age=31536000'
    };
    const bucket = firebase.storage().bucket();
    const filePath = `imageRouteStudyUpdate/${uuid() + '--' + imageUpdate.originalname}`
    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream({
        gzip: true,
        metadata: metadata
    });
    blobStream.on('error', err => {
        console.log(err);
        res.status(500).json({ message: 'Error uploading file to Firebase' });
    })
    blobStream.on('finish', async () => {
        // Get the public URL of the file
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        const imageRouteStudyUrl = await blob.getSignedUrl({
            action: 'read',
            expires: '03-09-2024'
        });
        const [valueImageRouteStudyUrl] = imageRouteStudyUrl;
        res.status(200).json({ message: 'File uploaded to Firebase successfully', url: valueImageRouteStudyUrl });
        console.log(valueImageRouteStudyUrl);
        // saveFileImage(valueImageRouteStudyUrl);
    })
    blobStream.end(imageUpdate.buffer);

});
router.post('/api/admin-dashboard/course/post/image-change', middlewareTokenAdmin, upload.single('imageCourseUpdate'), (req, res) => {
    let imageCourseUpdate = req.file;
    const metadata = {
        metadata: {
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: imageCourseUpdate.mimetype,
        cacheControl: 'public, max-age=31536000'
    };
    const bucket = firebase.storage().bucket();
    const filePath = `imageCourseUpdate/${uuid() + '--' + imageCourseUpdate.originalname}`
    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream({
        gzip: true,
        metadata: metadata
    });
    blobStream.on('error', err => {
        console.log(err);
        res.status(500).json({ message: 'Error uploading file to Firebase' });
    })
    blobStream.on('finish', async () => {
        // Get the public URL of the file
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        const imageRouteStudyUrl = await blob.getSignedUrl({
            action: 'read',
            expires: '03-09-2024'
        });
        const [valueImageRouteStudyUrl] = imageRouteStudyUrl;
        res.status(200).json({ message: 'File uploaded to Firebase successfully', url: valueImageRouteStudyUrl });
        console.log(valueImageRouteStudyUrl);
        // saveFileImage(valueImageRouteStudyUrl);
    })
    blobStream.end(imageCourseUpdate.buffer);

});

router.post('/api/admin-dashboard/user-management/post/image-change', middlewareTokenAdmin, upload.single('avataUserUpdate'), (req, res) => {
    let avataUserUpdate = req.file;
    const metadata = {
        metadata: {
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: avataUserUpdate.mimetype,
        cacheControl: 'public, max-age=31536000'
    };
    const bucket = firebase.storage().bucket();
    const filePath = `avataUserUpdate/${uuid() + '--' + avataUserUpdate.originalname}`
    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream({
        gzip: true,
        metadata: metadata
    });
    blobStream.on('error', err => {
        console.log(err);
        res.status(500).json({ message: 'Error uploading file to Firebase' });
    })
    blobStream.on('finish', async () => {
        // Get the public URL of the file
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        const imageRouteStudyUrl = await blob.getSignedUrl({
            action: 'read',
            expires: '03-09-2024'
        });
        const [valueImageRouteStudyUrl] = imageRouteStudyUrl;
        res.status(200).json({ message: 'File uploaded to Firebase successfully', url: valueImageRouteStudyUrl });
        console.log(valueImageRouteStudyUrl);
    })
    blobStream.end(avataUserUpdate.buffer);

});
//......................................(PUT)....................................................................
router.put('/api/admin-dashboard/learn/update/:id', middlewareTokenAdmin, upload.array(), (req, res) => {
    let { id } = req.params;
    let { addInCourse, titleLearn, ratingContent, ratingNumber } = req.body;
    console.log(addInCourse, titleLearn, ratingContent, ratingNumber);
    let formPut = [titleLearn, ratingContent, ratingNumber, addInCourse, id]
    return db.execute('UPDATE `lms_schema`.`learn` SET `title` = ?, `rating_content` = ?, `rating_number` = ?, `detail_id` = ? WHERE (`id_learn` = ?)', formPut)
        .then(response => {
            let [data] = response;
            console.log("updateIfIsContainImage", data);
            return res.status(200).json({ message: "Update Successfully", status: data })
        })
        .catch(err => res.status(500).json({ message: err.message, status: err.status }));
});
router.put('/api/admin-dashboard/user-management/:id', middlewareTokenAdmin, upload.array(), (req, res) => {
    let { id } = req.params;
    let { username, fullName, email, dob, phoneNumber, gender, role, setRoute, imageUpdate } = req.body;
    console.log(req.body);
    db.execute('select * from route_study where id_route = ?', [id])
        .then(response => {
            let [data] = response;
            console.log(data);
            if (imageUpdate) {
                console.log("aaa");
                let formhasImage = [username, fullName, email, imageUpdate, dob, phoneNumber, gender, role, setRoute, id]
                return db.execute('UPDATE `lms_schema`.`users` SET `username` = ?, `full_name` = ?, `email` = ?, `avataUrl` = ?, `dob` = ?, `phone_number` = ?, `gender` = ?, `role` = ?, `set_route` = ? WHERE (`id` = ?)', formhasImage)
                    .then(response => {
                        let [data] = response;
                        console.log("updateIfIsNotContainImage", data);
                        return res.status(200).json({ message: "Update Successfully", status: data })
                    })
                    .catch(err => res.status(500).json({ message: err.message, status: err.status }));
            }
            let formNotHasImage = [username, fullName, email, dob, phoneNumber, gender, role, setRoute, id]
            return db.execute('UPDATE `lms_schema`.`users` SET `username` = ?, `full_name` = ?, `email` = ?, `dob` = ?, `phone_number` = ?, `gender` = ?, `role` = ?, `set_route` = ? WHERE (`id` = ?)', formNotHasImage)
                .then(response => {
                    let [data] = response;
                    console.log("updateIfIsContainImage", data);
                    return res.status(200).json({ message: "Update Successfully", status: data })
                })
                .catch(err => res.status(500).json({ message: err.message, status: err.status }));
        })
        .catch(err => res.status(404).json({ error: err, message: "Not found" }));
});
router.put('/api/admin-dashboard/route-study/update/:id', middlewareTokenAdmin, upload.array(), (req, res) => {
    let { id } = req.params;
    const currentDate = new Date();
    const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-'
        + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
    let { routeNameUpdate, descriptionUpdate, imageUpdate, totalTimeUpdate } = req.body;
    console.log(routeNameUpdate, descriptionUpdate, totalTimeUpdate);
    db.execute('select * from route_study where id_route = ?', [id])
        .then(response => {
            let [data] = response;
            console.log(data);
            if (imageUpdate) {
                return db.execute('update lms_schema.route_study set route_name = ?, date_up = ?, description_route = ?, image_route = ?, total_time_route = ? where id_route = ?', [routeNameUpdate, dateUp, descriptionUpdate, imageUpdate, totalTimeUpdate, id])
                    .then(response => {
                        let [data] = response;
                        console.log("updateIfIsContainImage", data);
                        return res.status(200).json({ message: "Update Successfully", status: data })
                    })
                    .catch(err => res.status(500).json({ message: err.message, status: err.status }));
            }
            return db.execute('update lms_schema.route_study set route_name = ?, date_up = ?, description_route = ?, total_time_route = ? where id_route = ?', [routeNameUpdate, dateUp, descriptionUpdate, totalTimeUpdate, id])
                .then(response => {
                    let [data] = response;
                    console.log("updateIfIsNotContainImage", data);
                    return res.status(200).json({ message: "Update Successfully", status: data })
                })
                .catch(err => res.status(500).json({ message: err.message, status: err.status }));
        })
        .catch(err => res.status(404).json({ error: err, message: "Not found" }));
});
router.put('/api/admin-dashboard/course/update/:id', middlewareTokenAdmin, upload.array(), (req, res) => {
    console.log(req.body);
    let { id } = req.params;
    const currentDate = new Date();
    const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-'
        + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
    let { addInRouteChange, courseNameUpdate, descriptionUpdate, levelCourseUpdate, imageUpdate, totalTimeUpdate } = req.body;
    const formUpdate = [dateUp, courseNameUpdate, imageUpdate, descriptionUpdate, levelCourseUpdate, totalTimeUpdate, addInRouteChange, id];
    db.execute('select * from course where id_course = ?', [id])
        .then(response => {
            let [data] = response;
            console.log(data);
            if (imageUpdate) {
                return db.execute('UPDATE `lms_schema`.`course` SET `date_up` = ?, `course_name` = ?, `image_course` = ?, `description_course` = ?, `level` = ?, `time_learn_course` = ?, `route_id` = ? WHERE `id_course` = ?', formUpdate)
                    .then(response => {
                        let [data] = response;
                        console.log("updateIfIsContainImage", data);
                        return res.status(200).json({ message: "Update Successfully", status: data })
                    })
                    .catch(err => res.status(500).json({ message: err.message, status: err.status }));
            }
            return db.execute('UPDATE `lms_schema`.`course` SET `date_up` = ?, `course_name` = ?, `description_course` = ?, `level` = ?, `time_learn_course` = ?, `route_id` = ? WHERE `id_course` = ?', [dateUp, courseNameUpdate, descriptionUpdate, levelCourseUpdate, totalTimeUpdate, addInRouteChange, id])
                .then(response => {
                    let [data] = response;
                    console.log("updateIfIsNotContainImage", data);
                    return res.status(200).json({ message: "Update Successfully", status: data })
                })
                .catch(err => res.status(500).json({ message: err.message, status: err.status }));
        })
        .catch(err => res.status(404).json({ error: err, message: "Not found" }));
});
router.post('/api/admin-dashboard/user-management', (req, res) => {

});
router.post('/api/v1/admin-register', upload.none(), userRegister);


router.post('/api/v1/admin-login', upload.none(), adminLogin);


// function callback................................................................
let saveFilePdf = (pdfUrl) => {
    db.execute('select count(id_doc) as id_doc from doc')
        .then(response => {
            let [idDoc] = response;
            let id = idDoc[0].id_doc + 1
            db.execute('INSERT INTO `lms_schema`.`doc` (`id_doc`, `url`) VALUES (?, ?)', [id, pdfUrl])
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};
let saveImageRouteStudy = (imageRouteStudy) => {
    db.execute('insert into route_study (id_route, image_route, user_id) values (?, ?, ?)',)
        .then(response => console.log(response))
        .catch(err => console.log(err));
}
module.exports = router;
