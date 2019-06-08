var sql = require('../db');

var ModelSurvey = () => { }

class Survey {
    constructor(id_mon, mon, itu) {
        this.id_mon = id_mon;
        this.mon = mon;
        this.itu = itu;
    }
}

class Data {
    constructor(cdr, id) {
        this.cdr = cdr;
        this.id = id;
    }
}

class itu {
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }
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

ModelSurvey.addData = (data, id_survey, result) => {
    try {
        data.forEach(element => {
            let resultValue = '';

            element.value.forEach(value => {
                resultValue += value + ',';
            });

            query(`INSERT INTO survey_itu  (bullet, value, mo_ta, id_survey)  VALUES
            ('${element.key}', '${resultValue}','${element.description}',${id_survey})`)
                .then(res => {
                    console.log(res);
                })
        });

    } catch (e) {
        console.log(e);
    }
}

ModelSurvey.collectData = (result) => {
    try {
        let data = [];
        query(`SELECT KeyRow,NameRow FROM detailoutcomestandard where idOutcomeStandard = 23 `)
            .then(res => {
                res.forEach(element => {
                    const obj = {
                        keyRow: element.KeyRow,
                        nameRow: element.NameRow
                    }
                    data.push(obj);
                });
                result(data);
            });
    } catch (e) {
        console.log(e);
    } finally {
        //close();
    }
}

function handleValueITU(listSurvey) {
    let myMap = new Map();

    listSurvey.forEach(record => {
        const level3 = getLevel3(record.bullet);
        const value = getValueITU(record.value);
        const id_qa = record.id_survey;
        const data = convertData(value, id_qa);

        if (myMap.has(level3)) { // same key , update value 
            let oldData = myMap.get(level3);
            let newData = appendData(oldData, data);

            myMap.set(level3, newData)
        } else {
            myMap.set(level3, data);
        }
    });

    let data = [];

    myMap.forEach((value, key) => {
        let temp = new Data(
            value.cdr,
            value.id
        );

        if (temp.cdr == '' && temp.id == '') {
            temp.cdr = '-';
            temp.id = '-';
        }

        data.push(new itu(key, temp));
    });
    return data;
}

ModelSurvey.getDataMatixSurvey = (idSurveyList, resp) => {
    const TABLE_SURVEY = "survey2";
    
    //version 2
    try {
        query(` SELECT COUNT(*) as SL 
                FROM ${TABLE_SURVEY} 
                WHERE idSurveyList = ${idSurveyList}`
        ).then(count => {
            
            query(` SELECT id,id_mon,id_giaovien 
                FROM ${TABLE_SURVEY} 
                WHERE idSurveyList = ${idSurveyList}`
            ).then(result => {
                let survey = [];

                result.forEach(record => {
                    const id_mon = record.id_mon;
                    const id_survey = record.id;

                    query(` SELECT * 
                        FROM survey_itu
                        WHERE id_survey = ${id_survey}`
                    ).then(listSurvey => {
                        // return list suitable ITU Survey
                        let data = handleValueITU(listSurvey);
                        query(` SELECT SubjectName 
                            FROM subject 
                            WHERE Id = ${id_mon}`
                        ).then(resultSubjectName => {
                            const object = new Survey(
                                id_mon,
                                resultSubjectName[0].SubjectName,
                                data
                            );
                            survey.push(object);
                            
                        })
                        .then(() => {
                            if (count[0].SL === survey.length) {
                                
                                resp(survey);
                            }
                        });
                    })
                })
            })
        });
    } catch (e) {
        console.log(e);
    }

    // version 1 
    // try {
    //     query("SELECT COUNT(*) as SL FROM subject ")
    //         .then(count => {
    //             query(`SELECT subject.Id, subject.SubjectCode, subject.SubjectName
    //                         FROM subject
    //                         JOIN thong_tin_chung ON subject.Id = thong_tin_chung.id
    //                         WHERE thong_tin_chung.del_flag = 0`)
    //                 .then(res => {
    //                     let survey = [];

    //                     res.forEach(subject => {
    //                         let id = subject.Id;
    //                         let subjectName = subject.SubjectName;

    //                         query(`SELECT survey.id, survey.value, survey.id_qa 
    //                                 FROM survey 
    //                                 WHERE '${id}' = id_mon`)
    //                             .then(res1 => {

    //                                 let myMap = new Map();

    //                                 res1.forEach(record => {
    //                                     const level3 = getLevel3(record.id);
    //                                     const value = getValueITU(record.value);
    //                                     const id_qa = record.id_qa;

    //                                     const data = convertData(value, id_qa);

    //                                     if (myMap.has(level3)) { // same key , update value 
    //                                         let oldData = myMap.get(level3);
    //                                         let newData = appendData(oldData, data);

    //                                         myMap.set(level3, newData)
    //                                     } else {
    //                                         myMap.set(level3, data);
    //                                     }

    //                                 });

    //                                 let data = [];

    //                                 myMap.forEach((value, key) => {
    //                                     let temp = new Data(
    //                                         value.cdr,
    //                                         value.id
    //                                     );

    //                                     if (temp.cdr == '' && temp.id == '') {
    //                                         temp.cdr = '-';
    //                                         temp.id = '-';
    //                                     }

    //                                     data.push(new itu(key, temp));
    //                                 });

    //                                 const object = new Survey(
    //                                     id,
    //                                     subjectName,
    //                                     'Nam',
    //                                     data
    //                                 );

    //                                 survey.push(object);
    //                             })
    //                             .then(() => {
    //                                 if (count[0].SL === survey.length) {
    //                                     console.log(survey);
    //                                     //result(survey);
    //                                 }
    //                             });
    //                     });

    //                 });
    //         });
    // } catch (e) {
    //     console.log(e);
    // }
}

