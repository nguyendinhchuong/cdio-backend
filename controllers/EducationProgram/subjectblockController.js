const subjectblock = require('../../service/EducationProgram/subjectblockService');

exports.getSubjectBlockByEduProgContentId = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdEduProgContent = Number(params.ideduprogcontent);

    subjectblock.getSubjectBlockByEduProgContentId(request)
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

exports.getSubjectBlockById = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdSubjectBlock = Number(params.idsubjectblock);

    subjectblock.getSubjectBlockById(request)
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

exports.addSubjectBlock = (req, res) => {
    let body = JSON.parse(req.body.data);
    let request = {};
    request.IdEduProgContent = Number(body.ideduprogcontent);
    request.Credit = Number(body.credit);
    request.isOptional = body.isoptional;
    request.isAccumulated = body.isaccumulated;
    request.DateCreated = body.datecreated;

    subjectblock.addSubjectBlock(request)
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
exports.deleteSubjectBlock = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdSubjectBlock = Number(params.idsubjectblock);

    subjectblock.deleteSubjectBlock(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = 1;
                response.message = "success";
                res.send(JSON.stringify(response));
            } else if (data === -2) {
                response.code = -2;
                response.message = "subject block is used";
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