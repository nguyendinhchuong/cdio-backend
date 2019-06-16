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

    for (var i = 0; i < educontentData.eduContents.length; i++) {
        console.log(educontentData.eduContents[i].dataValues);
    }
    for (var i = 0; i < educontentData.subjectBlocks.length; i++) {
        console.log(educontentData.subjectBlocks[i].dataValues);
    }
    for (var i = 0; i < educontentData.detailBlocks.length; i++) {
        console.log(educontentData.detailBlocks[i].dataValues);
    }


    //Edu Info
    data.EduName = eduprogData[0].EduName;
    data.LevelName = eduprogData[0].LevelName;
    data.MajorCode = eduprogData[0].MajorCode;
    data.MajorName = eduprogData[0].MajorName.toUpperCase();
    data.ProgramName = eduprogData[0].NameProgram;
    data.SchoolYear = eduprogData[0].SchoolYear;

    //Edu purpose


    let array_row1 = [];
    let array_row2 = [];
    let array_row3 = [];
    data.EduPurposeLevel1 = {};
    data.EduPurposeLevel2 = {};
    data.EduPurposeLevel3 = {};


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

            case '1.3.1':
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

    //Detail edu
    data.EduTime = detaileduData.dataValues.EduTime;
    data.EnrollmentTarget = detaileduData.dataValues.EnrollmentTarget;
    data.EduWeight = detaileduData.dataValues.EduWeight;
    data.EduProcess = detaileduData.dataValues.EduProcess;
    data.GraduatedCon = detaileduData.dataValues.GraduatedCon;


    let EduCon_array1 = [];
    let EduCon_array2 = [];

    data.EduContentTitleLv1 = {};
    data.EduContentTitleLv2 = {};
    //Edu content
    for (var i = 0; i < educontentData.eduContents.length; i++) {
        switch (educontentData.eduContents[i].KeyRow) {
            case '7.1':
                data.EduContentTitleLv1.Key1 = educontentData.eduContents[i].KeyRow;
                data.EduContentTitleLv1.Title1 = educontentData.eduContents[i].NameRow;
                break;
            case '7.2':
                data.EduContentTitleLv1.Key2 = educontentData.eduContents[i].KeyRow;
                data.EduContentTitleLv1.Title2 = educontentData.eduContents[i].NameRow;
                break;
            default:
                break;
        }
        if (educontentData.eduContents[i].dataValues.KeyRow.indexOf('7.1.') >= 0 &&
            !educontentData.eduContents[i].dataValues.Type) {
            let obj = {};
            obj.Key = educontentData.eduContents[i].dataValues.KeyRow;
            obj.Content = educontentData.eduContents[i].dataValues.NameRow;
            EduCon_array1.push(obj);
            data.EduContentTitleLv2.Row1 = Array.from(EduCon_array1);
        } else if (educontentData.eduContents[i].dataValues.KeyRow.indexOf('7.2.') >= 0 &&
            !educontentData.eduContents[i].dataValues.Type) {
            let obj = {};
            obj.Key = educontentData.eduContents[i].dataValues.KeyRow;
            obj.Content = educontentData.eduContents[i].dataValues.NameRow;
            EduCon_array2.push(obj);
            data.EduContentTitleLv2.Row2 = Array.from(EduCon_array2);
        }
    }

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
    // const path = await createPDF(data, 'test.html');
    // const file = `${path}`;
    // res.download(file, err => {
    //     if (err) {
    //         throw err;
    //     }
    // })
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