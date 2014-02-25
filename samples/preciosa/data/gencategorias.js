
var fs = require('fs');

var fixturecats = require('../fixtures/categorias.json');

var categorias = [];

fixturecats.forEach(function (fcat) {
    categorias.push(fcat.fields.nombre);
//    console.log(fcat.fields.nombre);
});

var text = JSON.stringify(categorias, null, 4);
fs.writeFileSync('categorias.json', text);
