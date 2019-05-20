const program = require('../../service/OutcomeStandard/programService');

exports.getPrograms = (req, res) => {
    program.getProgram().then(data => {
        let response = {};
        response.data = data;
        res.send(JSON.stringify(response));
    })
}
exports.getProgramsInfo = (req, res) => {
    program.getProgramInfo().then(data => {
        let response = {};
        response.data = data;
        res.send(JSON.stringify(response));
    })
}
exports.addProgram = (req, res) => {
    let body = JSON.parse(req.body.data);
    let request = {};
    request.NameProgram = body.nameprogram;

    program.addProgram(request)
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
exports.addBulkProgram = (req, res) => {
    let body = JSON.parse(req.body.data);
    let request = {};
    let array = [];
    body.map(row => {
        let obj = {};
        obj.NameProgram = row.nameprogram;
        array.push(obj);
    })
    request.data = array;
    console.log(request);

    program.addBulkProgram(request)
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
exports.deleteProgram = (req, res) => {
    let params = req.query;
    let request = {};
    request.Id = Number(params.idprogram);
    program.deleteProgram(request)
        .then(data => {
            let response = {};
            if (data.effectedRows > 0) {
                response.code = 1;
                response.message = "delete success";
                res.send(JSON.stringify(response));
            } else if (data.effectedRows === 0) {
                response.code = -2;
                response.message = "couldn't find this program";
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