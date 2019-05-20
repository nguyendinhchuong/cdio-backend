const db = require('../../models/index');

exports.getProgram = () => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.sequelize.query("select * from program", { model: db.program })
                    .then(program => {
                        resolve(program)
                    })
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.getProgramInfo = () => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.program.findAll()
                    .then(info=>{
                        resolve(info);
                    })
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.addProgram = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.program.findOne({
                    where: {
                        NameProgram: request.NameProgram
                    }
                })
                    .then(data => {
                        if (!data) {
                            db.program.create(request)
                                .then(data => {
                                    let code = 1;
                                    resolve(code);
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
exports.addBulkProgram = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.program.bulkCreate(request.data, { returning: true })
                    .then(data => {
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
exports.deleteProgram = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.program.destroy({
                    where: {
                        Id: request.Id
                    }
                })
                    .then(effectedRows => {
                        console.log("Effected rows of program: ", effectedRows);
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