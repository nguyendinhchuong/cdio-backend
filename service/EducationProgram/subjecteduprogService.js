const db = require('../../models/index');

const Op = db.Sequelize.Op;
exports.getSubjectByEduProgId = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subjecteduprog.findAll({
                    where: {
                        IdEduProg: request.IdEduProg
                    }
                })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.getEduProgBySubjectId = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subjecteduprog.findAll({
                    where: {
                        IdSubject: request.IdSubject
                    }
                })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.addSubjectToEduProg = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subjecteduprog.findOne({
                    where: {
                        IdSubject: request.IdSubject,
                        IdEduProg: request.IdEduProg
                    }
                })
                    .then(data => {
                        if (data) {
                            let code = -2;
                            resolve(code);
                        } else {
                            db.subjecteduprog.create(request)
                                .then(() => {
                                    let code = 1;
                                    resolve(code);
                                })
                                .catch(err => {
                                    reject(err);
                                })
                        }
                    })
                    .catch(err => {
                        reject(err);
                    })

            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.deleteSubjectFromEduProg = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subjecteduprog.destroy({
                    where: {
                        IdSubject: request.IdSubject,
                        IdEduProg: request.IdEduProg
                    }
                })
                    .then(effectRows => {
                        console.log("Effected row of subjecteduprog: " + effectRows);
                        let code = 1;
                        resolve(code);
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.deleteAllSubjectFromEduProg = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subjecteduprog.destroy({
                    where: {
                        IdEduProg: request.IdEduProg
                    }
                })
                    .then(effectRows => {
                        console.log("Effected row of subjecteduprog: " + effectRows);
                        let code = 1;
                        resolve(code);
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
            .catch(err => {
                reject(err);
            })
    })
}
exports.getDetailSubjectByEduId = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subjecteduprog.findAll({
                    where: {
                        IdEduProg: request.IdEduProg
                    }
                })
                    .then(async data => {
                        let response = [];
                        const promises = data.map(async subject => {
                            let obj = {};
                            await db.subject.findOne({
                                where: {
                                    Id: subject.dataValues.IdSubject,
                                    del_flat: { [Op.or]: [null, 0] }
                                }
                            })
                                .then(async data => {
                                    obj.SubjectCode = data.dataValues.SubjectCode;
                                    obj.SubjectName = data.dataValues.SubjectName;
                                    obj.SubjectEngName = data.dataValues.SubjectEngName;
                                    obj.Credit = data.dataValues.Credit;
                                    obj.TheoryPeriod = data.dataValues.TheoryPeriod;
                                    obj.PracticePeriod = data.dataValues.PracticePeriod;
                                    obj.ExercisePeriod = data.dataValues.ExercisePeriod;
                                    obj.Description = data.dataValues.Description;
                                })
                                .catch(err => {
                                    reject(err);
                                })
                            await db.user.findOne({
                                where: {
                                    id: subject.IdMainTeacher
                                }
                            })
                                .then(data => {
                                    obj.InstructorName = data.dataValues.name;
                                    obj.InstructorEmail = data.dataValues.email;
                                })
                                .catch(err => {
                                    reject(err);
                                })
                            response.push(obj);
                        });
                        await Promise.all(promises);
                        resolve(response);
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
            .catch(err => {
                reject(err);
            })
    })
}