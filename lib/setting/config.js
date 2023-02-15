require('dotenv').config()
exports.config = {
    'serverIp':process.env.SERVER_IP || '127.0.0.1',
    'serverPort': process.env.SERVER_PORT || 21000,
    'mongoDBUri': process.env.DB_URI || '',
    'swaggerIp':process.env.SWAGGER_IP || '127.0.0.1',
    'mongoDBName': 'ACR',
    'mongoDBCollection': {
        'employeesCollection': 'employees',
        'userCollection' : 'user',
        'companyCollection' : 'company'
    }
}