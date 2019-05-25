const eduprogcontent = require('../../service/EducationProgram/eduprogcontentService');

exports.getEduProgContent = (req, res) => {
    let params = req.query;
    let request = {};
    let response = {};
    if (isNaN(+params.id)) {
        response.code = -1;
        response.message = "fail";
        res.send(JSON.stringify(response));
    }
    request.IdEduProg = +params.id;
    eduprogcontent.getEduContentByEduId(request)
        .then(data => {
            let response = {};
            if (data) {
                response.code = 1;
                response.message = "success";
                response.data = data;
                res.send(JSON.stringify(response));
            }
            else {
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

exports.addEduProgContent = (req, res) => {
    const request = {};
    const response = {};
    try {
        const params = req.query;
        const body = JSON.parse(req.body.data);
        request.IdEduProg = +params.ideduprog;
        request.data = body;
        // for test postman
        //request.IdEduProg = +params.ideduprog;
        //request.data = req.body;

        eduprogcontent.addEduContent(request)
            .then(data => {
                if (data) {
                    response.code = data;
                    response.message = "success";
                    res.send(JSON.stringify(response));
                }
                response.code = data;
                response.message = "fail";
                res.send(JSON.stringify(response));
            })
            .catch(err => {
                response.message = "fail";
                res.send(JSON.stringify(response));
            })
    } catch (err) {
        response.message = "fail";
        res.send(JSON.stringify(response));
    }
}
