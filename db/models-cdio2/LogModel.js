var sql = require('../db');

var LogModel = (nguoi_gui, thoi_gian, noi_dung, muc_de_cuong, thong_tin_chung_id) => {
  this.nguoi_gui = nguoi_gui;
  this.thoi_gian = thoi_gian;
  this.noi_dung = noi_dung;
  this.muc_de_cuong = muc_de_cuong;
  this.thong_tin_chung_id = thong_tin_chung_id;
}

LogModel.save = (data, result) => {
  if(data){
    data.forEach(element => {
      let temp = element.noi_dung.toString() 
      sql.query(`insert into log(nguoi_gui, thoi_gian, noi_dung, muc_de_cuong, thong_tin_chung_id, idCtdt) values ('${element.ten}', ${element.timestamp}, '${temp}', '${element.muc_de_cuong}', ${element.thong_tin_chung_id}, ${element.id_ctdt})`,
        (err, res) => {
          if (err) {
            console.log("error:", err);
            result(err)
          } else {
            result(res);
          }
        })
    });
  }
  result([])
 
}

LogModel.get = (data, result) => {
  let especialContentTab = ['mo-ta-mon-hoc','tai-nguyen-mon-hoc','quy-dinh-chung']
  let optionQuery = "";
  if(!especialContentTab.includes(data.contentTab)){
    optionQuery = ` and idCtdt=${data.id_ctdt}`
  }
  sql.query(`select * from log where muc_de_cuong = '${data.contentTab}' and thong_tin_chung_id = '${data.subjectid}' ` + optionQuery, 
    (err, res) => {
      if (err) {
        console.log(err);
        result(err)
      }      
      result(res)
  })
}

module.exports = LogModel;