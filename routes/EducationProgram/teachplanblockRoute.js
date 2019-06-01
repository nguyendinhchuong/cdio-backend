const teachplanblock = require('../../controllers/EducationProgram/teachplanblockController');

module.exports = (app) => {
    app.route('/teachplanblock/getlist').get(teachplanblock.getTeachPlanBlock);
    app.route('/teachplanblock/getdetail').get(teachplanblock.getDetailTeachPlanBlock);
    // app.route('/subject/getbyid').get(subject.getSubjectById);

    // app.route('/teachplanblock/add').post(teachplanblock.addTeachPlanBlock);
    app.route('/teachplanblock/update').post(teachplanblock.updateTeachPlanBlock);
    app.route('/teachplanblock/addteacher').post(teachplanblock.addTeacher);
    // app.route('/subject/delete').post(subject.deleteSubject);
}