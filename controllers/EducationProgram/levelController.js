const level = require('../../service/EducationProgram/levelService');

exports.getLevelList = (req, res) => {
    level.getLevelList()
        .then(data => {
            let response = {};
            if (data) {
                response.code = 1;
                response.message = "success";
                response.data = data;
                res.send(JSON.stringify(response));
            } else {
                response.code = -1;
                response.message = "fail";
                response.data = data;
                res.send(JSON.stringify(response));
            }
        })
}
exports.getLevelById = (req, res) => {
    let params = req.query;
    let request = {};
    request.Id = Number(params.idLevel);
    level.getLevelById(request)
        .then(data => {
            let response = {};
            if (data) {
                response.code = 1;
                response.message = "success";
                response.data = data;
                res.send(JSON.stringify(response));
            } else {
                response.code = -1;
                response.message = "fail";
                response.data = data;
                res.send(JSON.stringify(response));
            }
        })
}
exports.addLevel = (req, res) => {
    let body = JSON.parse(req.body.data);
    let request = {};
    request.LevelName = body.levelname;

    level.addLevel(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = 1;
                response.message = "add success";
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
exports.addBulkLevel = (req, res) => {
    let body = JSON.parse(req.body.data);
    let request = {};
    let array = [];
    body.map(row => {
        let obj = {};
        obj.LevelName = row.levelname;
        array.push(obj);
    })
    request.data = array;
    console.log(request);

    level.addBulkLevel(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = 1;
                response.message = "add success";
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
exports.deleteLevel = (req, res) => {
    let params = req.query;
    let request = {};
    request.Id = Number(params.idlevel);
    level.deleteLevel(request)
        .then(data => {
            let response = {};
            if (data.effectedRows > 0) {
                response.code = 1;
                response.message = "delete success";
                res.send(JSON.stringify(response));
            } else if (data.effectedRows === 0) {
                response.code = -2;
                response.message = "couldn't find this level";
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