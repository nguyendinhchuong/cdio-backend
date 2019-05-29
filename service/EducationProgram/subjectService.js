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
                    .then(data => {
                        let obj = {};
                        console.log(data.dataValues);
                        obj.del_flag = data.dataValues.del_flat ? 1 : 0;
                        obj.id = data.dataValues.Id;
                        console.log(obj);
                        db.thong_tin_chung.create(obj)
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
            .catch(err => {
                reject(err);
            })
    })
}

exports.addSubjectBulk = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                let general_info_array = [];
                db.subject.bulkCreate(request.data, { returning: true })
                    .then(async data => {
                        const promises = data.map(async subject => {
                            let obj = {};
                            obj.del_flag = 0;
                            obj.id = subject.dataValues.Id;
                            general_info_array.push(obj);
                        });
                        await Promise.all(promises);
                    })
                    .then(() => {
                        db.thong_tin_chung.bulkCreate(general_info_array, { returning: true })
                            .then(() => {
                                let response = {};
                                response.code = 1;
                                response.data = general_info_array;
                                resolve(response);
                            })
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