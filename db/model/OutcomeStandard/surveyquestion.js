
module.exports = (sequelize, Sequelize)=>{
    const surveyquestion = sequelize.define('surveyquestion', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        IdSurvey: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Question: {
            type: Sequelize.STRING,
            allowNull: false
        },
        AnswerField1: {
            type: Sequelize.STRING
        },
        AnswerField2: {
            type: Sequelize.STRING
        },
        AnswerField3: {
            type: Sequelize.STRING
        },
        AnswerField4: {
            type: Sequelize.STRING
        },
        AnswerField5: {
            type: Sequelize.STRING
        },
        NumberChoose1:{
            type: Sequelize.INTEGER
        },
        NumberChoose2:{
            type: Sequelize.INTEGER
        },
        NumberChoose3:{
            type: Sequelize.INTEGER
        },
        NumberChoose4:{
            type: Sequelize.INTEGER
        },
        NumberChoose5:{
            type: Sequelize.INTEGER
        },
    },{
        freezeTableName: true,
        timestamps: false
    })
    return surveyquestion;
}
