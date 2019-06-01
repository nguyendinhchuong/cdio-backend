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
                            let subject_arr = [];
                            semester_obj.semester = semester.dataValues.Semester;
                            await db.detailteachplanblock.findAll({
                                where: {
                                    IdTeachPlan: semester.dataValues.Id
                                }
                            })
                                .then(async data => {

                                    const subject_promise = data.map(async detailblock => {

                                        let subject_obj = {}
                                        subject_obj.IdTeachPlan = detailblock.dataValues.IdTeachPlan;
                                        subject_obj.Note = detailblock.dataValues.Note;
                                        subject_obj.Optional = detailblock.dataValues.Optional;
                                        await db.subject.findByPk(detailblock.dataValues.IdSubject)
                                            .then(data => {
                                                subject_obj.Id = data.dataValues.Id;
                                                subject_obj.SubjectCode = data.dataValues.SubjectCode;
                                                subject_obj.SubjectName = data.dataValues.SubjectName;
                                                subject_obj.SubjectEngName = data.dataValues.SubjectEngName;
                                                subject_obj.Credit = data.dataValues.Credit;
                                                subject_obj.TheoryPeriod = data.dataValues.TheoryPeriod;
                                                subject_obj.PracticePeriod = data.dataValues.PracticePeriod;
                                                subject_obj.ExercisePeriod = data.dataValues.ExercisePeriod;
                                                subject_obj.Description = data.dataValues.Description;

                                                subject_arr.push(subject_obj);
                                            })
                                            .catch(err => {
                                                reject(err);
                                            })
                                    })
                                    await Promise.all(subject_promise);
                                })
                                .then(() => {
                                    semester_obj.subjects = Array.from(subject_arr);
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
                db.teachplanblock.findAndCountAll({
                    where: {
                        IdDetailEdu: request.IdDetailEdu
                    }
                })
                    .then(async data => {
                        if (data.count === 0) {
                            console.log(data.count);
                            request.data.map(semester => {
                                let block_obj = {};
                                block_obj.IdDetailEdu = request.IdDetailEdu;
                                block_obj.Semester = semester.semester;
                                db.teachplanblock.create(block_obj)
                                    .then(async data => {
                                        let bulkDetail = [];
                                        let promises = semester.subjects.map(subject => {
                                            let detail_obj = {};
                                            detail_obj.IdTeachPlan = data.dataValues.Id;
                                            detail_obj.IdSubject = subject.Id;
                                            detail_obj.Note = subject.Note;
                                            detail_obj.Optional = (subject.option === 'BB') ? 0 : 1;
                                            bulkDetail.push(detail_obj);
                                        });
                                        await Promise.all(promises);
                                        db.detailteachplanblock.bulkCreate(bulkDetail, { returning: true })
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
                        } else if (request.data.length >= data.count) {
                            console.log("length >= count: " + data.count);
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
                                                .then(async data => {
                                                    let bulkDetail = [];
                                                    let promises = semester.subjects.map(subject => {
                                                        let detail_obj = {};
                                                        detail_obj.IdTeachPlan = data.dataValues.Id;
                                                        detail_obj.IdSubject = subject.Id;
                                                        detail_obj.Note = subject.Note;
                                                        detail_obj.Optional = (subject.option === 'BB') ? 0 : 1;
                                                        bulkDetail.push(detail_obj);
                                                    });
                                                    await Promise.all(promises);
                                                    await db.detailteachplanblock.bulkCreate(bulkDetail, { returning: true })
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
                                        } else {//if exist, delete detail teach plan block records and create new
                                            db.detailteachplanblock.destroy({
                                                where: {
                                                    IdTeachPlan: data.dataValues.Id
                                                }
                                            })
                                                .then(async  effectedRows => {
                                                    console.log("Effected rows of Detail TeachPlanBlock: ", effectedRows);
                                                    let bulkDetail = [];
                                                    let promises = semester.subjects.map(subject => {
                                                        let detail_obj = {};
                                                        detail_obj.IdTeachPlan = data.dataValues.Id;
                                                        detail_obj.IdSubject = subject.Id;
                                                        detail_obj.Note = subject.Note;
                                                        detail_obj.Optional = (subject.option === 'BB') ? 0 : 1;
                                                        bulkDetail.push(detail_obj);
                                                    });
                                                    await Promise.all(promises);
                                                    console.log(bulkDetail);
                                                    await db.detailteachplanblock.bulkCreate(bulkDetail, { returning: true })
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
                                        }

                                    })
                            })
                        } else if (request.data.length < data.count) {
                            await db.teachplanblock.findAll({
                                where: {
                                    IdDetailEdu: request.IdDetailEdu
                                }
                            })
                                .then(data => {
                                    data.map(row => {
                                        let Id_Teach_Plan_Block = row.dataValues.Id;
                                        db.detailteachplanblock.destroy({
                                            where: {
                                                IdTeachPlan: Id_Teach_Plan_Block
                                            }
                                        })
                                            .then(effectedRows => {
                                                console.log("Effected rows of Detail TeachPlan: " + effectedRows);
                                            })
                                            .catch(err => {
                                                reject(err);
                                            })

                                    })
                                })
                            await db.teachplanblock.destroy({
                                where: {
                                    IdDetailEdu: request.IdDetailEdu
                                }
                            })
                                .then(effectedRows => {
                                    console.log("Effected rows of TeachPlanBlock: " + effectedRows);
                                })
                                .catch(err => {
                                    reject(err);
                                })
                            await request.data.map(semester => {
                                let block_obj = {};
                                block_obj.IdDetailEdu = request.IdDetailEdu;
                                block_obj.Semester = semester.semester;
                                db.teachplanblock.create(block_obj)
                                    .then(async data => {
                                        let bulkDetail = [];
                                        let promises = semester.subjects.map(subject => {
                                            let detail_obj = {};
                                            detail_obj.IdTeachPlan = data.dataValues.Id;
                                            detail_obj.IdSubject = subject.Id;
                                            detail_obj.Note = subject.Note;
                                            detail_obj.Optional = subject.Optional;
                                            bulkDetail.push(detail_obj);
                                        });
                                        await Promise.all(promises);
                                        db.detailteachplanblock.bulkCreate(bulkDetail, { returning: true })
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