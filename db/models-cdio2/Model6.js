var sql = require("../db");

var Model6 = data => {
  this.data = data;
};
Model6.add = (body, result) => {
  if (body.data.length === 0) return result(null, "1");

  body.data.forEach((item, index) => {
    if (item.id === -1 && item.del_flag === 1) return; // bỏ qua trường hợp thêm mới xong xóa

    Model6.insertOrUpdate(item, body.thong_tin_chung_id, body.idCtdt)
      .then(idKHTH => {
        sql.query(
          `delete a,b,c from khth_has_cdrmh a,khth_has_dg b,khth_has_hdd c 
        where a.ke_hoach_thuc_hanh_id = b.ke_hoach_thuc_hanh_id
        and b.ke_hoach_thuc_hanh_id = c.ke_hoach_thuc_hanh_id 
        and c.ke_hoach_thuc_hanh_id = ${idKHTH}`,
          (err, res) => {
            if (err) {
              console.log("err: ", err);
              return result(err, null);
            } else {
              let id = idKHTH;
              item.teachingActs.forEach((item, index) => {
                sql.query(
                  `insert into khth_has_hdd(ke_hoach_thuc_hanh_id,hoat_dong_day_id) values (${id},${item})`,
                  (err, res) => {
                    if (err) {
                      console.log("error:", err);
                      return result(err, null);
                    }
                  }
                );
              });

              item.standardOutput.forEach((item, index) => {
                sql.query(
                  `insert into khth_has_cdrmh(ke_hoach_thuc_hanh_id,chuan_dau_ra_mon_hoc_id) values (${id},${item})`,
                  (err, res) => {
                    if (err) {
                      console.log("error:", err);
                      return result(err, null);
                    }
                  }
                );
              });

              item.evalActs.forEach((item, index) => {
                sql.query(
                  `insert into khth_has_dg(ke_hoach_thuc_hanh_id,danh_gia_id) values (${id},${item})`,
                  (err, res) => {
                    if (err) {
                      console.log("error:", err);
                      return result(err, null);
                    }
                  }
                );
              });
            }
          }
        );

        if (index === body.data.length - 1) return result(null, "1");
      })
      .catch(err => {
        return result(err, null);
      });
  });
};

Model6.insertOrUpdate = (item, idSubject, idCtdt) => {
  return new Promise((resolve, reject) => {
    if (item.id === -1) {
      sql.query(
        `insert into ke_hoach_thuc_hanh(tuan,chu_de,thong_tin_chung_id,idCtdt) values (${
          item.week
        },'${item.titleName}',${idSubject},${idCtdt})`,
        (err, res) => {
          if (err) {
            console.log("error:", err);
            reject(err);
          } else {
            resolve(res.insertId);
          }
        }
      );
    } else {
      sql.query(
        `update ke_hoach_thuc_hanh set tuan = ${item.week},chu_de = '${
          item.titleName
        }', del_flag = ${item.del_flag}
     where id = ${item.id} `,
        (err, res) => {
          if (err) {
            console.log("error:", err);
            reject(err);
          } else {
            resolve(item.id);
          }
        }
      );
    }
  });
};

Model6.getTeachingActs = result => {
  sql.query(
    `select * from hoat_dong_day where danh_muc = 1 and loai_hoat_dong ='TH'`,
    (err, res) => {
      if (err) {
        console.log("err: ", err);
        return result(err, null);
      }
      else return result(null, res);
    }
  );
};

Model6.getEvalActs = (idSubject, idCtdt, result) => {
  sql.query(
    `SELECT id,ma FROM danh_gia 
    WHERE thong_tin_chung_id = ${idSubject}
    AND idCtdt = ${idCtdt}
    AND del_flag = 0`,
    (err, res) => {
      if (err) {
        console.log("err: ", err);
        return result(err, null);
      } else return result(null, res);
    }
  );
};

Model6.getStandardOutput = (idSubject, idCtdt, result) => {
  sql.query(
    `SELECT id,muc_tieu FROM muc_tieu_mon_hoc WHERE thong_tin_chung_id = ${idSubject} 
    AND idCtdt = ${idCtdt}
    AND del_flag = 0`,
    (err, listMT) => {
      if (err) {
        console.log("err: ", err);
        return result(err, null);
      } else {
        if (listMT.length === 0) return result(null, []);

        let standardOutput = [];
        listMT.forEach((muctieu, index) => {
          sql.query(
            `SELECT id,chuan_dau_ra FROM chuan_dau_ra_mon_hoc
          WHERE muc_tieu_mon_hoc_id = ${muctieu.id} AND del_flag = 0`,
            (err, listCdr) => {
              if (err) {
                console.log("err: ", err);
                return result(err, null);
              }
              let temp = {
                muc_tieu: muctieu.muc_tieu,
                cdr: listCdr
              };
              standardOutput.push(temp);
              if (index === listMT.length - 1)
                return result(null, standardOutput);
            }
          );
        });
      }
    }
  );
};

