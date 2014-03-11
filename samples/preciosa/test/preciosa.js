
var preciosa = require('../preciosa');

exports['initialize'] = function (test) {
    test.equal(preciosa.initialize(), null);
};

exports['load brands and companies'] = function (test) {
    preciosa.loadMarcasFabricantes();
    preciosa.defineMarcasFabricantes();
    
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

exports['Retrieve mispelled brand'] = function (test) {
    var result = preciosa.search('fonta');
    
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

exports['Analyze category'] = function (test) {
    var result = preciosa.analyze('tablas de madera');
    
    test.ok(result);
    test.equal(result.categoriaid, 344);
    test.equal(result.categoria, 'Tablas de madera');
};

exports['Analyze brand'] = function (test) {
    var result = preciosa.analyze('coca cola');
    
    test.ok(result);
    test.equal(result.marcaid, 1);
    test.equal(result.marca, 'Coca Cola');
    test.equal(result.fabricanteid, 1);
    test.equal(result.fabricante, 'Coca-Cola de Argentina');
};

exports['Analyze category with product in singular'] = function (test) {
    var result = preciosa.analyze('aceite');
    
    test.ok(result);
    test.equal(result.categoriaid, 623);
    test.equal(result.categoria, 'Aceites');
};

exports['Analyze category with product in plural'] = function (test) {
    var result = preciosa.analyze('aceites');
    
    test.ok(result);
    test.equal(result.categoriaid, 623);
    test.equal(result.categoria, 'Aceites');
};

exports['Analyze category with product in singular and e vowel'] = function (test) {
    var result = preciosa.analyze('colchon');
    
    test.ok(result);
    test.equal(result.categoriaid, 331);
    test.equal(result.categoria, 'Colchones y sommier');
};
exports['Analyze liter'] = function (test) {    var result = preciosa.analyze('1 lt');        test.ok(result);    test.equal(result.volumen, 1);    test.equal(result.unidad_volumen, 'litro');};exports['Analyze liters'] = function (test) {    var result = preciosa.analyze('10 lts');        test.ok(result);    test.equal(result.volumen, 10);    test.equal(result.unidad_volumen, 'litro');};exports['Analyze liters with decimal point'] = function (test) {
    var result = preciosa.analyze('2.5 lts');
    
    test.ok(result);
    test.equal(result.volumen, 2.5);
    test.equal(result.unidad_volumen, 'litro');
};

exports['Analyze liters with comma as decimal point'] = function (test) {
    var result = preciosa.analyze('2,5 lts');
    
    test.ok(result);
    test.equal(result.volumen, 2.5);
    test.equal(result.unidad_volumen, 'litro');
};

exports['Analyze gram'] = function (test) {
    var result = preciosa.analyze('1 gr');
    
    test.ok(result);
    test.equal(result.peso, 1);
    test.equal(result.unidad_peso, 'gramo');
};

exports['Analyze grams'] = function (test) {
    var result = preciosa.analyze('10 grs');
    
    test.ok(result);
    test.equal(result.peso, 10);
    test.equal(result.unidad_peso, 'gramo');
};

exports['Analyze units'] = function (test) {
    var result = preciosa.analyze('10 un');
    
    test.ok(result);
    test.equal(result.unidades, 10);
    test.equal(result.unidad, 'unidad');

    var result = preciosa.analyze('30 ud');
    
    test.ok(result);
    test.equal(result.unidades, 30);
    test.equal(result.unidad, 'unidad');

    var result = preciosa.analyze('40 und');
    
    test.ok(result);
    test.equal(result.unidades, 40);
    test.equal(result.unidad, 'unidad');

    var result = preciosa.analyze('50u');
    
    test.ok(result);
    test.equal(result.unidades, 50);
    test.equal(result.unidad, 'unidad');

    var result = preciosa.analyze('5unid');
    
    test.ok(result);
    test.equal(result.unidades, 5);
    test.equal(result.unidad, 'unidad');
};

exports['Analyze square meters'] = function (test) {
    var result = preciosa.analyze('10m2');
    
    test.ok(result);
    test.equal(result.area, 10);
    test.equal(result.unidad_area, 'metro cuadrado');

    var result = preciosa.analyze('30 mt2');
    
    test.ok(result);
    test.equal(result.area, 30);
    test.equal(result.unidad_area, 'metro cuadrado');

    var result = preciosa.analyze('40 mts2');
 
    test.ok(result);
    test.equal(result.area, 40);
    test.equal(result.unidad_area, 'metro cuadrado');
};

exports['Analyze code'] = function (test) {
    var result = preciosa.analyze('4008410;HUEVO KINDER 20GR.C/SORPRESA;20;Gr;48;Des');
    
    test.ok(result);
    test.equal(result.codigo, '4008410');

    var result = preciosa.analyze('779004058990;ARCOR CEREAL MIX 180GR.AV/GRAN;180;Gr;25;Hab');
    
    test.ok(result);
    test.equal(result.codigo, '779004058990');
};

exports['Normalize description'] = function (test) {
    var result = preciosa.analyze('HUEVO KINDER 20GR.C/SORPRESA');
    
    test.ok(result);
    test.equal(result.descripcion, 'Huevo Kinder 20 gr c/Sorpresa');
    
    var result = preciosa.analyze('4008410;HUEVO KINDER 20GR.C/SORPRESA;20;Gr;48;Des');
    
    test.ok(result);
    test.equal(result.descripcion, 'Huevo Kinder 20 gr c/Sorpresa');
};
