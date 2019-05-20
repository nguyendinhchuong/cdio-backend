const db = require('../../models/index');

exports.getSubjectBlockByEduProgContentId = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subjectblock.findAll({
                    where: {
                        IdEduProgContent: request.IdEduProgContent
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

exports.getSubjectBlockById = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subjectblock.findOne({
                    where: {
                        Id: request.IdSubjectBlock
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

exports.getOptionalSubjectBlock = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subjectblock.findOne({
                    where: {
                        isOptional: request.isOptional
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

exports.getAccumulatedSubjectBlock = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subjectblock.findOne({
                    where: {
                        isAccumulated: request.isAccumulated
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

exports.addSubjectBlock = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subjectblock.create(request)
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

exports.deleteSubjectBlock = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.detailblock.findOne({
                    where: {
                        IdSubjectBlock: request.IdSubjectBlock
                    }
                })
                    .then(data => {
                        if (data) {
                            let code = -2;
                            resolve(code);
                        } else {
                            db.subjectblock.destroy({
                                where: {
                                    Id: request.IdSubjectBlock
                                }
                            })
                                .then(effectRows => {
                                    console.log("Effect  rows of subjectblock: " + effectRows);
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