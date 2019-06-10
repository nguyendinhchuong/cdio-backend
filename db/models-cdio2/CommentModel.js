var sql = require('../db');

var CommentModel = (id, noi_dung, nguoi_gui, thoi_gian, log_id) => {
    this.id = id;
    this.nguoi_gui = nguoi_gui;
    this.noi_dung = noi_dung;
    this.thoi_gian = thoi_gian;
    this.log_id = log_id;
}

CommentModel.get = (result) => {
    sql.query(` SELECT * 
                FROM binh_luan`, 
        (err, res) => {
            if (err) {
                console.log(err);
                result(err)
            }     
            result(res);
    })
}

CommentModel.add = (body,result) => {
    let content = body.content;
    let nguoi_gui = body.nguoi_gui;
    let thoi_gian = body.thoi_gian;
    let log_id = body.log_id;
   
    sql.query(` INSERT INTO binh_luan (noi_dung,nguoi_gui,thoi_gian,log_id)
                VALUES ('${content}','${nguoi_gui}',${thoi_gian},${log_id}) `, 
        (err, res) => {
        if (err) {
            console.log(err);
            result(err)
        }     
        result(res)
    })
}
module.exports = CommentModel;