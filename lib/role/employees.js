const mongoDB = require('../db/mongoDB');
const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const path = require('path');
const collectionName = config.mongoDBCollection.employeesCollection;
const userCollectionName = config.mongoDBCollection.userCollection;
const companyCollectionName = config.mongoDBCollection.companyCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 
const employeesDoc = {
    companyId: '',
    userId: '',
    rank: 99999,
    managerId: '',
    state: 0,
    // createTime:
    // updateTime:
}

function newEmployeesDoc(){
    const doc = JSON.parse(JSON.stringify(employeesDoc))
    const date = new Date();
    doc.createTime = date;
    doc.updateTime = date;
    return doc;
}

function addEmployees(companyId,userId,rank,managerId,state,callback) {
    if (companyId.length == 24 && userId.length == 24 && managerId.length == 24){
        const doc = newEmployeesDoc()
        doc.companyId = ObjectId(companyId)
        doc.userId = ObjectId(userId)
        doc.rank = rank
        doc.managerId = ObjectId(managerId)
        doc.state = state
        mongoDB.insert(collectionName, doc, callback);
    }else{
        callback(false, 'companyId or userId or managerId invalid')
    }
}

function editEmployees(id,companyId,userId,rank,managerId,state, callback) {
    if (id.length == 24 && companyId.length == 24 && userId.length == 24 && managerId.length == 24){
        const updateData = {
            companyId,
            userId,
            rank,
            managerId,
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
        callback(false, 'id or companyId or userId or managerId invalid')
    }
    
}

function getEmployeesById(id,callback){
    if(id.length == 24){
        const lookup =
        {
            from: userCollectionName,
            localField : 'managerId',
            foreignField : '_id',
            as: 'managerData',
        }

        const lookup2 =
        {
            from: userCollectionName,
            localField : 'userId',
            foreignField : '_id',
            as: 'userData',
        }

        const lookup3 =
        {
            from: companyCollectionName,
            localField : 'companyId',
            foreignField : '_id',
            as: 'companyData',
        }

        console.log(lookup)

        const match = {}

        const skip = 0
        const limit = 300

        if(utilsValue.isValid(id)){
            match._id = ObjectId(id)
        }

        mongoDB.queryJoinCollectionList(collectionName,lookup,lookup2,lookup3,match,skip,limit , (result, msg) => {
            callback(result, msg);
        })
    }else{
        callback(false, 'id invalid')
    }
}

function removeEmployees(id,callback){
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
        callback(false, 'id is invalid')
    }
}

// function getCompanyList(queryInfos,skip,limit,sort,callback){
//     const maxLimit = 300

//     if (!utilsValue.isNumber(skip)){
//         skip = 0;
//     }
//     if (!utilsValue.isNumber(limit) || limit>maxLimit){
//         limit = maxLimit;
//     }
//     if (!utilsValue.isValid(sort)){
//         sort = {updateTime:-1}
//     }

//     mongoDB.queryFindAll(collectionName, queryInfos , skip, limit, sort ,(result, msg) => {
//         callback(result, msg);
//     })
// }

exports.addEmployees = addEmployees
exports.getEmployeesById = getEmployeesById
exports.editEmployees = editEmployees
exports.removeEmployees = removeEmployees
// exports.getCompanyList = getCompanyList