
var anna = require('../../..');

anna.discard(['la','el','las','los','de','en','mi','del']);

anna.define('caja', { contenedor: 'caja' });
anna.define('sobre', { contenedor: 'sobre' });

anna.define(['pack', anna.Integer], { contenedor: 'pack', numero: '${Integer}' });
anna.define([anna.Integer, 'lt'], { tamanio: '${Integer}', unidad: 'litro' });
anna.define([anna.Integer, 'ml'], { tamanio: '${Integer}', unidad: 'mililitro' });
anna.define([anna.Integer, 'cc'], { tamanio: '${Integer}', unidad: 'centimetros cubicos' });
anna.define([anna.Integer, 'gr'], { peso: '${Integer}', unidad: 'gramo' });
anna.define([anna.Integer, 'kg'], { peso: '${Integer}', unidad: 'kilogramo' });

var categorias = require('./categorias.json');
var productos = require('./productos.json');

categorias.forEach(function (categoria) {
    defineCategoria(categoria);
});

function defineCategoria(categoria) {
    var posy = categoria.indexOf(" y ");
    
    if (posy > 0) {
        defineCategoria(categoria.substring(0, posy));
        defineCategoria(categoria.substring(posy + 3));
        return;
    }
    
    var posbar = categoria.indexOf("/");
    
    if (posbar > 0) {
        defineCategoria(categoria.substring(0, posbar));
        defineCategoria(categoria.substring(posbar + 1));
        return;
    }

    categoria = categoria.trim();
    
    var ncategoria = categoria;
    
    ncategoria = ncategoria.replace(/nes /g, "n");
    ncategoria = ncategoria.replace(/des /g, "d");
    ncategoria = ncategoria.replace(/nes$/g, "n");
    ncategoria = ncategoria.replace(/des$/g, "d");
    ncategoria = ncategoria.replace(/s /g, "");
    ncategoria = ncategoria.replace(/s$/g, "");
        
    anna.define(ncategoria, { categoria: categoria });
};

productos.forEach(function (producto) {
    console.log(producto);
    console.dir(anna.analyze(producto));
});