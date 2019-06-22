const db = require('../../models/index');

const subjectService = require('./subjectService');
const userService = require('../User/userService');

const keyKnowledge = "7.2";

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
                        IdEduProgram: request.IdDetailEduProg,
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
        const subjectUsers = [];

        await getContents(request.IdEduProg).then(contents => {
            contents.map(content => {
                idEduContents.push({
                    Id: content.dataValues.Id,
                    Type: content.dataValues.Type
                });
            });
        }).catch(err => {
            console.log('ERR contents');
            return Promise.reject(err);
        })
        await getSubjectBlocks(idEduContents).then(blocks => {
            blocks.map(block => {
                listIdBlock.push(block.dataValues.Id);
            })
        }).catch(err => {
            console.log('ERR subject Block');
            return Promise.reject(err);
        })
        await getDetailBlocks(listIdBlock).then(detailsOfBlock => {
            detailsOfBlock.map(detail => {
                const data = detail.dataValues;
                detailBlocks.push(data.Id);
                const obj = {
                    IdSubject: data.IdSubject,
                    IdUser: data.IdUser,
                    IdMainTeacher: data.IdMainTeacher
                };
                subjectUsers.push(obj);
            })
        }).catch(err => {
            console.log('ERR Detail Block');
            return Promise.reject(err);
        })
        await deleteContentsAndRelationship(idEduContents, listIdBlock, detailBlocks);
        // insert
        await insertContentsAndRelationship(request.data, request.IdEduProg, subjectUsers);
        return Promise.resolve("OK");
    } catch (err) {
        return Promise.reject(err);
    }
}

exports.getBlocksSubjects = request => {

    return new Promise(async (res, rej) => {
        let listSubjects = [];
        await subjectService.getSubjectList().then(subjects => {
            listSubjects = subjects.reduce((arr, subject) => {
                return arr.concat(subject.dataValues);
            }, []);
        }).catch(err => {
            return Promise.reject(err);
        })
        await this.getEduContentByEduId(request).then(data => {
            const results = {
                eduContents: data.eduContents.map(item => item.dataValues),
                subjectBlocks: data.subjectBlocks.map(item => item.dataValues),
                detailBlocks: data.detailBlocks.map(item => item.dataValues)
            };
            const convert = convertDbToBlocksSubjects(results, listSubjects);
            res(convert);
        }).catch(err => {
            return Promise.reject(err);
        })
    })
}

exports.getRowsContainTable = async request => {

    let listSubject = [];
    let convert;
    await subjectService.getSubjectList().then(subjects => {
        listSubject = subjects.reduce((arr, subject) => {
            return arr.concat(subject.dataValues);
        }, []);
    }).catch(err => {
        return Promise.reject(err);
    })
    
    await this.getEduContentByEduId(request).then(data => {
        const results = {
            eduContents: data.eduContents.map(item => item.dataValues),
            subjectBlocks: data.subjectBlocks.map(item => item.dataValues),
            detailBlocks: data.detailBlocks.map(item => item.dataValues)
        };

        convert = convertDbToRowContainTable(results, listSubject);
    }).catch(err => {
        return Promise.reject(err);
    })
    return Promise.resolve(convert);
}

