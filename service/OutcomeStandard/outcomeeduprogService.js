const db = require('../../models/index');

exports.getOutcome = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.outcomeeduprogram.findOne({
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
            })
            .catch(err => {
                reject(err);
            })
    })
}
exports.getEduProg = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.outcomeeduprogram.findAll({
                    where: {
                        IdOutcome: request.IdOutcome
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

exports.addOutcomeToEduProg = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.outcomeeduprogram.findOne({
                    where: {
                        IdOutcome: request.IdOutcome,
                        IdEduProgram: request.IdEduProgram
                    }
                })
                    .then(data => {
                        if (data) {
                            let code = -2;
                            resolve(code);
                        } else {
                            db.outcomeeduprogram.create(request)
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