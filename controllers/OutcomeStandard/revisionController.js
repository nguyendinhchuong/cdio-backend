const revision = require('../../service/OutcomeStandard/revisionService');

//get all revision of an outcome standard
exports.getRevision = (req, res) => {
    let body = req.query;
    let request = {};
    request.IdOutcomeStandard = Number(body.idoutcome);
    revision.getRevision(request)
        .then(data => {
            let response = {};
            response.data = data;
            res.send(JSON.stringify(response));
        })
}


// exports.getRevisionInfo = (req, res) => {
//     let body = req.query;
//     let request = {};
//     request.IdOutcomeStandard = Number(body.idoutcome);
//     revision.getRevision(request)
//         .then(data => {
//             let response = {};
//             response.data = data;
//             res.send(JSON.stringify(response));
//         })
//         .catch(err => {
//             throw err;
//         })
// }
exports.getRevisionInfoById = (req, res) => {
    let params = req.query;
    let request = {};
    request.Id = Number(params.idrevision);
    revision.getRevisionInfoById(request)
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





exports.addRevision = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdOutcomeStandard = params.idoutcome;
    request.IdUser = params.iduser;
    request.NameRevision = params.name;
    request.DateUpdated = params.dateupdated;

    revision.addRevision(request)
        .then(data => {
            let response = {};
            if (data.code === 1) {
                response.code = 1;
                response.message = "success";
                response.data = data;
                res.send(JSON.stringify(response));
            } else if (data === -2) {
                response.code = -2;
                response.message = "couldn't find id outcome standard";
                res.send(JSON.stringify(response));
            }
            else {
                response.code = -1;
                response.message = "fail";
                res.send(JSON.stringify(response));
            }
        })
}


exports.deleteRevision = (req, res) => {
    let params = req.query;
    let request = {};
    request.Id = params.idrevision;

    revision.deleteRevisionById(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = 1;
                response.message = "success";
                res.send(JSON.stringify(response));
            } else if (data === -2) {
                response.code = -2;
                response.message = "couldn't find id revision";
                res.send(JSON.stringify(response));
            }
            else {
                response.code = -1;
                response.message = "fail";
                res.send(JSON.stringify(response));
            }
        })
}