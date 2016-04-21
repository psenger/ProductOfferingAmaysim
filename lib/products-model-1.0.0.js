/**
 * Created by psenger on 4/21/16.
 */

var _ = require('lodash');

var rel = {};
rel[rel["self"] = 0] = "self";
rel[rel["terms_and_conditions"] = 1] = "terms_and_conditions";

var isSet = _.negate(_.isNil);
var isNNaN = _.negate(_.isNaN);

var single = function single(single, baseUrl) {
    if (_.isNil(single)) {
        return null;
    }

    var stubProduct = {
        code: '',
        name: '',
        description: '',
        is: [],
        price: 0.0,
        expiry: 0,
        size_mb: 0,
        links: []
    };

    // links.
    if (isSet(single.terms_url)) {
        stubProduct.links.push({
            rel: rel[rel.terms_and_conditions],
            href: single.terms_url
        });
    }
    if (isSet(single.code)) {
        stubProduct.links.push({
            rel: rel[rel.self],
            href: baseUrl + single.code
        });
    }

    // handle strings
    stubProduct.code = single.code;
    stubProduct.name = single.name;
    stubProduct.description = single.description;

    // handle IsA
    var stubIsA = [];
    stubIsA.push({key: 'plan', value: ( single.is_plan === 'true' )});
    stubIsA.push({key: 'unlimited', value: ( single.is_unlimited === 'true' )});
    stubIsA.push({key: '4g', value: ( single['4g'] === 'true' )});
    stubIsA.push({key: 'auto_renew', value: ( single.auto_renew === 'true' )});
    stubProduct.is = stubIsA;

    // handle floats
    if (isNNaN(parseFloat(single.price))) {
        stubProduct.price = parseFloat(single.price);
    }

    // handle integers
    if (isNNaN(parseInt(single.expiry))) {
        stubProduct.expiry = parseFloat(single.expiry);
    }
    if (isNNaN(parseInt(single.size_mb))) {
        stubProduct.size_mb = parseFloat(single.size_mb);
    }

    return stubProduct;
};

module.exports = function model(any, baseUrl) {
    if (_.isArray(any)) {
        var collector = [];
        for (var i = 0; i < any.length; i++) {
            var obj = any[i];
            collector.push(single(obj, baseUrl))
        }
        return collector;
    } else {
        return single(any, baseUrl);
    }
};
