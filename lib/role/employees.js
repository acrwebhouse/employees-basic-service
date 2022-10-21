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
    isResign: false
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

function addEmployees(companyId,userId,rank,managerId,state,isResign,callback) {
    if (companyId.length == 24 && userId.length == 24){
        const queryDoc = {
            userId:ObjectId(userId),
            companyId:ObjectId(companyId),
        }
        mongoDB.queryFindOne(collectionName, queryDoc, (result,data)=>{
            if(result){
                if(utilsValue.isValid(data)){
                    callback(false,'employees is exist')
                }else{
                    const doc = newEmployeesDoc()
                    doc.companyId = ObjectId(companyId)
                    doc.userId = ObjectId(userId)
                    doc.rank = rank
                    doc.isResign = isResign
                    if(managerId.length == 24){
                        doc.managerId = ObjectId(managerId)
                    }
                    doc.state = state
                    mongoDB.insert(collectionName, doc, callback);
                }
            }else{
                callback(false,'db query error')
            }
        })
    }else{
        callback(false, 'companyId or userId invalid')
    }
}

function editEmployees(id,companyId,userId,rank,managerId,state,isResign, callback) {
    if (id.length == 24 && companyId.length == 24 && userId.length == 24){
        const updateData = {
            companyId:ObjectId(companyId),
            userId:ObjectId(userId),
            rank,
            state,
            isResign,
            updateTime: new Date()
        }

        if(managerId.length == 24){
            updateData.managerId = ObjectId(managerId)
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
        callback(false, 'id or companyId or userId invalid')
    }
    
}

function getEmployeesByUserId(userId,callback){
    if(userId.length == 24){
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

        const match = {}

        const skip = 0
        const limit = 300

        if(utilsValue.isValid(userId)){
            match.userId = {$eq: ObjectId(userId)}
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

function getEmployeesListByCompanyId(companyId,skip,limit,states,isResign,callback){
    if(companyId.length == 24){
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

        const match = {
            companyId
        }

        if(utilsValue.isValid(skip) == false){
            skip = 0
        }

        if(utilsValue.isValid(limit) == false){
            limit = 300
        }

        if(utilsValue.isValid(companyId)){
            match.companyId = {$eq: ObjectId(companyId)}
        }
        let statesArr = [];
        if(utilsValue.isValid(states) && states.indexOf(',')>0){
            statesArr = states.split(',')
        }else if(utilsValue.isValid(states)){
            statesArr = [states]
        }
        if(statesArr.length > 0){
            for(let i = 0 ;i<statesArr.length;i++){
                statesArr[i] = statesArr[i]*1
            }
            match.state = { $in: statesArr}
        }
        if(utilsValue.isValid(isResign)){
            isResign = utilsValue.isTrueStr(isResign)
            match.isResign = isResign
        }
        console.log('===getEmployeesListByCompanyId===')
        console.log(match)

        mongoDB.queryJoinCollectionList(collectionName,lookup,lookup2,lookup3,match,skip,limit , (result, msg) => {
            callback(result, msg);
        })
    }else{
        callback(false, 'companyId invalid')
    }
}

exports.addEmployees = addEmployees
exports.getEmployeesByUserId = getEmployeesByUserId
exports.editEmployees = editEmployees
exports.removeEmployees = removeEmployees
exports.getEmployeesListByCompanyId = getEmployeesListByCompanyId