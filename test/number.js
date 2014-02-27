
var anna = require('..');

anna.clear();

function areEqual(obj1, obj2) {
    if (Object.keys(obj1).length != Object.keys(obj2).length)
        return false;
        
    for (var n in obj1)
        if (obj1[n] != obj2[n])
            return false;
            
    return true;
}

exports['get weigth'] = function (test) {
    anna.define([anna.Number, 'gr'], { weight: '${Number}', unit: 'gram' });
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Blue Cheese 800gr'), { weight: 800, unit: 'gram' }));
}

exports['get weigth with decimals'] = function (test) {
    anna.define([anna.Number, 'kg'], { weight: '${Number}', unit: 'kilogram' });
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Blue Cheese 0.800kg'), { weight: 0.8, unit: 'kilogram' }));
}

exports['get bedrooms and bathrooms'] = function (test) {
    anna.define([anna.Number, 'bedrooms'], { bedrooms: '${Number}' });
    anna.define([anna.Number, 'bathrooms'], { bathrooms: '${Number}' });
    anna.define([anna.Number, 'bedroom'], { bedrooms: '${Number}' });
    anna.define([anna.Number, 'bathroom'], { bathrooms: '${Number}' });
    
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('1 bedroom, 1 bathroom'), { bedrooms: 1, bathrooms: 1 }));
    test.ok(areEqual(anna.analyze('2 bedrooms, 3 bathrooms'), { bedrooms: 2, bathrooms: 3 }));
}

exports['get temperature'] = function (test) {
    anna.define([anna.Number, 'C'], { temperature: '${Number}', scale: 'Celsius' });
    anna.define([anna.Number, 'F'], { temperature: '${Number}', scale: 'Farenheit' });
    
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Buenos Aires 42c'), { temperature: 42, scale: 'Celsius' }));
    test.ok(areEqual(anna.analyze('Helium at 0F'), { temperature: 0, scale: 'Farenheit' }));
}

exports['get temperature with decimals'] = function (test) {
    anna.define([anna.Number, 'C'], { temperature: '${Number}', scale: 'Celsius' });
    anna.define([anna.Number, 'F'], { temperature: '${Number}', scale: 'Farenheit' });
    
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Buenos Aires 42.5c'), { temperature: 42.5, scale: 'Celsius' }));
    test.ok(areEqual(anna.analyze('Helium at 0.6F'), { temperature: 0.6, scale: 'Farenheit' }));
}

exports['get integer after match'] = function (test) {
    anna.define(['players', anna.Number], { players: '${Number}' });
    anna.define(['boards', anna.Number], { boards: '${Number}' });
    
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Players 10'), { players: 10 }));
    test.ok(areEqual(anna.analyze('Boards 2'), { boards: 2 }));
    test.ok(areEqual(anna.analyze('Players 42 Boards 3'), { players: 42, boards: 3 }));
}

exports['get number with decimals after match'] = function (test) {
    anna.define(['money', anna.Number], { money: '${Number}' });
    
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Money 10.5'), { money: 10.5 }));
}
