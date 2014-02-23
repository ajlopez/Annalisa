
var anna = require('..');

function areEqual(obj1, obj2) {
    if (Object.keys(obj1).length != Object.keys(obj2).length)
        return false;
        
    for (var n in obj1)
        if (obj1[n] != obj2[n])
            return false;
            
    return true;
}

exports['get weigth'] = function (test) {
    anna.define([anna.Integer, 'gr'], { weight: '${Integer}', unit: 'gram' });
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('Blue Cheese 800gr'), { weight: 800, unit: 'gram' }));
}

exports['get bedrooms and bathrooms'] = function (test) {
    anna.define([anna.Integer, 'bedrooms'], { bedrooms: '${Integer}' });
    anna.define([anna.Integer, 'bathrooms'], { bathrooms: '${Integer}' });
    anna.define([anna.Integer, 'bedroom'], { bedrooms: '${Integer}' });
    anna.define([anna.Integer, 'bathroom'], { bathrooms: '${Integer}' });
    
    test.ok(areEqual(anna.analyze('foo'), { }));
    test.ok(areEqual(anna.analyze('1 bedroom, 1 bathroom'), { bedrooms: 1, bathrooms: 1 }));
    test.ok(areEqual(anna.analyze('2 bedrooms, 3 bathrooms'), { bedrooms: 2, bathrooms: 3 }));
}