const insertContentsAndRelationship = (data, IdEduProgram, subjectUsers) => {
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
                        insertSubjectBlocks(subjects, content.Id).then(block => {
                            subjects.map(subject => {
                                insertDetailBlock(subject, block.Id, subjectUsers);
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
        const isFreeStudy = row.data.credit;
        const contentProg = {};
        contentProg.KeyRow = row.key;
        contentProg.NameRow = "";
        contentProg.Type = 1;
        contentProg.IdEduProgram = IdEduProgram;
        contentProg.DateCreated = null;
        contentProg.Credit = 0;
        contentProg.Description = "";
        if (!isTable) {
            contentProg.NameRow = row.data.name;
            contentProg.Type = 0;
        }
        if (isFreeStudy) {
            contentProg.Credit = +isFreeStudy;
            contentProg.Description = row.data.description;
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

const insertDetailBlock = (subject, idBlock, subjectUsers) => {
    console.log('-- insert detail block ' + idBlock);
    try {
        const detailBlock = {};
        const subjectMap = subjectUsers.find(item => item.IdSubject === subject.Id);
        
        detailBlock.IdSubjectBlock = idBlock;
        detailBlock.IdSubject = subject.Id;
        detailBlock.DateCreated = subject.DateCreated;
        detailBlock.IdUser = subjectMap ? subjectMap.IdUser : null;
        detailBlock.IdMainTeacher = subjectMap ? subjectMap.IdMainTeacher : null;
        
        return db.detailblock.create(detailBlock)
    } catch (err) {
        console.log('err insert detail block');
        console.log(err);
        
        return err;
    }

}

const getContents = (IdEduProgram) => {
    console.log('eduprogcontent');

    return db.eduprogcontent.findAll({
        where: {
            IdEduProgram: IdEduProgram,
        },
        attributes: ['Id', 'Type', 'NameRow']
    });
}

const getSubjectBlocks = (idEduContents) => {
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
        attributes: ['Id', 'NameBlock']
    });
}

const getDetailBlocks = (listIdBlock) => {
    console.log('DetailBlock');

    return db.detailblock.findAll({
        where: {
            IdSubjectBlock: {
                $in: listIdBlock
            }
        },
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

const convertDbToBlocksSubjects = (dataDb, subjects) => {
    const contentPro = [...dataDb.eduContents];
    const blocks = [...dataDb.subjectBlocks];
    const detailBlocks = [...dataDb.detailBlocks];
    const listSubjectFull = mapSubjectWithDetailBlock(detailBlocks, subjects);

    //subjects into block
    const blocksSubjects = blocks.reduce((arr, block) => {
        const blocksSubjects = addSubjectsIntoBlock(block, listSubjectFull);
        return arr.concat(blocksSubjects);
    }, []);
    let keyFreeStudy = "abc";
    const contentsBlocks = contentPro.reduce((arr, content) => {
        if (content.Credit) {
            keyFreeStudy = content.KeyRow;
        }
        if (checkIsChild(content.KeyRow, keyFreeStudy)) {
            return arr;
        }
        else if (content.Type) {
            const contents = addBlocksIntoTableName(content, blocksSubjects);
            return arr.concat(contents);
        }
        return arr;
    }, []);
    // block into rowName
    return contentsBlocks;
};

const checkIsChild = (key, keyParent) => {
    return key.includes(keyParent);
}

const convertDbToRowContainTable = (dataDb, subjects) => {
    const contentPro = [...dataDb.eduContents];
    const blocks = [...dataDb.subjectBlocks];
    const detailBlocks = [...dataDb.detailBlocks];
    const listSubjectFull = mapSubjectWithDetailBlock(detailBlocks, subjects);
    //subjects into block
    const blocksSubjects = blocks.reduce((arr, block) => {
        const blocksSubjects = addSubjectsIntoBlock(block, listSubjectFull);
        return arr.concat(blocksSubjects);
    }, []);
    let keyFreeStudy = "abc";
    const contentsBlocks = contentPro.reduce((arr, content) => {
        if (content.Credit) {
            keyFreeStudy = content.KeyRow;
        }
        if (checkIsChild(content.KeyRow, keyFreeStudy)) {
            return arr;
        }
        else if (content.Type) {
            const contents = addBlocksIntoTableName(content, blocksSubjects);
            let row = findRowParentOfTable(contentPro, content);
            row = { ...row, children: [] };
            row.children.push(contents);
            if (!checkRowIsProfessionalKnowledge(row.KeyRow, keyKnowledge)) {
                return arr;
            }
            return arr.concat(row);
        }
        return arr;
    }, []);
    // block into rowName
    return contentsBlocks;
};

const checkRowIsProfessionalKnowledge = (key, keyProfessional) => {
    const len1 = key.length;
    const len2 = keyProfessional.length;
    return (key.includes(keyProfessional) && len1 > len2);
}

const mapSubjectWithDetailBlock = (detailBlocks, subjects) => {
    return detailBlocks.reduce((arr, detail) => {
        const subject = subjects.find(subject => subject.Id === detail.IdSubject);
        const fullSub = { ...detail, ...subject };
        return arr.concat(fullSub);
    }, []);
};

const addSubjectsIntoBlock = (block, subjectsFull) => {
    let blockSubjects = { ...block };
    blockSubjects.subjects = subjectsFull.reduce((arr, subject) => {
        if (subject.IdSubjectBlock === block.Id) {
            return arr.concat(subject);
        }
        return arr;
    }, []);

    return blockSubjects;
};

const addBlocksIntoTableName = (content, blocks) => {
    const contentResults = { ...content };
    contentResults.block = blocks.reduce((arr, block) => {
        if (block.KeyRow === content.KeyRow) {
            return arr.concat(block);
        }
        return arr;
    }, []);
    return contentResults;
}

const findRowParentOfTable = (rows, rowChild) => {
    const keyChild = rowChild.KeyRow;
    const parentKey = keyChild.slice(0, keyChild.lastIndexOf('.'));
    const length = rows.length;
    for (let i = 0; i < length; i++) {
        if (rows[i].KeyRow === parentKey) {
            return rows[i];
        }
    }
    return null;
}

const deleteContentsAndRelationship = async (idEduContents, listIdBlock, detailBlocks) => {
    console.log("delete detail Block");

    await db.detailblock.destroy({
        where: {
            Id: {
                $in: detailBlocks
            }
        }
    })
    console.log("delete subjectBlock");
    await db.subjectblock.destroy({
        where: {
            Id: {
                $in: listIdBlock
            }
        }
    });
    console.log("delete content");
    await db.eduprogcontent.destroy({
        where: {
            Id: {
                $in: idEduContents.map(item => {
                    return item.Id
                })
            }
        }
    })
}
