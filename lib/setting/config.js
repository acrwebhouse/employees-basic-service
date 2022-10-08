require('dotenv').config()
exports.config = {
    'serverIp':process.env.SERVER_IP || '127.0.0.1',
    'serverPort': process.env.SERVER_PORT || 21000,
    'mongoDBPort': process.env.DB_PORT || 27017,
    'mongoDBIp': process.env.DB_IP || '35.234.42.100',
    'swaggerIp':process.env.SWAGGER_IP || '127.0.0.1',
    'mongoDBName': 'ACR',
    'mongoDBCollection': {
        'employeesCollection': 'employees',
        'userCollection' : 'user',
        'companyCollection' : 'company'
    }
}