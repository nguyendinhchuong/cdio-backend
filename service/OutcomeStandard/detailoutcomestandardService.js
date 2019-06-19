const db = require('../../models/index');
const LEVEL_OUTCOME = 3;


exports.getDetailOutcomeStandard = (data) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                // let sql = `SELECT dos.KeyRow, dos.NameRow
                // FROM cdio.detailoutcomestandard AS dos, cdio.outcomestandard as os
                // WHERE dos.IdOutcomeStandard=`+ data.IdOutcomeStandard;
                // db.sequelize.query(sql,{ type: db.Sequelize.QueryTypes.SELECT})
                db.detailoutcomestandard.findAll({
                    attributes: ['KeyRow', 'NameRow'],
                    where: {
                        IdOutcomeStandard: data.IdOutcomeStandard
                    }
                })
                    .then(info => {
                        if (info) {
                            info.code = 1;
                            info.message = "success";
                            resolve(info);
                        } else {
                            info.code = -1;
                            info.message = "fail";
                            resolve(info);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
    })

}

exports.getDetailOutcomeStandardForEdupro = (IdOutcomeStandard) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.detailoutcomestandard.findAll({
                    attributes: ['KeyRow', 'NameRow'],
                    where: {
                        IdOutcomeStandard: IdOutcomeStandard
                    }
                })
                    .then(info => {
                        let arr = info.reduce((results, row) => {
                            const data = row.dataValues;
                            const countNum = data.KeyRow.split('.').filter(item => item !== "").length;
                            if (countNum <= LEVEL_OUTCOME) {
                                return results.concat(data);
                            }
                            return results;
                        }, []);
                        resolve(arr);

                    })
                    .catch(err => {
                        reject(err);
                    })
            });
    })

}

exports.addDetailOutcomeStandard = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.detailoutcomestandard.findOne({
                    IdOutcomeStandard: request.IdOutcomeStandard
                })
                    .then(data => {
                        if (!data) {
                            let general_info_array = [];
                            db.detailoutcomestandard.bulkCreate(request.data, { returning: true })
                                .then(async data => {

                                    let promises = data.map(row => {
                                        let obj = {};
                                        obj.id = row.dataValues.Id;
                                        obj.del_flag = 0;
                                        general_info_array.push(obj);
                                    });
                                    await Promise.all(promises);
                                })
                                .then(() => {
                                    db.chuan_dau_ra_cdio.bulkCreate(general_info_array, { returning: true })
                                        .then(() => {
                                            let code = 1;
                                            let response = {};
                                            response.code = code;
                                            response.data = general_info_array;
                                            resolve(response);
                                        })
                                        .catch(err => {
                                            reject(err);
                                        })
                                })
                                .catch(err => {
                                    reject(err);
                                })
                        } else {
                            db.detailoutcomestandard.findAll({
                                where: {
                                    IdOutcomeStandard: request.IdOutcomeStandard
                                }
                            })

                                .then(async data => {
                                    let id_detail = [];
                                    const promises = data.map(detail => {
                                        id_detail.push(detail.dataValues.Id);
                                    });
                                    await Promise.all(promises);
                                    await db.chuan_dau_ra_cdio.update({
                                        del_flag: 1
                                    }, {
                                            where: {
                                                id: id_detail
                                            }
                                        })
                                        .then(effectedRows => {
                                            console.log("Effected rows of chuandaura: ", effectedRows);
                                        })
                                        .catch(err => {
                                            reject(err);
                                        })
                                })
                                .then(() => {
                                    db.detailoutcomestandard.destroy({
                                        where: {
                                            IdOutcomeStandard: request.IdOutcomeStandard
                                        }
                                    })
                                        .then(effectedRows => {
                                            console.log("Effected rows of detail outcome: ", effectedRows);
                                        })
                                        .catch(err => {
                                            reject(err);
                                        })
                                })
                                .then(() => {
                                    let general_info_array = [];
                                    db.detailoutcomestandard.bulkCreate(request.data, { returning: true })
                                        .then(async data => {

                                            let promises = data.map(row => {
                                                let obj = {};
                                                obj.id = row.dataValues.Id;
                                                obj.del_flag = 0;
                                                general_info_array.push(obj);
                                            });
                                            await Promise.all(promises);
                                        })
                                        .then(() => {
                                            db.chuan_dau_ra_cdio.bulkCreate(general_info_array, { returning: true })
                                                .then(() => {
                                                    let code = 1;
                                                    let response = {};
                                                    response.code = code;
                                                    response.data = general_info_array;
                                                    resolve(response);
                                                })
                                                .catch(err => {
                                                    reject(err);
                                                })
                                        })
                                        .catch(err => {
                                            reject(err);
                                        })
                                })
                                .catch(err => {
                                    reject(err);
                                })

                        }
                    })

            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.deleteDetailOutcomeStandard = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.outcomestandard.findOne({
                    where: {
                        Id: request.IdOutcomeStandard
                    }
                })
                    .then(data => {
                        if (!data) {
                            let code = -1;
                            resolve(code);
                        } else {
                            console.log(data.dataValues.Id);
                            let updated_detail_array = [];
                            db.detailoutcomestandard.findAll({
                                where: {
                                    IdOutcomeStandard: data.dataValues.Id
                                }
                            })
                                .then(async data => {
                                    const promises = data.map(row => {
                                        updated_detail_array.push(row.dataValues.Id);
                                    });
                                    await Promise.all(promises);
                                    db.chuan_dau_ra_cdio.update({
                                        del_flag: 1
                                    }, {
                                            where: {
                                                id: updated_detail_array
                                            }
                                        })
                                        .then(effectedRows => {
                                            console.log("Effected rows of chuan_dau_ra_cdio: ", effectedRows);
                                            db.detailoutcomestandard.destroy({
                                                where: {
                                                    IdOutcomeStandard: request.IdOutcomeStandard
                                                }
                                            })
                                                .then(() => {
                                                    let code = 1;
                                                    resolve(code);
                                                })
                                                .catch(err => {
                                                    reject(err);
                                                })
                                        })
                                        .catch(err => {
                                            reject(err);
                                        })
                                })
                                .catch(err => {
                                    reject(err);
                                })
                        }
                    })
                    .catch(err => {
                        reject(err);
                    })

            })
            .catch(err => {
                reject(err);
            })
    })
}