const db = require('../../models/index');

exports.getSubjectList = () => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subject.findAll()
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

exports.getSubjectById = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subject.findById(request.Id)
                    .then(data => {
                        if (data) {
                            resolve(data);
                        } else {

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



exports.addSubject = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                let subject = {};
                subject.SubjectCode = request.SubjectCode;
                subject.SubjectName = request.SubjectName;
                if (request.SubjectEngName) {
                    subject.SubjectEngName = request.SubjectEngName;
                }
                subject.Credit = request.Credit;
                subject.TheoryPeriod = request.TheoryPeriod;
                subject.PracticePeriod = request.PracticePeriod;
                subject.ExercisePeriod = request.ExercisePeriod;
                if (request.Description) {
                    subject.Description = request.Description;
                }
                subject.DateCreated = request.DateCreated;
                subject.DateEdited = request.DateEdited;
                subject.del_flat = request.DelFlat;

                db.subject.create(subject)
                    .then(() => {
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

exports.addSubjectBulk = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subject.bulkCreate(request.data, { returning: true })
                    .then(() => {
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

exports.deleteSubject = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subjecteduprog.findOne({
                    where: {
                        IdSubject: request.Id
                    }
                })
                    .then(data => {
                        if (!data) {
                            db.subject.findByPk(request.Id)
                                .then(dataSubject => {
                                    if (dataSubject) {
                                        db.subject.destroy({
                                            where: {
                                                Id: request.Id
                                            }
                                        })
                                            .then(effectedRows => {
                                                console.log('Effected rows of Subject: ' + effectedRows);
                                                let code = 1;
                                                resolve(code);
                                            })
                                            .catch(err => {
                                                reject(err);
                                            })
                                    } else {
                                        let code = -2;
                                        resolve(code);
                                    }
                                })

                        } else {
                            let code = -1;
                            resolve(code);
                        }
                    })
            })
            .catch(err => {
                reject(err);
            })
    })
}

//get list of edu program which subject is added in
exports.getEduProgsSubjectUsed = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subjecteduprog.findOne({
                    where: {
                        IdSubject: request.Id
                    }
                })
                    .then(data => {
                        console.log(data);
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