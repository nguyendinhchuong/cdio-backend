const db = require('../../models/index');

exports.getComment = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.comemnt.findAll({
                    where: {
                        IdOutcome: request.IdOutcome
                    }
                })
                    .then(async data => {
                        let response = {};
                        const promises = data.map(async comment => {
                            let obj = Object.assign({}, comment.dataValues);
                            await db.user.findByPk(comment.dataValues.IdUser)
                                .then(data => {
                                    obj.commentName = data.dataValues.name;
                                })
                                .catch(err => {
                                    reject(err);
                                })
                            await db.user.findByPk(comment.dataValues.UserDone)
                                .then(data => {
                                    obj.doneName = data.dataValues.name;
                                })
                                .catch(err => {
                                    reject(err);
                                })
                            response.data.push(obj);
                        })
                        await Promise.all(promises);
                        resolve(response);
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

exports.addNewComment = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.comemnt.create(request.data)
                    .then(data => {
                        let response = {};
                        response.code = 1;
                        response.data = data.dataValues;
                        resolve(response);
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

exports.doneComment = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.comemnt.update({
                    UserDone: request.UserDone
                }, {
                        where: {
                            IdOutcome: request.IdOutcome,
                            Id: request.Id
                        }
                    })
                    .then(effectedRows => {
                        console.log("Effected rows of comment: ", effectedRows);
                        let response = {};
                        response.code = 1;
                        resolve(response);
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