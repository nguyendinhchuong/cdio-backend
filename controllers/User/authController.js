const jwt = require('jsonwebtoken');
const user = require('../../service/User/userService');
const bcrypt = require('bcrypt');
const config = require('../../config/config');
const role = require('../../config/Role');
// exports.isAuthenticated = (req, res, next) => {
//     let response = {};
//     if (req.headers &&
//         req.headers.authorization &&
//         req.headers.authorization.split(' ')[0] === 'JWT') {
//         var jwtToken = req.headers.authorization.split(' ')[1];
//         jwt.verify(jwtToken, config.jwtSecret, (err, payload) => {
//             if (err) {
//                 response.code = -1;
//                 response.message = "Unauthorized user!";
//                 res.send(JSON.stringify(response));
//             } else {
//                 console.log("decoder: " + payload.username);
//                 user.getUserByUsername(payload.username)
//                     .then(data => {
//                         console.log("username: " + data);
//                         req.user = data;
//                         req.role = payload.role;
//                         next();
//                     })
//                     .catch(err => {
//                         throw err;
//                     })
//             }
//         })
//     } else {
//         response.code = -1;
//         response.message = "Invalid token!";
//         res.send(JSON.stringify(response));
//     }

// }
exports.isAuthenticated = (req, res, next) => {
    let response = {};
    if (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'JWT') {
        var jwtToken = req.headers.authorization.split(' ')[1];
        jwt.verify(jwtToken, config.jwtSecret, (err, payload) => {
            if (err) {
                response.code = -1;
                response.message = "Unauthorized user!";
                res.send(JSON.stringify(response));
            } else {
                //permission: just use api url base on role defined in Role.js
                let regex = /^[^?]+/gm;
                let baseUrl = regex.exec(req.originalUrl);
                payload.role.map(has_role => {
                    if (role[has_role] !== undefined) {
                        if (role[has_role].find(url => {
                            console.log(url + (url == baseUrl[0]));
                        })) {
                            console.log(baseUrl[0]);
                        }
                    }
                })
                // payload.role.map(has_role => {
                //     if (role[has_role].find(url => {
                //         return url == baseUrl[0]
                //     })) {
                //         user.getUserByUsername(payload.username)
                //             .then(data => {
                //                 req.user = data;
                //                 next();
                //             })
                //             .catch(err => {
                //                 throw err;
                //             })
                //     } else {
                //         response.code = -2;
                //         response.message = "Access Denied: You dont have correct privilege to perform this operation!";
                //         res.send(JSON.stringify(response));
                //     }
                // })

            }
        })
    } else {
        response.code = -1;
        response.message = "Invalid token!";
        res.send(JSON.stringify(response));
    }
}

