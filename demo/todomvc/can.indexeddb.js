define(['can/util/', 'can/model/'], function(can, Model) {

	var dbName = "canStorage";

	var open = function(){
		var dfd = new can.Deferred();
		var req = indexedDB.open(dbName, 4);
		req.onsuccess = function(e){
			dfd.resolve(e.target.result);
		};
		req.onerror = function(e){
			dfd.reject(e);
		};
		req.onupgradeneeded = function(e){
			var db = e.target.result;
			var objectStore = db.createObjectStore("todos", {
				keyPath: "text"
			});
		};
		return dfd;
	};

	return Model.extend({
	  // Implement local storage handling
	  localStore: function(cb) {
		var todos = [], prevTodos;
		var model = this;

		open().then(function(db){
			var os = db.transaction(["todos"], "readwrite")
				.objectStore("todos");

			var req = os.openCursor();

			req.onsuccess = function(e){
				var cursor = e.target.result;
				if(cursor){
					todos.push(cursor.value);
					cursor.continue();
				} else {
					prevTodos = todos.slice();
					cb.call(model, todos);
					done();
				}
			};

			function done(){
				(todos || []).forEach(function(todo){
					os.put(todo);
				});
				prevTodos.forEach(function(todo){
					if(todos.indexOf(todo) === -1) {
						os["delete"](todo.text);
					}
				});
			}
		});
	  },

	  findAll: function(params) {
		var def = new can.Deferred();
		this.localStore(function(todos) {
		  var instances = [],
			self = this;
		  can.each(todos, function(todo) {
			instances.push(new self(todo));
		  });
		  def.resolve({data: instances});
		});
		return def;
	  },

	  destroy: function(id) {
		var def = new can.Deferred();
		this.localStore(function(todos) {
		  for (var i = 0; i < todos.length; i++) {
			if (todos[i].id === id) {
			  todos.splice(i, 1);
			  break;
			}
		  }
		  def.resolve({});
		});
		return def;
	  },

	  create: function(attrs) {
		var def = new can.Deferred();
		this.localStore(function(todos) {
		  attrs.id = attrs.id || parseInt(100000 * Math.random(), 10);
		  todos.push(attrs);
		});
		def.resolve({id: attrs.id});
		return def;
	  },

	  update: function(id, attrs) {
		var def = new can.Deferred(), todo;
		this.localStore(function(todos) {
		  for (var i = 0; i < todos.length; i++) {
			if (todos[i].id === id) {
			  todo = todos[i];
			  break;
			}
		  }
		  can.extend(todo, attrs);
		});
		def.resolve({});
		return def;
	  }
	}, {});
});
