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
const { Class, Users, RouteStudy, Learn, Doc, PoolDocCompleted, Course, PoolCourseCompleted } = require('../service/tableSequelize');
const { resolveShowConfigPath } = require('@babel/core/lib/config/files/index.js');
// const { sequelize } = require('../service/connectSequelize');
// const classa = await Class.findByPk(7); đây là find theo primary key 
// let user = await classa.dataValues
// console.log(user);
Class.hasMany(Users);
Users.belongsTo(Class, { foreignKey: 'classIdClass' });

RouteStudy.hasMany(Class);
Class.belongsTo(RouteStudy, { foreignKey: 'routeStudyIdRoute' });

RouteStudy.hasMany(Course);
Course.belongsTo(RouteStudy, { foreignKey: 'routeStudyIdRoute' });

Users.hasMany(Learn);
Learn.belongsTo(Users, { foreignKey: 'user_id' });

Learn.hasMany(Doc);
Doc.belongsTo(Learn, { foreignKey: 'learn_id' });

Course.hasMany(Doc);
Doc.belongsTo(Course, { foreignKey: 'courseIdCourse' });

Course.hasMany(PoolDocCompleted);
PoolDocCompleted.belongsTo(Course, { foreignKey: 'courseIdCourse' });

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
    routerSequelize.get('/my-class', verifyLogin, middlewareTokenUser, async (req, res) => {
        try {
            let idUserMatchAccount = req.user.id;
            let putInfoAccount = 'Verify successfully';
            const userMyClass = await Users.findByPk(idUserMatchAccount);
            const userMyClassStudyParse = userMyClass.dataValues;
            let dataUser = [];
            dataUser.push(userMyClassStudyParse);
            let dataClass = await Class.findOne({
                where: {
                    id_class: userMyClassStudyParse.classIdClass
                }
            });
            console.log(dataClass.dataValues);
            res.render('my-class.ejs', { putInfoAccount: putInfoAccount, dataUser: dataUser, dataClass: dataClass.dataValues });
        } catch (error) {
            res.status(500).send({ message: error });
        }
    });
    routerSequelize.get('/point-history', verifyLogin, middlewareTokenUser, async (req, res) => {
        try {
            let idUserMatchAccount = req.user.id;
            let putInfoAccount = 'Verify successfully';
            const userMyRouteStudy = await Users.findByPk(idUserMatchAccount);
            const userMyRouteStudyParse = userMyRouteStudy.dataValues;
            let dataUser = [];
            dataUser.push(userMyRouteStudyParse);
            res.render('point-history.ejs', { putInfoAccount: putInfoAccount, dataUser: dataUser });
        } catch (error) {
            res.status(500).send({ message: error });
        }
    });
    routerSequelize.get('/exam-history', verifyLogin, middlewareTokenUser, async (req, res) => {
        try {
            let idUserMatchAccount = req.user.id;
            let putInfoAccount = 'Verify successfully';
            const userMyRouteStudy = await Users.findByPk(idUserMatchAccount);
            const userMyRouteStudyParse = userMyRouteStudy.dataValues;
            let dataUser = [];
            dataUser.push(userMyRouteStudyParse);
            res.render('exam-history.ejs', { putInfoAccount: putInfoAccount, dataUser: dataUser });
        } catch (error) {
            res.status(500).send({ message: error });
        }
    });
    routerSequelize.get('/recently-course', verifyLogin, middlewareTokenUser, async (req, res) => {
        try {
            let idUserMatchAccount = req.user.id;
            let putInfoAccount = 'Verify successfully';
            const userrRecently = await Users.findByPk(idUserMatchAccount);
            const userrRecentlyParse = userrRecently.dataValues;
            let dataUser = [];
            dataUser.push(userrRecentlyParse);
            const dataCourse = await Course.findAll();
            const dataRecentlyCourse = await PoolDocCompleted.findAll({
                where: { courseIdCourse: dataCourse.map(course => course.id_course), user_id: idUserMatchAccount, class_id: userrRecentlyParse.classIdClass },
                include: {
                    model: Course,
                    include: {
                        model: Doc
                    },
                },
                order: [
                    ['date_up', 'DESC']
                ],
                limit: 3,
            });
            const dataRecentlyCourseConvert = dataRecentlyCourse.map(recently => recently.course);
            const dataRecentlyCourseConvertGetCourse = dataRecentlyCourseConvert.map(course => course.dataValues);
            const resultRecentlyCourse = dataRecentlyCourseConvertGetCourse.reduce((acc, course) => {
                if (!acc.find((c) => c.id_course === course.id_course)) {
                    acc.push(course);
                };
                return acc;
            }, []);
            const dataLearn = await Learn.findAll();
            const dataPoolDocCompleted = await PoolDocCompleted.findAll({
                where: { courseIdCourse: resultRecentlyCourse.map(course => course.id_course), class_id: userrRecentlyParse.classIdClass, user_id: req.user.id, learn_id: dataLearn.map(learn => learn.id_learn) },
                raw: true,
            });
            if (resultRecentlyCourse.length !== 0) {
                res.render('recently-course.ejs', { putInfoAccount: putInfoAccount, dataUser: dataUser, resultRecentlyCourse: resultRecentlyCourse, dataPoolDocCompleted: dataPoolDocCompleted, });
            }
            else {
                res.render('recently-course.ejs', { putInfoAccount: putInfoAccount, dataUser: dataUser, resultRecentlyCourse: undefined, dataPoolDocCompleted: undefined, });
            }

        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error });
        }
    });
    routerSequelize.post('/api/v1/pool-course-completed/post', middlewareTokenUser, async (req, res) => {
        try {
            let { idClassPoolCourse, idRoutePoolCourse, idCoursePoolCourse } = req.body;
            const currentDate = new Date();
            const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
            await PoolCourseCompleted.create({
                date_up: dateUp,
                class_id: idClassPoolCourse,
                userId: req.user.id,
                route_id: idRoutePoolCourse,
                course_id: idCoursePoolCourse,
            }).then(response => res.status(200).json({ message: response }));
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error });
        }
    });
    routerSequelize.get('/my-router', verifyLogin, middlewareTokenUser, upload.none(), async (req, res) => {
        let idUserMatchAccount = req.user.id;
        let putInfoAccount = 'Verify successfully';
        const userMyRouteStudy = await Users.findByPk(idUserMatchAccount);
        const userMyRouteStudyParse = userMyRouteStudy.dataValues;
        let dataUser = [];
        dataUser.push(userMyRouteStudyParse);
        const resultMyRouteStudy = await Users.findOne({
            where: { id: req.user.id },
            include: {
                model: Class,
                attributes: ['id_class'],
                include: {
                    model: RouteStudy,
                    include: {
                        model: Course,
                        attributes: ['id_course'],
                    },
                },
            },
        });
        const dataRouteStudy = await RouteStudy.findAll();
        const dataPoolCourseCompleted = await PoolCourseCompleted.findAll({
            where: { class_id: userMyRouteStudyParse.classIdClass, user_id: req.user.id, route_id: dataRouteStudy.map(route => route.id_route) },
            raw: true,
        });
        if (resultMyRouteStudy && resultMyRouteStudy.class && resultMyRouteStudy.class.route_study &&
            resultMyRouteStudy.class.route_study.courses) {
            const routeStudyData = resultMyRouteStudy.class.route_study.get({ plain: true });
            res.render('my-router.ejs', {
                putInfoAccount: putInfoAccount, dataUser, routeStudyData: routeStudyData,
                dataPoolCourseCompleted: dataPoolCourseCompleted
            });
        } else {
            res.render('my-router.ejs', {
                putInfoAccount: putInfoAccount, dataUser, routeStudyData: undefined,
                dataPoolCourseCompleted: undefined
            });
        }
    });
    routerSequelize.get('/admin-dashboard/class', verifyLoginAdmin, (req, res) => {
        res.render('admin-dashboard-class.ejs');
    });
    routerSequelize.get('/course/:id', middlewareTokenUser, verifyLogin, async (req, res) => {
        try {
            let { id } = req.params;
            let idUserMatchAccount = req.user.id;
            let putInfoAccount = 'Verify successfully';
            const userAttendance = await Users.findByPk(idUserMatchAccount);
            const userAttendanceParse = userAttendance.dataValues;
            let dataUser = [];
            dataUser.push(userAttendanceParse);
            let courseBelong = await Course.findAll({ where: { route_id: id } });
            let courseBelongConvert = courseBelong.map(courseOf => courseOf.dataValues);
            res.render('course-belong.ejs', { courseBelongConvert: courseBelongConvert, dataUser, putInfoAccount: putInfoAccount });
        } catch (error) {
            res.status(500).send({ message: error });
        };
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
    routerSequelize.get('/admin-dashboard/class/update/form/:id', verifyLoginAdmin, async (req, res) => {
        try {
            let { id } = req.params;
            let dataClassParams = await Class.findByPk(id);
            let dataRouteStudy = await RouteStudy.findAll();
            let dataRouteStudyConvert = dataRouteStudy.map(route => route.dataValues);
            console.log(dataClassParams.dataValues);
            res.render('admin-dashboard-class-update-form.ejs', { dataRouteStudyConvert: dataRouteStudyConvert, dataClassParams: dataClassParams.dataValues });
        } catch (error) {
            res.status(500).send({ message: err });
        }
    });
    routerSequelize.put('/api/admin-dashboard/class/update/:id', middlewareTokenAdmin, upload.none(), async (req, res) => {
        try {
            let { className, typeClass, startCeremony, endDate, setRoute } = req.body;
            console.log(className, typeClass, startCeremony, endDate, setRoute);
            const currentDate = new Date();
            const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
            await Class.update({
                class_name: className,
                date_up: dateUp,
                type_class: typeClass,
                routeStudyIdRoute: setRoute,
                user_admin_id: req.user.id,
                start_date: startCeremony,
                end_date: endDate
            }, {
                where: { id_class: req.params.id },
            }
            );
            res.status(200).json({ message: 'successfully' });
        } catch (error) {
            res.status(500).send({ message: error });
        }


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
        const currentDate = new Date();
        const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
        try {
            await Class.create({
                class_name: className,
                date_up: dateUp,
                type_class: typeClass,
                routeStudyIdRoute: 1,
                user_admin_id: req.user.id,
                start_date: startCeremony,
                end_date: null,
            });
            res.send({ message: 'Error creating class!' });
        }
        catch (err) {
            console.log(err);
        }
    });
    routerSequelize.post('/api/v1/pool-doc-completed/post', middlewareTokenUser, async (req, res) => {
        let { idDocPool, classIdPool, courseIdPool, learnIdPool, arrangeIdPool } = req.body;
        const currentDate = new Date();
        const dateUp = currentDate.getHours() + 'h:' + currentDate.getMinutes() + 'm-' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
        PoolDocCompleted.create({
            date_up: dateUp,
            user_id: req.user.id,
            class_id: Number(classIdPool),
            courseIdCourse: Number(courseIdPool),
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
                        where: { learn_id: learnData.map((learn) => learn.id_learn), courseIdCourse: courseIdPool, user_id: userId }, // Có thể
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
                }
            })
            .catch(err => console.log(err));
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
    //return router.......................
    return app.use('/router', routerSequelize);
};

module.exports = initRoutesSequelize;


