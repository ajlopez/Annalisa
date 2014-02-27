
var todiscard = [];

function normalize(text) {
    text = text.toLowerCase();
    
    var length = text.length;
    var result = '';
    var wasspace = true;
    
    for (var k = 0; k < length; k++) {
        var ch = text[k];
        
        ch = convertSpanishLetter(ch);
        
        if (ch == '.' || ch == ',')
            if (k && k < length - 1 && isDigit(text[k - 1]) && isDigit(text[k + 1])) {
                result += '.';
                wasspace = false;
                continue;
            }
        
        if (isWhiteSpace(ch)) {
            wasspace = true;
            continue;
        }
        
        if (!isLetterDigit(ch)) {
            wasspace = true;
            continue;
        }
        
        if (wasspace && result.length > 0)
            result += ' ';
        else if (!isDigit(ch) && result.length > 0 && isDigit(result[result.length - 1]))
            result += ' ';
            
        result += ch;
        wasspace = false;
    }
    
    result = ' ' + result + ' ';
    
    todiscard.forEach(function(word) {
        var position = result.indexOf(word);
        
        while (position >= 0) {
            result = result.substring(0, position) + result.substring(position + word.length - 1);
            position = result.indexOf(word);
        }
    });
    
    return result.trim();
}

function convertSpanishLetter(ch) {
    var position = "áéíóúñü".indexOf(ch);
    
    if (position < 0)
        return ch;
        
    return "aeiounu"[position];
}

function isWhiteSpace(ch) {
    return ch.charCodeAt(0) <= 32;
}

function isLetterDigit(ch) {
    return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch >= '0' && ch <= '9';
}

function isDigit(ch) {
    return ch >= '0' && ch <= '9';
}

function discard(word) {
    todiscard.push(' ' + normalize(word) + ' ');
}

function clear() {
    todiscard = [];
}


normalize.discard = discard;
normalize.clear = clear;

module.exports = normalize;

