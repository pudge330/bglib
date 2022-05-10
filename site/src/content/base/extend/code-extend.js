var Person = bglib.create('Base', {
	name: undefined,
	age: undefined,
	height: undefined,
	init: function(details) {
		this.name = details.name;
		this.age = details.age;
		this.height = details.height;
	},
	getName: function() {
		return this.name;
	}
});

// You can then use the object like a class and create a new instance of it.
var user = new Person({
	name: 'John Doe',
	age: 30,
	height: "5' 9\""
});

// outputs: John Doe
console.log(user.name);

// or
// outputs: John Doe
console.log(user.getName());