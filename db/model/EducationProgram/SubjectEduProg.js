module.exports = (sequelize, Sequelize) => {
    const subjecteduprog = sequelize.define('subjecteduprog', {
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
        IdEduProg: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        DateCreated: {
            type: Sequelize.DATE,
            allowNull: false
        },
        IdUser: {
            type: Sequelize.STRING
        },
        IdMainTeacher: {
            type: Sequelize.INTEGER
        }
    }, {
            freezeTableName: true,
            timestamps: false
        })
    return subjecteduprog;
}