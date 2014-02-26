
var anna = require('../..');

var marcas = [];
var fabricantes = [];

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

module.exports = {
    initialize: initialize,
    loadMarcasFabricantes: loadMarcasFabricantes,
    search: anna.search,
    getFabricante: function (id) { return fabricantes[id]; },
    getMarca: function (id) { return marcas[id]; }
}