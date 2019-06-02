
module.exports = (sequelize, Sequelize)=>{
    const outcomesurvey = sequelize.define('outcomesurvey', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        IdOutcome: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        IdUser: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        CreatedDate:{
            type: Sequelize.DATE
        }
    },{
        freezeTableName: true,
        timestamps: false
    })
    return outcomesurvey;
}
