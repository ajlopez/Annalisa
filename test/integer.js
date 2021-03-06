﻿
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
    anna.defineRule([anna.Integer, 'gr'], { weight: '${Integer}', unit: 'gram' });
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Blue Cheese 800gr'), { weight: 800, unit: 'gram' }));
}

exports['get bedrooms and bathrooms'] = function (test) {
    anna.defineRule([anna.Integer, 'bedrooms'], { bedrooms: '${Integer}' });
    anna.defineRule([anna.Integer, 'bathrooms'], { bathrooms: '${Integer}' });
    anna.defineRule([anna.Integer, 'bedroom'], { bedrooms: '${Integer}' });
    anna.defineRule([anna.Integer, 'bathroom'], { bathrooms: '${Integer}' });
    
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('1 bedroom, 1 bathroom'), { bedrooms: 1, bathrooms: 1 }));
    test.ok(areEqual(anna.analyze('2 bedrooms, 3 bathrooms'), { bedrooms: 2, bathrooms: 3 }));
}

exports['get temperature'] = function (test) {
    anna.defineRule([anna.Integer, 'C'], { temperature: '${Integer}', scale: 'Celsius' });
    anna.defineRule([anna.Integer, 'F'], { temperature: '${Integer}', scale: 'Farenheit' });
    
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Buenos Aires 42c'), { temperature: 42, scale: 'Celsius' }));
    test.ok(areEqual(anna.analyze('Helium at 0F'), { temperature: 0, scale: 'Farenheit' }));
}

exports['get integer after match'] = function (test) {
    anna.defineRule(['players', anna.Integer], { players: '${Integer}' });
    anna.defineRule(['boards', anna.Integer], { boards: '${Integer}' });
    
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Players 10'), { players: 10 }));
    test.ok(areEqual(anna.analyze('Boards 2'), { boards: 2 }));
    test.ok(areEqual(anna.analyze('Players 42 Boards 3'), { players: 42, boards: 3 }));
}
