const Level = require('../../controllers/EducationProgram/levelController');

module.exports = (app) => {
    app.route('/level/getlist').get(Level.getLevelList);
    // app.route('/level/getbyid').get(Level.getLevelById);

    app.route('/level/add').post(Level.addLevel);
    app.route('/level/addbulk').post(Level.addBulkLevel);
    app.route('/level/delete').post(Level.deleteLevel);
}