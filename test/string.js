
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

exports['match upper case word'] = function (test) {
    anna.define('foo', { type: 'bar' });
    var result = anna.analyze('FOO');
    
    test.ok(result);
    test.ok(typeof result == 'object');
    test.equal(Object.keys(result).length, 1);
    test.equal(result.type, 'bar');
}

exports['match mixed case word'] = function (test) {
    anna.define('foo', { type: 'bar' });
    var result = anna.analyze('Foo');
    
    test.ok(result);
    test.ok(typeof result == 'object');
    test.equal(Object.keys(result).length, 1);
    test.equal(result.type, 'bar');
}

