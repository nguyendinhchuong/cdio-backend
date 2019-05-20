module.exports = (sequelize, Sequelize) => {
    const detailblock = sequelize.define('detailblock', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        IdSubject:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        IdSubjectBlock:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        DateCreated:{
            type: Sequelize.DATE,
            allowNull: true
        },
    },{
        freezeTableName: true,
        timestamps: false
    })
    return detailblock;
}