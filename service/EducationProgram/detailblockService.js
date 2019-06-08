const db = require('../../models/index');

exports.getSubjectBySubjectBlockId = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.detailblock.findAll({
                    where: {
                        IdSubjectBlock: request.IdSubjectBlock
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

exports.addSubjectToDetailBlock = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.detailblock.findOne({
                    where: {
                        IdSubject: request.IdSubject,
                        IdSubjectBlock: request.IdSubjectBlock
                    }
                })
                    .then(async data => {
                        if (data) {
                            let code = -2;
                            resolve(code);
                        } else {
                            await db.detailblock.create(request)
                                .catch(err => {
                                    reject(err);
                                })
                            let obj = {};
                            obj.IdSubject = request.IdSubject;
                            obj.IdEduProg = request.IdEduProg;
                            obj.DateCreated = request.DateCreated;
                            obj.IdSubjectBlock = data.dataValuse.Id;
                            await db.subjecteduprog.create(obj)
                                .then(() => {
                                    resolve(1);
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

exports.deleteOne = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.detailblock.findOne({
                    where: {
                        IdSubjectBlock: request.IdSubjectBlock,
                        IdSubject: request.IdSubject
                    }
                })
                    .then(data => {
                        if (data) {
                            db.detailblock.destroy({
                                where: {
                                    IdSubjectBlock: request.IdSubjectBlock,
                                    IdSubject: request.IdSubject
                                }
                            })
                                .then(effectRows => {
                                    console.log("Effect  rows of DetailBlock: " + effectRows);
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

exports.deleteByIdSubject = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.detailblock.findAll({
                    where: {
                        IdSubject: request.IdSubject
                    }
                })
                    .then(data => {
                        if (data) {
                            db.detailblock.destroy({
                                where: {
                                    IdSubject: request.IdSubject
                                }
                            })
                                .then(effectRows => {
                                    console.log("Effect rows of DetailBlock: ", effectRows);
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
exports.deleteByIdSubjectBlock = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.detailblock.findAll({
                    where: {
                        IdSubjectBlock: request.IdSubjectBlock
                    }
                })
                    .then(data => {
                        if (data) {
                            db.detailblock.destroy({
                                where: {
                                    IdSubjectBlock: request.IdSubjectBlock
                                }
                            })
                                .then(effectRows => {
                                    console.log("Effect rows of DetailBlock: ", effectRows);
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

exports.addTeacher = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.detailblock.update({
                    IdUser: request.IdUser
                }, {
                        where: {
                            IdSubject: request.IdSubject,
                            IdSubjectBlock: request.IdSubjectBlock
                        }
                    })
                    .then(effectedRows => {
                        console.log("Effected rows of detail block: ", effectedRows);
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
exports.addListTeacher = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(async () => {
                const promises = request.data.map(async row => {
                    await db.detailblock.update({
                        IdUser: row.IdUser,
                        IdMainTeacher: row.IdMainTeacher
                    }, {
                            where: {
                                IdSubjectBlock: row.IdSubjectBlock,
                                IdSubject: row.IdSubject
                            }
                        })
                        .then(async () => {
                            await db.subjecteduprog.update({
                                IdUser: row.IdUser,
                                IdMainTeacher: row.IdMainTeacher
                            }, {
                                    where: {
                                        IdSubjectBlock: row.IdSubjectBlock,
                                        IdSubject: row.IdSubject
                                    }
                                })
                                .catch(err => {
                                    reject(err);
                                })
                        })
                        .catch(err => {
                            reject(err);
                        })
                });
                await Promise.all(promises);
                resolve(1);
            })
            .catch(err => {
                reject(err);
            })
    })
}


