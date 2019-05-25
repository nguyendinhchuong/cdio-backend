const db = require('../../models/index');

exports.getEduContentByEduId = (request) => {
    return new Promise((resolve, reject) => {
        db.sequelize.authenticate()
            .then(() => {
                const eduContents = [];
                const subjectBlocks = [];
                const detailBlocks = [];
                console.log("-- select contents");

                db.eduprogcontent.findAll({
                    where: {
                        IdEduProgram: request.IdEduProg,
                    },
                }).then(contents => {
                    contents.map(content => {
                        eduContents.push(content);
                    });
                    console.log("-- select subjectBlock");
                    db.subjectblock.findAll({
                        where: {
                            IdEduProgContent: {
                                $in: eduContents.reduce((idTables, item) => {
                                    if (item.Type) {
                                        return idTables.concat(item.Id);
                                    }
                                    return idTables;
                                }, [])
                            }
                        },
                    }).then(blocks => {
                        blocks.map(block => {
                            subjectBlocks.push(block);
                        })
                        console.log("-- select detailBlock");
                        db.detailblock.findAll({
                            where: {
                                IdSubjectBlock: {
                                    $in: subjectBlocks.map(block => {
                                        return block.Id
                                    })
                                }
                            },
                        }).then(detailsOfBlock => {
                            detailsOfBlock.map(detail => {
                                detailBlocks.push(detail)
                            })
                            resolve({
                                eduContents: eduContents,
                                subjectBlocks: subjectBlocks,
                                detailBlocks: detailBlocks
                            });
                        })
                    })
                }).catch(err => {
                    reject(err);
                })
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.addEduContent = async (request) => {
    try {
        const idEduContents = [];
        const listIdBlock = [];
        const detailBlocks = [];
        console.log("delete");

        await deleteContents(request.IdEduProg).then(contents => {
            contents.map(content => {
                idEduContents.push({
                    Id: content.dataValues.Id,
                    Type: content.dataValues.Type
                });
            });
            if (idEduContents.length) {
                console.log('---Destroy-- educontent');
                db.eduprogcontent.destroy({
                    where: {
                        Id: {
                            $in: idEduContents.map(item => {
                                return item.Id
                            })
                        }
                    }
                })
            }
        }).catch(err => {
            console.log('ERR contents');

            return err;
        })
        if (idEduContents.length) {
            await deleteSubjectBlocks(idEduContents).then(blocks => {
                blocks.map(block => {
                    listIdBlock.push(block.dataValues.Id);
                })
                if (listIdBlock.length) {
                    console.log('---Destroy-- subjectBlock');
                    db.subjectblock.destroy({
                        where: {
                            Id: {
                                $in: listIdBlock
                            }
                        }
                    })
                }
            }).catch(err => {
                console.log('ERR subject Block');
                return Promise.reject(err);
            })
        }
        if (listIdBlock.length) {
            await deleteDetailBlocks(listIdBlock).then(detailsOfBlock => {
                detailsOfBlock.map(detail => {
                    detailBlocks.push(detail.dataValues.Id)
                })
                if (detailBlocks.length) {
                    console.log('---Destroy-- detail Block');
                    db.detailblock.destroy({
                        where: {
                            Id: {
                                $in: detailBlocks
                            }
                        }
                    })
                }
            }).catch(err => {
                console.log('ERR Detail Block');
                return Promise.reject(err);
            })
        }
        // insert
        await insertContentsAndRelationship(request.data, request.IdEduProg);
        return Promise.resolve("OK");
    } catch (err) {
        return Promise.reject(err);
    }
}

const insertContentsAndRelationship = (data, IdEduProgram) => {
    try {
        data.map((row, index) => {
            const isTable = row.data.isTable;
            console.log('--insert content', index);

            insertContents(row, IdEduProgram).then(content => {
                if (isTable) {
                    const blocks = groupBy(row.data.subjects, item => {
                        return item.nameBlock;
                    });
                    blocks.map(subjects => {
                        insertSubjectBlocks(subjects, content.Id).then(block =>{
                            subjects.map(subject => {
                                console.log('-- insert detal block ' + block.Id);
                                insertDetailBlock(subject, block.Id);
                            })
                            
                        })
                    })
                }
            }).catch(err => {
                return err;
            })
        })
    } catch (err) {
        return err;
    }
}

const insertContents = (row, IdEduProgram) => {
    try {
        const isTable = row.data.isTable;
        const contentProg = {};
        contentProg.KeyRow = row.key;
        contentProg.NameRow = "";
        contentProg.Type = 1;
        contentProg.IdEduProgram = IdEduProgram;
        contentProg.DateCreated = null;
        if (!isTable) {
            contentProg.NameRow = row.data.name;
            contentProg.Type = 0;
        }
        return db.eduprogcontent.create(contentProg);
    } catch (err) {
        return err;
    }
}

const insertSubjectBlocks = (blocks, idContent) => {
    try {
        console.log('--insert subject block' + idContent);
        const subjectBlock = {};
        const block = blocks[0];
        
        subjectBlock.IdEduProgContent = idContent;
        subjectBlock.Credit = block.nameBlock.startsWith("TC") ? block.optionCredit : 0;
        subjectBlock.isOptional = block.nameBlock.startsWith("BB") ? true : false;
        subjectBlock.isAccumulated = block.isAccumulation;
        subjectBlock.DateCreated = block.DateCreated;
        subjectBlock.KeyRow = block.parentKey;
        subjectBlock.NameBlock = block.nameBlock;
        return db.subjectblock.create(subjectBlock);
    } catch (err) {
        return err;
    }
}

const insertDetailBlock = (subject, idBlock) => {
    try {
            const detailBlock = {};
            detailBlock.IdSubjectBlock = idBlock;
            detailBlock.IdSubject = subject.Id;
            detailBlock.DateCreated = subject.DateCreated;
            return db.detailblock.create(detailBlock)
    } catch (err) {
        return err;
    }

}

const deleteContents = (IdEduProgram) => {
    console.log('eduprogcontent');

    return db.eduprogcontent.findAll({
        where: {
            IdEduProgram: IdEduProgram,
        },
        attributes: ['Id', 'Type']
    });
}

const deleteSubjectBlocks = (idEduContents) => {
    console.log('subjectBlock');

    return db.subjectblock.findAll({
        where: {
            IdEduProgContent: {
                $in: idEduContents.reduce((idTables, item) => {
                    if (item.Type) {
                        return idTables.concat(item.Id);
                    }
                    return idTables;
                }, [])
            }
        },
        attributes: ['Id']
    });
}

const deleteDetailBlocks = (listIdBlock) => {
    console.log('DetailBlock');

    return db.detailblock.findAll({
        where: {
            IdSubjectBlock: {
                $in: listIdBlock
            }
        },
        attributes: ['Id']
    });
}



const groupBy = (array, f) => {
    let groups = {};
    array.forEach(subject => {
        let group = JSON.stringify(f(subject));
        groups[group] = groups[group] || [];
        groups[group].push(subject);
    });
    return Object.keys(groups).map(group => {
        return groups[group];
    });
};