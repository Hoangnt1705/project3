"use strict";

require('dotenv').config();
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var initRoutes = require('./routers/lms.routes');
var initRoutesSequelize = require('./routers/lms.sequelize.routes');
var session = require('express-session');
var MYSQLStore = require('express-mysql-session')(session);
var connection = require('./service/statusConnect');
var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Baitulong1@',
  database: 'lms_schema'
};
//...............middlewareApplication..................
var sessionStore = new MYSQLStore(options);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(session({
  key: 'secret',
  secret: 'secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
//............................configModel......................................
var configViewEngine = require('./config/viewEngine');
configViewEngine(app);
initRoutesSequelize(app);
initRoutes(app);
connection();
//.............runEnviroment...............................................
app.get('*', function (req, res) {
  res.render('notFoundPage.ejs');
});
app.listen(PORT, function () {
  console.log("Server is up and running at: http://localhost:".concat(PORT));
});
// const initApp = async () => {
//     console.log("Testing the database connection..");
//     try {
//         await db.authenticate();
//         console.log("Connection has been established successfully.");
//         PostModel.sync({
//             alter: true,
//         });
//         app.post("/router/api/admin-dashboard/class/create", (req, res) => {
//             let { id, ratting, name, title } = req.body
//             console.log(id, ratting, name, title);

//         });

//     } catch (error) {
//         console.error("Unable to connect to the database:", error.original);
//     }
// };

// initApp();