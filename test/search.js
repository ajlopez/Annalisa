
var items = require('../lib/items');

function hasValues(obj1, obj2) {
    if (Object.keys(obj1).length < Object.keys(obj2).length)
        return false;
        
    for (var n in obj2)
        if (obj1[n] != obj2[n])
            return false;
            
    return true;
}

function contains(items, item) {
    var l = items.length;
    
    for (var k = 0; k < l; k++)
        if (hasValues(items[k], item))
            return true;
            
    return false;
}

exports['retrieve nothing'] = function (test) {
    items.clear();
    var result = items.search('foo');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 0);
};

exports['add and retrieve simple item'] = function (test) {
    items.clear();
    items.add('foo');
    var result = items.search('foo');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.ok(hasValues(result[0], { value: 'foo' }));
};

exports['add and retrieve simple item using normalized data'] = function (test) {
    items.clear();
    items.add('Foo');
    var result = items.search('FOO');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.ok(hasValues(result[0], { value: 'Foo' }));
};

exports['add and retrieve simple item using word as key'] = function (test) {
    items.clear();
    items.add('foo bar');
    var result = items.search('foo');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.ok(hasValues(result[0], { value: 'foo bar' }));
};

exports['add and retrieve items using multiple words'] = function (test) {
    items.clear();
    items.add('any foo bar');
    items.add('foo');
    items.add('bar');
    items.add('all bar foo');
    
    var result = items.search('bar foo');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 2);
    test.ok(contains(result, { value: 'any foo bar' }));
    test.ok(contains(result, { value: 'all bar foo' }));
};

exports['add and retrieve item with associated data'] = function (test) {
    items.clear();
    items.add('Ford model T', { color: 'black' });
    
    var result = items.search('ford');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.ok(hasValues(result[0], { value: 'Ford model T' }));
    test.ok(result[0].data);
    test.ok(hasValues(result[0].data, { color: 'black' }));
};
