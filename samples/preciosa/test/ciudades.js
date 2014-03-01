
var preciosa = require('../preciosa');

exports['initialize'] = function (test) {
    test.equal(preciosa.initialize(), null);

};

exports['Load products'] = function (test) {
    preciosa.loadCiudades();
    
    var result = preciosa.getCiudad(1);
    
    test.ok(result);
    test.equal(result.id, 1);

    console.dir(result);
    test.ok(result.nombre);
    test.ok(result.provincia);
    test.ok(result.pais);

    test.ok(result.geonameid);
    test.ok(result.longitud);
    test.ok(result.latitud);
    
    test.equal(result.provincia, 'Buenos Aires');
    test.equal(result.pais, 'Argentina');
};

