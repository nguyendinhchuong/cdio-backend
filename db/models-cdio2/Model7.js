var sql = require('../db');

var Model7 = (data) => {
  this.data = data;
}

Model7.addDanhGia = (data, result) => {
  // sql.query(`delete from chuan_dau_ra_mon_hoc where chuan_dau_ra = ${data.cdr}`);
  sql.query(`INSERT INTO danh_gia (ma, ten, mo_ta, ti_le, thong_tin_chung_id, chu_de_danh_gia_id, del_flag) VALUES ('${data.mathanhphan}', '${data.tenthanhphan}', '${data.mota}', '${data.tile}', '${data.thong_tin_chung_id}', '${data.chu_de_danh_gia_id}', '0')`,
    (err, res) => {
      if (err) {
        console.log("Error model 7 : ", err);
        result(null, err)
      } else {
        result(null, res);
      }
    })
}

Model7.addChuDe = (data, result) => {
  sql.query(`INSERT INTO chu_de_danh_gia (ma_chu_de, ten_chu_de) VALUES ('${data.ma_chu_de}', '${data.ten_chu_de}')`,
    (err, res) => {
      if (err) {
        console.log("Error model 7 : ", err);
        result(null, err)
      } else {
        result(null, res);
      }
    })
}

Model7.updateChuDe = (data, result) => {
  sql.query(`update chu_de_danh_gia
          set ma_chu_de = '${data.ma_chu_de}',
              ten_chu_de = '${data.ten_chu_de}'
          where id = ${data.id}`,
    (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err)
      } else {
        result(null, res);
      }
    })
}

Model7.deletechudefromdanhgia = (data, result) => {
  let idString = "(" + data.toString() + ")";
  sql.query(`update danh_gia set chu_de_danh_gia_id = -1 where (chu_de_danh_gia_id) IN ${idString}`,
    (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err)
      } else {
        result(null, res);
      }
    })

}

Model7.deletedanhgia = (data, result) => {
  sql.query(`update danh_gia set del_flag = 1 where (chu_de_danh_gia_id) = -1`,
    (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err)
      } else {
        result(null, res);
      }
    })

}

Model7.deleteChuDe = (data, result) => {
  let idString = "(" + data.toString() + ")";
  sql.query(`delete from chu_de_danh_gia where (id) IN ${idString}`,
    (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err)
      } else {
        result(null, res);
      }
    })
}

Model7.getChude = (result) => {
  sql.query(`select * from chu_de_danh_gia where id != -1 ORDER by ma_chu_de`, (err, res) => {
    if (err) {
      console.log("err: ", err);
      return result(err, null);
    }
    else
      //console.log("result: ",res);
      return result(null, res);
  });
}


Model7.getChuanDaura = (id, result) => {
  sql.query(`select * from cdrmh_has_dg where danh_gia_id = ${id.id} `, (err, res) => {
    if (err) {
      console.log("err: ", err);
      return result(err, null);
    }
    else
      return result(null, res);
  });
}


Model7.getStandardOutput = (id, idCtdt, result) => {
  sql.query(`SELECT id,muc_tieu FROM muc_tieu_mon_hoc WHERE thong_tin_chung_id = ${id.id} 
    AND idCtdt = ${idCtdt}
    AND del_flag = 0`, (err, listMT) => {
      if (err) {
        console.log("err: ", err);
        return result(err, null);
      }
      else {
        let standardOutput = [];
        listMT.forEach((muctieu, index) => {
          sql.query(`SELECT id,chuan_dau_ra FROM chuan_dau_ra_mon_hoc
          WHERE muc_tieu_mon_hoc_id = ${muctieu.id} AND del_flag = 0`, (err, listCdr) => {
              if (err) {
                console.log("err: ", err);
                return result(err, null);
              }
              if (listCdr.length > 0) {
                let temp = {
                  "muc_tieu": muctieu.muc_tieu,
                  "cdr": listCdr,
                }
                standardOutput.push(temp);
              }

              if (index === listMT.length - 1) return result(null, standardOutput);

            })

        })
      }

    });
}


getCDRDanhGiaFromId = id => {
  return new Promise((resolve, reject) => {
    sql.query(`select chuan_dau_ra_mon_hoc_id from cdrmh_has_dg where danh_gia_id = ${id} `, (err, response) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(response);
    })
  })
}

getCDRFromId = id => {
  return new Promise((resolve, reject) => {
    sql.query(`select chuan_dau_ra from chuan_dau_ra_mon_hoc where id in (${id}) and del_flag = 0`, (err, response) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(response);
    })
  })
}

