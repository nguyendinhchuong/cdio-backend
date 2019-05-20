var db = require('../../../models/index');

module.exports = (sequelize, Sequelize) => {
    const detailoutcomstandard = sequelize.define('detailoutcomestandard', {
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        IdOutcomeStandard: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        KeyRow: {
            type: Sequelize.STRING,
            allowNull: false
        },
        NameRow: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },{
        freezeTableName: true,
        timestamps: false
    })
    return detailoutcomstandard;
}




