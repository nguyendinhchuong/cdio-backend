var sql = require('../db');

var Model5 = (data) => {
    this.data = data;
}
query = (string_sql, args) => {
    return new Promise((resolve, reject) => {
        sql.query(string_sql, args, (err, rows) => {
            if (err)
                return reject(err);
            resolve(rows);
        })
    });
}

close = () => {
    console.log("close resource");
    sql.end();
}

loopCollectData = (res, data, idCtdt, sl) => {
    return new Promise((resolve, reject) => {
        for (const ele of res) {
            let objResult = {
                id: '',
                titleName: '',
                teachingActs: [],
                standardOutput: [],
                evalActs: [],
                subjectId: ''
            }
            objResult.id = ele.id;
            objResult.titleName = ele.ten_chu_de;
            objResult.subjectId = ele.thong_tin_chung_id;

            let element = collectData(objResult, idCtdt);

            element.then(async (result) => {
                await data.push(result);
            }).finally(() => {
                if (data.length == sl)
                    resolve(data);
            })
        }

    });
}

collectData = (objResult, idCtdt) => {
    return new Promise((resolve, reject) => {
        let buzCollect = collectDataPromise(objResult, idCtdt);
        buzCollect
            .then((result) => {
                resolve(result);
            })
    })
}

collectDataPromise = (objResult, idCtdt) => {
    return new Promise((resolve, reject) => {
        query(` SELECT hoat_dong 
                FROM khlt_has_hdd JOIN hoat_dong_day on hoat_dong_day_id = id 
                WHERE ke_hoach_ly_thuyet_id = '${objResult.id}' `)
            .then(res => {
                res.map(async value => {
                    await objResult.teachingActs.push(value.hoat_dong);
                })

            }, err => {
                console.log(err);
            })
            .then(() => {
                query(` SELECT * 
                        FROM khlt_has_cdrmh 
                        JOIN 
                        (chuan_dau_ra_mon_hoc JOIN muc_tieu_mon_hoc ON muc_tieu_mon_hoc.id = chuan_dau_ra_mon_hoc.muc_tieu_mon_hoc_id AND muc_tieu_mon_hoc.del_flag = 0 AND chuan_dau_ra_mon_hoc.del_flag = 0) 
                        ON chuan_dau_ra_mon_hoc_id = chuan_dau_ra_mon_hoc.id 
                        WHERE ke_hoach_ly_thuyet_id = ${objResult.id} AND idCtdt = ${idCtdt}`)
                    .then(res => {
                        res.map(async value => {
                            await objResult.standardOutput.push(value.chuan_dau_ra);
                        });

                    }, err => {
                        console.log(err);
                    })
            })
            .then(() => {
                query(` SELECT ma 
                        FROM khlt_has_dg JOIN danh_gia on danh_gia_id = id  
                        WHERE ke_hoach_ly_thuyet_id = '${objResult.id}' AND idCtdt = ${idCtdt} AND del_flag = 0`)
                    .then(res => {
                        res.map(async value => {
                            await objResult.evalActs.push(value.ma);
                        })
                        resolve(objResult)
                    }, err => {
                        console.log(err);
                    })

            })
    })
}

