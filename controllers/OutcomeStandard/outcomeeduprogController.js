const outcomeeduprog = require('../../service/OutcomeStandard/outcomeeduprogService');

exports.getEduProg = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdOutcome = Number(params.idoutcome);

    outcomeeduprog.getEduProg(request)
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
exports.getOutcome = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdEduProgram = Number(params.ideduprogram);

    outcomeeduprog.getOutcome(request)
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