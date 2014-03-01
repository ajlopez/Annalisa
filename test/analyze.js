
var anna = require('..');

anna.clear();

function areEqual(obj1, obj2) {
    if (Object.keys(obj1).length != Object.keys(obj2).length)
        return false;
        
    for (var n in obj1)
        if (obj1[n] != obj2[n])
            return false;
            
    return true;
};

exports['analyze cheese'] = function (test) {
    var data = { category: 'dairy', type: 'cheese' };
    anna.define('cheese', data);
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Blue Cheese'), data));
    test.ok(areEqual(anna.analyze('Cheese 800gr'), data));
};

exports['analyze null, empty string, spaces'] = function (test) {
    var data = { category: 'dairy', type: 'cheese' };
    anna.define('cheese', data);
    test.ok(areEqual(anna.analyze(null), { }));
    test.ok(areEqual(anna.analyze(''), { }));
    test.ok(areEqual(anna.analyze('   '), { }));
};

exports['analyze Spanish brand'] = function (test) {
    var data = { brand: 'La Serenísima' };
    anna.define('La Serenísima', data);
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Queso La Serenísima'), data));
    test.ok(areEqual(anna.analyze('Leche La Serenísima'), data));
    test.ok(areEqual(anna.analyze('Queso la serenisima'), data));
    test.ok(areEqual(anna.analyze('Leche LA serenisima'), data));
};

exports['analyze Spanish brand with discarded words'] = function (test) {
    anna.discard('la');
    anna.discard('el');
    anna.discard('los');
    anna.discard('la');
    anna.discard('de');
    
    var data = { brand: 'La Serenísima' };
    anna.define('La Serenísima', data);
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Queso La Serenísima'), data));
    test.ok(areEqual(anna.analyze('Leche La Serenísima'), data));
    test.ok(areEqual(anna.analyze('Queso la serenisima'), data));
    test.ok(areEqual(anna.analyze('Leche LA serenisima'), data));
    test.ok(areEqual(anna.analyze('Serenísima queso'), data));
    test.ok(areEqual(anna.analyze('Serenísima leche'), data));
    test.ok(areEqual(anna.analyze('Yogurt serenisima'), data));
    test.ok(areEqual(anna.analyze('Leche serenisima'), data));
};

exports['analyze Spanish brand with discaded words in array'] = function (test) {
    anna.discard(['el', 'los', 'la', 'de']);
    
    var data = { brand: 'La Serenísima' };
    anna.define('La Serenísima', data);
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Queso La El Los DE Serenísima'), data));
    test.ok(areEqual(anna.analyze('Leche DE La Serenísima'), data));
    test.ok(areEqual(anna.analyze('Queso la serenisima'), data));
    test.ok(areEqual(anna.analyze('Leche LA serenisima'), data));
    test.ok(areEqual(anna.analyze('Serenísima queso'), data));
    test.ok(areEqual(anna.analyze('Serenísima leche'), data));
    test.ok(areEqual(anna.analyze('Yogurt serenisima'), data));
    test.ok(areEqual(anna.analyze('Leche serenisima'), data));
};

exports['analyze and get not used words'] = function (test) {
    anna.clear();
    anna.discard(['el', 'los', 'la', 'de']);
    var data = { brand: 'La Serenísima' };
    anna.define('La Serenísima', data);
    test.ok(areEqual(anna.analyze('foo', { notused: true } ), { notused: 'foo' }));
    test.ok(areEqual(anna.analyze('Queso La El Los DE Serenísima', { notused: true } ), { brand: 'La Serenísima', notused: 'queso' }));
};
