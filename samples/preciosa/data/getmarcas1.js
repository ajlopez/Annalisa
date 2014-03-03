
var http = require('http');

var url = 'http://preciosdeargentina.com.ar/api/v1/marcas/?page=1&format=json&page_size=10';

http.get(url, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        console.log(body);
        var fbResponse = JSON.parse(body);
        console.dir(fbResponse);
    });
}).on('error', function(e) {
      console.log("Got error: ", e);
});