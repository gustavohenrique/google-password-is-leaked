'use strict';

var http = require('http'),
    journey = require('journey'),
    router = new(journey.Router),
    grep = require('grep1'),
    port = process.argv[2] || 3000;


var checkemail = function (request, response, data) {
    var email = data.email || '';
    if (email !== '') {
        grep([email, '/tmp/google_5000000.txt'], function(err, stdout, stderr) {
            if (err || stderr) {
                console.log('deu erro', data);
                response.send(404, {}, data)
            } else {
                console.log('nao deu erro', data);
                response.send(200, {}, data)
            }
        });
    }
    else {
        response.send(500, {}, data);
    }
};


router.post('/checkemail').bind(checkemail);


http.createServer(function (request, response) {
    var body = '';
    request.addListener('data', function (chunk) {
        body += chunk;
    });
    request.addListener('end', function () {
        router.handle(request, body, function (result) {
            // enable CORS
            var headers = result.headers;
            
            headers['Access-Control-Allow-Origin'] = '*';
            headers['Access-Control-Max-Age'] = '86400'; 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT';
            headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type';
            
            response.writeHead(result.status, headers);
            response.end(result.body);
        });
    });
}).listen(port);
