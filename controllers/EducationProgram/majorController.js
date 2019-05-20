const major = require('../../service/EducationProgram/majorService');

exports.getMajorList = (req, res) => {
    major.getMajorList()
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
exports.getMajorById = (req, res) => {
    let params = req.query;
    let request = {};
    request.Id = Number(params.idMajor);
    major.getMajorById(request)
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
exports.addMajor = (req, res) => {
    let body = JSON.parse(req.body.data);
    let request = {};
    request.MajorName = body.majorname;

    major.addMajor(request)
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
exports.addBulkMajor = (req, res) => {
    let body = JSON.parse(req.body.data);
    let request = {};
    let array = [];
    body.map(row => {
        let obj = {};
        obj.MajorName = row.majorname;
        array.push(obj);
    })
    request.data = array;
    console.log(request);

    major.addMajorBulk(request)
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
exports.deleteMajor = (req, res) => {
    let params = req.query;
    let request = {};
    request.Id = Number(params.idmajor);
    major.deleteMajor(request)
        .then(data => {
            let response = {};
            if (data.effectedRows > 0) {
                response.code = 1;
                response.message = "delete success";
                res.send(JSON.stringify(response));
            } else if (data.effectedRows === 0) {
                response.code = -2;
                response.message = "couldn't find this major";
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