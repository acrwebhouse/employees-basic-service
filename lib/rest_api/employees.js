exports.on = function(app) {
    const preRestApi = '/employeesCollection';
    const employees = require('../role/employees');
    const utilsValue = require('../utils/value');
    app.post(preRestApi + '/addEmployees', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a employees',
            schema: {
                companyId: '61ed2777f5178ce385654351',
                userId: '61ed2777f5178ce385654352',
                rank: 1,
                managerId: '61ed2777f5178ce385654353',
                state:0
                
            }
        }*/ 
        const companyId = req.body.companyId
        const userId = req.body.userId
        const rank = req.body.rank
        const managerId = req.body.managerId
        const state = req.body.state
        const response = {
            'status':true,
            'data':''
        }
        employees.addEmployees(companyId,userId,rank,managerId,state,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.put(preRestApi + '/editEmployees', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit a company',
            schema: {
                id: '61ed2777f5178ce385654350',
                companyId: '61ed2777f5178ce385654351',
                userId: '61ed2777f5178ce385654352',
                rank: 1,
                managerId: '61ed2777f5178ce385654353',
                state:1
            }
        }*/ 
        const id = req.body.id
        const companyId = req.body.companyId
        const userId = req.body.userId
        const rank = req.body.rank
        const managerId = req.body.managerId
        const state = req.body.state
        const response = {
            'status':true,
            'data':''
        }
        employees.editEmployees(id,companyId,userId,rank,managerId,state,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.delete(preRestApi + '/removeEmployees', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Remove a employees',
            schema: {
                id: '61ed2777f5178ce385654350'
            }
        }*/ 
        const id = req.body.id
        const response = {
            'status':true,
            'data':''
        }
        employees.removeEmployees(id,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.get(preRestApi + '/getEmployeesList', function(req, res) {
        /*
        #swagger.parameters['sort'] = {
            in: 'query',
            type: 'string',
            schema: '{\"updateTime\":1}'
        }
        */ 
        const name = req.query.name
        const unifiedBusinessNo = req.query.unifiedBusinessNo
        let skip = req.query.skip
        let limit = req.query.limit
        skip = skip*1;
        limit = limit*1
        let sort;
        const queryInfo = {}
        try{
            sort = JSON.parse(req.query.sort)
        }catch(e){
            sort = {}
        }

        if(utilsValue.isValid(name)){
            queryInfo.name =new RegExp(name);
        }

        if(utilsValue.isValid(unifiedBusinessNo)){
            queryInfo.unifiedBusinessNo =new RegExp(unifiedBusinessNo);
        }
        const response = {
            'status':true,
            'data':''
        }

        company.getCompanyList(queryInfo,skip,limit,sort,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        }) 
    });

    app.get(preRestApi + '/getEmployeesById', function(req, res) {
        const id = req.query.id
        const response = {
            'status':true,
            'data':''
        }
        employees.getEmployeesById(id,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

   
}