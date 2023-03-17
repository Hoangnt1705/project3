// const fs = require('fs');
// const cookieParser = require('cookie-parser');
// const path = require('path');
// const uuid = require('uuid-v4');
const express = require('express');
const routerSequelize = express.Router();
const path = require('path');
/** 
 * 
 * @param {*} app : express app
 */
//config bodyParser
const bodyParser = require('body-parser');
routerSequelize.use(bodyParser.json());
routerSequelize.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { middlewareTokenUser, middlewareTokenAdmin, verifyLoginAdmin, verifyLogin } = require('../middlewares/jsonwebtoken-middleware.js');
const { test } = require('../middlewares/middleware.sequelize');
//middleware import 
const { Class, Users, Learn, Doc, PoolDocCompleted, Course } = require('../service/tableSequelize');
// const { sequelize } = require('../service/connectSequelize');
// const classa = await Class.findByPk(7); đây là find theo primary key 
// let user = await classa.dataValues
// console.log(user);
Class.hasMany(Users);
Users.belongsTo(Class, { foreignKey: 'classIdClass' });
Users.hasMany(Learn);
Learn.belongsTo(Users, { foreignKey: 'user_id' });

Learn.hasMany(Doc);
Doc.belongsTo(Learn, { foreignKey: 'learn_id' });

Doc.belongsToMany(Users, { through: 'pool_doc_completed', foreignkey: 'user_id' });
PoolDocCompleted.belongsTo(Doc, { foreignKey: 'doc_id', otherKey: 'learn_id', });
Doc.hasMany(PoolDocCompleted, {
    foreignKey: 'learn_id'
});
Doc.hasMany(PoolDocCompleted, {
    foreignKey: 'user_id'
});
// define table sequelize; 
const initRoutesSequelize = (app) => {
    routerSequelize.post('/api/save-recognition', (req, res) => {
        const { name, timestamp } = req.body;
    });
    routerSequelize.get('/admin-dashboard/class', verifyLoginAdmin, (req, res) => {
        res.render('admin-dashboard-class.ejs');
    });
    routerSequelize.get('/course/:id', middlewareTokenUser, verifyLogin, async (req, res) => {
        let { id } = req.params;
        let idUserMatchAccount = req.user.id;
        let putInfoAccount = 'Verify successfully';
        const userAttendance = await Users.findByPk(idUserMatchAccount);
        const userAttendanceParse = userAttendance.dataValues;
        let dataUser = [];
        dataUser.push(userAttendanceParse);
        console.log(path.join(__dirname, '../public/weights'));
        let courseBelong = await Course.findAll({ where: { route_id: id } });
        let courseBelongConvert = courseBelong.map(courseOf => courseOf.dataValues);
        console.log(courseBelongConvert);
        res.render('course-belong.ejs', { courseBelongConvert: courseBelongConvert, dataUser, putInfoAccount: putInfoAccount });
    });
    routerSequelize.get('/test1', middlewareTokenUser, verifyLogin, test, (req, res) => {
        Learn.findAll({
            include: [{
                model: Doc,
                // where: {id: sequelize.col('classIdClass')} // add in condition
            }]
        })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({ message: err });
            });
    });
    routerSequelize.get('/admin-dashboard/class/update', verifyLoginAdmin, async (req, res) => {
        Class.findAll({
            include: [{
                model: Users,
                // where: {id: sequelize.col('classIdClass')} // add in condition
            }],
        })
            .then(response => {
                res.render('admin-dashboard-class-update.ejs', { data: response });
            })
            .catch(err => {
                res.status(500).send({ message: err });
            });
    });
    //.......api..............
    routerSequelize.post('/api/admin-dashboard/class/create', middlewareTokenAdmin, upload.none(), async (req, res) => {
        let { className, typeClass, startCeremony } = req.body;
        try {
            await Class.create({
                class_name: className,
                type_class: typeClass,
                route_study_id: 1,
                user_id: 1,
                start_date: startCeremony,
                end_date: null,
            });
            res.send({ message: 'Error creating class!' });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: err });
        }
    });
    routerSequelize.post('/api/v1/pool-doc-completed/post', middlewareTokenUser, async (req, res) => {
        let { idDocPool, courseIdPool, learnIdPool, arrangeIdPool } = req.body;
        const currentDate = new Date();
        const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
        PoolDocCompleted.create({
            date_up: dateUp,
            user_id: req.user.id,
            course_id: Number(courseIdPool),
            learn_id: Number(learnIdPool),
            docIdDoc: Number(idDocPool),
            arrangeId: Number(arrangeIdPool),
        })
            .then(async () => {
                const userId = req.user.id; // assuming that the user ID is stored in req.user.id
                try {
                    const learnData = await Learn.findAll({
                        include: [{ model: Doc }],
                    });
                    const docData = await Doc.findAll({
                        where: { course_id: courseIdPool, learn_id: learnData.map((learn) => learn.id_learn) }
                    });
                    const completedDocs = await PoolDocCompleted.findAll({
                        where: { learn_id: learnData.map((learn) => learn.id_learn), course_id: courseIdPool, user_id: userId }, // Có thể
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
                    res.status(200).json({
                        data: userData.resultLessonReadings,
                        resultCombineCheckButtonCompleted: resultCombineCheckButtonCompleted
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            })
            .catch(err => res.status(500).json({ meassage: 'Internal Server Error' + err }));
    });
    routerSequelize.get('/admin-dashboard/class/update/:id', middlewareTokenAdmin, upload.none(), (req, res) => {
        let { id } = req.params;
        Class.findByPk(id)
            .then(response => {
                res.render('class-dashboard-class-update.ejs', { data: response });
            })
            .catch(err => {
                res.status(500).json({ message: err });
            });
    });
    const { attendanceController } = require('../controllers/lms.sequelize.controller');
    routerSequelize.get('/attendance', verifyLogin, middlewareTokenUser, upload.none(), attendanceController);
    //return router.......................
    return app.use('/router', routerSequelize);
};

module.exports = initRoutesSequelize;


