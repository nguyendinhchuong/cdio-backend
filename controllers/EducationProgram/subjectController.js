const subject = require('../../service/EducationProgram/subjectService');

exports.getSubjectList = (req, res) => {
    subject.getSubjectList()
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
exports.getSubjectById = (req, res) => {
    let params = req.query;
    let request = {};
    request.Id = Number(params.idsubject);
    subject.getSubjectById(request)
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

exports.addSubject = (req, res) => {
    let body = JSON.parse(req.body.data);    
    let request = {};
    request.SubjectCode = body.subjectcode;
    request.SubjectName = body.subjectname;
    request.SubjectEngName = body.subjectengname;
    request.Credit = Number(body.credit);
    request.TheoryPeriod = Number(body.theoryperiod);
    request.PracticePeriod = Number(body.practiceperiod);
    request.ExercisePeriod = Number(body.exerciseperiod);
    request.Description = body.description;
    request.DateCreated = body.datecreated;
    request.DateEdited = body.dateedited;
    request.DelFlat = 0;
    subject.addSubject(request)
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

exports.addSubjectBulk = (req, res) => {
    let body = req.body;
    let request = {};
    let array = JSON.parse(body.data);
    let new_array = [];
    array.map(subject => {
        let obj = {};
        obj.SubjectCode = subject.subjectcode;
        obj.SubjectName = subject.subjectname;
        obj.SubjectEngName = subject.subjectengname;
        obj.Credit = Number(subject.credit);
        obj.TheoryPeriod = Number(subject.theoryperiod);
        obj.PracticePeriod = Number(subject.practiceperiod);
        obj.ExercisePeriod = Number(subject.exerciseperiod);
        obj.Description = subject.description;
        obj.DateCreated = subject.datecreated;
        obj.DateEdited = subject.dateedited;
        obj.DelFlat = 0;
        new_array.push(obj);
    })
    request.data = new_array;
    subject.addSubjectBulk(request)
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

exports.deleteSubject = (req, res) => {
    let params = req.query;
    let request = {};
    request.Id = Number(params.idsubject);
    subject.deleteSubject(request)
        .then(data => {
            let response = {};
            if (data === 1) {
                response.code = 1;
                response.message = "delete success";
                res.send(JSON.stringify(response));
            } else if (data === -2) {
                response.code = -2;
                response.message = "couldn't find this subject";
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