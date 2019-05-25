const detaileduprogram = require('../../service/EducationProgram/detaileduprogService');

exports.getPDF = (req, res) =>{
    let params = req.query;
    let request = {};
    let response = {};
    if(isNaN(params.ideduprog)){
        response.code = -1;
        response.message = "fail";
        res.send(JSON.stringify(response));
    }
    request.IdEduProgram = +params.ideduprog;
    detaileduprogram.getDetailEduProgram(request)
    .then(data => {
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