const faculty = require('../../controllers/OutcomeStandard/facultyController');

module.exports = (app) => {
    app.route('/faculty/getlist').get(faculty.getFaculty);
    app.route('/faculty/getinfo').get(faculty.getFacultyInfo);

    app.route('/faculty/add').post(faculty.addFaculty);
    app.route('/faculty/addbulk').post(faculty.addBulkFaculty);
    app.route('/faculty/delete').post(faculty.deleteFaculty);
}