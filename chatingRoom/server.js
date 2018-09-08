var http = require('http');
var fs = require('fs');
var ws = require('socket.io');

var server = http.createServer((req, res) => {
	var html = fs.readFileSync('./client.html');
	res.end(html);
}).listen(3000);

var io = ws(server);

io.on('connection', socket => {
	console.log('新用户进入');
	socket.on('message', obj => {
		io.emit('message', obj);
	});
});