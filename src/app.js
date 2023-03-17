require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const initRoutes = require('./routers/lms.routes');
const initRoutesSequelize = require('./routers/lms.sequelize.routes');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session')(session);
const connection = require('./service/statusConnect');
require('@tensorflow/tfjs-node');
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Baitulong1@',
    database: 'lms_schema',
};

//...............middlewareApplication..................
const sessionStore = new MYSQLStore(options);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(session({
    key: 'secret',
    secret: 'secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
}));
//............................configModel......................................
const configViewEngine = require('./config/viewEngine');
configViewEngine(app);
initRoutesSequelize(app);
initRoutes(app);
connection();
//.............runEnviroment...............................................
app.get('*', (req, res) => {
    res.render('notFoundPage.ejs');
});
app.listen(PORT, () => {
    console.log(`Server is up and running at: http://localhost:${PORT}`);
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