var sql = require('../db');

var Model4 = (data) => {
    this.data = data;
}

Model4.save = (data, result) => {
    
    for (let i = 0; i < data.data.length; i++) {
        if(data.data[i].del_flag === 1) {
            if(data.data[i].id != -1) {
                sql.query(`update chuan_dau_ra_mon_hoc set del_flag = 1 where id = ${data.data[i].id}`,
                (err, res) => {
                    if (err) {
                        console.log("error:", err);
                        result(null, err)
                    }
                });
            }
        }
        else {
            if(data.data[i].id != -1) {
                sql.query(`update chuan_dau_ra_mon_hoc
                set chuan_dau_ra = '${data.data[i].cdr}',
                    mo_ta = '${data.data[i].description}',
                    muc_do = '${data.data[i].levels.toString()}',
                    muc_tieu_mon_hoc_id = ${data.data[i].muc_tieu_mon_hoc_id},
                    cdrmh_muc_do_hanh_dong_id = ${data.data[i].cdrmh_muc_do_hanh_dong_id},
                    thong_tin_chung_id = ${data.thong_tin_chung_id}
                where id = ${data.data[i].id}`,
                (err, res) => {
                    if (err) {
                        console.log("error:", err);
                        result(null, err)
                    }
                });
            }
            else {
                if (data.data[i].muc_tieu_mon_hoc_id !== -1 && data.data[i].cdrmh_muc_do_hanh_dong_id !== -1) {
                    sql.query(`insert into chuan_dau_ra_mon_hoc(chuan_dau_ra, mo_ta, muc_do, muc_tieu_mon_hoc_id, cdrmh_muc_do_hanh_dong_id, thong_tin_chung_id) values ('${data.data[i].cdr}', '${data.data[i].description}', '${data.data[i].levels.toString()}',
                    ${data.data[i].muc_tieu_mon_hoc_id}, ${data.data[i].cdrmh_muc_do_hanh_dong_id}, ${data.thong_tin_chung_id})`,
                        (err, res) => {
                            if (err) {
                                console.log("error:", err);
                                result(null, err)
                            }
                        })
                }
            }
        }
        if(i === data.data.length - 1) {
            result(null, {status: "OK"})
        }
    }
}

