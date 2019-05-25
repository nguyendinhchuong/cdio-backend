const eduPDF = require("../../controllers/EducationProgram/detailEduPDFController");

module.exports = app =>{
    app.route("getPDF").get(eduPDF.getPDF);
}