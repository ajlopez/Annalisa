
var simplify = require('../lib/simplify');

exports['simplify empty string'] = function (test) {
    test.equal(simplify(''), '');
};

exports['simplify word with vowels'] = function (test) {
    test.equal(simplify('aeiou'), '_');
};

exports['simplify words with vowels and consonants'] = function (test) {
    test.equal(simplify('house'), 'hs');
    test.equal(simplify('area'), '_r');
};

exports['simplify words with repeated consonant'] = function (test) {
    test.equal(simplify('garra'), 'gr');
    test.equal(simplify('llama'), 'lm');
    test.equal(simplify('immediate'), '_mdt');
};

exports['simplify words removing consonant at end'] = function (test) {
    test.equal(simplify('guardian'), 'grd');
    test.equal(simplify('sister'), 'sst');
    test.equal(simplify('robot'), 'rb');
};

exports['simplify words with strong and soft c'] = function (test) {
    test.equal(simplify('card'), 'kr');
    test.equal(simplify('cease'), 'ss');
    test.equal(simplify('credential'), 'krdnt');
};

exports['simplify words with v and b'] = function (test) {
    test.equal(simplify('baby'), 'bb');
    test.equal(simplify('valve'), 'blb');
};

exports['simplify words with q'] = function (test) {
    test.equal(simplify('query'), 'kr');
    test.equal(simplify('disqualify'), 'dsklf');
};
