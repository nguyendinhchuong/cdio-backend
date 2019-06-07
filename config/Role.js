const TEACHER = 5;
const ADMIN = 1;
const BIEN_SOAN = 2;
const QUAN_LY_SURVEY = 3;
const VIEW_SYLLABUS = 4;
const role = {
    //ADMIN
    1: [
        '/user/getlist/',
        '/user/getinfo/',
        '/user/delete/',
        '/user/register/',
        '/user/registerlist/',
        '/user/getbyrole/',
        '/user/delete/'
    ],
    //BIEN_SOAN
    2: [
        '/user/getlist/',
        '/user/getinfo/',
        '/comment/get/',
        '/comment/done/'
    ],
    //QUAN_LY_SYLLABUS
    3: [

    ],
    //VIEW_SYLLABUS
    4: [

    ],
    //TEACHER
    5: [
        '/user/getlist/',
        '/user/getinfo/',
        '/comment/get/',
        '/comment/add/'
    ],
}

module.exports = role;