module.exports = (sequelize, Sequelize) => {
    const role = sequelize.define('role', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },        
        role:{
            type: Sequelize.STRING
        }
        
        
    },{
        freezeTableName: true,
        timestamps: false
    })
    return role;
}