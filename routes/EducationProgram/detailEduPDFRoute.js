const eduPDF = require("../../controllers/EducationProgram/detailEduPDFController");

module.exports = app =>{
    app.route("/exportEduprogram").post(eduPDF.exportPDF);
}