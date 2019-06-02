const db = require('../../models/index');

exports.getEduPurpose = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.edupurpose.findAll({
                    where: {
                        IdDetail: request.IdDetailEduProg
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

exports.addEduPurpose = async (request) => {
    
    await deleteEduPurpose(request);
    await insertMutipleDataPurpose(request.data)
    .then(() =>{
    })
    .catch(err =>{
        return Promise.reject(err);
    })
    let code = 1;
    return Promise.resolve(code);
}
exports.updateEduPurpose = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.edupurpose.findOne({
                    where: {
                        IdDetail: request.IdDetail
                    }
                })
                    .then(data => {
                        if (data) {
                            db.edupurpose.update({
                                KeyRow: request.KeyRow,
                                NameRow: request.NameRow
                            },
                                {
                                    where: { IdDetail: request.IdDetail }
                                })
                                .then(effectRows => {
                                    console.log("Effected rows of EduPurpose: " + effectRows);
                                    let code = 2;
                                    resolve(code);
                                })
                                .catch(err => {
                                    reject(err);
                                })
                        } else {
                            db.edupurpose.bulkCreate(request.data)
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

const deleteEduPurpose = request =>{
    console.log("delete huhu");
    
    return db.edupurpose.destroy({
        where: {
            IdDetail: request.IdDetailEduProg
        }
    })
}

const insertMutipleDataPurpose = arr =>{
    return db.edupurpose.bulkCreate(arr);   
}