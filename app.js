const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secret = 'secret';
const cors = require('cors');
const router = require('./routers/lms.routes.js');
app.set(cookieParser());
app.set('view engine', 'ejs');
app.set('trust poroxy', 1);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors());
app.use('/router', router);
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}/router`);
})