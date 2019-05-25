
module.exports = (sequelize, Sequelize) => {
    const detailteachplanblock = sequelize.define('detailteachplanblock', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        IdTeachPlan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        IdSubject: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Note: {
            type: Sequelize.STRING
        },
        DateCreated: {
            type: Sequelize.DATE
        },
        Optional:{
            type: Sequelize.BOOLEAN
        },
        IdTeacher:{
            type: Sequelize.INTEGER
        }
    }, {
            timestamps: false,
            underscore: false,
            freezeTableName: true
        })
    return detailteachplanblock;
}
