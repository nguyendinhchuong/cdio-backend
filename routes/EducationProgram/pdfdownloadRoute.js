const download = require('../../controllers/EducationProgram/pdfdowdloadController');

module.exports = (app) => {
    app.route('/download/getedu').get(download.getData);

    app.route('/download/getcourse').get(download.exportPDFCourseList);
}