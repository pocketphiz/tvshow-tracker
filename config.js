'use strict';

module.exports = {
    mongo: {
        address: 'localhost:27017/test'
    },
    transmission: {
        host: 'localhost',
        port: 8080,
        username: 'tranmission',
        password: 'secret',
        url: '/transmission/rpc',
        downloadPath: '/var/transmission/data'
    },
    jwt: {
        tokenSecret: 'put your secret here'
    }
};
