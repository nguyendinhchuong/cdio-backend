const subjectblock = require('../../controllers/EducationProgram/subjectblockController');

module.exports = (app) => {
    app.route('/subjectblock/getbyeduprogcontentid').get(subjectblock.getSubjectBlockByEduProgContentId);
    app.route('/subjectblock/getbyid').get(subjectblock.getSubjectBlockById);

    app.route('/subjectblock/add').post(subjectblock.addSubjectBlock);
}