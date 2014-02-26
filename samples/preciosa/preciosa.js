
var anna = require('../..');

var marcas = [];
var fabricantes = [];
var categorias = [];

function initialize() {
    anna.clear();
    anna.discard(require('./discard.json'));
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
}

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

