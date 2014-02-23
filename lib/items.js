
var normalize = require('./normalize');

var items = [];
var keyvalues = { };

function clear() {
    items = [];
    keyvalues = { };
}

function search(text) {
    var key = normalize(text);
    
    if (keyvalues[key])
        return keyvalues[key];
        
    return [];
}

function add(value) {
    var item = { value: value };
    
    items.push(item);
    
    var nvalue = normalize(value);
    var keys = split(nvalue);
    
    keys.forEach(function (key) {    
        if (!keyvalues[key])
            keyvalues[key] = [];
        
        keyvalues[key].push(item);
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

