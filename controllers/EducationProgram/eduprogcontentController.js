const eduprogcontent = require('../../service/EducationProgram/eduprogcontentService');
const db = require('../../models/index');

exports.getEduProgContent = (req, res) => {
    let params = req.query;
    let request = {};
    let response = {};
    if (isNaN(+params.id)) {
        response.code = -1;
        response.message = "fail";
        res.send(JSON.stringify(response));
    }
    request.IdEduProgram = +params.id;
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


exports.getBlockSubjects = async (req, res) => {
    const request = {};
    const response = {};
    try {
        const params = req.query;
        request.IdEduProgram = +params.id;
        if (isNaN(+params.id)) {
            response.code = -1;
            response.message = "param isn't string";
            res.send(JSON.stringify(response));
        }
        //request.IdEduProg = 67;
        await getdetailEdu(+params.id)
            .then(data => {
                console.log("--------------");
                request.IdEduProgram = +data.dataValues.Id;
                console.log(request);
                
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
        await eduprogcontent.getBlocksSubjects(request)
            .then(data => {
                response.code = 1;
                response.message = "success";
                response.data = data;
                res.send(JSON.stringify(response));
            }).catch(err => {
                response.code = -1;
                response.message = "fail";
                res.send(JSON.stringify(response));
            })
    } catch (err) {
        response.code = -1;
        response.message = "fail";
        res.send(JSON.stringify(response));
    }
}

exports.getKnowledgeTable = (req, res) => {
    const request = {};
    const response = {};
    try {
        const params = req.query;
        request.IdEduProgram = +params.id;

        if (isNaN(+params.id)) {
            response.code = -1;
            response.message = "param isn't string";
            res.send(JSON.stringify(response));
        }

        eduprogcontent.getRowsContainTable(request)
            .then(data => {
                response.code = 1;
                response.message = "success";
                response.data = data;
                res.send(JSON.stringify(response));
            }).catch(err => {
                console.log(err);
                response.code = -1;
                response.message = "fail";
                res.send(JSON.stringify(response));
            })
    } catch (err) {
        console.log("fail 2 ");

        response.code = -1;
        response.message = "fail";
        res.send(JSON.stringify(response));
    }
}

const getdetailEdu = id => {
    return db.detaileduprog.findOne({
        where: { IdEduProgram: id },
        attributes: ['Id']
    })
}