module.exports = (sequelize, Sequelize) => {
    const eduprogram = sequelize.define('eduprogram', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        EduName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        EduEngName: {
            type: Sequelize.STRING
        },
        IdLevel:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        IdMajor:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        IdProgram:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        SchoolYear: {
            type: Sequelize.STRING,
            allowNull: false
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
    return eduprogram;
}