﻿
var anna = require('../..');
var http = require('http');

var marcas = [];
var fabricantes = [];
var categorias = [];
var productos = [];
var ciudades = [];

function initialize() {
    anna.clear();
    anna.discard(require('./discard.json'));
    
    var reglas = require('./reglas.json');

    reglas.forEach(function (regla) {
        anna.defineRule(regla.dato, regla.produce);
    });
    
    anna.defineRule(codeRule);
    anna.defineRule(descriptionRule, { raw: true });
}

function codeRule(text) {
    var codes = text.match(/\d+/g);
    
    if (!codes || !codes.length)
        return { };
    
    for (var k = 0; k < codes.length; k++)
        if (codes[k].length >= 6)
            return { codigo: codes[k] };
        
    return { };
}

function descriptionRule(text) {
    var pos = text.indexOf(';');
    
    if (pos >= 0)
        text = text.substring(pos + 1);
        
    pos = text.indexOf(';');
    
    if (pos >= 0)
        text = text.substring(0, pos);
        
    text = anna.normalize(text, { nodiscard: true, preserve: '/' });
    
    for (var k = 0; k < text.length; k++) {
        var ch = text[k];
        
        if (!isLetter(ch))
            continue;
            
        if (k == 0 || (!isLetter(text[k - 1]) && isLetter(text[k + 1]) && isLetter(text[k + 2]))) {
            ch = ch.toUpperCase();
            text = text.substring(0, k) + ch + text.substring(k + 1);
        }
    }
    
    text = text.trim();
    
    if (!text)
        return { };
    
    return { descripcion: text };
}

function isLetter(ch) {
    return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z';
}

function loadRemoteMarcas(cb) {
    var url = 'http://preciosdeargentina.com.ar/api/v1/marcas/?page=1&format=json&page_size=5000';

    http.get(url, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            try {
                var content = JSON.parse(body);
                
                if (content && content.results)
                    content.results.forEach(function (result) {
                        if (marcas[result.id]) {
                            marcas[result.id].nombre = result.nombre;
                        }
                        else {
                            var item = { id: result.id, nombre: result.nombre };
                            marcas[result.id] = item;
                        }
                        
                        if (result.fabricante && result.fabricante.id) {
                            marcas[result.id].fabricanteid = result.fabricante.id;
                            
                            if (fabricantes[result.fabricante.id])
                                fabricantes[result.fabricante.id].nombre = result.fabricante.nombre;
                            else
                                fabricantes[result.fabricante.id] = { id: result.fabricante.id, nombre: result.fabricante.nombre };
                        }
                    });
            }
            catch (err) {
                cb(err, null);
            };
            
            cb(null, null);
        });
    }).on('error', function(e) {
        cb(e, null);
    });    
}

function loadMarcasFabricantes() {
    var data = require('./fixtures/marcas.json');
    
    data.forEach(function (row) {
        if (row.model == 'precios.empresafabricante')
            addFabricante(row);
        else if (row.model == 'precios.marca')
            addMarca(row);
    });
}

function addFabricante(row) {
    var item = {
        id: row.pk,
        nombre: row.fields.nombre,
        logo: row.fields.logo
    };
    
    fabricantes[item.id] = item;
}

function defineMarcasFabricantes() {    
    fabricantes.forEach(function (item) {
        defineFabricante(item);
    });
    
    marcas.forEach(function (item) {
        defineMarca(item);
    });
}

function defineFabricante(item) {
    var item2 = {
        id: item.id,
        logo: item.logo,
        tipo: 'fabricante'
    };

    anna.add(item.nombre, item2);
    
    anna.defineRule(item.nombre, { fabricante: item.nombre, fabricanteid: item.id });
}

function addMarca(row) {
    var item = {
        id: row.pk,
        nombre: row.fields.nombre,
        fabricanteid: row.fields.fabricante
    };
    
    marcas[item.id] = item;
}

function defineMarca(item) {   
    var item2 = {
        id: item.id,
        fabricanteid: item.fabricanteid,
        tipo: 'marca'
    };
    
    anna.add(item.nombre, item2);
    
    var associtem = { marca: item.nombre, marcaid: item.id };
    
    if (item.fabricanteid)
        associtem.fabricanteid = item.fabricanteid;
        
    if (item.fabricanteid && fabricantes[item.fabricanteid])
        associtem.fabricante = fabricantes[item.fabricanteid].nombre;
    
    anna.defineRule(item.nombre, associtem);
}

function loadCategorias() {
    var data = require('./fixtures/categorias.json');
    
    data.forEach(function (row) {
        if (row.model == 'precios.categoria')
            addCategoria(row);
    });
}

function addCategoria(row) {
    var item = {
        id: row.pk,
        nombre: row.fields.nombre
    };
    
    categorias[item.id] = item;
    
    var item2 = {
        id: row.pk,
        tipo: 'categoria'
    };
    
    anna.add(item.nombre, item2);
    
    if (row.fields.depth == 3)
        defineCategoria(item.nombre, item);
}

