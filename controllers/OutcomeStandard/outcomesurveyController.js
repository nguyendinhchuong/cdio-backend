const outcomesurvey = require('../../service/OutcomeStandard/outcomesurveyService');

exports.getSurvey = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdOutcome = Number(params.idoutcome);

    outcomesurvey.getSurvey(request)
        .then(data => {
            let response = {};
            if (data) {
                response.code = 1;
                response.message = "success";
                response.data = Array.from(data);
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

exports.addNewSurvey = (req, res) => {
    let params = req.query;
    let body = JSON.parse(req.body.data);
    let request = {};
    request.IdOutcome = Number(params.idoutcome);
    request.Name = body.name;
    request.IdUser = Number(params.iduser);
    request.CreatedDate = body.date;

    outcomesurvey.addNewSurvey(request)
        .then(data => {
            let response = {};
            if (data) {
                response.code = 1;
                response.message = "add success";
                response.data = data;
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

