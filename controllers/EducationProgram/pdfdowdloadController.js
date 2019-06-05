const eduprog = require('../../service/EducationProgram/eduprogramService');
const detailedu = require('../../service/EducationProgram/detaileduprogService');
const edupurpose = require('../../service/EducationProgram/edupurposeService');
const educontent = require('../../service/EducationProgram/eduprogcontentService');
const teachplanblock = require('../../service/EducationProgram/teachplanblockService');


const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

const createPDFEduProgramData = async (ideduprog) => {
    let request = {};
    console.log(ideduprog);
    request.IdEduProgram = ideduprog;
    request.Id = ideduprog;
    let data = {};
    const eduprogData = await eduprog.getEduProgramById(request);
    const detaileduData = await detailedu.getDetailEduProgram(request);

    request.IdDetailEduProg = detaileduData.dataValues.Id;
    const edupurposeData = await edupurpose.getEduPurpose(request);

    const teachplanblockData = await teachplanblock.getDetailTeachPlanBlock(request);

    console.log("Edu Prog: ", eduprogData);
    console.log("Detail Edu: ", detaileduData.dataValues);
    console.log("Edu Purpose");
    for (var i = 0; i < edupurposeData.length; i++) {
        console.log(edupurposeData[i].dataValues);
    }
    console.log("Teach Plan Block: ", teachplanblockData);

    data.EduName = eduprogData[0].EduName;
    data.LevelName = eduprogData[0].LevelName;
    data.MajorCode = eduprogData[0].MajorCode;
    data.MajorName = eduprogData[0].MajorName;
    data.ProgramName = eduprogData[0].NameProgram;
    data.SchoolYear = eduprogData[0].SchoolYear;

    data.EduPurpose = edupurposeData;
    data.EduTime = detaileduData.dataValues.EduTime;
    data.KnowledgeWeight = detaileduData.dataValues.KnowledgeWeight;
    data.EduProcess = detaileduData.dataValues.EduProcess;
    data.GraduatedCon = detaileduData.dataValues.GraduatedCon;

    data.TeachPlnBlock = teachplanblockData;
    console.log(data);
    return data;
}

const createPDFCourseListData = async (ideduprog) => {

}

const createPDF = async (data, file_template) => {
    let templateHTML = fs.readFileSync(path.join(process.cwd(), './PDFMaterial/' + file_template), 'utf8');
    let template = handlebars.compile(templateHTML);
    let html = template(data);

    var milis = new Date();
    milis = milis.getTime();

    let pdfPath = path.join('./PDFMaterial/pdf', `${data.EduName}-${milis}.pdf`);

    let options = {
        width: '1230px',
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
            top: "10px",
            bottom: "30px"
        },
        printBackground: true,
        path: pdfPath
    }
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    });
    var page = await browser.newPage();

    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
        waitUntil: 'networkidle0'
    });

    await page.pdf(options);
    await browser.close();
    return pdfPath;
}
exports.getData = async (req, res) => {
    let params = req.query;
    const data = await createPDFEduProgramData(Number(params.ideduprog));
    const path = await createPDF(data, 'index.html');
    const file = `${path}`;
    res.download(file, err => {
        if (err) {
            throw err;
        }
    })
}   