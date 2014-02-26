
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
    var result = preciosa.search('coca cola argentina');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.ok(result.length);
};

