
var items = [];

function search(text) {
    var result = [];
    
    items.forEach(function (item) {
        if (item.value == text)
            result.push(item);
    });
    
    return result;
}

function add(value) {
    items.push({ value: value });
}

module.exports = {
    search: search,
    add: add
};