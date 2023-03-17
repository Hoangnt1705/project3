const {sequelize} = require('./connectSequelize');
const connection = async () => {
    (async () => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            await sequelize.sync({ alias: true });
            console.log('Post table created successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    })();
};
module.exports = connection;