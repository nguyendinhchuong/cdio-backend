module.exports = (sequelize, Sequelize) => {
    const eduprogramcontent = sequelize.define('eduprogramcontent', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        KeyRow: {
            type: Sequelize.STRING,
            allowNull: false
        },
        NameRow: {
            type: Sequelize.STRING
            
        },
        Credit: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        Description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Type: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        IdEduProgram: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        DateCreated: {
            type: Sequelize.DATE,
            allowNull: true
        },
    }, {
            freezeTableName: true,
            timestamps: false
        })
    return eduprogramcontent;
}