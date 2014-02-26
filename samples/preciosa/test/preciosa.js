
var preciosa = require('../preciosa');

exports['initialize'] = function (test) {
    test.equal(preciosa.initialize(), null);
};

exports['load brands and companies'] = function (test) {
    preciosa.loadMarcasFabricantes();
    
    var marca = preciosa.getMarca(1);
    test.ok(marca);
    test.equal(marca.id, 1);
    test.equal(marca.nombre, 'Coca Cola');
    test.equal(marca.fabricanteid, 1);
    
    var fabricante = preciosa.getFabricante(1);
    test.ok(fabricante);
    test.equal(fabricante.id, 1);
    test.equal(fabricante.nombre, 'Coca-Cola de Argentina');
};

exports['Retrieve company'] = function (test) {
    var result = preciosa.search('argentina cola coca');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.ok(result.length);

};

exports['Retrieve brand'] = function (test) {
    var result = preciosa.search('fanta');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.ok(result.length);
};

exports['Load categories'] = function (test) {
    preciosa.loadCategorias();
    
    var result = preciosa.getCategoria(2);
    
    test.ok(result);
    test.equal(result.id, 2);
    test.equal(result.nombre, 'Almacen');
};
exports['Retrieve category'] = function (test) {    var result = preciosa.search('almacen');        test.ok(result);    test.ok(Array.isArray(result));
    test.ok(result.length);
};

exports['Analyze company'] = function (test) {
    var result = preciosa.analyze('coca cola argentina');
    
    test.ok(result);
    test.equal(result.fabricanteid, 1);
    test.equal(result.fabricante, 'Coca-Cola de Argentina');
};