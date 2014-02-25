
var anna = require('../../..');

anna.discard(['la','el','las','los','de','en','mi','del']);

anna.define('caja', { contenedor: 'caja' });
anna.define('sobre', { contenedor: 'sobre' });

anna.define(['pack', anna.Integer], { contenedor: 'pack', numero: '${Integer}' });
anna.define([anna.Integer, 'lt'], { tamanio: '${Integer}', unidad: 'litro' });
anna.define([anna.Integer, 'cc'], { tamanio: '${Integer}', unidad: 'centimetros cubicos' });
anna.define([anna.Integer, 'gr'], { peso: '${Integer}', unidad: 'gramo' });
anna.define([anna.Integer, 'kg'], { peso: '${Integer}', unidad: 'kilogramo' });

var categorias = require('./categorias.json');
var productos = require('./productos.json');

categorias.forEach(function (categoria) {
    var ncategoria = categoria;
    
    if (categoria.length && categoria[categoria.length - 1] == 's')
        ncategoria = categoria.substring(0, categoria.length - 1);
        
    anna.define(ncategoria, { categoria: categoria });
});

productos.forEach(function (producto) {
    console.log(producto);
    console.dir(anna.analyze(producto));
});