Model6.get = (idSubject, idCtdt) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `select * from ke_hoach_thuc_hanh 
      where thong_tin_chung_id = ${idSubject}
      and idCtdt = ${idCtdt} 
      and del_flag = 0 ORDER BY tuan ASC`,
      (err, listKH) => {
        if (err) {
          console.log("err: ", err);
          reject(err);
        }
        if (listKH.length === 0) {
          resolve([]);
        }
        var result = [];
        listKH.forEach((khth, index) => {
          let temp = {
            id: khth.id,
            key: khth.tuan,
            titleName: khth.chu_de,
            teachingActs: [],
            standardOutput: [],
            evalActs: [],
            del_flag: khth.del_flag
          };
          getTeachingActsByIdKHTH(khth.id).then(
            res => {
              temp.teachingActs = res;

              getStandardOutputByIdKHTH(khth.id).then(
                res => {
                  temp.standardOutput = res;

                  getEvalActsByIdKHTH(khth.id).then(
                    res => {
                      temp.evalActs = res;
                      result.push(temp);
                      if (index === listKH.length - 1) resolve(result);
                    },
                    err => {
                      console.log("err: ", err);
                      reject(err);
                    }
                  );
                },
                err => {
                  console.log("err:", err);
                  reject(err);
                }
              );
            },
            err => {
              console.log("err:", err);
              reject(err);
            }
          );
        });
      }
    );
  });
};

getTeachingActsByIdKHTH = idKHTH => {
  return new Promise((resolve, reject) => {
    let teachingActs = [];
    sql.query(
      `SELECT hdd.hoat_dong FROM hoat_dong_day hdd, khth_has_hdd has
      WHERE has.ke_hoach_thuc_hanh_id = ${idKHTH} AND hdd.id = has.hoat_dong_day_id`,
      (err, result) => {
        if (err) {
          console.log("err:", err);
          reject(err);
        }
        result.forEach((item, _) => {
          teachingActs.push(item.hoat_dong);
        });
        resolve(teachingActs);
      }
    );
  });
};

getStandardOutputByIdKHTH = idKHTH => {
  return new Promise((resolve, reject) => {
    let standardOutput = [];
    sql.query(
      `SELECT cdr.chuan_dau_ra FROM chuan_dau_ra_mon_hoc cdr,khth_has_cdrmh has, muc_tieu_mon_hoc mt
      WHERE has.ke_hoach_thuc_hanh_id = ${idKHTH} 
      AND cdr.muc_tieu_mon_hoc_id = mt.id
      AND mt.del_flag = 0
      AND cdr.id = has.chuan_dau_ra_mon_hoc_id 
      AND cdr.del_flag = 0`,
      (err, result) => {
        if (err) {
          console.log("err:", err);
          reject(err);
        }
        result.forEach((item, _) => {
          standardOutput.push(item.chuan_dau_ra);
        });
        resolve(standardOutput);
      }
    );
  });
};

getEvalActsByIdKHTH = idKHTH => {
  return new Promise((resolve, reject) => {
    let evalActs = [];
    sql.query(
      `SELECT dg.ma FROM danh_gia dg,khth_has_dg has
      WHERE has.ke_hoach_thuc_hanh_id = ${idKHTH} AND dg.id = has.danh_gia_id and dg.del_flag = 0`,
      (err, result) => {
        if (err) {
          console.log("err:", err);
          reject(err);
        }
        result.forEach((item, _) => {
          evalActs.push(item.ma);
        });
        resolve(evalActs);
      }
    );
  });
};

Model6.addTeachingAct = (data, result) => {
  let response = [];
  if (data.length === 0) result(null, []);
  data.forEach((act, index) => {
    sql.query(
      `select * from hoat_dong_day where loai_hoat_dong = 'TH' 
      AND hoat_dong = '${act.hoat_dong}'`,
      (err, resId) => {
        if (err) {
          console.log("err: ", err);
          return result(err, null);
        }
        if (resId.length === 0) {
          sql.query(
            `insert into hoat_dong_day(hoat_dong,loai_hoat_dong,danh_muc) values ('${
              act.hoat_dong
            }','${act.loai}',${act.danh_muc})`,
            (err, res) => {
              if (err) {
                console.log("err: ", err);
                return result(err, null);
              }
              let temp = {
                id: res.insertId,
                index: act.index,
                indexKHTH: act.indexKHTH
              };
              response.push(temp);

              if (response.length === data.length) result(null, response);
            }
          );
        } else {
          let temp = {
            id: resId[0].id,
            index: act.index,
            indexKHTH: act.indexKHTH
          };
          response.push(temp);

          if (response.length === data.length) result(null, response);
        }
      }
    );
  });
};

module.exports = Model6;
