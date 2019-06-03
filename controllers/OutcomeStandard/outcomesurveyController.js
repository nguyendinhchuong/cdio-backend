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

exports.addSurveyQuestion = (req, res) => {
    let params = req.query;
    let body = JSON.parse(req.body.data);
    let request = {};
    let data = [];
    request.IdSurvey = Number(params.idsurvey);
    body.map(question => {
        let obj = {};
        obj.Question = question.question;
        obj.AnswerField1 = question.answers[0];
        obj.AnswerField2 = question.answers[1];
        obj.AnswerField3 = question.answers[2];
        obj.AnswerField4 = question.answers[3];
        obj.AnswerField5 = question.answers[4];
        data.push(obj);
    })
    request.data = Array.from(data);
    outcomesurvey.addSurveyQuestion(request)
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

exports.getSurveyQuestion = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdSurvey = Number(params.idsurvey);

    outcomesurvey.getSurveyQuestion(request)
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
                res.send(JSON.stringify(response));
            }
        })
        .catch(err => {
            throw err;
        })
}

exports.doSurvey = (req, res) => {
    let params = req.query;
    let body = JSON.parse(req.body.data);
    let request = {};
    let data = [];
    request.IdSurvey = Number(params.idsurvey);
    body.map(answer => {
        let obj = {};
        obj.Id = Number(answer.idquestion);
        obj.NumberChoose1 = answer.answers[0];
        obj.NumberChoose2 = answer.answers[1];
        obj.NumberChoose3 = answer.answers[2];
        obj.NumberChoose4 = answer.answers[3];
        obj.NumberChoose5 = answer.answers[4];
        data.push(obj);
    })
    request.data = Array.from(data);
    outcomesurvey.doSurvey(request)
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

exports.getSurveyResult = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdSurvey = Number(params.idsurvey);

    outcomesurvey.getSurveyResult(request)
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
                res.send(JSON.stringify(response));
            }
        })
        .catch(err => {
            throw err;
        })
}