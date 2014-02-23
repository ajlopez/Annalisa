
var items = require('../lib/items');

function areEqual(obj1, obj2) {
    if (Object.keys(obj1).length != Object.keys(obj2).length)
        return false;
        
    for (var n in obj1)
        if (obj1[n] != obj2[n])
            return false;
            
    return true;
}

exports['retrieve nothing'] = function (test) {
    var result = items.search('foo');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 0);
};

exports['add and retrieve simple item'] = function (test) {
    items.add('foo');
    var result = items.search('foo');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.ok(areEqual(result[0], { value: 'foo' }));
};
