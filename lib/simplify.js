

function simplify(text) {
    var l = text.length;
    var result = '';
    
    for (var k = 0; k < l; k++) {
        var ch = text[k];
        
        if (isVowel(ch)) {
            if (result == '')
                result += ch;
            continue;
        }
        
        if (k == l - 1)
            continue;
            
        if (k && text[k - 1] == ch)
            continue;
            
        if (ch == 'v')
            ch = 'b';
            
        if (ch == 'q')
            ch = 'k';

        if (ch == 'z')
            ch = 's';
            
        if (ch == 'c')
            if (isSoftVowel(text[k + 1]))
                ch = 's';
            else
                ch = 'k';
                
        if (ch == 'y')
            if (!isVowel(text[k - 1]) && !isVowel(text[k + 1]))
                continue;
        
        result += ch;
    }
    
    return result;
}

function isVowel(ch) {
    if (!ch)
        return false;
        
    return "aeiou".indexOf(ch) >= 0;
}

function isSoftVowel(ch) {
    if (!ch)
        return false;
        
    return "ei".indexOf(ch) >= 0;
}

module.exports = simplify;