
var normalize = require('./normalize');
var integers = require('./integers');
var items = require('./items');

var rules = [];

var Integer = 1;
var Number = 2;

function defineRule(input, produce) {
    if (typeof input == 'function') {
        if (produce && produce.raw)
            rules.push({ raw: true, fn: input });
        else
            rules.push(input);
            
        return;
    }
        
    if (Array.isArray(input) && input.length == 2) {
        if (input[0] == Integer) {
            rules.push(makeIntegerMatch(normalize(input[1]), produce));
            return;
        }

        if (input[1] == Integer) {
            rules.push(makeIntegerPostMatch(normalize(input[0]), produce));
            return;
        }

        if (input[0] == Number) {
            rules.push(makeNumberMatch(normalize(input[1]), produce));
            return;
        }

        if (input[1] == Number) {
            rules.push(makeNumberPostMatch(normalize(input[0]), produce));
            return;
        }
    }
    
    rules.push(makeMatch(normalize(input), produce));
}

function makeMatch(text, produce) {
    text = ' ' + text + ' ';
    return function (data, options) {
        var pos = data.indexOf(text);
        
        if (pos >= 0) {
            if (options && options.used) {
                var newproduce = { };
                
                for (var n in produce)
                    newproduce[n] = produce[n];
                    
                newproduce.used = [ pos + 1, text.length - 2];
                
                return newproduce;
            }
            
            return produce;
        }
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

function makeNumberMatch(text, produce) {
    text = ' ' + text + ' ';
    var length = text.length;
    
    return function (data) {
        var numvals = integers(data, true);
        var l = numvals.length;
        
        for (var k = 0; k < l; k++) {
            var numval = numvals[k];
            var subdata = data.substring(numval.position + numval.length);
            
            if (subdata.substring(0, length) == text)
                return numberObject(produce, numval.value);
        }
    }
}

function makeNumberPostMatch(text, produce) {
    text = ' ' + text + ' ';
    var length = text.length;
    
    return function (data) {
        var numvals = integers(data, true);
        var l = numvals.length;
        
        for (var k = 0; k < l; k++) {
            var numval = numvals[k];
            var subdata = data.substring(0, numval.position);
            
            if (subdata.length < length)
                continue;
            
            if (subdata.substring(subdata.length - length) == text)
                return numberObject(produce, numval.value);
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

function numberObject(obj, value) {
    var result = { };
    
    for (var n in obj)
        if (obj[n] == '${Number}')
            result[n] = value;
        else
            result[n] = obj[n];
            
    return result;
}

function analyze(text, options) {
    if (!text)
        return { };

    var raw = text;
        
    options = options || {};
    text = ' ' + normalize(text) + ' ';
    
    if (!text.trim())
        return { };
    
    var result = { };
    var nrules = rules.length;
    var used = [];
    
    var ruleoptions = null;
    
    if (options.notused)
        ruleoptions = { used: true };
    
    for (var k = 0; k < nrules; k++) {
        var rule = rules[k];
        var produce;
        
        if (typeof rule == 'object') {
            if (rule.raw)
                produce = rule.fn(raw, ruleoptions);
            else
                produce = rule.fn(text, ruleoptions);
        }
        else
            produce = rule(text, ruleoptions);
        
        if (!produce)
            continue;
            
        if (produce.used)
            used.push(produce.used);
            
        for (n in produce) {
            if (result[n]) {
                if (result[n].length && produce[n].length && result[n].length > produce[n].length)
                    continue;
            }
            result[n] = produce[n];
        }
    }
    
    if (options.notused) {
        for (var k = 0; k < used.length; k++) {
            var pos = used[k][0];
            var len = used[k][1];
            
            var spaces = Array(len).join(" ");
            text = text.substring(0, pos) + spaces + text.substring(pos + len);
        }
        
        result.notused = text.trim();
        delete result.used;
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
    defineRule: defineRule,
    discard: discard,
    clear: clear,
    add: add,
    search: search,
    Integer: Integer,
    Number: Number
};

