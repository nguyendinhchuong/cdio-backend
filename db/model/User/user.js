var db = require('../../../models/index');

module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING
        },
        name:{
            type: Sequelize.STRING
        }
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
        
    },{
        freezeTableName: true,
        timestamps: false
    })
    return user;
}




