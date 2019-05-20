const outcomeStandard = require('../../controllers/OutcomeStandard/outcomeStandardController');

module.exports = (app) => {

    // tải thông tin của các chuẩn đầu ra trả về []
    // app.route('/getoutcomestandard').get(outcomeStandard.getOutcomeStandard);
    app.route('/outcomestandard/getlist').get(outcomeStandard.getOutcomeStandardInfo);
    // tải thông tin chuẩn đầu ra với id
    app.route('/outcomestandard/getinfo').get(outcomeStandard.getOutcomeStandardInfoById);

    app.route('/outcomestandard/geteduprog').get(outcomeStandard.getEduProgUseOutcome);
    // xóa nên làm sau cùng (vì xóa chuẩn đầu ra này là phải xóa các phiên bản của nó)
    app.route('/outcomestandard/delete').post(outcomeStandard.deleteOutcomeStandard);
    // thêm chuẩn đầu ra cần có tên chuẩn đầu ra, idFaculty, idProgram
    // nếu đã tồn tại chuẩn đầu ra cùng tên và ids thì k thêm vào trả về chuỗi đã tồn tại...
    app.route('/outcomestandard/add').post(outcomeStandard.addOutcomeStandard);
    //đổi tên outcome
    app.route('/outcomestandard/rename').post(outcomeStandard.renameOutcomeStandard);
}   