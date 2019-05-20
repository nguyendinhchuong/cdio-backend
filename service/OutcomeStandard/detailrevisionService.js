const db = require('../../models/index');


exports.getDetailRevision = (data) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                // let sql = `SELECT dos.KeyRow, dos.NameRow
                // FROM cdio.detailoutcomestandard AS dos, cdio.outcomestandard as os
                // WHERE dos.IdOutcomeStandard=`+ data.IdOutcomeStandard;
                // db.sequelize.query(sql,{ type: db.Sequelize.QueryTypes.SELECT})
                db.detailrevision.findAll({
                    attributes:['KeyRow', 'NameRow'],
                    where:{
                        IdRevision:data.IdRevision
                    }
                })
                    .then(info => {
                        if (info) {
                            resolve(info);
                        } else {
                            resolve(info);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
    })

}

exports.addDetailRevision = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.detailrevision.bulkCreate(request.data, { returning: true })
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