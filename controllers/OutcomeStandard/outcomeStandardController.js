const outcomeStandard = require('../../service/OutcomeStandard/outcomeStandardService');


exports.getOutcomeStandard = (req, res) => {
    outcomeStandard.getOS().then(data => {
        let response = {};
        response.data = data;
        res.send(JSON.stringify(response));
    });
}
exports.getOutcomeStandardInfo = (req, res) => {
    outcomeStandard.getOSInfo().then(data => {
        let response = {};
        response.data = data;
        res.send(JSON.stringify(response));
    })
        .catch(err => {
            throw err;
        })
}
exports.getOutcomeStandardInfoById = (req, res) => {
    let params = req.query;
    let request = {};
    request.Id = Number(params.idoutcome);
    outcomeStandard.getOSInfoById(request)
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
exports.addOutcomeStandard = (req, res) => {
    let body = req.query;
    let request = {};

    request.IdFaculty = Number(body.IdFaculty);
    request.IdProgram = Number(body.IdProgram);
    request.IdUser = Number(body.IdUser);
    request.NameOutcomeStandard = body.NameOutcomeStandard;
    request.SchoolYear = body.SchoolYear;
    request.DateCreated = body.DateCreated;
    request.DateEdited = body.DateEdited;

    outcomeStandard.addOS(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = 1;
                response.message = "save success";
                res.send(JSON.stringify(response));
            } else {
                response.code = -1;
                response.message = "save fail";
                res.send(JSON.stringify(response));
            }
        })
        .catch(err => {
            throw err;
        })
}

exports.deleteOutcomeStandard = (req, res) => {
    let params = req.query;
    let request = {};

    request.Id = params.idoutcome;
    outcomeStandard.deleteOutcomeStandard(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = 1;
                response.message = "delete success";
                res.send(JSON.stringify(response));
            } else if (data === -2) {
                response.code = -2;
                response.message = "couldn't find this outcome";
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

exports.renameOutcomeStandard = (req, res) => {
    let params = req.query;
    let request = {};

    request.Id = Number(params.idoutcome);
    request.NameOutcomeStandard = params.name;
    outcomeStandard.renameOutcomeStandard(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = 1;
                response.message = "rename success";
                res.send(JSON.stringify(response));
            } else if (data === -2) {
                response.code = -2;
                response.message = "couldn't find this outcome";
                res.send(JSON.stringify(response));
            } else {
                response.code = -1;
                response.message = "rename fail";
                res.send(JSON.stringify(response));
            }
        })
        .catch(err => {
            throw err;
        })
}
exports.getEduProgUseOutcome = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdOutcome = Number(params.idoutcome);

    outcomeStandard.getEduProgListUseOutcome(request)
        .then(data => {
            let response = {};
            if (data.count <= 0) {
                response.code = -2;
                response.message = "couldn't find any eduprog";
                res.send(JSON.stringify(response));
            } else {
                response.code = 1;
                response.message = "success";
                response.count = data.count;
                response.data = data.rows;
                res.send(JSON.stringify(response));
            }
        })
        .catch(err => {
            throw err;
        })
}