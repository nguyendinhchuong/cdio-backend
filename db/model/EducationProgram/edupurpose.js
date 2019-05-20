module.exports = (sequelize, Sequelize) => {
    const edupurpose = sequelize.define('edupurpose', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        IdDetail:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        KeyRow: {
            type: Sequelize.STRING,
            allowNull: false
        },
        NameRow: {
            type: Sequelize.STRING,
            allowNull: false
        },
        DateCreated:{
            type: Sequelize.DATE,
            allowNull:false
        },
        OSUsed:{
            type:Sequelize.BOOLEAN,
        }       
    },{
        freezeTableName: true,
        timestamps: false
    })
    return edupurpose;
}