'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


 
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//models/tables
db.outcomestandard = require('../db/model/OutcomeStandard/outcomestandard')(sequelize, Sequelize);
db.faculty = require('../db/model/OutcomeStandard/faculty')(sequelize, Sequelize);
db.program = require('../db/model/OutcomeStandard/program')(sequelize, Sequelize);
db.detailoutcomestandard = require('../db/model/OutcomeStandard/detailoutcomestandard')(sequelize, Sequelize);
db.revision = require('../db/model/OutcomeStandard/revision')(sequelize, Sequelize);
db.detailrevision = require('../db/model/OutcomeStandard/detailrevision')(sequelize, Sequelize);
db.outcomeeduprogram = require('../db/model/OutcomeStandard/OutcomeEduProgram')(sequelize, Sequelize);

db.subject = require('../db/model/EducationProgram/subject')(sequelize, Sequelize);
db.eduprogram = require('../db/model/EducationProgram/EduProgram')(sequelize, Sequelize);
db.subjecteduprog = require('../db/model/EducationProgram/SubjectEduProg')(sequelize, Sequelize);
db.major = require('../db/model/EducationProgram/Major')(sequelize, Sequelize);
db.level = require('../db/model/EducationProgram/Level')(sequelize, Sequelize);
db.detaileduprog = require('../db/model/EducationProgram/detaileduprog')(sequelize, Sequelize);
db.edupurpose = require('../db/model/EducationProgram/edupurpose')(sequelize, Sequelize);
db.subjectblock = require('../db/model/EducationProgram/subjectblock')(sequelize, Sequelize);
db.detailblock = require('../db/model/EducationProgram/detailblock')(sequelize, Sequelize);
db.eduprogcontent = require('../db/model/EducationProgram/eduprogcontent')(sequelize, Sequelize);
// namtv
//db.teachersubject = require('../db/model/EducationProgram/teachersubject')(sequelize, Sequelize);
db.teachplanblock = require('../db/model/EducationProgram/teachplanblock')(sequelize, Sequelize);
db.detailteachplanblock = require('../db/model/EducationProgram/detailteachplanblock')(sequelize, Sequelize);


db.user = require('../db/model/User/user')(sequelize, Sequelize);
db.user_has_role = require('../db/model/User/user_has_role')(sequelize, Sequelize);
db.user_has_role.removeAttribute('id');

// // //Relations
// db.outcomestandard.hasMany(db.detailoutcomestandard);
// db.faculty.hasMany(db.outcomestandard);
// db.outcomestandard.belongsTo(db.faculty);

// db.outcomestandard.hasMany(db.detailoutcomestandard);
// db.detailoutcomestandard.belongsTo(db.outcomestandard);


// db.outcomestandard.belongsTo(db.program);
// db.program.hasMany(db.outcomestandard);



module.exports = db;
