module.exports = (sequelize, Sequelize) => {
    const chuan_dau_ra_cdio = sequelize.define('chuan_dau_ra_cdio', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        del_flat: {
            type: Sequelize.BOOLEAN
        }
    },{
        freezeTableName: true,
        timestamps: false
    })
    return chuan_dau_ra_cdio;
}