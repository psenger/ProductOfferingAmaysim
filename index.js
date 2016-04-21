/**
 * Created by psenger on 4/20/16.
 */

'use strict';

var app        = require('./package.json'),
    fs         = require('fs'),
    productsV1 = require('./lib/products-dao-1.0.0')( {  version: [ '1.0.0' ], csv: fs.readFileSync( './data/1.0.0.csv', 'utf8' )  } ),
    restify    = require('restify'),
    config     = require('./lib/config').getInstance(),
    morgan     = require('morgan');

var server = restify.createServer({
    /**
     certificate: fs.readFileSync('path/to/server/certificate'),
     key: fs.readFileSync('path/to/server/key'),
     */
    name: app.name,
    version: app.version /** default version for all routes, will translate to the last npm bumped version **/
});
if (config.get('api:environment') == 'production') {
    server.use(morgan('common'));
} else {
    server.use(morgan('dev'));
}
server.use(restify.CORS());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get( { path:'/products',     version: productsV1.options.version } , productsV1.query()  );
server.get( { path:'/products/:id', version: productsV1.options.version } , productsV1.detail() );

server.listen(config.get('api:port'), function () {
    console.log('%s listening at %s in %s mode.', server.name, server.url, config.get('api:environment'));
});
