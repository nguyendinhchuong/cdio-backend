const detailOutcomeStandard = require('../../controllers/OutcomeStandard/detailOutcomeStandardController');

module.exports = (app) => {
    // load detail của chuẩn đầu ra với id
    app.route('/detailoutcomestandard/get').get(detailOutcomeStandard.getDetailOutcomeStandardInfo);
    // lưu lại detail của chuẩn đầu ra với id
    app.route('/saveDetailOutcomeStandard/:idOutcomestandard').post();
    // add detail có idOutcomestandard (thường là add OutcomeStandard xong thì sẽ add detail)
    app.route('/detailoutcomestandard/add').post(detailOutcomeStandard.addDetailOutcomeStandard);

    app.route('/detailoutcomestandard/delete').post(detailOutcomeStandard.deleteDetailOutcomeStandard);
}