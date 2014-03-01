
var preciosa = require('../preciosa');

preciosa.initialize();
console.log('Loading data...');
preciosa.loadMarcasFabricantes();
preciosa.loadCategorias();
preciosa.loadProductos();
preciosa.loadCiudades();

console.log('Analizing products...');

var notused = { };

preciosa.getProductos().forEach(function (producto) {
    var result = preciosa.analyze(producto.nombre, { notused: true });
    
    if (!result.notused)
        return;
        
    var words = result.notused.split(/\s+/);
    
    words.forEach(function (word) {
        if (word[0] >= '0' && word[0] <= '9')
            return;
            
        if (!notused[word])
            notused[word] = 0;
            
        notused[word]++;
    });
});

console.dir(notused);
