
function integers(text, decimals) {
    var result = [];
    var length = text.length;
    var number = '';
    var hasdecimals = false;
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
        else if (decimals && !hasdecimals && ch == '.') {
            number += ch;
            hasdecimals = true;
            continue;
        }
        else if (number.length > 0) {
            var value;
            
            if (hasdecimals)
                value = parseFloat(number);
            else
                value = parseInt(number);
                
            result.push({ value: value, position: position, length: number.length });    
            number = '';
            hasdecimals = false;
        }
    }
    
    if (number.length > 0) {
        var value;
        
        if (hasdecimals)
            value = parseFloat(number);
        else
            value = parseInt(number);
        
        result.push({ value: value, position: position, length: number.length });
    }
        
    return result;
}

function isDigit(ch) {
    return ch >= '0' && ch <= '9';
}

module.exports = integers;

