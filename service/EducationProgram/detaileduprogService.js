const db = require('../../models/index');

exports.getDetailEduProgram = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.eduprogram.findOne({
                    where: {
                        Id: request.IdEduProgram
                    }
                })
                    .then(data => {
                        if (data) {
                            db.detaileduprog.findOne({
                                where: {
                                    IdEduProgram: request.IdEduProgram
                                }
                            })
                                .then(data => {
                                    resolve(data);  
                                })
                                .catch(err => {
                                    reject(err);
                                })
                        }
                        else{
                            resolve(data);
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

exports.addDetailEduProg = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.eduprogram.findByPk(request.IdEduProgram)
                    .then(data => {
                        if (data) {
                            db.detaileduprog.create(request)
                                .then(() => {
                                    let code = 1;
                                    resolve(code);
                                })
                                .catch(err => {
                                    reject(err);
                                })
                        } else {
                            let code = -1;
                            resolve(code);
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
exports.updateDetailEduProg = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.detaileduprog.findOne({
                    where: {
                        IdEduProgram: request.IdEduProgram
                    }
                })
                    .then(data => {
                        if (data) {
                            db.detaileduprog.update({
                                EnrollmentTarget: request.EnrollmentTarget,
                                EduProcess: request.EduProcess,
                                GraduatedCon: request.GraduatedCon,
                                IdOutcome: request.IdOutcome
                            }, {
                                    where: {
                                        IdEduProgram: request.IdEduProgram
                                    }
                                })
                                .then(effectedRows => {
                                    console.log("Effected row of DetailEduProg: ", effectedRows);
                                })
                                //update DateEdited in EduProgram table
                                .then(() => {
                                    db.eduprogram.update({
                                        DateEdited: request.DateEdited
                                    }, {
                                            where: { Id: request.IdEduProgram }
                                        })
                                        .then(effectedRows => {
                                            console.log("Effected row of DetailEduProg: ", effectedRows);
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
                        } else {
                            let obj = {};
                            obj.IdEduProgram = request.IdEduProgram;
                            obj.EnrollmentTarget = request.EnrollmentTarget;
                            obj.DateCreated = request.DateCreated;
                            obj.EduProcess = request.EduProcess;
                            obj.GraduatedCon = request.GraduatedCon;
                            obj.IdOutcome = request.IdOutcome
                            db.detaileduprog.create(obj)
                                .then(() => {
                                    let code = 2;
                                    resolve(code);
                                })
                                //update DateEdited in EduProgram table
                                .then(() => {
                                    db.eduprogram.update({
                                        DateEdited: request.DateEdited
                                    }, {
                                            where: { Id: request.IdEduProgram }
                                        })
                                        .then(effectedRows => {
                                            console.log("Effected row of DetailEduProg: ", effectedRows);
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
