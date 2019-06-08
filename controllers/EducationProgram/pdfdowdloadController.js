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
    const educontentData = await educontent.getEduContentByEduId(request);

    console.log(educontentData);
    

    //Edu Info
    data.EduName = eduprogData[0].EduName;
    data.LevelName = eduprogData[0].LevelName;
    data.MajorCode = eduprogData[0].MajorCode;
    data.MajorName = eduprogData[0].MajorName;
    data.ProgramName = eduprogData[0].NameProgram;
    data.SchoolYear = eduprogData[0].SchoolYear;

    //Edu purpose

    Object.defineProperties(data, {
        'EduPurposeLevel1': {
            value: Object,
            writable: true
        },
        'EduPurposeLevel2': {
            value: Object,
            writable: true
        },
        'EduPurposeLevel3': {
            value: Object,
            writable: true
        }
    });
    Object.defineProperties(data.EduPurposeLevel1, {
        'KeyRowTitle1': {
            value: true,
            writable: true
        },
        'Title1': {
            value: true,
            writable: true
        },
        'KeyRowTitle2': {
            value: true,
            writable: true
        },
        'Title2': {
            value: true,
            writable: true
        },
        'KeyRowTitle3': {
            value: true,
            writable: true
        },
        'Title3': {
            value: true,
            writable: true
        }
    });
    Object.defineProperties(data.EduPurposeLevel2, {
        'KeyRowTitle1': {
            value: true,
            writable: true
        },
        'Title1': {
            value: true,
            writable: true
        },
        'KeyRowTitle2': {
            value: true,
            writable: true
        },
        'Title2': {
            value: true,
            writable: true
        },
        'KeyRowTitle3': {
            value: true,
            writable: true
        },
        'Title3': {
            value: true,
            writable: true
        }
    });
    Object.defineProperties(data.EduPurposeLevel3, {
        'Row1': {
            value: Array,
            writable: true
        },
        'Row2': {
            value: Array,
            writable: true
        },
        'Row3': {
            value: Array,
            writable: true
        }
    });
    let array_row1 = [];
    let array_row2 = [];
    let array_row3 = [];
    for (var i = 0; i < edupurposeData.length; i++) {

        switch (edupurposeData[i].dataValues.KeyRow) {
            //Level 1.x
            case '1.1.':
                data.EduPurposeLevel1.KeyRowTitle1 = edupurposeData[i].dataValues.KeyRow;
                data.EduPurposeLevel1.Title1 = edupurposeData[i].dataValues.NameRow;
                break;
            case '1.2.':
                data.EduPurposeLevel1.KeyRowTitle2 = edupurposeData[i].dataValues.KeyRow;
                data.EduPurposeLevel1.Title2 = edupurposeData[i].dataValues.NameRow;
                break;
            case '1.3.':
                data.EduPurposeLevel1.KeyRowTitle3 = edupurposeData[i].dataValues.KeyRow;
                data.EduPurposeLevel1.Title3 = edupurposeData[i].dataValues.NameRow;
                break;
            //
            case '1.1.1':
                data.EduPurposeLevel2.KeyRowTitle1 = edupurposeData[i].dataValues.KeyRow;
                data.EduPurposeLevel2.Title1 = edupurposeData[i].dataValues.NameRow;
                break;

            case '1.2.1':
                data.EduPurposeLevel2.KeyRowTitle2 = edupurposeData[i].dataValues.KeyRow;
                data.EduPurposeLevel2.Title2 = edupurposeData[i].dataValues.NameRow;
                break;
            case '1.2.1':
                data.EduPurposeLevel2.KeyRowTitle3 = edupurposeData[i].dataValues.KeyRow;
                data.EduPurposeLevel2.Title3 = edupurposeData[i].dataValues.NameRow;
                break;


            default:
                break;
        }
        if (edupurposeData[i].dataValues.KeyRow.indexOf('1.1.1.') >= 0) {
            array_row1.push(edupurposeData[i].dataValues.NameRow);
            data.EduPurposeLevel3.Row1 = Array.from(array_row1);
        } else if (edupurposeData[i].dataValues.KeyRow.indexOf('1.2.1.') >= 0) {
            array_row2.push(edupurposeData[i].dataValues.NameRow);
            data.EduPurposeLevel3.Row2 = Array.from(array_row2);
        } else if (edupurposeData[i].dataValues.KeyRow.indexOf('1.3.1.') >= 0) {
            array_row3.push(edupurposeData[i].dataValues.NameRow);
            data.EduPurposeLevel3.Row3 = Array.from(array_row3);
        }
    }


    data.EduTime = detaileduData.dataValues.EduTime;
    data.EnrollmentTarget = detaileduData.dataValues.EnrollmentTarget;
    data.EduWeight = detaileduData.dataValues.EduWeight;
    data.EduProcess = detaileduData.dataValues.EduProcess;
    data.GraduatedCon = detaileduData.dataValues.GraduatedCon;



    handlebars.registerHelper("inc", function (value, options) {
        return parseInt(value) + 1;
    });
    data.TeachPlanBlock = teachplanblockData;
    return data;
}

const createPDFCourseListData = async (ideduprog) => {
    let request = {};
    request.IdEduProg = ideduprog;
    request.Id = ideduprog;
    const eduprogData = await eduprog.getEduProgramById(request);
    const subjecteduData = await subjecteduprog.getDetailSubjectByEduId(request);

    let data = {};
    data.EduName = eduprogData[0].EduName + " Syllabus";
    data.Subjects = subjecteduData;
    console.log(subjecteduData);
    return data;
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
    const path = await createPDF(data, 'course.html');
    const file = `${path}`;
    res.download(file, err => {
        if (err) {
            throw err;
        }
    })
}