getLevel3 = (id) => {
    return id.substring(0, 5);
}

getValueITU = (value) => {
    const newValue = value.split(',').filter(value => value !== '');
    return newValue;
}

convertData = (value, id_qa) => {
    let newValue = '';
    let newID = '';

    value.forEach(element => {
        newValue += element + '*';
        newID += id_qa + '*';
    });

    return new Data(newValue, newID);
}

appendData = (oldData, fildata) => {
    let newValue = oldData.cdr + fildata.cdr;
    let newID = oldData.id + fildata.id;

    return new Data(newValue, newID);

}

ModelSurvey.getITU = (obj, result) => {
    sql.query(`SELECT * FROM survey where id_ctdt =0 and id_mon =0 and id_giaovien =0`, (err, res) => {
        if (err) {
            console.log("err: ", err);
            return result(null);
        }
        else {
            return result(res);

        }
    });
}

ModelSurvey.getQA = (id, result) => {    
    sql.query(`SELECT * from survey_qa where id_survey = ${id}`, (err, res) => {
        if (err) {
            console.log("err: ", err);
            return result(err);
        } else        
            console.log("qa",res);
            
            return result(res);
    })
}

ModelSurvey.getSurveyITU = (id, result) => {
    sql.query(`SELECT * from survey_itu where id_survey = ${id.id_survey}`, (err, res) => {
        if (err) {
            console.log("err: ", err);
            return result(err);
        } else
            console.log('itu:', res)
        return result(res);
    })
}

ModelSurvey.getITUwithQA = (id, result) => {
    sql.query(`SELECT * FROM survey_itu where id_survey=${id}`, (err, res) => {
        if (err) {
            console.log("err: ", err);
            return result(err);
        } else {
            return result(res);
        }

    })
}

ModelSurvey.getTeacherWithSubject = (id, result) => {
    sql.query(`SELECT IdUser FROM teachersubject where IdSubject=${id.id}`, (err, res) => {
        if (err) {
            console.log("err:", err);
            return result(err);
        } else {
            return result(res);
        }
    })
}


ModelSurvey.addSurveyData = (data, result) => {
    let listIdUser = data.id_giaovien;
    console.log(data)
    listIdUser.forEach(item => {
        sql.query(`insert into survey2(id_mon,id_giaovien,idSurveyList,status) values ('${data.id_mon}','${item}','${data.idSurveyList}','${data.status}')`,    (err, res) => {
        if (err) {
            console.log("Error add data in model survey : ", err);
            result(err)
        }
    })
    })

    result("1");
}

ModelSurvey.getDataSurvey = (result) => {
    sql.query(`select * from survey2`, (err, res) => {
        if (err) {
            console.log("Error get data from survey2 : ", err);
            result(err)
        } else {
            result(res);
        }
    })
}

ModelSurvey.getDataSurvey1 = (data,result) => {
    console.log(data)
    sql.query(`select * from survey2 where idSurveyList=${data.data}`,(err,res)=>{
        if(err){
            console.log("Error get data from survey2 : ",err);
            result(err);
        } else {
            result(res);
        }
    })
}


ModelSurvey.addData2 = (data, id_survey, result) => {
    try {
        // const id_ctdt = 0;
        // const id_giaovien = 0;

        data.forEach(element => {
            let resultValue = '';

            element.value.forEach(value => {
                resultValue += value + ',';
            });

            query(`INSERT INTO survey2  (id, value, mo_ta, id_survey)  VALUES
            ('${element.key}', '${resultValue}','${element.description}','${id_survey}')`)
                .then(res => {
                    console.log(res);
                })
        });

    } catch (e) {
        console.log(e);
    }
}

