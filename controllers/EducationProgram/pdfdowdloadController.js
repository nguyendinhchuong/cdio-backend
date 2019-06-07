const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

//require for eduprogram data
const eduprog = require('../../service/EducationProgram/eduprogramService');
const detailedu = require('../../service/EducationProgram/detaileduprogService');
const edupurpose = require('../../service/EducationProgram/edupurposeService');
const educontent = require('../../service/EducationProgram/eduprogcontentService');
const teachplanblock = require('../../service/EducationProgram/teachplanblockService');

//require for course list
const subjecteduprog = require('../../service/EducationProgram/subjecteduprogService');



const createPDFEduProgramData = async (ideduprog) => {
    let request = {};
    request.IdEduProgram = ideduprog;
    request.Id = ideduprog;
    let data = {};
    const eduprogData = await eduprog.getEduProgramById(request);
    const detaileduData = await detailedu.getDetailEduProgram(request);

    request.IdDetailEduProg = detaileduData.dataValues.Id;
    const edupurposeData = await edupurpose.getEduPurpose(request);

    const teachplanblockData = await teachplanblock.getDetailTeachPlanBlock(request);

    // console.log("Edu Prog: ", eduprogData);
    // console.log("Detail Edu: ", detaileduData.dataValues);
    console.log("Edu Purpose");
    for (var i = 0; i < edupurposeData.length; i++) {
        console.log(edupurposeData[i].dataValues);
    }
    // console.log("Teach Plan Block: ", teachplanblockData);

    //Edu Info
    data.EduName = eduprogData[0].EduName;
    data.LevelName = eduprogData[0].LevelName;
    data.MajorCode = eduprogData[0].MajorCode;
    data.MajorName = eduprogData[0].MajorName;
    data.ProgramName = eduprogData[0].NameProgram;
    data.SchoolYear = eduprogData[0].SchoolYear;

    //Edu purpose


    for (var i = 0; i < edupurposeData.length; i++) {

        switch (edupurposeData.dataValues.KeyRow) {
            //Level 1.x
            case '1.1.':
                data.EduPurposeLevel1.KeyRowTitle1 = edupurposeData.dataValues[i].KeyRow;
                data.EduPurposeLevel1.Title1 = edupurposeData.dataValues[i].NameRow;
                break;
            case '1.2.':
                data.EduPurposeLevel1.KeyRowTitle2 = edupurposeData.dataValues[i].KeyRow;
                data.EduPurposeLevel1.Title2 = edupurposeData.dataValues[i].NameRow;
                break;
            case '1.3.':
                data.EduPurposeLevel1.KeyRowTitle3 = edupurposeData.dataValues[i].KeyRow;
                data.EduPurposeLevel1.Title3 = edupurposeData.dataValues[i].NameRow;
                break;
            //
            case '1.1.1':
                data.EduPurposeLevel2.KeyRowTitle1 = edupurposeData.dataValues[i].KeyRow;
                data.EduPurposeLevel2.Title1 = edupurposeData.dataValues[i].NameRow;
                break;

            case '1.1.':

                break;


            default:
                break;
        }
    }


    data.EduTime = detaileduData.dataValues.EduTime;
    data.EnrollmentTarget = detaileduData.dataValues.EnrollmentTarget;
    data.EduWeight = detaileduData.dataValues.EduWeight;
    data.EduProcess = detaileduData.dataValues.EduProcess;
    data.GraduatedCon = detaileduData.dataValues.GraduatedCon;



    data.TeachPlnBlock = teachplanblockData;
    console.log(data);
    return data;
}

const createPDFCourseListData = async (ideduprog) => {
    let request = {};
    request.IdEduProg = ideduprog;

    const subjecteduData = await subjecteduprog.getDetailSubjectByEduId(request);

    console.log(subjecteduData);
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

exports.exportPDFCourseList = async (req, res) => {
    let params = req.query;
    const data = await createPDFCourseListData(Number(params.ideduprog));
}