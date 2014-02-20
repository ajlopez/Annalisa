
var rules = [];

function define(input, produce) {
    rules.push(makeMatch(input, produce));
}

function makeMatch(text, produce) {
    return function (data) {
        if (data == text)
            return produce;
    }
}

function analyze(text) {
    text = text.toLowerCase();
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



module.exports = {
    analyze: analyze,
    define: define
};