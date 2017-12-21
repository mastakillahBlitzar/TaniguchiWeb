//set properties for sql server
exports.dbConfig = {
    server: '127.0.0.1',
    database: 'trafiyadb',
    user: 'jhonycage',
    password:  'juan1014',
    port: 51065
};

exports.webPort = process.env.PORT || 9000;

exports.httpMsgsFormat = "JSON";