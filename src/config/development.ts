'use strict';

module.exports = {
    'api': {
        'host': '0.0.0.0',
        'port': process.env.PORT || 5000,
    },
    'db': {
            'mongodb': {
                'user'    : 'dbDevUser',
                'database': 'shoping-site-dev',
                'password': 'qwerty123',
                'port'    : 25673,
                'host'    : 'mongodb://dbDevUser:qwerty123@ds125673.mlab.com:25673/shoping-site-dev',
            },
        },
};
