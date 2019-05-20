const subjecteduprog = require('../../controllers/EducationProgram/subjecteduprogController');

module.exports = (app) => {
    app.route('/subjecteduprog/geteduprog').get(subjecteduprog.getEduProgBySubjectId);
    app.route('/subjecteduprog/getsubject').get(subjecteduprog.getSubjectByEduProgId);

    app.route('/subjecteduprog/addsubject').post(subjecteduprog.addSubjectToEduProg);
    app.route('/subjecteduprog/delsubject').post(subjecteduprog.deleteSubjectFromEduProg);
    app.route('/subjecteduprog/delallsubject').post(subjecteduprog.deleteAllSubjectFromEduProg);
}