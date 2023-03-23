'use strict';
const fs = require('fs');
const cookieParser = require('cookie-parser');
const path = require('path');
const uuid = require('uuid-v4');
const { db } = require('../utils/database.js');
const express = require('express');
const router = express.Router();
//config bodyParser
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer');
// config firebase-admin
const firebase = require('firebase-admin');
const serviceAccount = require('../firebase/admin.json');
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    storageBucket: 'gs://projectmodule3-c6f1d.appspot.com'
});
const upload = multer({ storage: multer.memoryStorage() });
//middleware import 
const { middlewareTokenUser, verifyLoginHome, middlewareTokenAdmin, verifyLoginAdmin, verifyLogin, scanStudentInvateLearn, checkProgress } = require('../middlewares/jsonwebtoken-middleware.js');
// controller import
const { userRegister, userLogin, routeStudyGet, courseGet, controlPanelGet, home, adminLogin, homeAdmin } = require('../controllers/lms.user.controller.js');
const { Class, Users, RouteStudy, Learn, Doc, PoolCourseCompleted, PoolDocCompleted } = require('../service/tableSequelize');

/**
 * 
 * @param {*} app : express app
 */
// api USER..............................................................

const initRoutes = (app) => {
    router.get('/', verifyLoginHome, middlewareTokenUser, home);

    router.get('/route-study', verifyLogin, middlewareTokenUser, routeStudyGet);

    router.get('/course', verifyLogin, middlewareTokenUser, courseGet);

    router.get('/control-panel', verifyLogin, middlewareTokenUser, controlPanelGet);

    router.get('/api/course/query', (req, res) => {
        let { nameCourse } = req.query;
        let arrayNameCourse = [];
        let nameCourseParseLowerCase = nameCourse.trim().toLowerCase();
        console.log(nameCourseParseLowerCase);
        db.execute('select * from course')
            .then(response => {
                let [dataDestructuring] = response;
                dataDestructuring.forEach(element => {
                    if (element.course_name.trim().toLowerCase().includes(nameCourseParseLowerCase)) {
                        return arrayNameCourse.push(element);
                    }
                });
                res.status(200).json({ data: arrayNameCourse, message: 'Successfullys' });
            })
            .catch(err => res.status(500).json({ message: 'Server Not Found' + err }));

    });
    router.get('/course-detail/:id', verifyLogin, middlewareTokenUser, (req, res) => {
        let { id } = req.params;
        console.log(id);
        let idUserMatchAccount = req.user.id;
        let putInfoAccount = 'Verify successfully';
        return db.execute('SELECT * FROM users WHERE id = ?', [idUserMatchAccount])
            .then(response1 => {
                let [dataUser] = response1;
                return db.execute('select * from course, route_study where id_course = ? and course.route_id = route_study.id_route', [id])
                    .then(response2 => {
                        let [dataCourse] = response2;
                        return db.execute('select course_detail.description_detail, course_detail.teacher, course_detail.ta, course_detail.we_learn from course_detail, course where course_detail.id_detail = course.id_course and course.id_course = ?', [id])
                            .then(response3 => {
                                let [dataCourseDetail] = response3;
                                return db.execute('select id_learn, title, detail_id from learn, course_detail where learn.detail_id = course_detail.id_detail and course_detail.id_detail = ?', [id])
                                    .then(response4 => {
                                        let [dataLearn] = response4;
                                        return db.execute('select id_doc, doc_name, url, learn_id from doc, learn where doc.learn_id = learn.id_learn')
                                            .then(response5 => {
                                                let [dataDoc] = response5;
                                                return db.execute(`select id, username, full_name, id_route, id_course, id_class as class from users, classes, route_study, course
                                                where users.classIdClass = id_class and id_route = route_study_id and course.route_id = route_study.id_route and id_course =  ?`, [id])
                                                    .then(response6 => {
                                                        let [dataInvateClass] = response6;
                                                        let openkeyLearn;
                                                        let dataScanStudentInvate = dataInvateClass.find(element => element.id === req.user.id);
                                                        dataScanStudentInvate ? openkeyLearn = true : openkeyLearn = false;
                                                        return res.render('course-detail.ejs', { putInfoAccount: putInfoAccount, dataUser, dataLearn, dataDoc, dataCourse, dataCourseDetail, dataInvateClass, openkeyLearn });
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
            })
            .catch(err => res.status(404).json({ error: err, message: err.message }));
    });
    router.get('/learn/:id', verifyLogin, middlewareTokenUser, scanStudentInvateLearn, (req, res) => {
        let { id } = req.params;
        const userId = req.user.id; // assuming that the user ID is stored in req.user.id
        let putInfoAccount = 'Verify successfully';
        return db.execute('SELECT * FROM users WHERE id = ?', [userId])
            .then(response => {
                let [dataUser] = response;
                return db.execute('select * from course, route_study where id_course = ? and course.route_id = route_study.id_route', [id])
                    .then(response => {
                        let [dataCourse] = response;
                        return db.execute('select id_learn, title, detail_id from learn, course_detail where learn.detail_id = course_detail.id_detail and course_detail.id_detail = ?', [id])
                            .then(async response => {
                                let [dataLearn] = response;
                                try {
                                    const learnData = await Learn.findAll({
                                        include: [{ model: Doc }],
                                    });
                                    const docData = await Doc.findAll({
                                        where: { course_id: id, learn_id: learnData.map((learn) => learn.id_learn) }
                                    });
                                    const completedDocs = await PoolDocCompleted.findAll({
                                        where: { learn_id: learnData.map((learn) => learn.id_learn), courseIdCourse: id, user_id: userId }, // Có thể
                                        // dùng array để xử lý điều kiện where để truy xuất dữ liệu với sequelize
                                        attributes: ['arrangeId'],
                                    });
                                    const completedDocIds = completedDocs.map((doc) => doc.arrangeId);
                                    const lessonReadings = docData.map((doc) => doc.dataValues);
                                    lessonReadings.sort((a, b) => a.id_arrange - b.id_arrange);
                                    const currentDoc = lessonReadings.find((doc) => !completedDocIds.includes(doc.id_arrange));
                                    const currentIndex = lessonReadings.indexOf(currentDoc);
                                    const unlocked = lessonReadings.slice(0, currentIndex + 1).map((doc) => ({
                                        ...doc,
                                        locked: false,
                                    }));
                                    const locked = lessonReadings.slice(currentIndex + 1).map((doc) => ({
                                        ...doc,
                                        locked: true,
                                    }));
                                    const unlockedCombineCheckButtonCompleted = lessonReadings.slice(0, currentIndex).map((doc) => ({
                                        ...doc,
                                        lockButtonCompleted: true,
                                    }));
                                    const lockedCombineCheckButtonCompleted = lessonReadings.slice(currentIndex).map((doc) => ({
                                        ...doc,
                                        lockButtonCompleted: false,
                                    }));
                                    let resultCombineCheckButtonCompleted = [...unlockedCombineCheckButtonCompleted, ...lockedCombineCheckButtonCompleted];
                                    let resultLessonReadings = [...unlocked, ...locked];
                                    const userData = {
                                        userId: userId,
                                        resultLessonReadings: resultLessonReadings,
                                    };
                                    let dataRouteStudy = await RouteStudy.findAll();
                                    let dataPoolCourseCompleted = await PoolCourseCompleted.findOne({
                                        where: { class_id: dataUser[0].classIdClass, user_id: userId, route_id: dataRouteStudy.map(route => route.id_route), course_id: id }
                                    });
                                    let dataPoolCourseCompletedPlain;
                                    if (dataPoolCourseCompleted) {
                                        dataPoolCourseCompletedPlain = dataPoolCourseCompleted.get({ plain: true });
                                    } else {
                                        dataPoolCourseCompletedPlain = undefined;
                                    }

                                    console.log(dataRouteStudy);
                                    return res.render('learn.ejs', {
                                        putInfoAccount: putInfoAccount, dataUser, dataLearn, dataCourse, dataDoc: userData.resultLessonReadings,
                                        resultCombineCheckButtonCompleted: resultCombineCheckButtonCompleted, dataPoolCourseCompletedPlain: dataPoolCourseCompletedPlain,
                                    });
                                } catch (error) {
                                    console.log(error);
                                    res.status(500).json({ message: 'Internal Server Error' });
                                }
                            })
                            .catch(err => res.status(404).json({ error: err, message: err.message }));
                    })
                    .catch(err => res.status(404).json({ error: err, message: err.message }));
            })

            .catch(err => res.status(404).json({ error: err, message: err.message }));
    });
    router.get('/login', (req, res) => {
        res.render('login.ejs');
    });
    router.post('/api/v1/users-login', upload.none(), userLogin);
    router.get('/logout', (req, res) => {
        // res.cookie("logoutId", { expires: new Date(1), httpOnly: true });
        res.clearCookie('tokenUser');
        // delete thì phải delete theo tên token mình đặt
        res.redirect('/router/login');
    });
    router.get('/test', (req, res) => {
        res.render('test.ejs');
    });

    // api ADMIN ......................................................
    //..............................(GET)..............................
    router.get('/dashboard-register', verifyLoginAdmin);
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
            .catch(err => res.status(404).json({ err: err, message: 'Not found' }));
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
            .catch(err => res.status(404).json({ err: err, message: 'Not found Route' }));
    });
    router.get('/admin-dashboard/course/post', verifyLoginAdmin, (req, res) => {
        db.execute('select id_route, route_name from route_study')
            .then(response => {
                let [data] = response;
                console.log(response);
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
                    .catch(err => res.status(404).json({ err: err, message: 'Not found Route' }));

            })
            .catch(err => res.status(404).json({ err: err, message: 'Not found Route' }));
    });
    router.get('/admin-dashboard/user-management', verifyLoginAdmin, (req, res) => {
        db.execute('select * from users')
            .then(response => {
                let [dataUser] = response;
                console.log(dataUser);
                res.render('user-management.ejs', { dataUser });
            })
            .catch(err => res.status(404).json({ error: err, status: 'Not found' }));
    });
    router.get('/admin-dashboard/user-management/:id', verifyLoginAdmin, (req, res) => {
        let { id } = req.params;
        console.log(id);
        db.execute('select * from users where id = ? ', [id])
            .then(response => {
                let [data] = response;
                console.log(data);
                db.execute('select route_study.route_name from route_study')
                    .then(response => {
                        let [dataAddInRoute] = response;
                        res.render('user-management-form-update.ejs', { data: data, dataAddInRoute });
                    })
                    .catch(err => res.status(404).json({ err: err, message: 'Not found Route' }));

            })
            .catch(err => res.status(404).json({ err: err, message: 'Not found Users' }));
    });
    router.get('/admin-dashboard/course-detail/post', verifyLoginAdmin, (req, res) => {
        db.execute('select * from course')
            .then(response => {
                let [dataDetail] = response;
                res.render('course-detail-dashboard-post.ejs', { dataDetail });
            })
            .catch(err => res.status(404).json({ err: err, message: 'Not found Course-detail' }));
    });
    router.get('/admin-dashboard/course-detail/update', verifyLoginAdmin, (req, res) => {
        db.execute('select * from course_detail')
            .then(response => {
                let [dataDetail] = response;
                console.log(dataDetail);
                res.render('course-detail-dashboard.ejs', { dataDetail });
            })
            .catch(err => res.status(404).json({ err: err, message: 'Not found Course-detail' }));
    });
    router.get('/admin-dashboard/course-detail/update/:id', verifyLoginAdmin, (req, res) => {
        let { id } = req.params;
        console.log(id);
        db.execute('select * from course_detail where id_detail = ? ', [id])
            .then(response => {
                let [data] = response;
                db.execute('select course.course_name from course')
                    .then(response => {
                        let [dataAddInCourse] = response;
                        console.log(dataAddInCourse);
                        res.render('course-detail-dashboard-update-form.ejs', { data: data, dataAddInCourse });
                    })
                    .catch(err => res.status(404).json({ err: err, message: 'Not found Course' }));

            })
            .catch(err => res.status(404).json({ err: err, message: 'Not found Course Detail' }));
    });
    router.get('/admin-dashboard/learn/update', verifyLoginAdmin, (req, res) => {
        db.execute('select * from learn')
            .then(response => {
                let [dataLearn] = response;
                console.log(dataLearn);
                res.render('learn-dashboard.ejs', { dataLearn });
            })
            .catch(err => res.status(404).json({ error: err, status: 'Not found' }));
    });
    router.get('/admin-dashboard/learn/update/:id', verifyLoginAdmin, (req, res) => {
        let { id } = req.params;
        console.log(id);
        db.execute('select * from learn where id_learn = ? ', [id])
            .then(response => {
                let [data] = response;
                console.log(data);
                db.execute('select course.course_name, course.id_course from course, course_detail where course.id_course = course_detail.id_detail')
                    .then(response => {
                        let [dataAddInCourse] = response;
                        res.render('learn-dashboard-update-form.ejs', { data: data, dataAddInCourse });
                    })
                    .catch(err => res.status(404).json({ err: err, message: 'Not found Route' }));

            })
            .catch(err => res.status(404).json({ err: err, message: 'Not found Users' }));
    });
    router.get('/admin-dashboard/learn/post', verifyLoginAdmin, (req, res) => {
        db.execute('select course.course_name, course.id_course from course, course_detail where course.id_course = course_detail.id_detail')
            .then(response => {
                let [dataAddInCourse] = response;
                res.render('learn-dashboard-post.ejs', { dataAddInCourse });
            })
            .catch(err => res.status(404).json({ err: err, message: 'Not found Route' }));

    });
    router.get('/admin-dashboard/doc/', verifyLoginAdmin, (req, res) => {
        db.execute('SELECT * FROM lms_schema.doc')
            .then(response => {
                let [dataDoc] = response;
                console.log(dataDoc);
                db.execute('select course_name, id_course from course')
                    .then(response => {
                        let [dataCourse] = response;
                        db.execute('select title from learn')
                            .then(response => {
                                let [dataLearn] = response;
                                res.render('doc-dashboard.ejs', { dataDoc, dataCourse, dataLearn });
                            })
                            .catch(err => res.status(404).json({ err: err, message: 'Not found Route' }));
                    })
                    .catch(err => res.status(404).json({ err: err, message: 'Not found Route' }));

            })
            .catch(err => res.status(404).json({ error: err, status: 'Not found' }));
    });
    router.get('/admin-dashboard/doc/update', verifyLoginAdmin, (req, res) => {
        db.execute('select * from learn')
            .then(responseLearn => {
                let [dataLearn] = responseLearn;
                db.execute('select * from doc order by id_arrange')
                    .then(responseDoc => {
                        let [dataDoc] = responseDoc;
                        res.render('doc-dashboard-update.ejs', { dataLearn: dataLearn, dataDoc: dataDoc });
                    })
                    .catch(err => res.status(500).json({ message: err + 'Doc' }));
            })
            .catch(err => res.status(500).json({ message: err + 'Learn' }));
    });
    router.get('/admin-dashboard/doc/update-form/:id', verifyLoginAdmin, (req, res) => {
        let { id } = req.params;
        db.execute('select * from doc where id_doc = ?', [id])
            .then(response => {
                let [data] = response;
                db.execute('select id_course, course_name from course ')
                    .then(responseCourse => {
                        let [dataCourse] = responseCourse;
                        db.execute('select id_learn, title from learn ')
                            .then(responseLearn => {
                                let [dataLearn] = responseLearn;
                                res.render('doc-dashboard-update-form.ejs', { data: data, dataLearn: dataLearn, dataCourse: dataCourse });
                            })
                            .catch(err => res.status(500).json({ message: err }));
                    })
                    .catch(err => res.status(500).json({ message: err }));
            })
            .catch(err => res.status(500).json({ message: err }));
    });


    router.get('admin-dashboard/course-detail/post', (req, res) => {
    });
    //...................(POST);..........................................

    router.post('/api/admin-dashboard/doc/post/image-change', middlewareTokenAdmin, upload.single('pdfDocUpdate'), (req, res) => {
        const pdfDoc = req.file;
        console.log(pdfDoc);
        const metadata = {
            metadata: {
                firebaseStorageDownloadTokens: uuid()
            },
            contentType: pdfDoc.mimetype,
            cacheControl: 'public, max-age=31536000'
        };

        const bucket = firebase.storage().bucket();
        const filePath = `doc-file/${uuid() + '--' + pdfDoc.originalname}`;
        const blob = bucket.file(filePath);
        const blobStream = blob.createWriteStream({
            gzip: true,
            metadata: metadata
        });
        blobStream.on('error', (error) => {
            console.log(error);
            res.status(500).json({ message: 'Error uploading file to Firebase' });
        });
        blobStream.on('finish', async () => {
            // Get the public URL of the file
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            const pdfUrl = await blob.getSignedUrl({
                action: 'read',
                expires: '03-09-2024'
            });
            const [valuePdfUrl] = pdfUrl;
            res.status(200).json({ message: 'File uploaded to Firebase successfully', url: valuePdfUrl });

        });
        blobStream.end(pdfDoc.buffer);
    });
    router.post('/api/admin-dashboard/doc/post/pdf', upload.single('pdfDoc'), async (req, res) => {
        const pdfDoc = req.file;
        console.log(pdfDoc);
        const metadata = {
            metadata: {
                firebaseStorageDownloadTokens: uuid()
            },
            contentType: pdfDoc.mimetype,
            cacheControl: 'public, max-age=31536000'
        };

        const bucket = firebase.storage().bucket();
        const filePath = `doc-file/${uuid() + '--' + pdfDoc.originalname}`;
        const blob = bucket.file(filePath);
        const blobStream = blob.createWriteStream({
            gzip: true,
            metadata: metadata
        });
        blobStream.on('error', (error) => {
            console.log(error);
            res.status(500).json({ message: 'Error uploading file to Firebase' });
        });
        blobStream.on('finish', async () => {
            // Get the public URL of the file
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            const pdfUrl = await blob.getSignedUrl({
                action: 'read',
                expires: '03-09-2024'
            });
            const [valuePdfUrl] = pdfUrl;
            res.status(200).json({ message: 'File uploaded to Firebase successfully', url: valuePdfUrl });

        });
        blobStream.end(pdfDoc.buffer);

    });

    router.post('/api/admin-dashboard/doc/post', middlewareTokenAdmin, upload.array(), (req, res) => {
        // Outputs the key/value pairs
        console.log(req.body);
        let { course, detail, docName, active, locking, pdfDoc } = req.body;
        db.execute('select id_doc from `doc`')
            .then(lengthId => {
                let [total] = lengthId;
                //Define an array with some values, including missing parts
                let arrayIdLength = total.map(element => element.id_doc);
                // Sort the array in ascending order
                arrayIdLength.sort((a, b) => a - b);
                // Create a new array to store the filled-in values
                let newArrIdLength = [];
                let idpushDb;
                // Loop through the sorted array
                for (let i = 0; i < arrayIdLength.length; i++) {
                    // Add the current value to the new array
                    newArrIdLength.push(arrayIdLength[i]);
                    // Check if the next value is missing

                    if (arrayIdLength[i] + 1 !== arrayIdLength[i + 1] && arrayIdLength[i + 1] !== undefined) {
                        // Calculate the missing value and add it to the new array 
                        let missingValue = arrayIdLength[i] + 1;
                        idpushDb = missingValue;
                        newArrIdLength.push(missingValue);
                    }
                }
                if (idpushDb === undefined && arrayIdLength.indexOf(1) === -1) {
                    idpushDb = 1;
                }
                else if (idpushDb === undefined && arrayIdLength.indexOf(1) !== -1) {
                    idpushDb = total.length + 1;
                }
                const userUp = req.user.id;
                const currentDate = new Date();
                const arrange = 999;
                const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
                let formPost = [idpushDb, docName, dateUp, pdfDoc, active, course, detail, locking, arrange, userUp];
                db.execute('INSERT INTO `lms_schema`.`doc` (`id_doc`, `doc_name`, `date_up`, `url`, `active`, `course_id`, `learn_id`, `lock`, `id_arrange`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ', formPost)
                    .then(response => {
                        let [dataUpload] = response;
                        console.log('upload successfully', dataUpload);
                        res.status(200).json({ message: 'upload successfully', upload: dataUpload });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
    });
    router.post('/api/admin-dashboard/course/post', middlewareTokenAdmin, upload.array(), (req, res) => {
        console.log('aaaa');
        console.log(req.body);
        let { courseName, descriptionCourse, levelCourse, timeLearnCourse, addInrouteStudy, imagePost } = req.body;
        console.log(courseName, imagePost, descriptionCourse, levelCourse, timeLearnCourse, addInrouteStudy);
        db.execute('select count(id_course) as id from `course`')
            .then(lengthId => {
                let [total] = lengthId;
                let id = total[0].id + 1;
                const userUp = req.user.id;
                const currentDate = new Date();
                const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
                let formPost = [id, dateUp, courseName, imagePost, descriptionCourse, levelCourse, timeLearnCourse, addInrouteStudy, userUp];
                db.execute('INSERT INTO `lms_schema`.`course` (`id_course`, `date_up`, `course_name`, `image_course`, `description_course`, `level`, `time_learn_course`, `route_id`, `user_id`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?) ', formPost)
                    .then(response => {
                        let [dataUpload] = response;
                        console.log('upload successfully', dataUpload);
                        res.status(200).json({ message: 'upload successfully', upload: dataUpload });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
    });
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
        const filePath = `imageCourse/${uuid() + '--' + imageCourse.originalname}`;
        const blob = bucket.file(filePath);
        const blobStream = blob.createWriteStream({
            gzip: true,
            metadata: metadata
        });
        blobStream.on('error', err => {
            console.log(err);
            res.status(500).json({ message: 'Error uploading file to Firebase' });
        });
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
        });
        blobStream.end(imageCourse.buffer);
    });
    router.post('/api/admin-dashboard/route-study/post', middlewareTokenAdmin, upload.array(), (req, res) => {
        // Outputs the key/value pairs
        let { nameRouteStudy, descriptionRouteStudy, totalLearnTimeRouteStudy, imagePost } = req.body;
        console.log(nameRouteStudy, descriptionRouteStudy, totalLearnTimeRouteStudy, imagePost);
        db.execute('select count(id_route) as id from `route_study`')
            .then(lengthId => {
                let [total] = lengthId;
                let id = total[0].id + 1;
                const userUp = req.user.id;
                const currentDate = new Date();
                const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
                let formPost = [id, nameRouteStudy, descriptionRouteStudy, totalLearnTimeRouteStudy, imagePost, dateUp, userUp];
                db.execute('INSERT INTO `route_study`(`id_route`, `route_name`, `description_route`, `total_time_route`, `image_route`, `date_up`, `user_id`) VALUES(?, ?, ?, ?, ?, ?, ?) ', formPost)
                    .then(response => {
                        let [dataUpload] = response;
                        console.log('upload successfully', dataUpload);
                        res.status(200).json({ message: 'upload successfully', upload: dataUpload });
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
                let [total] = lengthId;
                let id = total[0].id + 1;
                const userUp = req.user.id;
                const currentDate = new Date();
                const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
                let formPost = [id, titleLearn, dateUp, ratingContent, ratingNumber, addInCourse, userUp];
                db.execute('INSERT INTO `lms_schema`.`learn` (`id_learn`, `title`, `date_up`, `rating_content`, `rating_number`, `detail_id`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?)', formPost)
                    .then(response => {
                        let [dataUpload] = response;
                        console.log('upload successfully', dataUpload);
                        res.status(200).json({ message: 'upload successfully', upload: dataUpload });
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
        const filePath = `imageRouteStudy/${uuid() + '--' + imageRouteStudy.originalname}`;
        const blob = bucket.file(filePath);
        const blobStream = blob.createWriteStream({
            gzip: true,
            metadata: metadata
        });
        blobStream.on('error', err => {
            console.log(err);
            res.status(500).json({ message: 'Error uploading file to Firebase' });
        });
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
        });
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
        const filePath = `imageRouteStudyUpdate/${uuid() + '--' + imageUpdate.originalname}`;
        const blob = bucket.file(filePath);
        const blobStream = blob.createWriteStream({
            gzip: true,
            metadata: metadata
        });
        blobStream.on('error', err => {
            console.log(err);
            res.status(500).json({ message: 'Error uploading file to Firebase' });
        });
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
        });
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
        const filePath = `imageCourseUpdate/${uuid() + '--' + imageCourseUpdate.originalname}`;
        const blob = bucket.file(filePath);
        const blobStream = blob.createWriteStream({
            gzip: true,
            metadata: metadata
        });
        blobStream.on('error', err => {
            console.log(err);
            res.status(500).json({ message: 'Error uploading file to Firebase' });
        });
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
        });
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
        const filePath = `avataUserUpdate/${uuid() + '--' + avataUserUpdate.originalname}`;
        const blob = bucket.file(filePath);
        const blobStream = blob.createWriteStream({
            gzip: true,
            metadata: metadata
        });
        blobStream.on('error', err => {
            console.log(err);
            res.status(500).json({ message: 'Error uploading file to Firebase' });
        });
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
        });
        blobStream.end(avataUserUpdate.buffer);

    });
    router.post('/api/admin-dashboard/course-detail/post', middlewareTokenAdmin, upload.array(), (req, res) => {
        let { addInCourse, descriptionDetail, weLearn, teacher, ta } = req.body;
        const userUp = req.user.id;
        const currentDate = new Date();
        const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-'
            + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
        let formPost = [addInCourse, dateUp, descriptionDetail, weLearn, teacher, ta, userUp];
        console.log(formPost);
        db.execute('INSERT INTO `lms_schema`.`course_detail` (`id_detail`,`date_up`, `description_detail`, `we_learn`, `teacher`, `ta`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?)', formPost)
            .then(response => {
                let [dataPost] = response;
                res.status(200).json({ Message: 'Post successfully', status: dataPost });
            })
            .catch(err => res.status(404).json({ message: err.message, status: err.status }));
    });


    //......................................(PUT)....................................................................

    router.put('/api/admin-dashboard/course-detail/update/:id', middlewareTokenAdmin, upload.array(), (req, res) => {
        let { addInCourseChange, courseNameUpdate, weLearn, teacher, ta } = req.body;
        let userId = req.user.id;
        const currentDate = new Date();
        const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-'
            + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
        let formPut = [dateUp, courseNameUpdate, weLearn, teacher, ta, userId, addInCourseChange];
        return db.execute('UPDATE `lms_schema`.`course_detail` SET `date_up` = ?, `description_detail` = ?, `we_learn` = ?, `teacher` = ?, `ta` = ?, `user_id` = ? WHERE (`id_detail` = ?)', formPut)
            .then(response => {
                let [data] = response;
                console.log('updateIfIsContainImage', data);
                return res.status(200).json({ message: 'Update Successfully', status: data });
            })
            .catch(err => res.status(500).json({ message: err.message, status: err.status }));
    });


    router.put('/api/admin-dashboard/learn/update/:id', middlewareTokenAdmin, upload.array(), (req, res) => {
        let { id } = req.params;
        let { addInCourse, titleLearn, ratingContent, ratingNumber } = req.body;
        console.log(addInCourse, titleLearn, ratingContent, ratingNumber);
        let formPut = [titleLearn, ratingContent, ratingNumber, addInCourse, id];
        return db.execute('UPDATE `lms_schema`.`learn` SET `title` = ?, `rating_content` = ?, `rating_number` = ?, `detail_id` = ? WHERE (`id_learn` = ?)', formPut)
            .then(response => {
                let [data] = response;
                console.log('updateIfIsContainImage', data);
                return res.status(200).json({ message: 'Update Successfully', status: data });
            })
            .catch(err => res.status(500).json({ message: err.message, status: err.status }));
    });
    router.put('/api/admin-dashboard/user-management/:id', middlewareTokenAdmin, upload.array(), (req, res) => {
        let { id } = req.params;
        let { username, fullName, email, dob, phoneNumber, gender, role, classBelongs, setRoute, imageUpdate } = req.body;
        console.log(classBelongs);
        console.log(req.body);
        db.execute('select * from route_study where id_route = ?', [id])
            .then(response => {
                let [data] = response;
                if (imageUpdate) {
                    let formhasImage = [username, fullName, email, imageUpdate, dob, phoneNumber, gender, Number(classBelongs), role, setRoute, id];
                    return db.execute('UPDATE `lms_schema`.`users` SET `username` = ?, `full_name` = ?, `email` = ?, `avatarUrl` = ?, `dob` = ?, `phone_number` = ?, `gender` = ?, `classIdClass` = ?, `role` = ?, `set_route` = ? WHERE (`id` = ?)', formhasImage)
                        .then(response => {
                            let [data] = response;
                            return res.status(200).json({ message: 'Update Successfully', status: data });
                        })
                        .catch(err => res.status(500).json({ message: err.message, status: err.status }));
                }
                let formNotHasImage = [username, fullName, email, dob, phoneNumber, gender, Number(classBelongs), role, setRoute, id];
                return db.execute('UPDATE `lms_schema`.`users` SET `username` = ?, `full_name` = ?, `email` = ?, `dob` = ?, `phone_number` = ?, `gender` = ?, `classIdClass` = ?, `role` = ?, `set_route` = ? WHERE (`id` = ?)', formNotHasImage)
                    .then(response => {
                        let [data] = response;
                        return res.status(200).json({ message: 'Update Successfully', status: data });
                    })
                    .catch(err => res.status(500).json({ message: err.message, status: err.status }));
            })
            .catch(err => res.status(404).json({ error: err, message: 'Not found' }));
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
                            console.log('updateIfIsContainImage', data);
                            return res.status(200).json({ message: 'Update Successfully', status: data });
                        })
                        .catch(err => res.status(500).json({ message: err.message, status: err.status }));
                }
                return db.execute('update lms_schema.route_study set route_name = ?, date_up = ?, description_route = ?, total_time_route = ? where id_route = ?', [routeNameUpdate, dateUp, descriptionUpdate, totalTimeUpdate, id])
                    .then(response => {
                        let [data] = response;
                        console.log('updateIfIsNotContainImage', data);
                        return res.status(200).json({ message: 'Update Successfully', status: data });
                    })
                    .catch(err => res.status(500).json({ message: err.message, status: err.status }));
            })
            .catch(err => res.status(404).json({ error: err, message: 'Not found' }));
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
                            console.log('updateIfIsContainImage', data);
                            return res.status(200).json({ message: 'Update Successfully', status: data });
                        })
                        .catch(err => res.status(500).json({ message: err.message, status: err.status }));
                }
                return db.execute('UPDATE `lms_schema`.`course` SET `date_up` = ?, `course_name` = ?, `description_course` = ?, `level` = ?, `time_learn_course` = ?, `route_id` = ? WHERE `id_course` = ?', [dateUp, courseNameUpdate, descriptionUpdate, levelCourseUpdate, totalTimeUpdate, addInRouteChange, id])
                    .then(response => {
                        let [data] = response;
                        console.log('updateIfIsNotContainImage', data);
                        return res.status(200).json({ message: 'Update Successfully', status: data });
                    })
                    .catch(err => res.status(500).json({ message: err.message, status: err.status }));
            })
            .catch(err => res.status(404).json({ error: err, message: 'Not found' }));
    });

    router.put('/api/admin-dashboard/doc/update/:id', middlewareTokenAdmin, upload.array(), (req, res) => {
        console.log(req.body);
        let { id } = req.params;
        const currentDate = new Date();
        const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-'
            + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
        let { addInCourseChange, addInLearnChange, docNameUpdate, locking, arrange, imageUpdate } = req.body;
        const formUpdate = [dateUp, docNameUpdate, imageUpdate, locking, arrange, addInCourseChange, addInLearnChange, id];
        db.execute('select * from doc where id_doc = ?', [id])
            .then(response => {
                let [data] = response;
                console.log(data);
                if (imageUpdate) {
                    return db.execute('UPDATE `lms_schema`.`doc` SET `date_up` = ?, `doc_name` = ?, `url` = ?, `lock` = ?, `id_arrange` = ?, `course_id` = ?, `learn_id` = ? WHERE `id_doc` = ?', formUpdate)
                        .then(response => {
                            let [data] = response;
                            return res.status(200).json({ message: 'Update Successfully', status: data });
                        })
                        .catch(err => res.status(500).json({ message: err.message, status: err.status }));
                }
                return db.execute('UPDATE `lms_schema`.`doc` SET `date_up` = ?, `doc_name` = ?, `lock` = ?, `id_arrange` = ?, `course_id` = ?, `learn_id` = ? WHERE `id_doc` = ?', [dateUp, docNameUpdate, locking, arrange, addInCourseChange, addInLearnChange, id])
                    .then(response => {
                        let [data] = response;
                        return res.status(200).json({ message: 'Update Successfully', status: data });
                    })
                    .catch(err => res.status(500).json({ message: err.message, status: err.status }));
            })
            .catch(err => res.status(404).json({ error: err, message: 'Not found' }));
    });
    router.post('/api/admin-dashboard/user-management', (req, res) => {

    });
    router.post('/api/v1/admin-register', upload.none(), userRegister);


    router.post('/api/v1/admin-login', upload.none(), adminLogin);
    return app.use('/router', router);
};
// function callback................................................................
let saveFilePdf = (pdfUrl) => {
    db.execute('select count(id_doc) as id_doc from doc')
        .then(response => {
            let [idDoc] = response;
            let id = idDoc[0].id_doc + 1;
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
};
module.exports = initRoutes;
