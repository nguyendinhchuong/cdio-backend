const major = require('../../controllers/EducationProgram/majorController');

module.exports = (app) => {
    app.route('/major/getlist').get(major.getMajorList);
    app.route('/major/getbyid').get(major.getMajorById);

    app.route('/major/add').post(major.addMajor);
    app.route('/major/addlist').post(major.addBulkMajor);
    app.route('/major/delete').post(major.deleteMajor);
}