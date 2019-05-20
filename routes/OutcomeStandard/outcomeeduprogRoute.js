const outcomeeduprog = require('../../controllers/OutcomeStandard/outcomeeduprogController');

module.exports = (app) => {
    app.route('/outcomeeduprog/geteduprog').get(outcomeeduprog.getEduProg);
    app.route('/outcomeeduprog/getoutcome').get(outcomeeduprog.getOutcome);
    
}