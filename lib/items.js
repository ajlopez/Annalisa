
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
    
    var key = normalize(value);
    
    if (!keyvalues[key])
        keyvalues[key] = [];
        
    keyvalues[key].push(item);
}

module.exports = {
    search: search,
    add: add,
    clear: clear
};

