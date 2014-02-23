
var items = require('../lib/items');

exports['retrieve nothing'] = function (test) {
    var result = items.search('foo');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 0);
};

