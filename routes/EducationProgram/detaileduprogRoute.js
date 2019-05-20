const detaileduprogram = require('../../controllers/EducationProgram/detaileduprogController');

module.exports = (app) => {
    app.route('/detaileduprogram/get').get(detaileduprogram.getDetailEduProg);  

    app.route('/detaileduprogram/add').post(detaileduprogram.addDetailEduProg);
    app.route('/detaileduprogram/update').post(detaileduprogram.updateDetailEduProg);
}