
function integers(text) {
    var result = [];
    var length = text.length;
    var number = '';
    var position = 0;
    
    for (var k = 0; k < length; k++) {
        var ch = text[k];
        
        if (isDigit(ch)) {
            if (number.length > 0) {
                number += ch;
                continue;
            }
            
            position = k;
            number = ch;
        }
        else if (number.length > 0) {
            result.push({ value: parseInt(number), position: position, length: number.length });
            number = '';
        }
    }
    
    if (number.length > 0)
        result.push({ value: parseInt(number), position: position, length: number.length });
        
    return result;
}

function isDigit(ch) {
    return ch >= '0' && ch <= '9';
}

module.exports = integers;

