const TEACHER = 5;
const EDITOR = 6;
const ADMIN = 1;
const BIEN_SOAN = 2;
const QUAN_LY_SURVEY = 3;
const VIEW_SYLLABUS = 4;
const role = {
    5: [
        '/user/getlist/',
        '/user/getinfo/',
        '/user/changepass/',
        '/comment/get/',
        '/comment/add'
    ],
    6: [
        '/user/getlist/',
        '/user/getinfo/',
        '/user/changepass/',
        '/comment/get/',
        '/comment/done/'
    ],
    1: [
        '/user/getlist/',
        '/user/getinfo/',
        '/user/delete/',
        '/user/register/',
        '/user/getbyrole/',
        '/user/delete/',
        '/user/changepass/'
    ]
}

module.exports = role;