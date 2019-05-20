const eduprogcontent = require('../../controllers/EducationProgram/eduprogcontentController');

module.exports = (app) => {
    app.route('/eduprogcontent/get').get(eduprogcontent.getEduProgContent);  

    app.route('/eduprogcontent/add').post(eduprogcontent.addEduProgContent);
    
}