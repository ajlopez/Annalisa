
var anna = require('..');

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

exports['add and retrieve item'] = function (test) {
    anna.clear();
    anna.add('Ford model T', { color: 'black' });
    
    var result = anna.search('ford');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    
    var item = result[0];
    
    test.ok(hasValues(item, { value: 'Ford model T' }));
    test.ok(item.data);
    test.ok(hasValues(item.data, { color: 'black' }));
};

exports['add and retrieve items'] = function (test) {
    anna.clear();
    anna.add('Ford model T', { color: 'black' });
    anna.add('Ford Taunus', { color: 'any' });
    anna.add('Citroen', { color: 'old' });
    
    var result = anna.search('ford');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 2);
    
    test.ok(contains(result, { value: 'Ford model T' }));
    test.ok(contains(result, { value: 'Ford Taunus' }));
};

exports['add and retrieve items by many words'] = function (test) {
    anna.clear();
    anna.add('Ford model T', { color: 'black' });
    anna.add('Ford Taunus', { color: 'any' });
    anna.add('Citroen', { color: 'old' });
    
    var result = anna.search('taunus ford');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    
    test.ok(contains(result, { value: 'Ford Taunus' }));
};

exports['add and retrieve items by word in properties'] = function (test) {
    anna.clear();
    anna.add('Ford model T', { color: 'black' });
    anna.add('Ford Taunus', { color: 'any' });
    anna.add('Citroen', { color: 'old' });
    
    var result = anna.search('black');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    
    test.ok(contains(result, { value: 'Ford model T' }));
};
