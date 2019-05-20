const detailRevision = require('../../service/OutcomeStandard/detailrevisionService');

exports.getDetailRevision = (req, res) => {
    let body = req.query;
    let request = {};
    request.IdRevision = Number(body.idrevision);
    detailRevision.getDetailRevision(request)
        .then(data => {
            let response = {};
            response.data = data;
            res.send(JSON.stringify(response))
        });
}

exports.addDetailRevision = (req, res) => {
    let params = req.query;
    let body = req.body;
    let request = {};
    
    let array = JSON.parse(body.data);
    console.log(array)
    array.map(row => {
        row.IdRevision = params.idrevision;
    })
    request.data = array;
    detailRevision.addDetailRevision(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = 1;
                response.message = "save success";
                res.send(JSON.stringify(response));
            } else {
                response.code = -1;
                response.message = "save fail";
                res.send(JSON.stringify(response));
            }
        })
}