/**
 * Created by psenger on 4/20/16.
 */
'use strict';
var parse = require('csv-parse'),
    NotFoundError = require('restify').errors.NotFoundError;

var query = function queryClosure ( options ) {
    
    options = options || {};
    options.csv = options.csv || this.options.csv;
    
    return function query (req, res, next) {
        parse(
            options.csv,
            {columns: true},
            function(err, data){
                if(err) throw err;
                res.send( data );
                return next();
            }
        );
    };
};

var detail = function detailClosure ( options ) {
    
    options = options || {};

    return function detail (req, res, next) {
        console.log('req.params.id = ' + req.params.id  );
        parse(
            this.csv,
            {'columns':true, 'objname': "code"},
            function(err, data){
                if(err) throw err;
                if( typeof req.params.id === 'undefined'  || req.params.id === null || typeof data[ req.params.id ] === 'undefined'  ) {
                    throw new NotFoundError( 'Product not found for id ' + req.params.id );
                }

                res.send( data[req.params.id ] );
                return next();
            }
        );
    };
};

module.exports = function ( options ) {
    return {
        options: options,
        query: query,
        detail: detail
    }
};