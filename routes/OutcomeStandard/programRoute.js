const program = require('../../controllers/OutcomeStandard/programController');

module.exports = (app) => {
    //app.route('/getprogram').get(program.getPrograms);
    app.route('/program/get').get(program.getProgramsInfo);

    app.route('/program/add').post(program.addProgram);
    app.route('/program/addbulk').post(program.addBulkProgram);
    app.route('/program/delete').post(program.deleteProgram);
}