
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
    anna.defineRule('cheese', data);
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Blue Cheese'), data));
    test.ok(areEqual(anna.analyze('Cheese 800gr'), data));
};

exports['analyze null, empty string, spaces'] = function (test) {
    var data = { category: 'dairy', type: 'cheese' };
    anna.defineRule('cheese', data);
    test.ok(areEqual(anna.analyze(null), { }));
    test.ok(areEqual(anna.analyze(''), { }));
    test.ok(areEqual(anna.analyze('   '), { }));
};

exports['analyze Spanish brand'] = function (test) {
    var data = { brand: 'La Serenísima' };
    anna.defineRule('La Serenísima', data);
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
    anna.defineRule('La Serenísima', data);
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
    anna.defineRule('La Serenísima', data);
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
    anna.defineRule('La Serenísima', data);
    test.ok(areEqual(anna.analyze('foo', { notused: true } ), { notused: 'foo' }));
    test.ok(areEqual(anna.analyze('Queso La El Los DE Serenísima', { notused: true } ), { brand: 'La Serenísima', notused: 'queso' }));
};

exports['analyze using a function'] = function (test) {
    anna.clear();
    anna.discard(['el', 'los', 'la', 'de']);
    
    anna.defineRule(function (text) {
        return { description: text.trim() };
    });

    test.ok(areEqual(anna.analyze(' FOO  '), { description: 'foo' }));
    test.ok(areEqual(anna.analyze('Queso La El Los DE Serenísima'), { description: 'queso serenisima' }));
};

exports['analyze using a function with raw data'] = function (test) {
    anna.clear();
    anna.discard(['el', 'los', 'la', 'de']);
    
    anna.defineRule(function (text) {
        return { description: text };
    }, { raw: true });

    test.ok(areEqual(anna.analyze(' FOO  '), { description: ' FOO  ' }));
    test.ok(areEqual(anna.analyze('Queso La El Los DE Serenísima'), { description: 'Queso La El Los DE Serenísima' }));
};