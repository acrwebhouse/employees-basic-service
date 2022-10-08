exports.on = function(app) {
    const preRestApi = '/company';
    const company = require('../role/company');
    const utilsValue = require('../utils/value');
    app.post(preRestApi + '/addCompany', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a company',
            schema: {
                name: 'ACR 科技公司',
                unifiedBusinessNo: '123456789',
                phone: '0912951085',
                mail: 'acr.webhouse@gmail.com',
                address: '台北市大安區',
                owner: 'Allen',
                accountLimit: 20,
                houseLimit: 1000,
                state:0
                
            }
        }*/ 
        const name = req.body.name
        const unifiedBusinessNo = req.body.unifiedBusinessNo
        const phone = req.body.phone
        const mail = req.body.mail
        const address = req.body.address
        const owner = req.body.owner
        const accountLimit = req.body.accountLimit
        const houseLimit = req.body.houseLimit
        const state = req.body.state
        const response = {
            'status':true,
            'data':''
        }
        company.addCompany(name,unifiedBusinessNo,phone,mail,address,owner,accountLimit,houseLimit,state,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.put(preRestApi + '/editUser', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit a company',
            schema: {
                id: '61ed2777f5178ce385654350',
                name: 'ACR 科技公司',
                unifiedBusinessNo: '123456789',
                phone: '0912951085',
                mail: 'acr.webhouse@gmail.com',
                address: '台北市大安區',
                owner: 'Allen',
                accountLimit: 30,
                houseLimit: 1000,
                state:1
            }
        }*/ 
        const id = req.body.id
        const name = req.body.name
        const unifiedBusinessNo = req.body.unifiedBusinessNo
        const phone = req.body.phone
        const mail = req.body.mail
        const address = req.body.address
        const owner = req.body.owner
        const accountLimit = req.body.accountLimit
        const houseLimit = req.body.houseLimit
        const state = req.body.state
        const response = {
            'status':true,
            'data':''
        }
        company.editCompany(id,name,unifiedBusinessNo,phone,mail,address,owner,accountLimit,houseLimit,state,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.delete(preRestApi + '/removeCompany', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Remove a user',
            schema: {
                id: '61ed2777f5178ce385654350'
            }
        }*/ 
        const id = req.body.id
        const response = {
            'status':true,
            'data':''
        }
        company.removeCompany(id,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.get(preRestApi + '/getCompanyList', function(req, res) {
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

    app.get(preRestApi + '/getCompanyById', function(req, res) {
        const id = req.query.id
        const response = {
            'status':true,
            'data':''
        }
        company.getCompanyById(id,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

   
}