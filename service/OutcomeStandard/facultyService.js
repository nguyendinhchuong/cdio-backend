const db = require('../../models/index');


exports.getFaculty = () => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.sequelize.query("select * from faculty", { model: db.faculty })
                    .then(faculty => {
                        resolve(faculty)
                    })
            })
            .catch(err => {
                reject(err);
            })
    })
}
exports.getFacultyInfo = () => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.faculty.findAll()
                    .then(info => {
                        resolve(info);
                    })
            })
            .catch(err => {
                reject(err);
            })
    })
}
exports.addFaculty = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.faculty.findOne({
                    where: {
                        NameFaculty: request.NameFaculty
                    }
                })
                    .then(data => {
                        if (!data) {
                            db.faculty.create(request)
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
exports.addBulkFaculty = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.faculty.bulkCreate(request.data, { returning: true })
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
exports.deleteFaculty = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.faculty.destroy({
                    where: {
                        Id: request.Id
                    }
                })
                    .then(effectedRows => {
                        console.log("Effected rows of faculty: ", effectedRows);
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