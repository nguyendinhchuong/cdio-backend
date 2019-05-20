const detailblock = require('../../controllers/EducationProgram/detailblockController');

module.exports = (app) => {
    app.route('/detailblock/getsubject').get(detailblock.getSubjectBySubjectBlockId);

    app.route('/detailblock/add').post(detailblock.addSubjectToDetailBlock);
    app.route('/detailblock/deleteone').post(detailblock.deleteOne);
    app.route('/detailblock/deletebyidsubject').post(detailblock.deleteByIdSubject);
    app.route('/detailblock/deletebyidsubjectblock').post(detailblock.deleteByIdSubjectBlock);
}