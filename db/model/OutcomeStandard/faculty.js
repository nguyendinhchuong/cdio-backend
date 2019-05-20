var db = require('../../../models/index');

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




// exports.getFaculty = () => {
//     return new Promise((resolve, reject) => {
//         db.sequelize.authenticate()
//             .then(() => {
//                 db.sequelize.query("select * from faculty", { model: faculty })
//                     .then(faculty => {
//                         resolve(faculty)
//                     })
//             })
//             .catch(err => {
//                 reject(err);
//             })
//     })

// }