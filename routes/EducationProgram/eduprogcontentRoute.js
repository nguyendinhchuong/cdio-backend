const eduprogcontent = require('../../controllers/EducationProgram/eduprogcontentController');

module.exports = (app) => {

    app.route('/eduprogcontent/getBlockSubjects').get(eduprogcontent.getBlockSubjects);

    app.route('/eduprogcontent/get').get(eduprogcontent.getEduProgContent);  

    app.route('/eduprogcontent/add').post(eduprogcontent.addEduProgContent);
    
}