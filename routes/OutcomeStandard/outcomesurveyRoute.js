const outcomesurvey = require('../../controllers/OutcomeStandard/outcomesurveyController');
const auth = require('../../controllers/User/authController');

module.exports = (app) => {
    //app.route('/getprogram').get(program.getPrograms);
    app.route('/outcome/getsurveylist').get(outcomesurvey.getSurvey);

    app.route('/outcome/add').post(outcomesurvey.addNewSurvey);
    // app.route('/program/addbulk').post(program.addBulkProgram);
    // app.route('/program/delete').post(program.deleteProgram);
}