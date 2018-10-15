'use strict';

module.exports = {
    'api': {
        'host': '0.0.0.0',
        'port': process.env.PORT || 5000,
    },
    'db': {
            'mongodb': {
                'user'    : 'admin',
                'database': 'shoping-site',
                'password': 'Shopingsite123',
                'port'    : 25673,
                'host'    : 'mongodb://admin:Shopingsite123@ds027748.mlab.com:27748/shoping-site',
            },
        },
};
