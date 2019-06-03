const eduprogram = require('../../controllers/EducationProgram/eduprogramController');

module.exports = (app) => {
    app.route('/eduprogram/getlistofcontent').get(eduprogram.getListOfContent);  
    app.route('/eduprogram/getlist').get(eduprogram.getEduProgList);  
    app.route('/eduprogram/getbyid').get(eduprogram.getEduProgByID);  

    app.route('/eduprogram/add').post(eduprogram.addEduProgram);
    app.route('/eduprogram/update').post(eduprogram.updateEduProgram);
}