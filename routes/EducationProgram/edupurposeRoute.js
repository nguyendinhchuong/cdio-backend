const edupurpose = require('../../controllers/EducationProgram/edupurposeController');

module.exports = (app) => {
    app.route('/edupurpose/get').get(edupurpose.getEduPurpose);  

    app.route('/edupurpose/add').post(edupurpose.addEduPurpose);
    app.route('/edupurpose/update').post(edupurpose.updateEduPurpose);
}