ModelSurvey.setStatus = (id, result) => {
    console.log(id)
    sql.query(`Update survey2 set status = 0 where id = ${id}`, (err, res) => {
        if (err) {
            console.log("err: ", err);
            return result(err);
        } else {
            if (res) {
                return result(res);
            }
            return result("done")
        }

    })
}

ModelSurvey.checkStatus = (id, result) => {
    sql.query(`SELECT idSurveyList, status FROM survey2 where id = ${id}`, (err, res) => {
        if (err) {
            console.log("err: ", err);
            return result(err);
        } else {
            if (res) {
                return result(res);
            }
            return result("done")
        }

    })
}

ModelSurvey.checkDate = (id, result) => {
    sql.query(`SELECT start_date, end_date FROM surveyList where id = ${id}`, (err, res) => {
        if (err) {
            console.log("err: ", err);
            return result(err);
        } else {
            if (res) {
                return result(res);
            }
            return result("done")
        }

    })
}

ModelSurvey.getIDQA = (id, result) => {
    if (id !== 'undefined') {
        sql.query(`SELECT id FROM survey_qa where id_survey = ${id}`, (err, res) => {
            if (err) {
                console.log("err: ", err);
                return result(err);
            } else {
                if (res) {
                    return result(res);
                }
                return result("done")
            }

        })
    }
}

ModelSurvey.getSurveyWithCTDTandTime = (data, result) => {
    sql.query(`SELECT id from surveyList where id_ctdt=${data.id_ctdt} and ((start_date <= ${data.start_date} and end_date >= ${data.start_date}) or (start_date <= ${data.end_date} and end_date >= ${data.end_date})
    or (start_date >= ${data.start_date} and end_date <= ${data.end_date}))`, (err, res) => {
            if (err) {
                console.log("err: ", err);
                return result(err);

            } else {
                return result(res);
            }
        })
    }

ModelSurvey.getSurveyWithCTDTandTime2 = (data,result) => {
    sql.query(`SELECT id from surveyList where id_ctdt=${data.id_ctdt} and start_date=${data.start_date} and end_date=${data.end_date}`,(err,res)=>{
        if(err){
            console.log("err: ", err);
            return result(err);
        } else {
            return result(res);
        }
    })
}

ModelSurvey.addSurveyList = (data,result) => {
    sql.query(`insert into surveyList(id_ctdt,status,start_date,end_date) values (${data.id_ctdt},${data.status},${data.start_date},${data.end_date})`,(err,res)=>{
        if(err){
            console.log("err: " , err);
            return result(err);
        } else {
            return result(res);
        }
    })
}

ModelSurvey.getSurveyList = (result) => {
    sql.query(`select * from surveyList`, (err, res) => {
        if (err) {
            console.log("err: ", err);
            return result(err);
        } else {
            return result(res);
        }
    })
}

ModelSurvey.getSurveyWithIdSurveyList = (id, result) => {
    sql.query(`select * from survey2 where idSurveyList = ${id}`, (err, res) => {
        if (err) {
            console.log("err: ", err);
            return result(err);
        } else {
            return result(res);
        }
    })
}

ModelSurvey.getSubjectWithId = (listId,result) => {
    sql.query(`select * from subject where Id in (${listId})`,(err,res) => {
        if(err){
            console.log("err: " , err);
            return result(err);
        }else{
            return result(res);
        }
    })
}

ModelSurvey.getlistSurvey = (id_ctdt,id_user,result) => {
    sql.query(`select * from surveyList where id_ctdt = ${id_ctdt}`,(err,res) => {
        if(res!= null && res.length >0){
            let listIdSurveyList = [];
            let listSurveyList = res;
            listSurveyList.forEach(item => {
                listIdSurveyList.push(item.id);
            })

            sql.query(`select * from survey2 where idSurveyList in (${listIdSurveyList}) and id_giaovien = ${id_user} and status = 1`,(err,res)=>{
                    if(res != null && res.length >0 ){
                        let listSurvey = res;
                        sql.query(`select * from subject`,(err,res ) => {
                            let subjectList = res;
                            listSurveyList.forEach(item => {
                                let obj = [];
                                listSurvey.forEach(element => {
                                    if(item.id === element.idSurveyList){
                                        element.nameSubject = subjectList.filter(data=>data.Id === element.id_mon)[0].SubjectName;
                                        obj.push(element)
                                    }
                                })
                               
                                let data = {
                                    "survey-list" : item,
                                    "survey" : obj,
                                }
                                result(data)
        
                            })
                        })
                    }
                    
                   
                })
           
        }
    })
}

module.exports = ModelSurvey;