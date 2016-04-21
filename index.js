/**
 * Created by psenger on 4/20/16.
 */

'use strict';

var app = require('./package.json'),
    fs = require('fs'),
    productsV1 = require('./lib/productsV1')( { csv: fs.readFileSync('./data/data-v1.0.0.csv'), pageSize: 10 } ),
    restify = require('restify');

var server = restify.createServer({
    /**
     certificate: fs.readFileSync('path/to/server/certificate'),
     key: fs.readFileSync('path/to/server/key'),
     */
    name: app.name,
    version: app.version // default version for all routes, will translate to the last npm bumped version
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get( { path:'/products',     version: [ '1.0.0' ] } , productsV1.query()  );
server.get( { path:'/products/:id', version: [ '1.0.0' ] } , productsV1.detail() );

server.listen(3000, function () {
    console.log('%s listening at %s.', server.name, server.url);
});
