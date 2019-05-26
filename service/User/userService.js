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
                        username: request.Username
                    }
                })
                    .then(data => {
                        let response = {};
                        if (data) {
                            response.code = -3;
                            resolve(response);
                        } else {
                            let user = {};
                            user.username = request.Username;
                            user.password = request.Password;
                            user.name = request.Name;
                            user.email = request.Email;
                            db.user.create(user)
                                .then(async data => {
                                    let idUser = data.dataValues.id;
                                    let role_array = [];
                                    await request.Role.map(role => {
                                        let role_obj = {};
                                        role_obj.idUser = idUser;
                                        role_obj.idRole = role;
                                        role_array.push(role_obj);
                                    })
                                    db.user_has_role.bulkCreate(role_array)
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
                        username: request.Username
                    }
                })
                    .then(data => {
                        if (!data) {
                            let response = {};
                            response.code = -3;
                            resolve(response);
                        } else if (data && request.Password.localeCompare(data.dataValues.password) === 0) {
                            let role_array = [];
                            let username = data.dataValues.username;
                            //response data to client
                            let dataValues = {};
                            dataValues.Id = data.dataValues.id;
                            dataValues.Username = data.dataValues.username;
                            dataValues.Name = data.dataValues.name;
                            dataValues.Email = data.dataValues.email;
                            db.user_has_role.findAll({
                                where: {
                                    idUser: data.dataValues.id
                                }
                            })
                                .then(data => {
                                    data.map(row => {
                                        role_array.push(row.dataValues.idRole);
                                    })
                                    //set basic info in payload
                                    let payload = {
                                        username: username,
                                        role: role_array
                                    };
                                    let jwtToken = jwt.sign(payload, config.jwtSecret, { expiresIn: 1 * 86400 });
                                    let response = {};

                                    response.access_token = jwtToken;
                                    response.code = 1;
                                    response.data = dataValues;

                                    resolve(response);
                                })
                                .catch(err => {
                                    reject(err);
                                })

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
                        username: request
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