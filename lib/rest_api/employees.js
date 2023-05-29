exports.on = function(app) {
    const preRestApi = '/employees';
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
                state:0,
                isResign:false
            }
        }*/ 
        const companyId = req.body.companyId
        const userId = req.body.userId
        const rank = req.body.rank
        const managerId = req.body.managerId
        const state = req.body.state
        const isResign = req.body.isResign
        const response = {
            'status':true,
            'data':''
        }
        employees.addEmployees(companyId,userId,rank,managerId,state,isResign,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.put(preRestApi + '/editEmployees', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit a employees',
            schema: {
                id: '61ed2777f5178ce385654350',
                companyId: '61ed2777f5178ce385654351',
                userId: '61ed2777f5178ce385654352',
                rank: 1,
                managerId: '61ed2777f5178ce385654353',
                state:1,
                isResign:false
            }
        }*/ 
        const id = req.body.id
        const companyId = req.body.companyId
        const userId = req.body.userId
        const rank = req.body.rank
        const managerId = req.body.managerId
        const state = req.body.state
        const isResign = req.body.isResign
        const response = {
            'status':true,
            'data':''
        }
        employees.editEmployees(id,companyId,userId,rank,managerId,state,isResign,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.put(preRestApi + '/editManyEmployees', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit many employees',
            schema: {
                editEmployees: {
                    companyId: '61ed2777f5178ce385654351',
                    isResign:false,
                    managerId: '61ed2777f5178ce385654353'
                },
                managerId: '61ed2777f5178ce385654351'
            }
        }*/ 
        const editEmployees = req.body.editEmployees
        const companyId = req.body.companyId
        const userId = req.body.userId
        const rank = req.body.rank
        const managerId = req.body.managerId
        const state = req.body.state
        const isResign = req.body.isResign
        const response = {
            'status':true,
            'data':''
        }
        employees.editManyEmployees(editEmployees,companyId,userId,rank,managerId,state,isResign,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.get(preRestApi + '/getEmployeesListByCompanyId', function(req, res) {
        const companyId = req.query.companyId
        let skip = req.query.skip
        let limit = req.query.limit
        skip = skip*1;
        limit = limit*1
        let states = req.query.states
        const isResign = req.query.isResign
        const response = {
            'status':true,
            'data':''
        }

        employees.getEmployeesListByCompanyId(companyId,skip,limit,states,isResign,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        }) 
    });

    app.get(preRestApi + '/getEmployeesByUserId', function(req, res) {
        const id = req.query.id
        const response = {
            'status':true,
            'data':''
        }
        employees.getEmployeesByUserId(id,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

   
}