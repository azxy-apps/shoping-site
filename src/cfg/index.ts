'use strict';

let cfg = {
    'appname': 'shoping-site-api',
    'baseurl': process.env.BASEURL || 'http://localhost',
    'paths': {},
    'env': process.env.NODE_ENV || 'development',
    'api': {},
    'db': {},
};

export default { ...cfg, ...require('./' + cfg.env) };
