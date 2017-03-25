
var http = require('http');
var url = require('url');

var myTodos = [];

var server = http.createServer(function (req, res){
	handleIncomingRequests(req, res);
});

server.listen(8080, function() {
	console.log('Server is listening on 8080');
});

function handleIncomingRequests(req, res) {
	var urlString = url.parse(req.url, true);
	var action = urlString.pathname;
	var data = urlString.query;
	console.log("recieved request for " + action);
	
	switch (action) {
		case '/add':
			console.log('adding todo');
			myTodos.push(data);
			break;
		case '/get':
			break;
		case '/delete':
			var index = myTodos.indexOf(data);
			if (index > -1) {
				myTodos.splice(index, 1);
			}
			break;
		case '/default':
			console.log('received invalid request');
			break;
	};
	console.log(myTodos);
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end(JSON.stringify(myTodos));
};
