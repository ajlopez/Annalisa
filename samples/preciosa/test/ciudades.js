
var preciosa = require('../preciosa');

exports['initialize'] = function (test) {
    test.equal(preciosa.initialize(), null);

};

exports['Load cities'] = function (test) {
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

exports['Search city'] = function (test) {
    var result = preciosa.search('ezpeleta');
    console.dir(result);
    test.ok(result);
    test.ok(result.length);
    
    var item = result[0];
    
    test.equal(item.value, 'Ezpeleta');
    test.ok(item.data);
    test.ok(item.data.id);
    test.equal(item.data.provincia, 'Buenos Aires');
    test.equal(item.data.pais, 'Argentina');
};

exports['Extract city from string'] = function (test) {
    var result = preciosa.analyze('I visited ezpeleta');
    console.dir(result);
    test.ok(result);
    test.ok(result.ciudad);
    
    test.equal(result.ciudad, 'Ezpeleta');
    test.ok(result.ciudadid);
    test.equal(result.provincia, 'Buenos Aires');
    test.equal(result.pais, 'Argentina');
};


