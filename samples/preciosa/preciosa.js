
var anna = require('../..');

var marcas = [];
var fabricantes = [];
var categorias = [];

function initialize() {
    anna.clear();
    anna.discard(require('./discard.json'));
    
    var reglas = require('./reglas.json');

    reglas.forEach(function (regla) {
        anna.define(regla.dato, regla.produce);
    });
}

function loadMarcasFabricantes() {
    var data = require('./fixtures/marcas.json');
    
    data.forEach(function (row) {
        if (row.model == 'precios.empresafabricante')
            addFabricante(row);
        else if (row.model == 'precios.marca')
            addMarca(row);
    });
}

function addFabricante(row) {
    var item = {
        id: row.pk,
        nombre: row.fields.nombre,
        logo: row.fields.logo
    };
    
    fabricantes[item.id] = item;

    var item2 = {
        id: row.pk,
        logo: row.fields.logo,
        tipo: 'fabricante'
    };

    anna.add(item.nombre, item2);
    
    anna.define(item.nombre, { fabricante: item.nombre, fabricanteid: item.id });
}

function addMarca(row) {
    var item = {
        id: row.pk,
        nombre: row.fields.nombre,
        fabricanteid: row.fields.fabricante
    };
    
    marcas[item.id] = item;
    
    var item2 = {
        id: row.pk,
        fabricanteid: row.fields.fabricante,
        tipo: 'marca'
    };
    
    anna.add(item.nombre, item2);
    
    var associtem = { marca: item.nombre, marcaid: item.id };
    
    if (item.fabricanteid)
        associtem.fabricanteid = item.fabricanteid;
        
    if (item.fabricanteid && fabricantes[item.fabricanteid])
        associtem.fabricante = fabricantes[item.fabricanteid].nombre;
    
    anna.define(item.nombre, associtem);
}

function loadCategorias() {
    var data = require('./fixtures/categorias.json');
    
    data.forEach(function (row) {
        if (row.model == 'precios.categoria')
            addCategoria(row);
    });
}

function addCategoria(row) {
    var item = {
        id: row.pk,
        nombre: row.fields.nombre
    };
    
    categorias[item.id] = item;
    
    var item2 = {
        id: row.pk,
        tipo: 'categoria'
    };
    
    anna.add(item.nombre, item2);
    defineCategoria(item.nombre, item);
}

function defineCategoria(nombre, item) {
    var posy = nombre.indexOf(" y ");
    
    if (posy > 0) {
        defineCategoria(nombre.substring(0, posy), item);
        defineCategoria(nombre.substring(posy + 3), item);
        return;
    }
    
    var posbar = nombre.indexOf("/");
    
    if (posbar > 0) {
        defineCategoria(nombre.substring(0, posbar), item);
        defineCategoria(nombre.substring(posbar + 1), item);
        return;
    }
    
    nombre = nombre.trim();
    
    var ncategoria = nombre;
    
    ncategoria = ncategoria.replace(/nes /g, "n");
    ncategoria = ncategoria.replace(/des /g, "d");
    ncategoria = ncategoria.replace(/nes$/g, "n");
    ncategoria = ncategoria.replace(/des$/g, "d");
    ncategoria = ncategoria.replace(/s /g, "");
    ncategoria = ncategoria.replace(/s$/g, "");
        
    anna.define(ncategoria, { categoria: item.nombre, categoriaid: item.id });
};

module.exports = {
    initialize: initialize,
    loadMarcasFabricantes: loadMarcasFabricantes,
    loadCategorias: loadCategorias,
    search: anna.search,
    analyze: anna.analyze,
    getFabricante: function (id) { return fabricantes[id]; },
    getMarca: function (id) { return marcas[id]; },
    getCategoria: function (id) { return categorias[id]; }
}

