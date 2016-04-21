/**
 * Created by psenger on 4/21/16.
 */
'use strict';
var describe   = require('mocha').describe,
    context    = require('mocha').describe,
    before     = require('mocha').before,
    after      = require('mocha').after,
    it         = require('mocha').it,
    assert     = require('assert'),
    test       = require('unit.js'),
    should     = test.should,
    fs         = require('fs'),
    path       = require('path'),
    Promise    = require('bluebird'),
    url        = require ( 'url' ),
    request    = Promise.promisify(require("request"));

var confirm200StatusCode =  function confirm200StatusCode ( result ) {
    // verify that the request was ok.
    should.ok ( result );
    should ( result.statusCode ).be.equal ( 200 );
    return new Promise ( function ( resolve, reject ) {
        resolve ( result );
    } );
};

var confirmNonEmptyResponseBody = function confirmNonEmptyResponseBody ( result ) {
    should.ok ( result );
    should.exist ( result.body );
    assert.notDeepEqual ( result.body, '' );
    return result;
};

var confirmPayload = function confirmPayloadClosure ( type ) {
    if ( type === 'single' ) {
        return function confirmPayload ( result ) {
           var body = result.body;
            assert.ok ( body.code );
            assert.ok ( body.name );
            // assert.ok ( body.description );
            assert.ok ( body.price );
            assert.ok ( body.code );
            assert.ok ( body.expiry );
            assert.ok ( body.size_mb );
            assert.ok ( body.is );
            assert.ok ( body.links );
        };
    }
    return function confirmPayload ( result ) {
        var items = result.body;
        assert.ok ( items );
        for (var i = 0; i < items.length; i++) {
            var body = items[i];
            assert.ok ( body.code );
            assert.ok ( body.name );
            // assert.ok ( body.description );
            assert.ok ( body.price );
            assert.ok ( body.code );
            assert.ok ( body.expiry );
            assert.ok ( body.size_mb );
            assert.ok ( body.is );
            assert.ok ( body.links );
        }
    };
};

var baseURL = url.format ( {
    protocol: ( process.env.protocol || 'http'),
    slashes: true,
    hostname: process.env.hostname,
    port: process.env.port,
    pathname: ( process.env.pathname || '/products' )
} );

describe('products-dao-1.0.0', function () {
    before(function(done){
        should.ok ( process.env.hostname, "The environment variable endpoint values are required to run this test." );
        should.ok ( process.env.port, "The environment variable endpoint values are required to run this test." );
        done();
    });
    context ( 'baseurl', function () {
        this.timeout ( 7000 );
        var promise = null;
        describe('#query', function () {
            before ( function ( done ) {
                promise = request ( {
                        method: 'GET',
                        url: baseURL ,
                        json: true,
                        headers: {
                            'Accept': 'application/json',
                            'Cache-Control': 'no-cache',
                            'accept-version': 1
                        }
                    } )
                    .then ( function ( result ) {
                        return new Promise ( function ( resolve, reject ) {
                            resolve ( result );
                            done ();
                        } );
                    } );
            } );
            it('should have a result', function (done) {
                promise
                    .then ( confirm200StatusCode )
                    .then ( confirmNonEmptyResponseBody )
                    .then ( confirmPayload('multiple') )
                    .finally(done);
            });
            after(function (done) {
                done();
            });
        });
        describe('#detail', function () {
            var links = [];
            before ( function ( done ) {
                promise = request ( {
                        method: 'GET',
                        url: baseURL ,
                        json: true,
                        headers: {
                            'Accept': 'application/json',
                            'Cache-Control': 'no-cache',
                            'accept-version': 1
                        }
                    } )
                    .then ( confirm200StatusCode )
                    .then ( confirmNonEmptyResponseBody )
                    .then ( function ( result ) {
                        var items = result.body;
                        assert.ok ( items );
                        for (var i = 0; i < items.length; i++) {
                            var body = items[i];
                            for (var j = 0; j < body.links.length; j++) {
                                var link = body.links[j];
                                if ( link.rel === 'self' ) {
                                    links.push( link.href );
                                }
                            }
                        }
                    })
                    .finally(done);
            } );
            it('should have a results for each self link', function (done) {
                Promise.map(links, function(aUrl) {
                        return request ( {
                            method: 'GET',
                            url: aUrl ,
                            json: true,
                            headers: {
                                'Accept': 'application/json',
                                'Cache-Control': 'no-cache',
                                'accept-version': 1
                            }
                        } )
                        .then ( confirm200StatusCode )
                        .then ( confirmNonEmptyResponseBody )
                        .then ( confirmPayload('single') );
                    })
                    .finally(done);
            });
            after(function (done) {
                done();
            });
        });
    })
});

