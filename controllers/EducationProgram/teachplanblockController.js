const teachplanblock = require('../../service/EducationProgram/teachplanblockService');

exports.getTeachPlanBlock = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdDetailEdu = Number(params.iddetailedu);

    teachplanblock.getTeachPlanBlock(request)
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
        .catch(err => {
            throw err;
        })
}

exports.addTeachPlanBlock = (req, res) => {
    let params = req.query;
    const body = JSON.parse(req.body.data);
    const request = {};

    request.IdDetailEdu = Number(params.iddetailedu);
    request.data = body;
    teachplanblock.addTeachPlanBlock(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = data;
                response.message = "success";
                res.send(JSON.stringify(response));
            } else {
                response.code = data;
                response.message = "fail";
                res.send(JSON.stringify(response));
            }
        })
        .catch(err => {
            throw err;
        })
}