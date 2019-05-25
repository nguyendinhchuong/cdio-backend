const db = require('../../models/index');

exports.getTeachPlanBlock = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.teachplanblock.findAll({
                    where: {
                        IdDetailEdu: request.IdDetailEdu
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
exports.getDetailTeachPlanBlock = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                let response = [];
                db.teachplanblock.findAll({
                    where: {
                        IdDetailEdu: request.IdDetailEdu
                    }
                })
                    .then(async data => {
                        const promises = data.map(async semester => {
                            let semester_obj = {};
                            semester_obj.semester = semester.dataValues.Semester;
                            await db.detailteachplanblock.findAll({
                                where: {
                                    IdTeachPlan: semester.dataValues.Id
                                }
                            })
                                .then(async data => {
                                    subject_arr = [];
                                    await data.map(detailblock => {
                                        subject_arr.push(detailblock.dataValues);
                                    })
                                })
                                .then(() => {
                                    semester_obj.subjects = subject_arr;
                                    response.push(semester_obj);
                                    return response;
                                })
                                .catch(err => {
                                    reject(err);
                                })
                        })
                        const results = await Promise.all(promises);
                    })
                    .then(() => {
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
exports.addTeachPlanBlock = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                request.data.map(semester => {
                    let block_obj = {};
                    block_obj.IdDetailEdu = request.IdDetailEdu;
                    block_obj.Semester = semester.semester;
                    db.teachplanblock.create(block_obj)
                        .then(data => {
                            let bulkDetail = [];
                            semester.subjects.map(subject => {
                                let detail_obj = {};
                                detail_obj.IdTeachPlan = data.dataValues.Id;
                                detail_obj.IdSubject = subject.Id;
                                detail_obj.Note = subject.Note;
                                bulkDetail.push(detail_obj);

                            });
                            db.detailteachplanblock.bulkCreate(bulkDetail)
                                .then(data => {
                                    console.log(data.dataValues.Id);
                                })
                                .catch(err => {
                                    reject(err);
                                })
                        })
                        .catch(err => {
                            reject(err);
                        })
                })

            })
            .then(() => {
                let code = 1;
                resolve(code);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.updateTeachPlanBlock = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.teachplanblock.findOne({
                    where: {
                        IdDetailEdu: request.IdDetailEdu
                    }
                })
                    .then(data => {
                        if (!data) {
                            request.data.map(semester => {
                                let block_obj = {};
                                block_obj.IdDetailEdu = request.IdDetailEdu;
                                block_obj.Semester = semester.semester;
                                db.teachplanblock.create(block_obj)
                                    .then(data => {
                                        let bulkDetail = [];
                                        semester.subjects.map(subject => {
                                            let detail_obj = {};
                                            detail_obj.IdTeachPlan = data.dataValues.Id;
                                            detail_obj.IdSubject = subject.Id;
                                            detail_obj.Note = subject.Note;
                                            detail_obj.Optional = subject.Optional;
                                            bulkDetail.push(detail_obj);

                                        });
                                        db.detailteachplanblock.bulkCreate(bulkDetail)
                                            .then(data => {
                                                console.log(data.dataValues.Id);
                                            })
                                            .catch(err => {
                                                reject(err);
                                            })
                                    })
                                    .catch(err => {
                                        reject(err);
                                    })
                            })
                        } else {
                            request.data.map(semester => {
                                db.teachplanblock.findOne({
                                    where: {
                                        IdDetailEdu: request.IdDetailEdu,
                                        Semester: semester.semester
                                    }
                                })
                                    .then(data => {
                                        //teach plan block no exist, create new
                                        if (!data) {
                                            let block_obj = {};
                                            block_obj.IdDetailEdu = request.IdDetailEdu;
                                            block_obj.Semester = semester.semester;
                                            db.teachplanblock.create(block_obj)
                                                .then(data => {
                                                    let bulkDetail = [];
                                                    semester.subjects.map(subject => {
                                                        let detail_obj = {};
                                                        detail_obj.IdTeachPlan = data.dataValues.Id;
                                                        detail_obj.IdSubject = subject.Id;
                                                        detail_obj.Note = subject.Note;
                                                        detail_obj.Optional = subject.Optional;
                                                        bulkDetail.push(detail_obj);

                                                    });
                                                    db.detailteachplanblock.bulkCreate(bulkDetail)
                                                        .then(data => {
                                                            console.log(data.dataValues.Id);
                                                        })
                                                        .catch(err => {
                                                            reject(err);
                                                        })
                                                })
                                        } else {//if exist, delete detail teach plan block records and create new
                                            db.detailteachplanblock.destroy({
                                                where: {
                                                    IdTeachPlan: data.dataValues.Id
                                                }
                                            })
                                                .then(async  effectedRows => {
                                                    console.log("Effected rows of Detail TeachPlanBlock: ", effectedRows);
                                                    let bulkDetail = [];
                                                    await  semester.subjects.map(subject => {
                                                        let detail_obj = {};
                                                        detail_obj.IdTeachPlan = data.dataValues.Id;
                                                        detail_obj.IdSubject = subject.Id;
                                                        detail_obj.Note = subject.Note;
                                                        detail_obj.Optional = subject.Optional;
                                                        bulkDetail.push(detail_obj);

                                                    });
                                                    await db.detailteachplanblock.bulkCreate(bulkDetail)
                                                        .then(data => {
                                                            console.log(data.dataValues.Id);
                                                        })
                                                        .catch(err => {
                                                            reject(err);
                                                        })
                                                })
                                        }

                                    })
                            })
                        }
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
            .then(() => {
                let code = 1;
                resolve(code);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.addTeacher = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.detailteachplanblock.findOne({
                    where: {
                        IdTeachPlan: request.IdTeachPlan,
                        IdSubject: request.IdSubject
                    }
                })
                    .then(data => {
                        if (!data) {
                            let code = -2;
                            resolve(code);
                        } else {
                            db.detailteachplanblock.update({
                                IdTeacher: request.IdTeacher
                            },
                                {
                                    where: {
                                        IdTeachPlan: request.IdTeachPlan,
                                        IdSubject: request.IdSubject
                                    }
                                })
                                .then(effectRows => {
                                    console.log("Effected rows of Detail TeachPlan: " + effectRows);
                                    let code = 1;
                                    resolve(code);
                                })
                                .catch(err => {
                                    reject(err);
                                })
                        }
                    })
            })
            .catch(err => {
                reject(err);
            })
    })
}