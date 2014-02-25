
var fs = require('fs');

var fixtureprods = require('../fixtures/productos.json');

var productos = [];

fixtureprods.forEach(function (fprod) {
    productos.push(fprod.fields.descripcion);
//    console.log(fprod.fields.descripcion);
});

var text = JSON.stringify(productos, null, 4);
fs.writeFileSync('productos.json', text);
