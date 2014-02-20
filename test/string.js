
var anna = require('..');

exports['no result'] = function (test) {
    var result = anna.analyze('foo');
    
    test.ok(result);
    test.ok(typeof result == 'object');
    test.equal(Object.keys(result).length, 0);
}

exports['match exact word'] = function (test) {
    anna.define('foo', { type: 'bar' });
    var result = anna.analyze('foo');
    
    test.ok(result);
    test.ok(typeof result == 'object');
    test.equal(Object.keys(result).length, 1);
    test.equal(result.type, 'bar');
}