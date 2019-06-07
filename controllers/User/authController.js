const jwt = require('jsonwebtoken');
const user = require('../../service/User/userService');
const bcrypt = require('bcrypt');
const config = require('../../config/config');
const role = require('../../config/Role');

exports.isAuthenticated = (req, res, next) => {
    let response = {};
    //console.log(req.headers);
    if (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'JWT') {
        var jwtToken = req.headers.authorization.split(' ')[1];
        console.log("jwtToken", jwtToken);
        jwt.verify(jwtToken, config.jwtSecret, async (err, payload) => {
            if (err) {
                response.code = -1;
                response.message = "Unauthorized user!";
                res.send(JSON.stringify(response));
            } else {
                //permission: just use api url base on role defined in Role.js
                let count = 0;
                let deny = true;
                let regex = /^[^?]+/gm;
                let baseUrl = regex.exec(req.originalUrl);
                console.log(payload);
                const promise = payload.role.map(async has_role => {
                    if (role[has_role] !== undefined) {
                        if (role[has_role].find(url => {
                            return url == baseUrl[0];
                        })) {
                            await user.getUserByUsername(payload.username)
                                .then(data => {
                                    console.log(data.dataValues);
                                    req.user = data;
                                    next();
                                })
                                .catch(err => {
                                    throw err;
                                })
                        } else {
                            console.log("api deny in role: ", has_role);
                            count = count + 1
                        }
                    }
                })
                await Promise.all(promise);
                console.log(count);
                if (payload.role.length === count) {
                    response.code = -2;
                    response.message = "Access Denied: You dont have correct privilege to perform this operation!";
                    res.send(JSON.stringify(response));
                }

            }
        })
    } else {
        response.code = -1;
        response.message = "Invalid token!";
        res.send(JSON.stringify(response));
    }
}

exports.authenRole = (req, res, next) => {
    let body = JSON.parse(req.body.data);
    let request = {};
    request.username = body.username;
    request.role = body.role;

    user.authenRole(request)
        .then(data => {
            let response = {};
            if (data) {
                next();
            } else {
                response.code = -1;
                response.message = "access denied";
                res.send(JSON.stringify(response));
            }
        })
        .catch(err => {
            throw err;
        })
}