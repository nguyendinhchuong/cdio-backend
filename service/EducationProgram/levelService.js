const db = require('../../models/index');

exports.getLevelList = () => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.level.findAll()
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

exports.getLevelById = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.level.findById(request.Id)
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

exports.addLevel = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.level.create(request)
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

exports.addLevelBulk = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.level.bulkCreate(request.data, { returning: true })
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
exports.deleteLevel = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.level.destroy({
                    where: {
                        Id: request.Id
                    }
                })
                    .then(effectedRows => {
                        console.log("Effected rows of level: ", effectedRows);
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
