/**
 * @description general controller functions used as REST services.
 * @author philip.senger
 * @date 04/21/2016
 * @module lib
 */

'use strict';
var parse = require('csv-parse'),
    model = require('./products-model-1.0.0'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    NotFoundError = require('restify').errors.NotFoundError,
    BadRequestError = require('restify').errors.BadRequestError;

/**
 * queryClosure
 * @param options
 * @returns {query}
 */
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

/**
 * detailClosure
 * @param options
 * @returns {detail}
 */
var detail = function detailClosure ( options ) {

    options = options || {};
    options.csv = options.csv || this.options.csv;

    return function detail (req, res, next) {
        if ( _.isNil(req) || _.isNil(req.params) || _.isNil(req.params.id) ) {
            return next( new BadRequestError( 'Missing required Product id' ) );
        }
        var baseUrl = 'http://' +  req.headers.host + req.url;
        var str = baseUrl.substr(baseUrl.lastIndexOf('/') + 1) + '$';
        baseUrl = baseUrl.replace( new RegExp(str), '' );

        // this is an anti-pattern, with callback.
        var extractCsv = function () {
            return new Promise(function (resolve, reject) {
                parse (
                    options.csv,
                    { 'columns': true, 'objname': 'code' },
                    function ( err, data ) {
                        if( err ) reject( err );
                        if( _.isNil( data[ req.params.id ] ) ) {
                            reject( new NotFoundError( 'Product not found for id ' + req.params.id ) );
                        }
                        resolve( data );
                    }
                );
            });
        };
        extractCsv()
            .then(
                function (result) {
                    res.send( model( result[ req.params.id ], baseUrl ) );
                    return next();
                },
                function (reason) {
                    return next( reason );
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