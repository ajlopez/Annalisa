
var preciosa = require('../preciosa');

preciosa.loadCiudades();

preciosa.getCiudades().forEach(function (ciudad) {
    if (!ciudad.geonameid)
        console.dir(ciudad);
});