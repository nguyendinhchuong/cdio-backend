const db = require('../../models/index');
const bscrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');


exports.getList = () => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.user.findAll()
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
exports.register = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.user.findOne({
                    where: {
                        Username: request.Username
                    }
                })
                    .then(data => {
                        let response = {};
                        if (data) {
                            response.code = -3;
                            resolve(response);
                        } else {
                            db.user.create(request)
                                .then(data => {
                                    response.code = 1;
                                    response.data = data;
                                    resolve(response);
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



exports.login = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.user.findOne({
                    where: {
                        Username: request.Username
                    }
                })
                    .then(data => {
                        if (!data) {
                            let response = {};
                            response.code = -3;
                            resolve(response);
                        } else if (data && request.Password.localeCompare(data.dataValues.Password) === 0) {
                            //set basic info in payload
                            let payload = {
                                username: data.Username,
                                role: data.Role
                            };
                            console.log(payload);
                            let jwtToken = jwt.sign(payload, config.jwtSecret, { expiresIn: 1 * 300000 });
                            let response = {};

                            let dataValues = {};
                            dataValues.Id = data.dataValues.Id;
                            dataValues.Username = data.dataValues.Username;
                            dataValues.Role = data.dataValues.Role;
                            dataValues.DateCreated = data.dataValues.DateCreated;
                            dataValues.DateEdited = data.dataValues.DateEdited;

                            response.access_token = jwtToken;
                            response.code = 1;
                            response.data = dataValues;
                            
                            resolve(response);
                        } else {
                            let response = {};
                            response.code = -1;
                            resolve(response);
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

exports.getUserByUsername = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.user.findOne({
                    where: {
                        Username: request
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
//ADMIN Permission
exports.getUserById = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.user.findByPk(request.Id)
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

exports.changePass = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.user.update({
                    Password: request.Password
                }, {
                        returning: true,
                        where: {
                            Username: request.Username
                        }
                    })
                    .then(rowsUpdate => {
                        console.log("Updated row of User: " + rowsUpdate);
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
exports.deleteUser = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.user.destroy({
                    where: {
                        Username: request
                    }
                })
                    .then(effectedRows => {
                        console.log("Effected rows of User: " + effectedRows);
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