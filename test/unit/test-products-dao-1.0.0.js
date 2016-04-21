/**
 * Created by psenger on 4/21/16.
 */
'use strict';

var describe   = require('mocha').describe,
    before     = require('mocha').before,
    after      = require('mocha').after,
    it         = require('mocha').it,
    assert     = require('assert'),
    test       = require('unit.js'),
    should     = test.should,
    fs         = require('fs'),
    path       = require('path');

describe('products-dao-1.0.0', function () {
    describe('#option', function () {
        var productsV1 = require('../../lib/products-dao-1.0.0')( {  version: [ '1.0.0' ], csv: fs.readFileSync( path.join( __dirname, '..', '..','data', '1.0.0.csv' ), 'utf8' )  } );
        before(function(done){
            done();
        });
        it('should have an option object', function (done) {
            should.exist(productsV1.options);
            done();
        });
        it('should have a csv option', function (done) {
            should.exist(productsV1.options.csv);
            done();
        });
        it('should have a csv option of type string', function (done) {
            test.should(productsV1.options.csv).be.type('string');
            done();
        });
        after(function (done) {
            done();
        });
    });
    
    describe('#query()', function () {
        var productsV1 = require('../../lib/products-dao-1.0.0')( {  version: [ '1.0.0' ], csv: fs.readFileSync( path.join( __dirname, '..', '..','data', '1.0.0.csv' ), 'utf8' )  } );
        before(function(done){
            done();
        });
        it('should have a query property of type function', function (done) {
            test.should(productsV1.query).be.type('function');
            done();
        });
        it('should return a valid value from the mock', function (done) {
            var options = {};
            options.csv = 'code,name,description,price,expiry,is_plan,is_unlimited,size_mb,4g,auto_renew,terms_url\nult_xlarge,Unlimited 8GB,,49.90,30,true,true,8192,true,true,https://www.amaysim.com.au/dms/amaysim/documents/terms-conditions/special-conditions-and-service-description-unlimited-8gb.pdf';
            var query = productsV1.query(options);
            var nextCall = false; 
            var data = null;
            var send = function send ( inData ) {
                data = inData;
                should.exist( inData );
            };
            var req = {
                    headers: {
                        host : 'localhost:3000'
                    },
                    url: '/products'
                }, 
                res = {
                    send: send
                }, 
                next = function(){
                    nextCall = true;
                    should.exist( data );

                    test.should(data[0].code).be.equal('ult_xlarge');
                    test.should(data[0].name).be.equal('Unlimited 8GB');
                    test.should(data[0].description).be.equal('');
                    test.should(data[0].price).be.equal(49.9);
                    test.should(data[0].expiry).be.equal(30);
                    test.should(data[0].size_mb).be.equal(8192);

                    ( data[0].is ).should.containEql( { key: 'plan', value: true } );
                    ( data[0].is ).should.containEql( { key: 'unlimited', value: true } );
                    ( data[0].is ).should.containEql( { key: '4g', value: true } );
                    ( data[0].is ).should.containEql( { key: 'auto_renew', value: true } );

                    ( data[0].links ).should.containEql( { rel: 'terms_and_conditions',  href: 'https://www.amaysim.com.au/dms/amaysim/documents/terms-conditions/special-conditions-and-service-description-unlimited-8gb.pdf' } );
                    ( data[0].links ).should.containEql( { rel: 'self',  href: 'http://localhost:3000/products/ult_xlarge' } );

                    done();
                };

            query(req,res,next);
        });
        it('should return with empty array if the file is empty', function (done) {
            var options = {};
            options.csv = ' ';
            var query = productsV1.query(options);
            var nextCall = false;
            var data = null;
            var send = function send ( inData ) {
                data = inData;
                should.exist( inData );
            };
            var req = {
                    headers: {
                        host : 'localhost:3000'
                    },
                    url: '/products'
                },
                res = {
                    send: send
                },
                next = function(){
                    nextCall = true;
                    should.exist( data );
                    data.should.be.empty;
                    done();
                };
            try {
                query(req, res, next);
            } catch (e) {
                console.log(e);
            }
        });
        it('should return with empty array if the file has no rows', function (done) {
            var options = {};
            options.csv = 'code,name,description,price,expiry,is_plan,is_unlimited,size_mb,4g,auto_renew,terms_url';
            var query = productsV1.query(options);
            var nextCall = false;
            var data = null;
            var send = function send ( inData ) {
                data = inData;
                should.exist( inData );
            };
            var req = {
                    headers: {
                        host : 'localhost:3000'
                    },
                    url: '/products'
                },
                res = {
                    send: send
                },
                next = function(){
                    nextCall = true;
                    should.exist( data );
                    data.should.be.empty;
                    done();
                };
            query(req,res,next);
        });
        it('should return throw 500', function (done) {

            productsV1.options.csv = null;
            var options = {};
            options.csv = null;
            var query = productsV1.query(options);
            var nextCall = false;
            var data = null;
            var send = function send ( inData ) {
                data = inData;
                should.not.exist( inData );
            };
            var req = {
                    headers: {
                        host : 'localhost:3000'
                    },
                    url: '/products'
                },
                res = {
                    send: send
                },
                next = function(){
                    nextCall = true;
                    should.not.exist( data );
                };
            try {
                query(req, res, next);
            } catch (e) {
                should.exist( e ); 
                done();
            }
        });
        after(function (done) {
            done();
        });
    });

    describe.skip('#detail()', function () {
        var productsV1 = require('../../lib/products-dao-1.0.0')( {  version: [ '1.0.0' ], csv: fs.readFileSync( path.join( __dirname, '..', '..','data', '1.0.0.csv' ), 'utf8' )  } );
        before(function (done) {
             done();
        });
        it('should find 20 record', function (done) {
            // Create a Key object to pass to Key.create()
            Key.scan('id').beginsWith('test-').exec(function (err, keys) {
                keys.length.should.eql(20);
                done();
            });
        });
        after(function (done) {
            done();
        });
    });
});