Model5.collect = (dataID, idCtdt, respone) => {
    let id = dataID;
    let data = [];

    query(` SELECT count(*) as sl 
            FROM ke_hoach_ly_thuyet 
            WHERE del_flag = 0 and thong_tin_chung_id = '${id}' and idCtdt = ${idCtdt}`).
        then(res => {
            let sl = res[0].sl
            query(` SELECT * 
                    FROM ke_hoach_ly_thuyet 
                    WHERE del_flag = 0 and thong_tin_chung_id = '${id}' and idCtdt = ${idCtdt}`)
                .then(res => {
                    if (res.length != 0) {

                        let finalResult = loopCollectData(res, data, idCtdt, sl);
                        finalResult.then((result) => {
                            respone(null, result)
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })
}

Model5.collectHDD = (result) => {
    query(" SELECT `hoat_dong` FROM `hoat_dong_day` WHERE `loai_hoat_dong` = 'LT' and `danh_muc` =1")
        .then(res => {
            result(res);
        })
}

Model5.collectDG = (dataID, idCtdt, result) => {
    const id = dataID;
    query(`SELECT ma FROM danh_gia WHERE del_flag = 0 and thong_tin_chung_id = ${id} AND idCtdt = ${idCtdt}`)
        .then(res => {
            result(res);
        })
}

Model5.collectCDR = (idSubject, idCtdt, result) => {
    sql.query(` SELECT id,muc_tieu 
                FROM muc_tieu_mon_hoc 
                WHERE thong_tin_chung_id = ${idSubject} AND del_flag = 0 AND idCtdt = '${idCtdt}'`, (err, listMT) => {
            if (err) {
                console.log("err: ", err);
                return result(err, null);
            } else {
                let standardOutput = [];

                listMT.forEach((muctieu, index) => {
                    sql.query(`SELECT id,chuan_dau_ra FROM chuan_dau_ra_mon_hoc
                    WHERE muc_tieu_mon_hoc_id = ${muctieu.id} AND del_flag = 0`,
                        (err, listCdr) => {

                            if (err) {
                                console.log("err: ", err);
                                return result(err, null);
                            }

                            let temp = {
                                "muc_tieu": muctieu.muc_tieu,
                                "cdr": listCdr,
                            }

                            standardOutput.push(temp);

                            if (index === listMT.length - 1) {
                                return result(standardOutput, null);
                            }

                        });
                })
            }

        });
}

Model5.add = (data, result) => {

    data.forEach(function (value, index) {
        let id = value.id;
        let stt = '1'; // hardcode
        let titleName = value.titleName;
        let teachingActs = value.teachingActs;
        let standardOutput = value.standardOutput;
        let evalActs = value.evalActs;
        let thong_tin_chung_id = value.subjectId;
        let del_flag = value.del_flag;

        if (id === -1) {
            if (del_flag === 1) {
                return;
            }

            query(`insert into ke_hoach_ly_thuyet(stt, ten_chu_de, thong_tin_chung_id, del_flag) 
                values ('${stt}', '${titleName}', '${thong_tin_chung_id}', '${del_flag}')`)
                .then((res) => {
                    const ke_hoach_ly_thuyet_id = res.insertId;
                    // // BUS 1
                    for (const elemenet of standardOutput) {
                        query(`SELECT id FROM chuan_dau_ra_mon_hoc WHERE chuan_dau_ra = '${elemenet}' AND del_flag = 0 AND thong_tin_chung_id = '${thong_tin_chung_id}' `)
                            .then(res => {
                                if (res.length == 0) {
                                    return;
                                }
                                const index = res[0].id;

                                sql.query(`insert into khlt_has_cdrmh(ke_hoach_ly_thuyet_id,chuan_dau_ra_mon_hoc_id) 
                                values ('${ke_hoach_ly_thuyet_id}', '${index}')`,
                                    (err, res) => {
                                        if (err) {
                                            console.log("error:", err);
                                            result(null, err)
                                        }
                                    });
                            });
                    }

                    // BUS 2
                    for (const element of evalActs) {
                        query(`SELECT id FROM danh_gia WHERE ma = '${element}' AND del_flag = 0 AND thong_tin_chung_id = '${thong_tin_chung_id}'`)
                            .then(res => {
                                if (res.length == 0) {
                                    return;
                                }
                                const index = res[0].id;

                                sql.query(`insert into khlt_has_dg(ke_hoach_ly_thuyet_id,danh_gia_id) 
                            values ('${ke_hoach_ly_thuyet_id}', '${index}')`,
                                    (err, res) => {
                                        if (err) {
                                            console.log("error:", err);
                                            result(null, err)
                                        } else {
                                            result(null, res);
                                        }
                                    });
                            });
                    }

                    // BUS 3
                    for (const element of teachingActs) {
                        query(`SELECT id FROM hoat_dong_day WHERE hoat_dong = '${element}' AND loai_hoat_dong = 'LT' `)
                            .then(res => {
                                if (res.length == 0) {
                                    query(`INSERT INTO hoat_dong_day(hoat_dong,loai_hoat_dong,danh_muc)
                                        VALUES ('${element}','LT',0)`)
                                        .then(res => {
                                            const index = res.insertId;

                                            sql.query(`insert into khlt_has_hdd(ke_hoach_ly_thuyet_id,hoat_dong_day_id) 
                                            values ('${ke_hoach_ly_thuyet_id}', '${index}')`,
                                                (err, res) => {
                                                    if (err) {
                                                        console.log("error:", err);
                                                        result(null, err)
                                                    }
                                                });
                                        })

                                    return;
                                }
                                const index = res[0].id;

                                sql.query(`insert into khlt_has_hdd(ke_hoach_ly_thuyet_id,hoat_dong_day_id) 
                                values ('${ke_hoach_ly_thuyet_id}', '${index}')`,
                                    (err, res) => {
                                        if (err) {
                                            console.log("error:", err);
                                            result(null, err)
                                        }
                                    });
                            });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    console.log("Finish");
                });

        } else { // update 

            query(`UPDATE ke_hoach_ly_thuyet SET ten_chu_de = '${titleName}' WHERE id = '${id}'`)
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    console.log("Finish");
                });

            query(`UPDATE ke_hoach_ly_thuyet SET del_flag = '${del_flag}' WHERE id = '${id}'`)
                .catch(err => {
                    console.log(err);
                })

            // BUS 1 
            for (const elemenet of standardOutput) {

                query(`SELECT id FROM chuan_dau_ra_mon_hoc WHERE chuan_dau_ra = '${elemenet}' AND del_flag = 0 AND thong_tin_chung_id = '${thong_tin_chung_id}' `)
                    .then(res => {
                        const index = res[0].id;

                        query(`DELETE FROM  khlt_has_cdrmh WHERE ke_hoach_ly_thuyet_id = '${id}'`)
                            .then(() => {
                                query(`INSERT INTO khlt_has_cdrmh VALUES ('${id}','${index}')`)
                            });

                    });
            }

            //BUS 2 
            for (const element of evalActs) {
                query(`SELECT id FROM danh_gia WHERE ma = '${element}' AND del_flag = 0 AND thong_tin_chung_id = '${thong_tin_chung_id}'`)
                    .then(res => {
                        const index = res[0].id;

                        query(`DELETE FROM  khlt_has_dg WHERE ke_hoach_ly_thuyet_id = '${id}'`)
                            .then(() => {
                                query(`INSERT INTO khlt_has_dg VALUES ('${id}','${index}')`)
                            });
                    });
            }

            // BUS 3
            for (const element of teachingActs) {
                query(`SELECT id FROM hoat_dong_day WHERE hoat_dong = '${element}' AND loai_hoat_dong = 'LT' `)
                    .then(res => {
                        const index = res[0].id;

                        query(`DELETE FROM  khlt_has_hdd WHERE ke_hoach_ly_thuyet_id = '${id}'`)
                            .then(() => {
                                query(`INSERT INTO khlt_has_hdd VALUES ('${id}','${index}')`)
                            });
                    });
            }
        }
    });
}

module.exports = Model5;