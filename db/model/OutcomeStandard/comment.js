module.exports = (sequelize, Sequelize) => {
    const comment = sequelize.define('comment', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        IdOutcome: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        KeyRow:{
            type: Sequelize.STRING
        },
        IdUser:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Content:{
            type: Sequelize.STRING
        },
        CommentDate:{
            type: Sequelize.DATE
        },
        UserDone:{
            type: Sequelize.INTEGER
        }
    },{
        freezeTableName: true,
        timestamps: false
    })
    return comment;
}
