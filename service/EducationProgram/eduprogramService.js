const db = require('../../models/index');

exports.getListOfContent = async (request) => {
    const idEduProgram = request.IdEduProgram;
    let idLevel, idProgram;
    let listProgram = [];
    let listDetailPro = [];
    let results = [];
    await getLevelAndProgramOfEduPro(idEduProgram)
        .then(data => {
            const result = data.dataValues;
            idLevel = result.IdLevel;
            idProgram = result.IdProgram;
        })
        .catch(err => {
            console.log("err getLevelAndProgramOfEduPro");
            return Promise.reject(err);
        });

    await getListEduProByLevelAndProgram(+idLevel, +idProgram)
        .then(data => {
            listProgram = data.reduce((arr, item) => {
                return arr.concat(item.dataValues);
            }, []);
        })
        .catch(err => {
            console.log("err getListEduProByLevelAndProgram");
            return Promise.reject(err);
        });

    await getListDetailEdupro(
        listProgram.map(item => {
            return item.Id;
        }))
        .then(data => {
            listDetailPro = data.reduce((arr, item)=>{
                return arr.concat(item.dataValues);
            },[]);
            // map full
            const len = listDetailPro.length;
            results = listProgram.reduce((arr, item)=>{
                for(let i = 0 ; i< len; i++){
                    if(item.Id === listDetailPro[i].IdEduProgram){
                        return arr.concat({...item, IdDetailPro: listDetailPro[i].Id});
                    }
                }
                return arr;
            },[]);
        })
        .catch(err => {
            console.log("err getListDetailEdupro");
            return Promise.reject(err);
        })
    return Promise.resolve(results);
}

exports.getEduProgram = () => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                let sql = `SELECT edu.Id, edu.EduName, edu.EduEngName, edu.SchoolYear, edu.DateCreated, edu.DateEdited, edu.IdLevel, edu.IdMajor, edu.IdProgram, level.LevelName, major.MajorCode, major.MajorName, major.MajorEngName, prog.NameProgram
                FROM cdio_db.eduprogram AS edu, cdio_db.level AS level, cdio_db.major AS major, cdio_db.program AS prog
                WHERE edu.IdLevel = level.Id AND edu.IdMajor = major.Id AND edu.IdProgram = prog.Id;
                `
                db.sequelize.query(sql, { type: db.Sequelize.QueryTypes.SELECT })
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

exports.getEduProgramById = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                let sql = `SELECT edu.Id, edu.EduName, edu.EduEngName, edu.SchoolYear, edu.DateCreated, edu.DateEdited, edu.IdLevel, edu.IdMajor, edu.IdProgram, level.LevelName, major.MajorCode, major.MajorName, major.MajorEngName, prog.NameProgram
                FROM cdio_db.eduprogram AS edu, cdio_db.level AS level, cdio_db.major AS major, cdio_db.program AS prog
                WHERE edu.IdLevel = level.Id AND edu.IdMajor = major.Id AND edu.IdProgram = prog.Id AND edu.Id = `+ request.Id + `;`;
                db.sequelize.query(sql, { type: db.Sequelize.QueryTypes.SELECT })
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

exports.addEduProgram = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.eduprogram.create(request)
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

exports.deleteEduProgram = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subjecteduprog.findAll({
                    where: {
                        IdEduProg: request.Id
                    }
                })
                    .then(data => {
                        if (data) {
                            db.subjecteduprog.destroy({
                                where: {
                                    IdEduProg: request.Id
                                }
                            })
                                .then(effectedRows => {
                                    console.log("Effected rows of SubjectEduProg: " + effectedRows);
                                })
                                .then(() => {
                                    db.detaileduprog.findOne({
                                        where: {
                                            IdEduProgram: request.Id
                                        }
                                    })
                                        .then(data => {
                                            db.edupurpose.destroy({
                                                where: {
                                                    IdDetail: data.dataValues.Id
                                                }
                                            })
                                                .then(effectedRows => {
                                                    console.log("Effected rows of EduPurpose: " + effectedRows);
                                                })
                                                .catch(err => {
                                                    reject(err);
                                                })
                                        })
                                        .catch(err => {
                                            reject(err);
                                        })
                                })
                                .then(() => {
                                    db.detaileduprog.destroy({
                                        where: {
                                            IdEduProgram: request.Id
                                        }
                                    })
                                        .then(effectedRows => {
                                            console.log("Effected rows of DetailEduProg: " + effectedRows);
                                        })
                                        .catch(err => {
                                            reject(err);
                                        })
                                })

                                .then(() => {
                                    db.eduprogram.destroy({
                                        where: {
                                            Id: request.Id
                                        }
                                    })
                                        .then(effectedRows => {
                                            console.log("Effected rows of EduProgram: " + effectedRows);
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
                            db.eduprogram.destroy({
                                where: {
                                    Id: request.Id
                                }
                            })
                                .then(effectedRows => {
                                    console.log("Effected rows of EduProgram: " + effectedRows);
                                    let code = 1;
                                    resolve(code);
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

exports.addSubjectToEduProg = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.subjecteduprog.create(request)
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

exports.updateEduProg = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                db.eduprogram.findByPk(request.Id)
                    .then(data => {
                        if (data) {
                            db.eduprogram.update({
                                EduName: request.EduName,
                                EduEngName: request.EduEngName,
                                IdLevel: request.IdLevel,
                                IdMajor: request.IdMajor,
                                IdProgram: request.IdProgram,
                                SchoolYear: request.SchoolYear,
                                DateEdited: request.DateEdited
                            },
                                {
                                    returning: true,
                                    where: {
                                        Id: request.Id
                                    }
                                })
                                .then((rowsUpdate) => {
                                    console.log("Updated row of EduProg: " + rowsUpdate);
                                    //console.log(updatedEduProg);
                                    let code = 1;
                                    resolve(code);
                                })
                                .catch(err => {
                                    reject(err);
                                })
                        } else {
                            let code = -1;
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

const getListEduProByLevelAndProgram = (idLevel, idPro) => {
    return db.eduprogram.findAll({
        where: {
            IdLevel: idLevel,
            IdProgram: idPro
        },
        attributes: ['Id', 'EduName']
    })
}

const getListDetailEdupro = idsPro => {
    return db.detaileduprog.findAll({
        where: {
            IdEduProgram: {
                $in: idsPro
            }
        },
        attributes: ['Id', 'IdEduProgram']
    })
}

const getLevelAndProgramOfEduPro = idPro => {
    return db.eduprogram.findOne({
        where: {
            Id: idPro
        },
        attributes: ['IdLevel', 'IdProgram']
    })
}