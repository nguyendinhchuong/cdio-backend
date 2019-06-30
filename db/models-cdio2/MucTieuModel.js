var sql = require('../db');

var MucTieuModel = (muc_tieu, mo_ta, cdr) => {
  this.muc_tieu = muc_tieu;
  this.mo_ta = mo_ta;
  this.cdr = cdr;
}

MucTieuModel.save = (data, result) => {
  data.body.forEach(element => {
    if (element.id === -1 && element.del_flag === 0) {
      sql.query(`insert into muc_tieu_mon_hoc(muc_tieu, mo_ta, thong_tin_chung_id, idCtdt) values ('${element.objectName}', '${element.description}', ${data.id}, ${data.idCtdt})`,
      (err, res) => {
        if (err) {
          console.log("error:", err);
          result(err)
        } else {
          let mtmhId = res.insertId;

          element.standActs.forEach(element2 => {
            element2 += '.'
            sql.query(`select do.Id from detailoutcomestandard do, detaileduprogram dep where KeyRow = '${element2}' and do.IdOutcomeStandard = dep.IdOutcome 
            AND dep.IdEduProgram = ${data.idCtdt}`,
              (err, res) => {
                if (err) {
                  console.log("error:", err);
                  result(err)
                } else {
                  let cdrId = res[0].Id
                  sql.query(`insert into mtmh_has_cdrcdio values (${mtmhId}, ${cdrId})`,
                          (err, res) => {
                            if (err) {
                              console.log("error:", err);
                              result(err)
                            }
                          })           
                }
              })
          });
          result(res);
        }
      })
    } else {
      sql.query(`update muc_tieu_mon_hoc set muc_tieu='${element.objectName}', mo_ta='${element.description}', del_flag=${element.del_flag} where id=${element.id}`,
      (err, res) => {
        if (err) {
          console.log("error:", err);
          result(err)
        } else {
          sql.query(`delete FROM mtmh_has_cdrcdio where muc_tieu_mon_hoc_id=${element.id};`,(err, res) => {
            element.standActs.forEach(element2 => {
              element2 += '.'
              sql.query(`select do.Id from detailoutcomestandard do, detaileduprogram dep where KeyRow = '${element2}' and do.IdOutcomeStandard = dep.IdOutcome 
              AND dep.IdEduProgram = ${data.idCtdt}`,
                (err, res) => {
                  if (err) {
                    console.log("error:", err);
                    result(err)
                  } else {
                    let cdrId = res[0].Id
                    sql.query(`insert into mtmh_has_cdrcdio values (${element.id}, ${cdrId})`,
                            (err, res) => {
                              if (err) {
                                console.log("error:", err);
                                result(err)
                              }
                            })                            
                  }
                })
            });
          })
          
          
          result('1');
        }
      })
    }
    
  });

}

MucTieuModel.getMucTieu = (id, result) => {
  sql.query(`select * from muc_tieu_mon_hoc where thong_tin_chung_id = ${id.id} and del_flag = 0`,
    (err, res1) => {
      if (err) {
        result(err);
      }
      result(res1)
    })
}

MucTieuModel.getMTMH_HAS_CDR = (data, result) => {
  sql.query(`select * from mtmh_has_cdrcdio where muc_tieu_mon_hoc_id = ${data.id}`,
    (err, res2) => {
      if (err) {
        result(err);
      }
      result(res2);
    })
}

MucTieuModel.getCDR = (idCtdt, result) => {
  sql.query(`select do.Id,do.KeyRow from chuan_dau_ra_cdio cdr,detailoutcomestandard do, detaileduprogram dep
  where cdr.del_flag = 0 and cdr.id = do.Id and do.IdOutcomeStandard = dep.IdOutcome 
  and length(KeyRow) = 6 AND dep.IdEduProgram = ${idCtdt}`,
    (err, res3) => {
      if (err) {
        result(err);
      }
      result(res3);
    })
}

MucTieuModel.get = (data, result) => {
  sql.query(
  `SELECT mt.muc_tieu, mt.mo_ta, detailoutcomestandard.KeyRow, mt.del_flag, mt.id FROM muc_tieu_mon_hoc as mt
  join mtmh_has_cdrcdio
  on mt.id = mtmh_has_cdrcdio.muc_tieu_mon_hoc_id
  join chuan_dau_ra_cdio
  on mtmh_has_cdrcdio.chuan_dau_ra_cdio_id = chuan_dau_ra_cdio.id
  join detailoutcomestandard
  on mtmh_has_cdrcdio.chuan_dau_ra_cdio_id = detailoutcomestandard.Id
  join detaileduprogram
  on detailoutcomestandard.IdOutcomeStandard = detaileduprogram.IdOutcome
  where mt.thong_tin_chung_id = ${data.id} and mt.del_flag = 0 and chuan_dau_ra_cdio.del_flag = 0 and detaileduprogram.IdEduProgram = ${data.idCtdt}`,
    (err, res) => {
      if (err) {
        result(err)
      }
      result(res)
    })
}

module.exports = MucTieuModel;