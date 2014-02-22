
function removeInitialWhitespaces(text) {
    var l = text.length;
    
    for (k = 0; k < l; k++)
        if (text[k] != ' ')
            break;
            
    return text.substring(k);
}

function normalize(text) {
    text = text.toLowerCase();    
    text = removeInitialWhitespaces(text);
    
    return text;
}

module.exports = normalize;