function defineCategoria(nombre, item) {
    var posy = nombre.indexOf(" y ");
    
    if (posy > 0) {
        defineCategoria(nombre.substring(0, posy), item);
        defineCategoria(nombre.substring(posy + 3), item);
        return;
    }
    
    var posbar = nombre.indexOf("/");
    
    if (posbar > 0) {
        defineCategoria(nombre.substring(0, posbar), item);
        defineCategoria(nombre.substring(posbar + 1), item);
        return;
    }
    
    nombre = nombre.trim();
    
    var ncategoria = nombre;
    var original = ncategoria;
    
    ncategoria = ncategoria.replace(/nes /g, "n");
    ncategoria = ncategoria.replace(/des /g, "d");
    ncategoria = ncategoria.replace(/nes$/g, "n");
    ncategoria = ncategoria.replace(/des$/g, "d");
    ncategoria = ncategoria.replace(/s /g, "");
    ncategoria = ncategoria.replace(/s$/g, "");
        
    anna.defineRule(ncategoria, { categoria: item.nombre, categoriaid: item.id });
    
    if (original != ncategoria)
        anna.defineRule(original, { categoria: item.nombre, categoriaid: item.id });
};

function loadProductos() {
    var data = require('./fixtures/productos.json');
    
    data.forEach(function (row) {
        if (row.model == 'precios.producto')
            addProducto(row);
    });
}

function addProducto(row) {
    var item = anna.analyze(row.fields.descripcion);

    item.id = row.pk;
    item.nombre = row.fields.descripcion;
    
    if (row.fields.upc)
        item.upc = row.fields.upc;
    if (row.fields.notas)
        item.notas = row.fields.notas;

    if (row.fields.categoria) {
        var cat = categorias[row.fields.categoria];
        
        if (cat) {
            item.categoria = cat.nombre;
            item.categoriaid = cat.id;
        }
    }

    if (row.fields.marca) {
        var mar = marcas[row.fields.marca];
        
        if (mar) {
            item.marca = mar.nombre;
            item.marcaid = mar.id;
            
            if (mar.fabricante) {
                item.fabricante = mar.fabricante;
                item.fabricanteid = mar.fabricanteid;
            }
        }
    }
    
    productos[item.id] = item;
    
    var item2 = { };
    
    for (var n in item)
        if (n != 'nombre')
            item2[n] = item[n];
    
    anna.add(item.nombre, item2);
}

function loadCiudades() {
    var data = require('./fixtures/ciudades.json');
    
    data.forEach(function (row) {
        if (row.model == 'cities_light.city')
            addCiudad(row);
    });
}

function addCiudad(row) {
    var item = { };
    item.id = row.pk;
    item.nombre = row.fields.name;
    item.tipo = 'ciudad';
    
    if (row.fields.geoname_id)
        item.geonameid = row.fields.geoname_id;
        
    if (row.fields.longitude)
        item.longitud = parseFloat(row.fields.longitude);
        
    if (row.fields.latitude)
        item.latitud = parseFloat(row.fields.latitude);
        
    var pp = getProvinciaPais(row.fields.display_name);
    
    for (n in pp)
        item[n] = pp[n];
        
    ciudades[item.id] = item;

    var item2 = { };
    
    for (var n in item)
        if (n != 'nombre')
            item2[n] = item[n];
    
    anna.add(item.nombre, item2);
    
    var assocdata = { };
    
    for (var n in item) {
        if (n == 'id')
            assocdata.ciudadid = item.id;
        else if (n == 'longitud')
            assocdata.ciudad_longitud = item[n];
        else if (n == 'latitud')
            assocdata.ciudad_latitud = item[n];
        else if (n == 'nombre')
            assocdata.ciudad = item[n];
        else
            assocdata[n] = item[n];
    }
    
    anna.defineRule(item.nombre, assocdata);
}

function getProvinciaPais(fullname) {
    var result = { };
    
    if (!fullname)
        return result;
        
    var pos1 = fullname.indexOf(",");
    
    if (pos1 < 0)
        return result;
        
    var name = fullname.substring(pos1 + 1);
    
    var pos2 = name.indexOf(",");
    
    if (pos2 < 0) {
        result.provincia = name.trim();
        return result;
    }
    
    result.provincia = name.substring(0, pos2).trim();
    result.pais = name.substring(pos2 + 1).trim();
    
    return result;
}

module.exports = {
    initialize: initialize,
    loadMarcasFabricantes: loadMarcasFabricantes,
    loadRemoteMarcas: loadRemoteMarcas,
    defineMarcasFabricantes: defineMarcasFabricantes,
    loadCategorias: loadCategorias,
    loadProductos: loadProductos,
    loadCiudades: loadCiudades,
    search: anna.search,
    analyze: anna.analyze,
    getFabricante: function (id) { return fabricantes[id]; },
    getMarca: function (id) { return marcas[id]; },
    getCategoria: function (id) { return categorias[id]; },
    getProducto: function (id) { return productos[id]; },
    getProductos: function (id) { return productos; },
    getCiudad: function (id) { return ciudades[id]; },
    getCiudades: function () { return ciudades; }
}

