const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const moment = require('moment');


exports.exportPDF = async request => {
    const idDetalPro = request.IdEduProgram;
    try{
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        const body = [1,2,3,4,5,6,7];
    }
    catch(err){
        console.log(err);
    }
}

const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
}

hbs.registerHelper('dateFormat', function (value, format) {
    return moment(value).format(format);
});