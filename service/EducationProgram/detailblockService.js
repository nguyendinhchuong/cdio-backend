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
                    .then(data => {
                        if (data) {
                            let code = -2;
                            resolve(code);
                        } else {
                            db.detailblock.create(request)
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
                let data_array = [];
                const promises = request.data.map(row => {
                    let obj = {};
                    obj.IdSubjectBlock = row.IdSubjectBlock;
                    obj.IdSubject = row.IdSubject;
                    obj.IdUser = row.IdUser;
                    data_array.push(obj);
                });
                await Promise.all(promises);
                await db.detailblock.bulkCreate(data_array)
                    .then(() => {
                        resolve(1);
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