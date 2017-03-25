var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app);

// For chat messages using sockets 
var io = require('socket.io')(http);


var myTodos = [
	{
		id:1, 
		todo: 'BookTickets'
	},
	{
		id:2, 
		todo: 'Buy Grocery'
	}
];

// Get the todo list
app.get('/todo-list', function (req, res, next) {
	res.end(JSON.stringify(myTodos));
});

// Add a new todo to the list
app.post('/new-todo', function(req, res, next){
	var newTodo = req.query;
	newTodo.id = myTodos.length + 1;
	myTodos.push(newTodo);
	res.end(JSON.stringify(myTodos));
});

// Delete a todo by id
app.post('/delete-todo', function(req, res, next) {
	var todoId = req.query.id;
	console.log("deleting ", todoId);
	
	for (var i=0; i < myTodos.length; i++) {
		if (myTodos[i].id == todoId) {
			myTodos.splice(i, 1);
		}
	}

	res.end(JSON.stringify(myTodos));
});

// Serve static files
app.get('/helper.js', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'helper.js'));
});

app.get('/socket.io.js', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'socket.io.js'));
});

app.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'index.html'));
});


// For chat messages using sockets 
io.on('connection', function(socket) {
	console.log('a user connected');
	io.emit('chat_message', 'New User Joined!');

	socket.on('chat_message', function (msg) {
		console.log('A user said: ', msg);
		io.emit('chat_message', msg);
	});
});

// Start server
http.listen(8080, function () {
	console.log('Express app listening on port 8080');
});
