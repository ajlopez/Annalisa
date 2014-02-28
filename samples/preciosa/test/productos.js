
var preciosa = require('../preciosa');

exports['initialize'] = function (test) {
    test.equal(preciosa.initialize(), null);
};

exports['Load products'] = function (test) {    preciosa.loadProductos();        var result = preciosa.getProducto(1);        test.ok(result);    test.equal(result.id, 1);    test.ok(result.nombre);    test.ok(result.upc);};
