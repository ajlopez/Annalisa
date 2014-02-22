
var normalize = require('../lib/normalize');

exports['normalize simple lower case word'] = function (test) {
    var result = normalize('foo');
    test.ok(result);
    test.equal(result, 'foo');
};

exports['normalize upper case word'] = function (test) {
    var result = normalize('FOO');
    test.ok(result);
    test.equal(result, 'foo');
};

exports['normalize mixed case word'] = function (test) {
    var result = normalize('Foo');
    test.ok(result);
    test.equal(result, 'foo');
};
