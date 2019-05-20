const faculty = require('../../service/OutcomeStandard/facultyService');

exports.getFaculty = (req, res) => {
    faculty.getFaculty().then(data => {
        let response = {};
        response.data = data;
        res.send(JSON.stringify(response));
    });
}
exports.getFacultyInfo = (req, res) => {
    faculty.getFacultyInfo().then(data => {
        let response = {};
        response.data = data;
        res.send(JSON.stringify(response));
    });
}
exports.addFaculty = (req, res) => {
    let body = JSON.parse(req.body.data);
    let request = {};
    request.NameFaculty = body.namefaculty;

    faculty.addFaculty(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = 1;
                response.message = "add success";
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
exports.addBulkFaculty = (req, res) => {
    let body = JSON.parse(req.body.data);
    let request = {};
    let array = [];
    body.map(row => {
        let obj = {};
        obj.NameFaculty = row.namefaculty;
        array.push(obj);
    })
    request.data = array;
    console.log(request);

    faculty.addBulkFaculty(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = 1;
                response.message = "add success";
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
exports.deleteFaculty = (req, res) => {
    let params = req.query;
    let request = {};
    request.Id = Number(params.idfaculty);
    faculty.deleteFaculty(request)
        .then(data => {
            let response = {};
            if (data.effectedRows > 0) {
                response.code = 1;
                response.message = "delete success";
                res.send(JSON.stringify(response));
            } else if (data.effectedRows === 0) {
                response.code = -2;
                response.message = "couldn't find this faculty";
                res.send(JSON.stringify(response));
            } else {
                response.code = -1;
                response.message = "delete fail";
                res.send(JSON.stringify(response));
            }
        })
        .catch(err => {
            throw err;
        })
}