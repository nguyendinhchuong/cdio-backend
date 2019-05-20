const subjecteduprog = require('../../service/EducationProgram/subjecteduprogService');

exports.getSubjectByEduProgId = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdEduProg = Number(params.ideduprog);

    subjecteduprog.getSubjectByEduProgId(request)
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
exports.getEduProgBySubjectId = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdSubject = Number(params.idsubject);

    subjecteduprog.getEduProgBySubjectId(request)
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

exports.addSubjectToEduProg = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdEduProg = Number(params.ideduprog);
    request.IdSubject = Number(params.idsubject);
    request.DateCreated = params.datecreated;
    subjecteduprog.addSubjectToEduProg(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = 1;
                response.message = "success";
                res.send(JSON.stringify(response));
            } else if (data === -2) {
                response.code = -2;
                response.message = "subject is existed in education program";
                res.send(JSON.stringify(response));
            } else {
                response.code = -1;
                response.message = "fail";
                res.send(JSON.stringify(response));
            }
        })
}

exports.deleteSubjectFromEduProg = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdEduProg = Number(params.ideduprog);
    request.IdSubject = Number(params.idsubject);
    subjecteduprog.deleteSubjectFromEduProg(request)
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
}

exports.deleteAllSubjectFromEduProg = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdEduProg = Number(params.ideduprog);
    subjecteduprog.deleteAllSubjectFromEduProg(request)
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
}