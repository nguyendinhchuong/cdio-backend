var db = require('../../../models/index');

module.exports = (sequelize, Sequelize) => {
    const revision = sequelize.define('revision', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        IdOutcomeStandard: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        IdUser: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        NameRevision: {
            type: Sequelize.STRING,
            allowNull: false
        },
        DateUpdated: {
            type: Sequelize.DATE
        }
    },{
        freezeTableName: true,
        timestamps: false
    })
    return revision;
}
