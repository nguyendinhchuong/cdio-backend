const eduprogram = require('../../service/EducationProgram/eduprogramService');


exports.getListOfContent = (req, res) => {
    let params = req.query;
    let request = {};
    let response = {};
    if (isNaN(+params.id)) {
        response.code = -1;
        response.message = "id isn't string";
        res.send(JSON.stringify(response));
    }
    request.IdEduProgram = +params.id;
    eduprogram.getListOfContent(request)
        .then(data => {
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
            response.code = -1;
            response.message = "Throw err";
            res.send(JSON.stringify(response));
        })
}

exports.getEduProgList = (req, res) => {
    eduprogram.getEduProgram()
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

exports.getEduProgByID = (req, res) => {
    let params = req.query;
    let request = {};
    request.Id = Number(params.ideduprog);
    eduprogram.getEduProgramById(request)
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

exports.addEduProgram = (req, res) => {
    let body = JSON.parse(req.body.data);
    let request = {};
    request.EduName = body.eduname;
    request.EduEngName = body.eduengname;
    request.IdLevel = Number(body.idlevel);
    request.IdMajor = Number(body.idmajor);
    request.IdProgram = Number(body.idprogram);
    request.SchoolYear = body.schoolyear;
    request.DateCreated = body.datecreated;
    request.DateEdited = body.dateedited;

    eduprogram.addEduProgram(request)
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

exports.deleteEduProgram = (req, res) => {
    let params = req.query;
    let request = {};
    request.Id = Number(params.ideduprog);

    eduprogram.deleteEduProgram(request)
        .then(data => {
            let response = {};
            if (data === 1) {
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

exports.updateEduProgram = (req, res) => {
    let params = req.query;
    let body = JSON.parse(req.body.data);
    let request = {};
    request.Id = Number(params.ideduprog);
    request.EduName = body.eduname;
    request.EduEngName = body.eduengname;
    request.IdLevel = Number(body.idlevel);
    request.IdMajor = Number(body.idmajor);
    request.IdProgram = Number(body.idprogram);
    request.SchoolYear = body.schoolyear;
    request.DateEdited = body.dateedited;

    eduprogram.updateEduProg(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = 1;
                response.message = "update success";
                res.send(JSON.stringify(response));
            } else {
                response.code = -1;
                response.message = "update fail";
                res.send(JSON.stringify(response));
            }
        })
        .catch(err => {
            throw err;
        })
}