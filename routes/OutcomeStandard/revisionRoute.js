const revision = require('../../controllers/OutcomeStandard/revisionController');

module.exports = (app) => {
    // lấy thông tin tất cả phiên bản thuộc chuẩn đầu ra này
    app.route('/revision/get').get(revision.getRevision);
    //lấy thông tin của một phiên bản theo id
    app.route('/revision/getbyid').get(revision.getRevisionInfoById);
    // xóa phiên bản với id và detail của phiên bản
    app.route('/revision/delete').post(revision.deleteRevision);
    // thêm phiên bản cần có id của chuẩn đầu ra và tên của phiên bản (id của người thêm NẾU CẦN)
    app.route('/revision/add').post(revision.addRevision);
}