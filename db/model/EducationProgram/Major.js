module.exports = (sequelize, Sequelize) => {
    const major = sequelize.define('major', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        MajorCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        MajorName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        MajorEngName: {
            type: Sequelize.STRING
        },
        IdFaculty:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },{
        freezeTableName: true,
        timestamps: false
    })
    return major;
}