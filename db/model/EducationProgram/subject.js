module.exports = (sequelize, Sequelize) => {
    const subject = sequelize.define('subject', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        SubjectCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        SubjectName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        SubjectEngName: {
            type: Sequelize.STRING
        },
        Credit:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        TheoryPeriod:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        PracticePeriod:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ExercisePeriod:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Description: {
            type: Sequelize.STRING,
        },
        DateCreated:{
            type: Sequelize.DATE,
            allowNull: false
        },
        DateEdited:{
            type: Sequelize.DATE,
            allowNull: false
        },
        del_flat:{
             type: Sequelize.BOOLEAN,
             allowNull: true
        }
    },{
        freezeTableName: true,
        timestamps: false
    })
    return subject;
}