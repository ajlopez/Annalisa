
var integers = require('../lib/integers');

exports['get no integer'] = function (test) {
    var result = integers('foo');
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 0);
};
