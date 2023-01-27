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
const { middlewareTokenUser, verifyLoginUser, middlewareTokenAdmin, verifyLoginAdmin } = require('../middlewares/jsonwebtoken-middleware.js');
// controller import
const { userRegister, userLogin, home, adminLogin, homeAdmin } = require('../controllers/lms.user.controller.js');
// api USER..............................................................
router.post('/test1', upload.single('pdfFile'), async (req, res) => {
    const pdfFile = req.file;
    console.log(pdfFile);
    const metadata = {
        metadata: {
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: pdfFile.mimetype,
        cacheControl: 'public, max-age=31536000'
    }

    const bucket = firebase.storage().bucket();
    const filePath = `doc-file/${uuid() + '--' + pdfFile.originalname}`
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
        res.status(200).json({ message: 'File uploaded to Firebase successfully', url: publicUrl });
        const pdfUrl = await blob.getSignedUrl({
            action: 'read',
            expires: '03-09-2024'
        });
        const [valuePdfUrl] = pdfUrl;
        saveFilePdf(valuePdfUrl);
    })
    blobStream.end(pdfFile.buffer);

});

router.get('/', verifyLoginUser, middlewareTokenUser, home);

router.get('/route-study', verifyLoginUser, middlewareTokenUser, (req, res) => {
    res.render('route-study.ejs')
});
router.get('/course', verifyLoginUser, middlewareTokenUser, (req, res) => {
    res.render('course.ejs')
});
router.get('/control-panel', verifyLoginUser, middlewareTokenUser, (req, res) => {
    res.render('control-panel.ejs');
});
router.get('/course-detail', verifyLoginUser, middlewareTokenUser, (req, res) => {
    res.render('course-detail.ejs');
});
router.get('/learn', verifyLoginUser, middlewareTokenUser, (req, res) => {
    res.render('learn.ejs');
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
router.get('/register', (req, res) => {
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
});
router.get('/admin-dashboard/route-study/post', verifyLoginAdmin, middlewareTokenAdmin, (req, res) => {
    res.render('route-study-post-dashboard.ejs');
});
router.get('/admin-dashboard/user-management', verifyLoginAdmin, (req, res) => {
    console.log(req.headers);

    res.render('user-management.ejs')
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
//...................(POST);..........................................
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
router.post('/api/admin-dashboard/course/post/image', upload.single('imageCourse'), (req, res) => {
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
router.post('/api/admin-dashboard/route-study/post/image', upload.single('imageRouteStudy'), (req, res) => {
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
router.post('/api/admin-dashboard/route-study/post/image-change', upload.single('imageUpdate'), (req, res) => {
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
//......................................(PUT)....................................................................
router.put('/api/admin-dashboard/route-study/update/:id', upload.array(), (req, res) => {
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
    // console.log(id);
    // db.execu te('UPDATE `lms_schema`.`route_study` SET `route_name` = ?, `date_up` = ?, `description_route` = ?, `image_route` = ?, `total_time_route` = ? WHERE (`id_route` = ?)', [])
});

router.post('/api/admin-dashboard/user-management', (req, res) => {

});
router.post('/api/v1/admin-register', upload.none(), userRegister);


router.post('/api/v1/admin-login', upload.none(), adminLogin);


// function callback................................................................
let saveFilePdf = (pdfUrl) => {
    db.execute('insert into test (id, url) values (?, ?)', [2, pdfUrl])
        .then(response => {
            console.log(response);
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
