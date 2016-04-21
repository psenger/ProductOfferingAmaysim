#!/usr/bin/env node
"use strict";

var request = require("request"),
    _       = require('lodash'),
    cli     = require('cli');

cli.parse({
    code:     [false, 'The product code ( optional ).', 'string'],
    url:      [false, 'The ( optional ) base url to the application, E.G. http://localhost:3000/. May require quoting the name contain spaces. default is http://floating-brook-98056.herokuapp.com/products', 'string'],
    version:  [false, 'The semver of the api, default is latest ( optional ).', 'string']
}, null);
cli.setApp('get.js', '1.0.0');

cli.main(function (args, options) {

    var code = options.code;
    var url = options.url || 'http://floating-brook-98056.herokuapp.com/products' + ( _.isNil(code) ? '' : '/' +code );
    var version = options.version;
    var headers = {
        'cache-control': 'no-cache',
        'accept': 'application/json' 
    };
    if ( version ) {
        headers['accept-version'] = version;
    }
    
    request({
        method: 'GET',
        url: url,
        headers: headers
    }, function (error, response, body) {
        if (error) {
            return console.log( JSON.stringify(JSON.parse(error),'\t',4)); 
        }
        console.log( JSON.stringify(JSON.parse(body),'\t',4));
    });
});


