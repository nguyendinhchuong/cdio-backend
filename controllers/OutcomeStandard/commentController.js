const comment = require('../../service/OutcomeStandard/commentService');

exports.getComment = (req, res) => {
    let params = req.query;
    let request = {};
    request.IdOutcome = Number(params.idoutcome);

    comment.getComment(request)
        .then(data => {
            let response = {};
            if (data.data) {
                response.code = 1;
                response.message = "success";
                response.data = data.data;
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

exports.addNewComment = (req, res) => {
    let params = req.query;
    const body = JSON.parse(req.body.data);
    let request = {};
    let data = {};

    data.IdOutcome = Number(params.idoutcome);
    data.KeyRow = body.keyrow;
    data.IdUser = Number(body.iduser);
    data.Content = body.content;
    data.CommentDate = body.date;

    request.data = data;

    comment.addNewComment(request)
        .then(data => {
            let response = {};
            if (data.code === 1) {
                response.code = 1;
                response.message = "add success";
                response.data = data.data;
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
exports.doneComment = (req, res) => {
    let params = req.query;
    const body = JSON.parse(req.body.data);
    let request = {};
    request.UserDone = Number(params.iduser);
    request.IdOutcome = Number(params.idoutcome);
    request.Id = body;

    comment.doneComment(request)
        .then(data => {
            let response = {};
            if (data.code === 1) {
                response.code = 1;
                response.message = "update success";
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