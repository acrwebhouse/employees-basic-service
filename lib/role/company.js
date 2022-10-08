const mongoDB = require('../db/mongoDB');
const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const path = require('path');
const collectionName = config.mongoDBCollection.companyCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 
const companyDoc = {
    name: '',
    unifiedBusinessNo: '',
    phone: '',
    mail: '',
    address: '',
    owner: '',
    accountLimit: 20,
    houseLimit: 1000,
    state: 0 ,
    // createTime:
    // updateTime:
}

function newCompanyDoc(){
    const doc = JSON.parse(JSON.stringify(companyDoc))
    const date = new Date();
    doc.createTime = date;
    doc.updateTime = date;
    return doc;
}

function addCompany(name,unifiedBusinessNo,phone,mail,address,owner,accountLimit,houseLimit,state,callback) {
    const doc = newCompanyDoc()
    doc.name = name
    doc.unifiedBusinessNo = unifiedBusinessNo
    doc.phone = phone
    doc.mail = mail
    doc.address = address
    doc.owner = owner
    doc.accountLimit = accountLimit
    doc.houseLimit = houseLimit
    doc.state = state
    mongoDB.insert(collectionName, doc, callback);
}

function editCompany(id,name,unifiedBusinessNo,phone,mail,address,owner,accountLimit,houseLimit,state, callback) {
    if (id.length == 24){
        const updateData = {
            name,
            unifiedBusinessNo,
            phone,
            mail,
            address,
            owner,
            accountLimit,
            houseLimit,
            state,
            updateTime: new Date()
        }
        const searchDoc = {
            '_id': ObjectId(id)
        }

        mongoDB.update(collectionName, searchDoc, updateData, (result,data)=>{
            if(result && data.nModified>0){
                data.updateData=updateData
                data.updateData._id = id
                callback(true,data)
            }else{
                callback(false,data)
            }
        });

    }else{
        callback(false, 'id is invalid')
    }
    
}

function getCompanyById(id,callback){
    if(id.length == 24){
        const doc = {
            '_id': ObjectId(id),
        }
        mongoDB.queryFindOne(collectionName, doc, callback)
    }else{
        callback(false, 'id invalid')
    }
}

function removeCompany(id,callback){
    if(id.length == 24){
        const searchDoc = {
            '_id': ObjectId(id)
        }
        mongoDB.remove(collectionName, searchDoc, (result,data)=>{
            if(result){
                callback(true,data)
            }else{
                callback(false,data)
            }
        });
    }else{
        callback(false, 'ids is invalid')
    }
}

function getCompanyList(queryInfos,skip,limit,sort,callback){
    const maxLimit = 300

    if (!utilsValue.isNumber(skip)){
        skip = 0;
    }
    if (!utilsValue.isNumber(limit) || limit>maxLimit){
        limit = maxLimit;
    }
    if (!utilsValue.isValid(sort)){
        sort = {updateTime:-1}
    }

    mongoDB.queryFindAll(collectionName, queryInfos , skip, limit, sort ,(result, msg) => {
        callback(result, msg);
    })
}

exports.addCompany = addCompany
exports.getCompanyById = getCompanyById
exports.editCompany = editCompany
exports.removeCompany = removeCompany
exports.getCompanyList = getCompanyList