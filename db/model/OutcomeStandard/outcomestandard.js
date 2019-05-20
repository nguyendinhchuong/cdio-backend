
module.exports = (sequelize, Sequelize) => {
    const outcomestandard = sequelize.define('outcomestandard', {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        IdFaculty: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        IdProgram: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        IdUser: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        NameOutcomeStandard: {
            type: Sequelize.STRING,
            allowNull: false
        },
        SchoolYear: {
            type: Sequelize.STRING,
            allowNull: false
        },
        DateCreated: {
            type: Sequelize.DATE
        },
        DateEdited: {
            type: Sequelize.DATE
        }
        
    },{
        timestamps:false,
        underscore: false,
        freezeTableName: true
    })
    return outcomestandard;
}


// exports.getOS = () => {
//     return new Promise((resolve, reject) => {
//         db.sequelize.authenticate()
//             .then(() => {
//                 db.sequelize.query("select * from outcomestandard", { model: outcomestandard })
//                     .then(outcomestandard => {
//                         resolve(outcomestandard);
//                     })
//                     .catch(err => {
//                         reject(err);
//                     })
//             })
//     })
// }
// exports.addOS = (data) => {
//     return new Promise((resolve, reject) => {
//         db.sequelize.authenticate()
//             .then(() => {

//                 let os = outcomestandard.build({
//                     IdFaculty: data.IdFaculty,
//                     IdProgram: data.IdProgram,
//                     IdUser: data.IdUser,
//                     NameOutcomeStandard: data.NameOutcomeStandard,
//                     SchoolYear: data.SchoolYear,
//                     DateCreated: data.DateCreated,
//                     DateUpdated: data.DateUpdated
//                 });
//                 os.save(() => {
//                     console.log("save success")
//                     resolve({
//                         code: 1,
//                         message: "Save success"
//                     })
//                 });
//             })
//             .catch(err => {
//                 reject(err);
//             })
//     })


// }