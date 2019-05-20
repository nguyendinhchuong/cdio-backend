var db = require('../../../models/index');

module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define('user', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // Name: {
        //     type: Sequelize.STRING,
        //     allowNull: true
        // },
        // IdFaculty:{
        //     type: Sequelize.INTEGER,
        //     allowNull:true
        // },
        // IdMajor:{
        //     type: Sequelize.INTEGER,
        //     allowNull:true
        // },
        Role:{
            type: Sequelize.STRING,
            allowNull:true
        },
        DateCreated:{
            type: Sequelize.DATE,
            allowNull: false
        },
        DateEdited:{
            type: Sequelize.DATE,
            allowNull: false
        }
    },{
        freezeTableName: true,
        timestamps: false
    })
    return user;
}




