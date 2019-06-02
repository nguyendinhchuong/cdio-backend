
module.exports = (sequelize, Sequelize) => {
    const faculty = sequelize.define('faculty', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        NameFaculty: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },{
        freezeTableName: true,
        timestamps: false
    })
    return faculty;
}




