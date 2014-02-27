

function simplify(text) {
    var l = text.length;
    var result = '';
    
    for (var k = 0; k < l; k++) {
        var ch = text[k];
        
        if (isVowel(ch)) {
            if (result == '')
                result += '_';
            continue;
        }
        
        if (k == l - 1)
            continue;
            
        if (k && text[k - 1] == ch)
            continue;
        
        result += ch;
    }
    
    return result;
}

function isVowel(ch) {
    return "aeiou".indexOf(ch) >= 0;
}

module.exports = simplify;