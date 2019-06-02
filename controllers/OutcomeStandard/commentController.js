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
    let data = [];
    body.map(row => {
        data.IdOutcome = Number(params.idoutcome);
        data.KeyRow = row.keyrow;
        data.IdUser = Number(row.iduser);
        data.Content = row.content;
        data.CommentDate = row.date;
    })
    let request = {};
    request.data;

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
    request.idOutcome = Number(params.idoutcome);
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