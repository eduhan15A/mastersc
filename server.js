const protocol = require('http');
//const hostname = '127.0.0.1';
const hostname = 'https://mastersc.herokuapp.com/';
const port = 80;

const server = protocol.createServer((req, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json;charset=UTF-8');
    response.end('{"Servidor":"Chiquitín"}');

});

server.listen(port, hostname, () => {
    console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});
