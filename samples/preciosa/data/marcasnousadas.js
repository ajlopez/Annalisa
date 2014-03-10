
var preciosa = require('../preciosa'),
    fs = require('fs');

preciosa.initialize();
console.log('Loading data...');
preciosa.loadMarcasFabricantes();
preciosa.loadCategorias();
preciosa.loadProductos();
preciosa.loadCiudades();

preciosa.loadRemoteMarcas(function (err, data) {
    if (err)
        console.log(err);
        
    preciosa.defineMarcasFabricantes();
    
    console.log('Analizing products...');

    var text = fs.readFileSync(process.argv[2]).toString();
    var lines = text.split(/[\r\n|\r|\n]+/);

    console.log('lines', lines.length);

    var notused = { };

    lines.forEach(function (producto) {
        var result = preciosa.analyze(producto, { notused: true });
        
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

    var marcas = { };

    for (var palabra in notused) {
        if (palabra.length <= 2)
            continue;
            
        if (notused[palabra] >= 1000)
            continue;

        var result = preciosa.search(palabra);
        
        if (result.length)
            continue;
            
        marcas[palabra] = notused[palabra];
    }

    console.dir(marcas);
});


