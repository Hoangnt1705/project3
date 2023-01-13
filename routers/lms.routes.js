const db = require('../utils/database.js');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.ejs')
    // console.log("aaa");
})

router.get('/route-study', (req, res) => {
    res.render('route-study.ejs')
})
router.get('/route-study', (req, res) => {
    res.render('route-study.ejs')
})
router.get('/course', (req, res) => {
    res.render('course.ejs')
})
router.get('/control-panel', (req, res) => {
    res.render('control-panel.ejs');
});
router.get('/course-detail', (req, res) => {
    res.render('course-detail.ejs');

})
module.exports = router;