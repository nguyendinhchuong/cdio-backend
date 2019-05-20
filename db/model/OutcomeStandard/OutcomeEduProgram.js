
module.exports = (sequelize, Sequelize) => {
    const outcomeeduprogram = sequelize.define('outcomeeduprogram', {
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
        IdEduProgram: {
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
    return outcomeeduprogram;
}

