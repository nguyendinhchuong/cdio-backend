
module.exports = (sequelize, Sequelize) => {
    const teachersubject = sequelize.define('teachersubject', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        IdSubject: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        IdUser: {
            type: Sequelize.INTEGER,
            allowNull: false
        },        
        DateCreated: {
            type: Sequelize.DATE
        } 
    },{
        timestamps:false,
        underscore: false,
        freezeTableName: true
    })
    return teachersubject;
}

