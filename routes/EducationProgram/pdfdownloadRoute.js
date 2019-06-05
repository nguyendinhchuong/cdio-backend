const download = require('../../controllers/EducationProgram/pdfdowdloadController');

module.exports = (app) => {
    app.route('/download/get').get(download.getData);
}