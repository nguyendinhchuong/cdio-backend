
module.exports = (sequelize, Sequelize) => {
    const teachplanblock = sequelize.define('teachplanblock', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        IdDetailEdu: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Semester: {
            type: Sequelize.INTEGER
        },        
        DateCreated: {
            type: Sequelize.DATE
        } 
    },{
        timestamps:false,
        underscore: false,
        freezeTableName: true
    })
    return teachplanblock;
}
