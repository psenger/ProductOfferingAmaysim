/**
 * @description Configuration, singleton. By default, NodeJS does caching on required objects in a way a singleton, so this is simply a Java-look-n-feel design. 
 * @author philip.senger
 * @date 04/21/2016
 * @module lib
 */

"use strict";
var twelve = require('twelve'),
    dotenv = require('dotenv');

// Instance, designed to store a reference to the Singleton
var instance;

var init = function init() {
    // Private methods and variables
    
    /**
     * Load in the .env first, .env overrides environment variables!
     */
    dotenv.config( { silent:false } );
    
    return twelve.env({
        'api:port': {
            name: 'PORT',
            parse: function (value) {
                return parseInt(value);
            }
        },
        'api:environment': {
            name: 'NODE_ENV',
            default: 'development'
        }
    });
};

module.exports = {
    /**
     * Get the instance, create it if it doesnt exist.
     * @returns {*}
     */
    getInstance: function () {
        if ( !instance ) {
            instance = init();
        }
        return instance;
    }
};

 

 