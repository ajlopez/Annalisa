
var preciosa = require('../preciosa');

exports['initialize'] = function (test) {
    test.equal(preciosa.initialize(), null);
};

exports['Load brands, companies'] = function (test) {
    preciosa.loadMarcasFabricantes();
    
    var result = preciosa.getMarca(1);
    
    test.ok(result);
    test.equal(result.id, 1);
    test.ok(result.nombre);
    test.ok(result.fabricanteid);

    result = preciosa.getFabricante(result.fabricanteid);
    
    test.ok(result);
    test.ok(result.id);
    test.ok(result.nombre);
};

exports['Load remote brands'] = function (test) {
    test.async();
    
    preciosa.loadRemoteMarcas(function (err, data) {
        test.equal(err, null);
        test.done();
    });
};


