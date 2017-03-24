function getTodoList(callbackFunction) {

	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/todo-list');
	xhr.onload = function() {

	    if (xhr.status === 200) {
	        callbackFunction(xhr.responseText);
	        console.log('Got the list from server' + xhr.responseText);
	    }
	    else {
	        callbackFunction();
	        console.log('Request failed.  Returned status of ' + xhr.status);
	    }
	};
	xhr.send();
}

function addToList(newTodo, callbackFunction) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/new-todo?todo=' + newTodo);
	xhr.onload = function() {

	    if (xhr.status === 200) {
	        callbackFunction(xhr.responseText);
	        console.log('Got the list from server' + xhr.responseText);
	    }
	    else {
	        callbackFunction();
	        console.log('Request failed.  Returned status of ' + xhr.status);
	    }
	};
	xhr.send();
}

function deleteTodo(todoId, callbackFunction) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/delete-todo?id=' + todoId);
	xhr.onload = function() {

	    if (xhr.status === 200) {
	        callbackFunction(xhr.responseText);
	        console.log('Got the list from server' + xhr.responseText);
	    }
	    else {
	        callbackFunction();
	        console.log('Request failed.  Returned status of ' + xhr.status);
	    }
	};
	xhr.send();
}

function convertJsonToHtml (todoListString) {
	todoList = JSON.parse(todoListString);
	var res = "";
	todoList.forEach(function (item) {
		res = res + "<p>" + item.id + "&nbsp;&nbsp;&nbsp;&nbsp;" + item.todo + "</p>";
	});

	return res;
}

function createPElementWithText (text) {
	var p = document.createElement('p');
	var t = document.createTextNode(text);
	p.appendChild(t);
	return p;
}

