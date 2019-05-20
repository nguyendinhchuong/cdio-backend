const edupurpose = require('../../service/EducationProgram/edupurposeService');

exports.getEduPurpose = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdDetailEduProg = Number(params.iddetaileduprogram);
    edupurpose.getEduPurpose(request)
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

exports.addEduPurpose = (req, res) => {
    let body = JSON.parse(req.body.data);
    let params = req.query;
    let request = {};

    let array = [];
    body.map(row => {
        let obj = {};
        obj.IdDetail = Number(params.iddetail);
        obj.KeyRow = row.KeyRow;
        obj.NameRow = row.NameRow;
        obj.DateCreated = params.datecreated;
        array.push(obj);
    })
    request.data = array;

    edupurpose.addEduPurpose(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = 1;
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

exports.updateEduPurpose = (req, res) => {
    let body = JSON.parse(req.body.data);
    let params = req.query;
    let request = {};

    let array = [];
    body.map(row => {
        let obj = {};
        obj.IdDetail = Number(params.iddetail);
        obj.KeyRow = row.KeyRow;
        obj.NameRow = row.NameRow;
        obj.DateCreated = params.datecreated;
        array.push(obj);
    })
    request.data = array;
    request.IdDetail = Number(params.iddetail);

    edupurpose.updateEduPurpose(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = 1;
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