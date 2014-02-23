
var anna = require('..');

function areEqual(obj1, obj2) {
    if (Object.keys(obj1).length != Object.keys(obj2).length)
        return false;
        
    for (var n in obj1)
        if (obj1[n] != obj2[n])
            return false;
            
    return true;
}

exports['analyze cheese'] = function (test) {
    var data = { category: 'dairy', type: 'cheese' };
    anna.define('cheese', { category: 'dairy', type: 'cheese' });
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Blue Cheese'), data));
    test.ok(areEqual(anna.analyze('Cheese 800gr'), data));
}
