var db = require('../../../models/index');

module.exports = (sequelize, Sequelize) => {
    const detailrevision = sequelize.define('detailrevision', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        IdRevision: {
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
    return detailrevision;
}
