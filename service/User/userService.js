const db = require('../../models/index');
const bscrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');


exports.getList = () => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                let response = {};
                let user_array = [];
                db.user.findAll()
                    .then(async data => {
                        const promises = data.map(async user => {
                            let obj = {};
                            obj.id = user.dataValues.id;
                            obj.username = user.dataValues.username;
                            obj.name = user.dataValues.name;
                            obj.email = user.dataValues.email;

                            await db.user_has_role.findAll({
                                where: {
                                    idUser: user.dataValues.id
                                }
                            })
                                .then(async data => {
                                    let role_array = [];
                                    const role_promise = data.map(async idRole => {
                                        await db.role.findByPk(idRole.dataValues.idRole)
                                            .then(data => {
                                                role_array.push(data.dataValues.role);
                                            })
                                            .catch(err => {
                                                reject(err);
                                            })
                                    })
                                    await Promise.all(role_promise);
                                    obj.role = role_array;
                                    user_array.push(obj);
                                })
                                .catch(err => {
                                    reject(err);
                                })
                        })
                        await Promise.all(promises);
                    })
                    .then(() => {
                        response.data = user_array;
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
                                    let idrole_array = [];
                                    await request.Role.map(role => {
                                        let role_obj = {};
                                        role_obj.idUser = idUser;
                                        role_obj.idRole = role;
                                        idrole_array.push(role_obj);
                                    })
                                    db.user_has_role.bulkCreate(idrole_array)
                                        .then(() => {
                                            let code = 1;
                                            response.code = code;
                                            resolve(response);
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
                    .then(async data => {
                        if (!data) {
                            let response = {};
                            response.code = -3;
                            resolve(response);
                        } else if (data && request.Password.localeCompare(data.dataValues.password) === 0) {
                            let id_role_array = [];
                            let role_array = [];
                            let username = data.dataValues.username;
                            //response data to client
                            let dataValues = {};
                            dataValues.Id = data.dataValues.id;
                            dataValues.Username = data.dataValues.username;
                            dataValues.Name = data.dataValues.name;
                            dataValues.Email = data.dataValues.email;
                            dataValues.Role = [];
                            await db.user_has_role.findAll({
                                where: {
                                    idUser: data.dataValues.id
                                }
                            })
                                .then(async data => {
                                    const promises = data.map(async row => {
                                        await id_role_array.push(row.dataValues.idRole);
                                        await db.role.findByPk(row.dataValues.idRole)
                                            .then(async data => {
                                                await dataValues.Role.push(data.dataValues.role);
                                                return role_array;
                                            })
                                            .catch(err => {
                                                reject(err);
                                            })
                                    })
                                    const results = await Promise.all(promises);
                                    console.log(results)
                                })
                                .catch(err => {
                                    reject(err);
                                })
                            //set basic info in payload

                            let payload = {
                                username: username,
                                role: id_role_array
                            };
                            console.log("role_array: " + role_array);
                            let jwtToken = jwt.sign(payload, config.jwtSecret, { expiresIn: 1 * 86400 });
                            let response = {};
                            //dataValues.role = role_array;
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

exports.getByRole = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                let sql = `select user.id, user.username,user.email, user.name
                from cdio_db.user as user, cdio_db.user_has_role as has_role, cdio_db.role as role
                where user.id = has_role.idUser and has_role.idRole = role.id and role.role = '` + request.role + `';`
                db.sequelize.query(sql, { type: db.Sequelize.QueryTypes.SELECT })
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