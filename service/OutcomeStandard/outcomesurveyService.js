const db = require('../../models/index');

exports.getSurvey = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.outcomesurvey.findAll({
                    where: {
                        IdOutcome: request.IdOutcome
                    }
                })
                    .then(async data => {
                        let response = [];

                        const promises = data.map(async survey => {
                            let obj = {};
                            obj.IdSurvey = survey.dataValues.Id;
                            obj.Name = survey.dataValues.Name;
                            obj.CreatedDate = survey.dataValues.CreatedDate;
                            await db.outcomestandard.findByPk(survey.dataValues.IdOutcome)
                                .then(dataOutcome => {
                                    obj.OutcomeName = dataOutcome.dataValues.NameOutcomeStandard;
                                })
                                .catch(err => {
                                    reject(err);
                                })
                            await db.user.findByPk(survey.dataValues.IdUser)
                                .then(dataUser => {
                                    obj.UserName = dataUser.dataValues.name;
                                })
                                .catch(err => {
                                    reject(err);
                                })
                            response.push(obj);
                        })
                        await Promise.all(promises);
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
}

exports.addNewSurvey = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.outcomesurvey.create(request)
                    .then(data => {
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
exports.addSurveyQuestion = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                
            })
            .catch(err => {
                reject(err);
            })
    })
}