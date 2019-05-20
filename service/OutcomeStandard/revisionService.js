const db = require('../../models/index');

exports.getRevision = (data) => {
  return new Promise((resolve, reject) => {
    db.sequelize.authenticate()
      .then(() => {
        db.revision.findAll({
          where: {
            IdOutcomeStandard: data.IdOutcomeStandard
          }
        })
          .then(data => {
            if (data) {
              data.code = 1;
              data.message = "success";
              resolve(data);
            } else {
              data.code = -1;
              data.message = "fail";
              resolve(data);
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


//linh

exports.getRevisionInfoById = (request) => {
  return new Promise((resolve, reject) => {
    db.sequelize.authenticate()
      .then(() => {
        let sql = `SELECT re.Id, os.IdOutcomeStandard, re.NameRevision, re.DateUpdated, cdio.user.NameUser
      FROM cdio.Revision AS re, cdio.outcomestandard as os, cdio.user
      WHERE re.Id = `+ request.Id + `and re.IdUser = cdio.user.Id;`;
        console.log(request.Id);
        db.sequelize.query(sql, { type: db.Sequelize.QueryTypes.SELECT })
          .then(data => {
            console.log(data);
            resolve(data);
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


exports.getRevisionInfo = () => {
  return new Promise((resolve, reject) => {
    db.sequelize.authenticate()
      .then(() => {
        db.sequelize.query(`SELECT re.Id, os.IdOutcomeStandard, re.NameRevision, re.DateUpdated, cdio.user.NameUser
      FROM cdio.Revision AS re, cdio.outcomestandard as os, cdio.user
        WHERE re.IdUser = cdio.user.Id `, { type: db.Sequelize.QueryTypes.SELECT })
          .then(info => {
            resolve(info);
          })
          .catch(err => {
            reject(err);
          })
      })
  })
}


//


exports.addRevision = (request) => {
  return new Promise((resolve, reject) => {
    db.sequelize.authenticate()
      .then(() => {
        db.outcomestandard.findById(request.IdOutcomeStandard)
          .then(data => {
            if (data) {
              db.revision.create(request)
                .then(data => {
                  if (data) {
                    let code = 1;
                    data.code = code
                    resolve(data);
                  } else {
                    let code = 1;
                    data.code = code
                    resolve(data);
                  }
                })
                .catch(err => {
                  reject(err);
                })
            } else {
              let code = -2;
              resolve(code);
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

exports.deleteRevisionById = (request) => {
  return new Promise((resolve, reject) => {
    db.sequelize.authenticate()
      .then(() => {
        db.revision.findById(request.Id)
          .then(data => {
            if (data) {
              db.detailrevision.destroy({
                where: {
                  IdRevision: request.Id
                }
              })
                .then(effectedRows => {
                  console.log('Effected rows of Detail Revision: ' + effectedRows);
                })
                .then(() => {
                  db.revision.destroy({
                    where: {
                      Id: request.Id
                    }
                  })
                    .then(effectedRows => {
                      console.log('Effected rows of Revision: ' + effectedRows);
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
            } else {
              let code = -2;
              resolve(code);
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