
module.exports = (sequelize, Sequelize) => {
    const thong_tin_chung = sequelize.define('thong_tin_chung', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        del_flat: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },{
        timestamps:false,
        underscore: false,
        freezeTableName: true
    })
    return thong_tin_chung;
}
