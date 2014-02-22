
function removeInitialWhitespaces(text) {
    var l = text.length;
    
    for (k = 0; k < l; k++)
        if (text[k] != ' ' && text[k] != '\t')
            break;
            
    return text.substring(k);
}

function removeFinalWhitespaces(text) {
    var l = text.length;
    
    for (k = l; k--;)
        if (text[k] != ' ' && text[k] != '\t')
            break;
            
    return text.substring(0, k + 1);
}

function normalize(text) {
    text = text.toLowerCase();    
    text = removeInitialWhitespaces(text);
    text = removeFinalWhitespaces(text);
    
    return text;
}

module.exports = normalize;

