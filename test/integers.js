
var integers = require('../lib/integers');

function areEqual(obj1, obj2) {
    if (Object.keys(obj1).length != Object.keys(obj2).length)
        return false;
        
    for (var n in obj1)
        if (obj1[n] != obj2[n])
            return false;
            
    return true;
}

exports['get no integer'] = function (test) {
    var result = integers('foo');
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 0);
};

exports['get simple integer'] = function (test) {
    var result = integers('42');
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.ok(areEqual(result[0], { value: 42, length: 2, position: 0 }));
};

exports['get integer with word'] = function (test) {
    var result = integers('42gr');
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.ok(areEqual(result[0], { value: 42, length: 2, position: 0 }));
};

exports['get integer in phrase'] = function (test) {
    var result = integers('weight 42gr');
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.ok(areEqual(result[0], { value: 42, length: 2, position: 7 }));
};