Model4.collectdata = (data, result) => {
    sql.query(`SELECT chuan_dau_ra_mon_hoc.id,
    chuan_dau_ra_mon_hoc.chuan_dau_ra,
    chuan_dau_ra_mon_hoc.mo_ta,
    chuan_dau_ra_mon_hoc.muc_do,
    chuan_dau_ra_mon_hoc.muc_tieu_mon_hoc_id,
    chuan_dau_ra_mon_hoc.cdrmh_muc_do_hanh_dong_id,
    chuan_dau_ra_mon_hoc.thong_tin_chung_id,
    chuan_dau_ra_mon_hoc.del_flag
    FROM chuan_dau_ra_mon_hoc
    JOIN muc_tieu_mon_hoc ON chuan_dau_ra_mon_hoc.muc_tieu_mon_hoc_id = muc_tieu_mon_hoc.id where chuan_dau_ra_mon_hoc.del_flag = 0
    && muc_tieu_mon_hoc.del_flag = 0
    && muc_tieu_mon_hoc.idCtdt = ${data.idCtdt}
    && chuan_dau_ra_mon_hoc.thong_tin_chung_id = ${data.thong_tin_chung_id}`, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}


Model4.collectcdrmdhd = (result) => {
    sql.query("SELECT * FROM cdrmh_muc_do_hanh_dong where id != -1 ORDER by muc_do_1, muc_do_2", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

Model4.collectsubjectlist = (result) => {
    sql.query(`SELECT subject.Id, subject.SubjectCode, subject.SubjectName
     FROM subject
     JOIN thong_tin_chung ON subject.Id = thong_tin_chung.id
        where thong_tin_chung.del_flag = 0`, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

Model4.addsubject = (data, result) => {
    sql.query(`insert into subject(SubjectName, SubjectEngName, SubjectCode, Credit, TheoryPeriod, PracticePeriod, 
        ExercisePeriod, Description, DateCreated, DateEdited) values ('${data.SubjectName}', '', 
        '${data.SubjectCode}', 0, 0, 0, 0, '', '2019-03-02 00:00:00', '2019-03-02 00:00:00')`,
        (err, res) => {
            if (err) {
                console.log("error:", err);
                result(null, err)
            } else {
                let Id = res.insertId;
                sql.query(`insert into thong_tin_chung(id) values (${Id})`,
                    (err, res) => {
                        if (err) {
                            console.log("error:", err);
                            result(null, err)
                        } else {
                            result(null, res);
                        }
                    })
            }
        })
}

Model4.deletesubject = (data, result) => {
    sql.query(`update thong_tin_chung set del_flag = 1 where id = ${data.Id}`,
        (err, res) => {
            if (err) {
                console.log("error:", err);
                result(null, err)
            } else {
                result(null, res);
            }
        })
}

Model4.editsubject = (data, result) => {
    sql.query(`update subject set SubjectCode = '${data.SubjectCode_editted}', SubjectName = '${data.SubjectName}' where Id = ${data.Id}`,
        (err, res) => {
            if (err) {
                console.log("error:", err);
                result(null, err)
            } else {
                result(null, res);
            }
        })
}

// Model4.collectsubjectid = (data, result) => {
//     sql.query(`select id from thong_tin_chung where ma_so = ${data.ma_so} && ten_mon_hoc_tv = ${data.ten_mon_hoc_tv} && del_flag = 0`,
//         (err, res) => {
//             if (err) {
//                 console.log("error:", err);
//                 result(null, err)
//             } else {
//                 result(null, res);
//             }
//         })
// }

Model4.collectmtmh = (data, result) => {
    sql.query(`select id, muc_tieu from muc_tieu_mon_hoc where del_flag = 0 && thong_tin_chung_id = ${data.thong_tin_chung_id}
                && idCtdt = ${data.idCtdt}`,
        (err, res) => {
            if (err) {
                console.log("error:", err);
                result(null, err)
            } else {
                result(null, res);
            }
        })
}

Model4.collectmtmhhascdrcdio = (data, result) => {
    sql.query(`SELECT muc_tieu_mon_hoc.id, muc_tieu_mon_hoc.muc_tieu , detailoutcomestandard.KeyRow, muc_tieu_mon_hoc.thong_tin_chung_id
    FROM mtmh_has_cdrcdio
       JOIN muc_tieu_mon_hoc ON muc_tieu_mon_hoc.id = mtmh_has_cdrcdio.muc_tieu_mon_hoc_id
       JOIN chuan_dau_ra_cdio ON chuan_dau_ra_cdio.id = mtmh_has_cdrcdio .chuan_dau_ra_cdio_id
       JOIN detailoutcomestandard ON detailoutcomestandard.Id = mtmh_has_cdrcdio .chuan_dau_ra_cdio_id
    WHERE chuan_dau_ra_cdio.del_flag = 0 
    && muc_tieu_mon_hoc.idCtdt = ${data.idCtdt}
    && muc_tieu_mon_hoc.thong_tin_chung_id = ${data.thong_tin_chung_id} && muc_tieu_mon_hoc.del_flag = 0 ORDER by detailoutcomestandard.KeyRow`,
        (err, res) => {
            if (err) {
                console.log("error:", err);
                result(null, err)
            } else {
                result(null, res);
            }
        })
}

Model4.collectmucdomtmhhascdrcdio = (data, result) => {
    var arr = [];
    //console.log(data.length)
    for(let i = 0;i < data.length;i++) {
        sql.query(`SELECT 
        GROUP_CONCAT(chuan_dau_ra_mon_hoc.muc_do SEPARATOR ',') as muc_do
   FROM chuan_dau_ra_mon_hoc
   where chuan_dau_ra_mon_hoc.thong_tin_chung_id = ${data[i].thong_tin_chung_id} && chuan_dau_ra_mon_hoc.del_flag = 0 && chuan_dau_ra_mon_hoc.muc_tieu_mon_hoc_id = ${data[i].id}
   GROUP BY chuan_dau_ra_mon_hoc.muc_tieu_mon_hoc_id`,
        (err, res) => {
            if (err) {
                console.log("error:", err);
                result(null, err)
            } else {
                //console.log(res)
                //console.log(i)
                if(res.length > 0) {
                    arr.push({
                        "id": data[i].id,
                        "muc_tieu": data[i].muc_tieu,
                        "cdr": data[i].KeyRow,
                        "muc_do": res[0].muc_do,
                        "thong_tin_chung_id": data[i].thong_tin_chung_id
                    })
                }
                else {
                    arr.push({
                        "id": data[i].id,
                        "muc_tieu": data[i].muc_tieu,
                        "cdr": data[i].KeyRow,
                        "muc_do": "-",
                        "thong_tin_chung_id": data[i].thong_tin_chung_id
                    })
                }
                if(i === data.length - 1) {
                    result(null, arr)
                }
            }
        })
    }
}

Model4.addcdrmdhd = (data, result) => {
    sql.query(`insert into cdrmh_muc_do_hanh_dong(muc_do_1, muc_do_2, muc_do_3) values ('${data.muc_do_1}', ${data.muc_do_2}, '${data.muc_do_3}')`,
        (err, res) => {
            if (err) {
                console.log("error:", err);
                result(null, err)
            } else {
                result(null, res);
            }
        })
}

Model4.updatecdrmdhd = (data, result) => {
    sql.query(`update cdrmh_muc_do_hanh_dong
            set muc_do_1 = '${data.muc_do_1}',
                muc_do_2 = ${data.muc_do_2},
                muc_do_3 = '${data.muc_do_3}'
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

Model4.deletecdrmdhdfromcdr = (data, result) => {
    let idString = "(" + data.toString() + ")";
        sql.query(`update chuan_dau_ra_mon_hoc set cdrmh_muc_do_hanh_dong_id = -1 where (cdrmh_muc_do_hanh_dong_id) IN ${idString}`,
        (err, res) => {
            if (err) {
                console.log("error:", err);
                result(null, err)
            } else {
                result(null, res);
            }
        })
    
}

Model4.deletecdrmdhd = (data, result) => {
    let idString = "(" + data.toString() + ")";
        sql.query(`delete from cdrmh_muc_do_hanh_dong where (id) IN ${idString}`,
        (err, res) => {
            if (err) {
                console.log("error:", err);
                result(null, err)
            } else {
                result(null, res);
            }
        })
}

Model4.getTeacherList = (result) => {
    let date = new Date();
    let dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    sql.query(`select user.id , user.name from cdio_db.user
    where user.id in (select user_has_role.idUser from cdio_db.user_has_role
        JOIN cdio_db.role ON user_has_role.idRole = role.id
        where role.role = "TEACHER")`,
        (err, res) => {
            if (err) {
                console.log("error:", err);
                result(null, err)
            } else {
                result(null, res);
            }
        })
}

// Model4.getTeacherListReview = (data, result) => {
//     let date = new Date();
//     let dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
//     sql.query(`select user.id , user.name, teacher_review_subject.start_Date, teacher_review_subject.end_Date from cdio_db.user
//     join teacher_review_subject on user.id = teacher_review_subject.idTeacher
//     where teacher_review_subject.idTTC = ${data.thong_tin_chung_id}
//     && DATE(teacher_review_subject.end_Date) >= '${dateString}'`,
//         (err, res) => {
//             if (err) {
//                 console.log("error:", err);
//                 result(null, err)
//             } else {
//                 result(null, res);
//             }
//         })
// }

Model4.deleteTeacherReview = (data, result) => {
    let idString = "(" + data.keys.toString() + ")";
        sql.query(`delete from teacher_review_subject where (idTTC) IN ${idString} && idCtdt = ${data.idCtdt}`,
        (err, res) => {
            if (err) {
                console.log("error:", err);
                result(null, err)
            } else {
                result(null, res);
            }
        })
}

Model4.addTeacherReview = (data, result) => {
    let valuesString = "";
    let delString = "";
    for(let i = 0;i < data.idTeacher.length;i++) {
        delString += `(${data.idTeacher[i]},${data.idTTC},${data.idCtdt})`
        valuesString += `(${data.idTeacher[i]},${data.idTTC},'${data.dateRange[0]}','${data.dateRange[1]}',${data.idCtdt})`;
        if(i !== data.idTeacher.length - 1) {
            valuesString += ",";
            delString += ",";
        }

    }
    sql.query(`delete from teacher_review_subject where (idTeacher, idTTC, idCtdt) in (${delString})`,
    (err, res) => {
        if(err) {
            console.log("error:", err);
            result(null, err)
        }
        else {
            sql.query(`insert into teacher_review_subject values ${valuesString}`,
            (err1, res1) => {
                if (err1) {
                    console.log("error:", err1);
                    result(null, err1)
                } else {
                    result(null, res1);
                }
            })
        }
        
    })
        
}

Model4.getReviewList = (data, result) => {
    let date = new Date();
    let dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    sql.query(`select teacher_review_subject.idTeacher,
    teacher_review_subject.idTTC,
    teacher_review_subject.start_Date,
    teacher_review_subject.end_Date,
    subject.SubjectName,
    user.name
    from cdio_db.teacher_review_subject, cdio_db.user, cdio_db.subject
    where teacher_review_subject.idTeacher = user.id
    && teacher_review_subject.idTTC = subject.Id
    && teacher_review_subject.idCtdt = ${data.idCtdt}
    && DATE(teacher_review_subject.end_Date) >= '${dateString}'`,
        (err, res) => {
            if (err) {
                console.log("error:", err);
                result(null, err)
            } else {
                result(null, res);
            }
        })
}

Model4.getTeacherSubject = (data, result) => {
    sql.query(`select teachersubject.IdSubject from cdio_db.teachersubject
    where teachersubject.IdUser = ${data.idUser}`,
        (err, res) => {
            if (err) {
                console.log("error:", err);
                result(null, err)
            } else {
                result(null, res);
            }
        })
}

Model4.getTeacherReviewSubject = (data, result) => {
    let date = new Date();
    let dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    sql.query(`select teacher_review_subject.idTTC from cdio_db.teacher_review_subject
    where teacher_review_subject.idTeacher = ${data.idUser}
    && teacher_review_subject.idCtdt = ${data.idCtdt}
    && DATE(teacher_review_subject.start_Date) <= '${dateString}'
    && DATE(teacher_review_subject.end_Date) >= '${dateString}'`,
        (err, res) => {
            if (err) {
                console.log("error:", err);
                result(null, err)
            } else {
                result(null, res);
            }
        })
}


module.exports = Model4;
