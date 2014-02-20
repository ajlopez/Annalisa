
var anna = require('..');

exports['no result'] = function (test) {
    var result = anna.analyze('foo');
    
    test.ok(result);
    test.ok(typeof result == 'object');
    test.equal(Object.keys(result).length, 0);
}