module.exports = (sequelize, Sequelize)=>{
    const user_has_role = sequelize.define('user_has_role',{
        idUser:{
            type: Sequelize.INTEGER,
            allowNull:false
        },
        idRole:{
            type: Sequelize.INTEGER,
            allowNull:false
        }
    },{
        freezeTableName: true,
        timestamps: false
    })
    return user_has_role;
}