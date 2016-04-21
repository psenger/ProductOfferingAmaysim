/**
 * @description general controller functions used as REST services.
 * @author philip.senger
 * @date 04/21/2016
 * @module lib
 */

'use strict';
var parse = require('csv-parse'),
    model = require('./products-model-1.0.0'),
    NotFoundError = require('restify').errors.NotFoundError;

var query = function queryClosure ( options ) {
    
    options = options || {};
    options.csv = options.csv || this.options.csv;
    
    return function query (req, res, next) {
        var baseUrl = 'http://' +  req.headers.host + req.url;

        if (baseUrl.substring(baseUrl.length-1) !== '/' ) {
            baseUrl += '/';
        }

        parse (
            options.csv,
            { columns: true },
            function( err, data ){
                if ( err ) throw err;
                res.send( model( data, baseUrl ) );
                return next();
            }
        );
    };
};

var detail = function detailClosure ( options ) {

    options = options || {};
    options.csv = options.csv || this.options.csv;

    return function detail (req, res, next) {
        var baseUrl = 'http://' +  req.headers.host + req.url;
        var str = baseUrl.substr(baseUrl.lastIndexOf('/') + 1) + '$';
        baseUrl = baseUrl.replace( new RegExp(str), '' );
 
        parse (
            options.csv,
            { 'columns': true, 'objname': 'code' },
            function ( err, data ) {
                if( err ) throw err;
                if( typeof req.params.id === 'undefined'  || req.params.id === null || typeof data[ req.params.id ] === 'undefined'  ) {
                    throw new NotFoundError( 'Product not found for id ' + req.params.id );
                }
                res.send( model( data[ req.params.id ], baseUrl ) );
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