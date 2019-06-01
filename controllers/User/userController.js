const user = require('../../service/User/userService');
const generator = require('generate-password');

exports.register = (req, res) => {
    let body = JSON.parse(req.body.data);
    let request = {};
    request.Username = body.username;
    request.Name = body.name;
    request.Email = body.email;
    request.Role = body.role;
    request.Password = generator.generate({
        length: 8,
        numbers: true
    });
    console.log(request);
    user.register(request)
        .then(data => {
            let response = {};
            if (data.code === 1) {
                response.code = 1;
                response.message = "add success";
                res.send(JSON.stringify(response));
            } else if (data.code === -3) {
                response.code = -3;
                response.message = "username existed";
                res.send(JSON.stringify(response));
            } else {
                response.code = -1;
                response.message = "add fail";
                res.send(JSON.stringify(response));
            }
        })
        .catch(err => {
            throw err;
        })
}

exports.login = (req, res) => {
    let body = JSON.parse(req.body.data);
    let request = {};
    request.Username = body.username;
    request.Password = body.password;

    user.login(request)
        .then(data => {
            console.log(data.data);
            let response = {};
            if (data.code === -3) {
                response.code = data.code;
                response.message = "user not exist";
                res.send(JSON.stringify(response));
            } else if (data.code === -1) {
                response.code = -1;
                response.message = "login fail";
                res.send(JSON.stringify(response));
            } else {
                response.code = data.code;
                response.token = data.access_token;
                response.data = data.data;
                response.message = "login success";
                res.send(JSON.stringify(response));
            }
        })
        .catch(err => {
            throw err;
        })
}


exports.getList = (req, res) => {
    user.getList()
        .then(data => {
            let response = {};
            if (data) {
                response.code = 1;
                response.data = data;
                response.message = "success";
                res.send(JSON.stringify(response));
            } else {
                response.code = -1;
                response.message = "fail";
                res.send(JSON.stringify(response));
            }
        })
        .catch(err => {
            throw err;
        })
}
exports.getInfo = (req, res) => {
    let params = req.query;
    let request = {};
    request.Id = Number(params.iduser);

    user.getUserById(request)
        .then(data => {
            let response = {};
            if (data) {
                response.code = 1;
                response.data = data;
                response.message = "success";
                res.send(JSON.stringify(response));
            } else {
                response.code = -1;
                response.message = "fail";
                res.send(JSON.stringify(response));
            }
        })
        .catch(err => {
            throw err;
        })
}
exports.getByRole = (req, res) => {
    let params = req.query;
    let request = {};
    request.role = params.role;

    user.getByRole(request)
        .then(data => {
            let response = {};
            if (data) {
                response.code = 1;
                response.data = data;
                response.message = "success";
                res.send(JSON.stringify(response));
            } else {
                response.code = -1;
                response.message = "fail";
                res.send(JSON.stringify(response));
            }
        })
        .catch(err => {
            throw err;
        })

}
exports.changePass = (req, res) => {
    let body = JSON.parse(req.body.data);
    console.log(req.user);
    if (req.user.dataValues.Username !== body.username) {
        let response = {};
        response.code = -3;
        response.message = "fail";
        res.send(JSON.stringify(response));
    } else {
        let request = {};
        request.Username = body.username;
        request.Password = body.password;
        console.log(request);
        user.changePass(request)
            .then(data => {
                let response = {};
                if (data) {
                    response.code = 1;
                    response.data = data;
                    response.message = "change pass success";
                    res.send(JSON.stringify(response));
                } else {
                    response.code = -1;
                    response.message = "change pass fail";
                    res.send(JSON.stringify(response));
                }
            })
            .catch(err => {
                throw err;
            })
    }

}

exports.deleteUser = (req, res) => {
    let body = JSON.parse(req.body.data);
    let request = body.username;

    user.deleteUser(request)
        .then(data => {
            let response = {};
            if (data) {
                response.code = 1;
                response.message = "delete success";
                res.send(JSON.stringify(response));
            } else {
                response.code = -1;
                response.message = "delete fail";
                res.send(JSON.stringify(response));
            }
        })
        .catch(err => {
            throw err;
        })
}