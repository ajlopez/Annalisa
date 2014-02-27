
var normalize = require('../lib/normalize');

exports['normalize simple lower case word'] = function (test) {
    var result = normalize('foo');
    test.ok(result);
    test.equal(result, 'foo');
};

exports['normalize upper case word'] = function (test) {
    var result = normalize('FOO');
    test.ok(result);
    test.equal(result, 'foo');
};

exports['normalize mixed case word'] = function (test) {
    var result = normalize('Foo');
    test.ok(result);
    test.equal(result, 'foo');
};

exports['normalize removing initial spaces'] = function (test) {
    var result = normalize('  Foo');
    test.ok(result);
    test.equal(result, 'foo');
};

exports['normalize removing initial spaces and tabs'] = function (test) {
    var result = normalize('  \t\t   Foo');
    test.ok(result);
    test.equal(result, 'foo');
};

exports['normalize removing final spaces'] = function (test) {
    var result = normalize('Foo   ');
    test.ok(result);
    test.equal(result, 'foo');
};

exports['normalize removing final spaces and tabs'] = function (test) {
    var result = normalize('Foo  \t\t   ');
    test.ok(result);
    test.equal(result, 'foo');
};

exports['normalize Spanish special letters'] = function (test) {
    var result = normalize('áéíóúñÑü');
    test.ok(result);
    test.equal(result, 'aeiounnu');
};

exports['normalize multiple spaces'] = function (test) {
    var result = normalize('  foo    bar   ');
    test.ok(result);
    test.equal(result, 'foo bar');
};

exports['discard words'] = function (test) {
    normalize.discard('the');
    normalize.discard('  OF ');
    test.equal(normalize('the dog'), 'dog');;
    test.equal(normalize('house of cards'), 'house cards');;
    test.equal(normalize('house of of of the cards the'), 'house cards');;
};

exports['letters and digits'] = function (test) {
    test.equal(normalize('B2'), 'b2');
    test.equal(normalize('1lt'), '1 lt');
    test.equal(normalize('1kg.'), '1 kg');
};

exports['numbers with point or comma'] = function (test) {
    test.equal(normalize('1.5 lt'), '1.5 lt');
    test.equal(normalize('1,5 kg.'), '1.5 kg');
};
