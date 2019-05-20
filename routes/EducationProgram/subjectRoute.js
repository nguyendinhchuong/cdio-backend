const subject = require('../../controllers/EducationProgram/subjectController');

module.exports = (app) => {
    app.route('/subject/getlist').get(subject.getSubjectList);
    app.route('/subject/getbyid').get(subject.getSubjectById);

    app.route('/subject/add').post(subject.addSubject);
    app.route('/subject/addlist').post(subject.addSubjectBulk);
    app.route('/subject/delete').post(subject.deleteSubject);
}