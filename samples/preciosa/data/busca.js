
var anna = require('../../..');

anna.discard(['la','el','las','los','de','en','mi','del']);

var categorias = require('./categorias.json');
var productos = require('./productos.json');

categorias.forEach(function (categoria) {
    anna.add(categoria);
});

productos.forEach(function (producto) {
    anna.add(producto);
});

console.dir(anna.search(process.argv[2]));
