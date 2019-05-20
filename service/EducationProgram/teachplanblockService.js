const db = require('../../models/index');

exports.getTeachPlanBlock = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.teachplanblock.findOne({
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