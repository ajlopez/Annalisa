
function normalize(text) {
    text = text.toLowerCase();
    
    var length = text.length;
    var result = '';
    var wasspace = true;
    
    for (var k = 0; k < length; k++) {
        var ch = text[k];
        
        ch = convertSpanishLetter(ch);
        
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
            
        result += ch;
        wasspace = false;
    }
    
    return result;
}

function convertSpanishLetter(ch) {
    var position = "áéíóúñü".indexOf(ch);
    
    if (position < 0)
        return ch;
        
    return "aeiounu"[position];
}

function isWhiteSpace(ch) {
    return ch.charCodeAt(0) <= 20;
}

function isLetterDigit(ch) {
    return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch >= '0' && ch <= '9';
}

module.exports = normalize;

