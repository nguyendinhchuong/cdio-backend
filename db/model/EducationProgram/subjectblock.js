module.exports = (sequelize, Sequelize) => {
    const subjectblock = sequelize.define('subjectblock', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        IdEduProgContent:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Credit:{
            type: Sequelize.INTEGER,
            allowNull: false
        },        
        isAccumulated:{
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        KeyRow:{
            type: Sequelize.STRING,
        },
        NameBlock:{
            type: Sequelize.STRING,
        },
        DateCreated:{
            type: Sequelize.DATE,
            allowNull: true
        },
    },{
        freezeTableName: true,
        timestamps: false
    })
    return subjectblock;
}