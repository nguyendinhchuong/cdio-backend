const teachplanblock = require('../../controllers/EducationProgram/teachplanblockController');

module.exports = (app) => {
    app.route('/teachplanblock/getlist').get(teachplanblock.getTeachPlanBlock);
    // app.route('/subject/getbyid').get(subject.getSubjectById);

    app.route('/teachplanblock/add').post(teachplanblock.addTeachPlanBlock);
    // app.route('/subject/addlist').post(subject.addSubjectBulk);
    // app.route('/subject/delete').post(subject.deleteSubject);
}