const { Class, Users, Learn, Doc, PoolDocCompleted } = require('../service/tableSequelize');
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
module.exports.attendanceModel = async (req, res, idUserMatchAccount, putInfoAccount) => {
    try {
        const userAttendance = await Users.findByPk(idUserMatchAccount);
        const userAttendanceParse = userAttendance.dataValues;
        // const currentMyRoute = await Class.findAll({ where: { user_id: idUserMatchAccount, route_study } });
        let dataUser = [];
        dataUser.push(userAttendanceParse);
        // console.log(currentMyRoute);
        return res.render('attendance.ejs', { putInfoAccount: putInfoAccount, dataUser });

    } catch (error) {
        res.status(500).json({ message: error });
    }
};