getCDR = (idDanhgia, idCtdt) => {
  return new Promise((resolve, reject) => {
    let standardOutput = [];
    sql.query(`SELECT cdr.chuan_dau_ra FROM chuan_dau_ra_mon_hoc cdr,cdrmh_has_dg has, muc_tieu_mon_hoc mt
    WHERE has.danh_gia_id = ${idDanhgia} 
    AND cdr.muc_tieu_mon_hoc_id = mt.id
    AND mt.del_flag = 0
    AND mt.idCtdt = ${idCtdt}
    AND cdr.id = has.chuan_dau_ra_mon_hoc_id 
    AND cdr.del_flag = 0`, (err, result) => {
        if (err) {
          console.log("err:", err);
          reject(err);
        }
        result.forEach((item, _) => {
          standardOutput.push(item.chuan_dau_ra);
        })
        resolve(standardOutput);
      })
  })
}

getChuDe = () => {
  return new Promise((resolve, reject) => {
    sql.query(`select * from chu_de_danh_gia where id != -1 ORDER by ma_chu_de`, (err, result) => {
      if (err) {
        console.log("err:", err);
        reject(err);
      }
      resolve(result);
    })
  })
}

Model7.save = (body, result) => {

  if (body.data.length === 0) return result(null, "1");

  body.data.forEach((item, index) => {
    if (item.id === -1 && item.del_flag === 1) return; // bỏ qua trường hợp thêm mới xong xóa

    insertOrUpdate(item, body.thong_tin_chung_id, body.idCtdt).then(idDanhgia => {
      sql.query(`delete from cdrmh_has_dg  where danh_gia_id = ${idDanhgia}`, (err, res) => {
        if (err) {
          console.log("err: ", err);
          return result(err, null);
        }
        else {
          let id = idDanhgia;

          item.standardOutput.forEach((item, index) => {
            sql.query(`insert into cdrmh_has_dg(danh_gia_id,chuan_dau_ra_mon_hoc_id) values (${id},${item})`,
              (err, res) => {
                if (err) {
                  console.log("error:", err);
                  return result(err, null);
                }
              })

          })
        }

      })

      if (index === body.data.length - 1) return result(null, "1");

    }).catch(err => {
      return result(err, null);
    })

  });
}

Model7.get = (idSubject, idCtdt) => {
  return new Promise((resolve, reject) => {
    sql.query(`select * from danh_gia  
      where thong_tin_chung_id = ${idSubject} and idCtdt = ${idCtdt} and del_flag = 0`, (err, listDanhGia) => {
        if (err) {
          console.log("err: ", err);
          reject(err);
        }
        if (listDanhGia.length === 0) {
          resolve([]);
        }
        var result = [];

        listDanhGia.forEach((danhgia, index) => {

          let temp = {
            id: danhgia.id,
            key: danhgia.ma,
            standardOutput: [],
            mathanhphan: danhgia.ma,
            tenthanhphan: danhgia.ten,
            mota: danhgia.mo_ta,
            tile: danhgia.ti_le,
            del_flag: danhgia.del_flag,
          }

          getCDR(danhgia.id, idCtdt).then(res => {
            temp.standardOutput = res;
            result.push(temp);
            if (index === listDanhGia.length - 1) resolve(result);

          }, err => {
            console.log("err: ", err);
            reject(err);
          })

        })
      })

  })

}


insertOrUpdate = (item, idSubject, idCtdt) => {
  return new Promise((resolve, reject) => {
    if (item.id === -1) {
      
      sql.query(`insert into danh_gia(ma,ten,mo_ta,ti_le,thong_tin_chung_id,chu_de_danh_gia_id,idCtdt,del_flag) ` +
        `values ('${item.key}','${item.tenthanhphan}','${item.mota}',${item.tile},${idSubject},${item.chude},${idCtdt},0)`,
        (err, res) => {
          if (err) {
            console.log("error:", err);
            reject(err);
          } else {
            resolve(res.insertId);
          }
        })
    }
    else {
      sql.query(`update danh_gia set ten = '${item.tenthanhphan}', mo_ta = ${item.mota},ti_le = ${item.tile},del_flag = ${item.del_flag}
     where id = ${item.id} `,
        (err, res) => {
          if (err) {
            console.log("error:", err);
            reject(err);
          } else {
            resolve(item.id);
          }
        })
    }
  })
}

module.exports = Model7;	