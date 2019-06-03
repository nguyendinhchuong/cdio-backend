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
            .then(async () => {
                let response = [];
                const promises = request.data.map(question => {
                    let obj = {};
                    obj.IdSurvey = request.IdSurvey;
                    obj.Question = question.Question;
                    obj.AnswerField1 = question.AnswerField1;
                    obj.AnswerField2 = question.AnswerField2;
                    obj.AnswerField3 = question.AnswerField3;
                    obj.AnswerField4 = question.AnswerField4;
                    obj.AnswerField5 = question.AnswerField5;
                    obj.NumberChoose1 = 0;
                    obj.NumberChoose2 = 0;
                    obj.NumberChoose3 = 0;
                    obj.NumberChoose4 = 0;
                    obj.NumberChoose5 = 0;
                    return obj;
                })
                const results = await Promise.all(promises);
                console.log(results);
                await db.surveyquestion.bulkCreate(results, { returning: true })
                    .then(async data => {
                        let id_array = [];
                        const q_promises = data.map(row => {
                            id_array.push(row.dataValues.Id);
                        });
                        await Promise.all(q_promises);
                        response = Array.from(id_array);
                    })
                    .catch(err => {
                        reject(err);
                    })
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.getSurveyQuestion = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.surveyquestion.findAll({
                    where: {
                        IdSurvey: request.IdSurvey
                    }
                })
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

exports.doSurvey = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(async () => {
                const promises = request.data.map(answer => {
                    db.surveyquestion.findByPk(answer.Id)
                        .then(row => {
                            return row.increment({
                                'NumberChoose1': answer.NumberChoose1,
                                'NumberChoose2': answer.NumberChoose2,
                                'NumberChoose3': answer.NumberChoose3,
                                'NumberChoose4': answer.NumberChoose4,
                                'NumberChoose5': answer.NumberChoose5,
                            })
                                .then(() => {
                                    console.log("update success");
                                })
                        })
                        .catch(err => {
                            reject(err);
                        })
                });
                await Promise.all(promises);
                resolve(1);
            })
            .catch(err => {
                reject(err);
            })
    })
}
exports.getSurveyResult = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(async () => {
                let response = [];
                db.surveyquestion.findAll({
                    where: {
                        IdSurvey: request.IdSurvey
                    }
                })
                    .then(async data => {
                        const promises = data.map(question => {
                            let obj = {};
                            obj.IdQuestion = question.dataValues.Id;
                            obj.Question = question.dataValues.Question;
                            obj.AnswerField1 = question.dataValues.AnswerField1;
                            obj.AnswerField2 = question.dataValues.AnswerField2;
                            obj.AnswerField3 = question.dataValues.AnswerField3;
                            obj.AnswerField4 = question.dataValues.AnswerField4;
                            obj.AnswerField5 = question.dataValues.AnswerField5;
                            obj.NumberChoose1 = question.dataValues.NumberChoose1;
                            obj.NumberChoose2 = question.dataValues.NumberChoose2;
                            obj.NumberChoose3 = question.dataValues.NumberChoose3;
                            obj.NumberChoose4 = question.dataValues.NumberChoose4;
                            obj.NumberChoose5 = question.dataValues.NumberChoose5;
                            response.push(obj);
                        })
                        const results = await Promise.all(promises);
                        // response = Array.from(results);
                        // console.log(response);
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