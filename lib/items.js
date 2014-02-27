
var normalize = require('./normalize'),
    simplify = require('./simplify');

var items = [];
var keyvalues = { };

function clear() {
    items = [];
    keyvalues = { };
}

function searchByKey(key) {
    if (keyvalues[key])
        return keyvalues[key];
        
    var skey = simplify(key);
    
    if (keyvalues[skey])
        return keyvalues[skey];
        
    return [];
}

function intersect(sets) {
    var result = [];
    var l = sets.length;
    
    if (!l)
        return result;
    
    if (l == 1)
        return sets[0];
        
    var set = sets[0];
    
    for (var n in set) {
        var item = set[n];
        var inall = true;
        
        for (var k = 1; k < l; k++)
            if (sets[k].indexOf(item) < 0) {
                inall = false;
                break;
            }
            
        if (inall)
            result.push(item);
    }
    
    return result;
}

function search(text) {
    var ntext = normalize(text);
    var keys = split(ntext);
    var sets = [];
    
    keys.forEach(function(key) {
        sets.push(searchByKey(key));
    });
    
    return intersect(sets);
}

function add(value, data) {
    var item = { value: value };
    
    if (data)
        item.data = data;
    
    items.push(item);

    assoc(value, item);
    
    if (data && typeof data == 'object')
        for (var n in data) {
            var val = data[n];
            
            if (typeof val == 'string')
                assoc(val, item);
        }
}

function assoc(value, item) {
    var nvalue = normalize(value);
    var keys = split(nvalue);
    
    keys.forEach(function (key) {    
        if (!keyvalues[key])
            keyvalues[key] = [];
        
        keyvalues[key].push(item);
        
        var skey = simplify(key);
        
        if (skey == key || skey.length < 2)
            return;
            
        if (!keyvalues[skey])
            keyvalues[skey] = [];
        
        keyvalues[skey].push(item);
    });
}

function split(words) {
    var result = [];
    
    for (var position = words.indexOf(' '); position >= 0; position = words.indexOf(' ')) {
        var word = words.substring(0, position);
        result.push(word);
        words = words.substring(position + 1);
    }
    
    if (words)
        result.push(words);
    
    return result;
}

module.exports = {
    search: search,
    add: add,
    clear: clear
};

