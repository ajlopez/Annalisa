
var normalize = require('../lib/normalize');

exports['normalize simple lower case word'] = function (test) {
    var result = normalize('foo');
    test.ok(result);
    test.equal(result, 'foo');
};

