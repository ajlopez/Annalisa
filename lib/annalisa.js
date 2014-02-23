
var normalize = require('./normalize');
var integers = require('./integers');
var items = require('./items');

var rules = [];

var Integer = 1;

function define(input, produce) {
    if (Array.isArray(input) && input.length == 2) {
        if (input[0] == Integer) {
            rules.push(makeIntegerMatch(normalize(input[1]), produce));
            return;
        }

        if (input[1] == Integer) {
            rules.push(makeIntegerPostMatch(normalize(input[0]), produce));
            return;
        }
    }
    
    rules.push(makeMatch(normalize(input), produce));
}

function makeMatch(text, produce) {
    text = ' ' + text + ' ';
    return function (data) {
        if (data.indexOf(text) >= 0)
            return produce;
    }
}

function makeIntegerMatch(text, produce) {
    text = ' ' + text + ' ';
    var length = text.length;
    
    return function (data) {
        var intvals = integers(data);
        var l = intvals.length;
        
        for (var k = 0; k < l; k++) {
            var intval = intvals[k];
            var subdata = data.substring(intval.position + intval.length);
            
            if (subdata.substring(0, length) == text)
                return integerObject(produce, intval.value);
        }
    }
}

function makeIntegerPostMatch(text, produce) {
    text = ' ' + text + ' ';
    var length = text.length;
    
    return function (data) {
        var intvals = integers(data);
        var l = intvals.length;
        
        for (var k = 0; k < l; k++) {
            var intval = intvals[k];
            var subdata = data.substring(0, intval.position);
            
            if (subdata.length < length)
                continue;
            
            if (subdata.substring(subdata.length - length) == text)
                return integerObject(produce, intval.value);
        }
    }
}

function integerObject(obj, value) {
    var result = { };
    
    for (var n in obj)
        if (obj[n] == '${Integer}')
            result[n] = value;
        else
            result[n] = obj[n];
            
    return result;
}

function analyze(text) {
    text = ' ' + normalize(text) + ' ';
    
    var result = { };
    var nrules = rules.length;
    
    for (var k = 0; k < nrules; k++) {
        var produce = rules[k](text);
        
        if (!produce)
            continue;
            
        for (n in produce)
            result[n] = produce[n];
    }
    
    return result;
}

function discard(word) {
    if (Array.isArray(word))
        word.forEach(function (w) { discard(w); });
    else
        normalize.discard(word);
}

function clear() {
    rules = [];
    normalize.clear();
    items.clear();
}

function add(value, data) {
    items.add(value, data);
}

function search(words) {
    return items.search(words);
}

module.exports = {
    analyze: analyze,
    define: define,
    discard: discard,
    clear: clear,
    add: add,
    search: search,
    Integer: Integer
};

