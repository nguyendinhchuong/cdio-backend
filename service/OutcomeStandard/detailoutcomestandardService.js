const db = require('../../models/index');


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

exports.addDetailOutcomeStandard = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.detailoutcomestandard.bulkCreate(request.data, { returning: true })
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
}

exports.deleteDetailOutcomeStandard = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.detailoutcomestandard.destroy({
                    where:{
                        IdOutcomeStandard:request.IdOutcomeStandard
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
}