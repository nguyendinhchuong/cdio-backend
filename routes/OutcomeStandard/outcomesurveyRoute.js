const outcomesurvey = require('../../controllers/OutcomeStandard/outcomesurveyController');
const auth = require('../../controllers/User/authController');

module.exports = (app) => {
    app.route('/outcome/getsurveylist').get(outcomesurvey.getSurvey);
    app.route('/outcome/getsurveyquestion').get(outcomesurvey.getSurveyQuestion);
    app.route('/outcome/getresult').get(outcomesurvey.getSurveyResult);

    app.route('/outcome/add').post(outcomesurvey.addNewSurvey);
    app.route('/outcome/addsurveyquestion').post(outcomesurvey.addSurveyQuestion);
    app.route('/outcome/dosurvey').post(outcomesurvey.doSurvey);
    
}