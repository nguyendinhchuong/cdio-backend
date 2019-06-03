

module.exports = (sequelize, Sequelize)=>{
    const program = sequelize.define('program', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        NameProgram: {
            type: Sequelize.STRING,
            allowNull: false
        }
        
    },{
        freezeTableName: true,
        timestamps: false
    })
    return program;
}




