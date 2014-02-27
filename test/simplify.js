
var simplify = require('../lib/simplify');

exports['simplify empty string'] = function (test) {
    test.equal(simplify(''), '');
};

exports['simplify word with vowels'] = function (test) {
    test.equal(simplify('aeiou'), '_');
};

exports['simplify words with vowels and consonants'] = function (test) {
    test.equal(simplify('house'), 'hs');
    test.equal(simplify('guardian'), 'grdn');
    test.equal(simplify('sister'), 'sstr');
};