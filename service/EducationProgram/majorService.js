const db = require('../../models/index');

exports.getMajorList = () => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.major.findAll()
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

exports.getMajorById = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.major.findById(request.Id)
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

exports.addMajor = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.major.create(request)
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

exports.addMajorBulk = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.major.bulkCreate(request.data, { returning: true })
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
exports.deleteMajor = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.major.destroy({
                    where: {
                        Id: request.Id
                    }
                })
                    .then(effectedRows => {
                        console.log("Effected rows of major: ", effectedRows);
                        let code = 1;
                        let data = {};
                        data.code = code;
                        data.effectedRows = effectedRows;
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