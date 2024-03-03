// `const` keyword ensures that the variable it creates is read-only
const THRESHOLD = 10;

// `let` keyword declares a block-scoped variable
let month = "February";	

// Variables in JS are loosely typed
let day = 4;				// Integer
let temperature = 34.36; 	// Double
let winter = true; 			// Boolean

// `const` does not ensure that the variable is immutable
// the object property can change
const students = { 
	count: 10
};
students.count += 1; 		// OK: count=11
// students = { count: 20 }; 	// Type error

// Array with integer values
let numbers = [1, 2, 3, 100, 500, 4];	

// Array with strings
let fruits = ["Orange", "Banana", "Apple"];

// Empty array declaration
let names = [];

// Access the elements of an array
fruits[0]; 	// Returns: Orange
fruits[1]; 	// Returns: Banana

// Adding array elements
fruits.push("Mango");	// adds a new element to fruits

// Access the length of an array using the length attribute
let numberOfFruits = fruits.length;

// You can nest arrays (multidimensional)
let nestedNumbers = [[1, 2], [3, 4], [5, 6]];

// JS object with four properties
/*
let course = {
	id: "CPSC436",
	name: "Information Visualization",
	students: 100,
	active: true
}

// Accessing an object via dot notation, specifying the name of the property
course.id; 		// Returns: CPSC436
course.students;	// Returns: 100
*/

// We can include arrays in objects
let course = {
	id: "CPSC436",
	students: ["Michael", "Ann", "James", "Kathy"]
};

// And we can also create arrays of objects
let courses = [
	{ id: "CPSC436", name: "Visualization" },
	{ id: "CPSC110", name: "Computation, Programs, and Programming" }
];

// To access this data we just follow the trail of properties
courses[1].id; 	// Returns: CPSC110

let numericData = 10;

// Regular if statement 
if (numericData >= 10) {
	console.log("Equal or greater than 10");
} else if (numericData > 0 && numericData < 10) {
	console.log("Between 0 and 10");
} else {
	console.log("Less than 1");
}

// The ternary operator can be used as a compact alternative to an if-statement
// CONDITION ? WHAT_HAPPENS_IF_TRUE : WHAT_HAPPENS_IF_FALSE
let result = (numericData >= 10) ? "greater than or equal to 10" : "less than 10";
result = (numericData % 2 === 0) ? "even" : "odd";


// (1) Loop through a block of code 5 times (printing the value of i each time to the console)
for (let i = 0; i < 5; i++) {
	console.log(i);
}

// (2) Loop through each of the values in an array
let arrayWithNames = ["Jack", "Anna", "Mike", "Susan"];
for (let i = 0; i < arrayWithNames.length; i++) {
	console.log(arrayWithNames[i]);
}

// (3) Loop through the properties of an object
let person = { firstName: "John", lastName: "Doe", age: 24 };
for (let property in person) {
	console.log(property + ": " + person[property]);
}

// (4) The holy grail of JS loops: 
// Making use of object oriented JS, the forEach loop is an array method 
// that iterates over all elements in the array. The index of the element 
// and the element itself are available inside the loop via an anonymous
// callback function.
arrayWithNames.forEach( (element, index) => {
	console.log(index + ": " + element);
});

// Call a function
toCelsius(34);

// Function (with input parameter and return value)
function toCelsius(fahrenheit) {
	return (5/9) * (fahrenheit-32);
}

// Another function call
console.log("Write something to the web console");


const temp = 39; 
let message = `The expected max. temperature today is ${temp}°C`;

message = `Current temperature: ${toCelsius(34)}°C`;

// We assign a function to the variable 'message'
message = function(firstName) {
    return `Hello, I'm ${firstName}.`;
}

// We can call the function to get the expected message
console.log(message("Victoria"));	// Returns: Hello, I'm Victoria.

message = firstName => {
    return `Hello, I'm ${firstName}.`;
}
console.log(message("Victoria"));	// Returns: Hello, I'm Victoria.

person = { firstName: "Victoria", age: 24, profession: "Student" };

// Add a new variable to the object 'person' called 'message'.
// Store a function inside 'message' instead of a static value.
person.message = function() {
	return `Hello, I'm ${this.firstName}.`;
}
console.log(person); // Returns your new person object
console.log(person.message()); // Returns: Hello, I'm Victoria.

// ---- Filter Example 1 - Get all cities except London ---- 

let cities = ["Vienna", "Paris", "London", "London"];

// Pass an anonymous function to cities.filter()
const filteredCities = cities.filter(city => city != "London");

console.log(filteredCities); // Returns: ["Vienna", "Paris"]


// ---- Filter Example 2 - Get all numbers which are >= 10 and have array indices > 3 ---- 

numericData = [1, 20, 3, 40, 5, 60, 7, 80];

// Anonymous function takes the array element's current value and index as parameters
const filteredNumericData = numericData.filter( (value, index) => {
	return (value >= 10) && (index > 3);
});

console.log(filteredNumericData); // Returns: [60, 80]

// ---- Sort Example 1 - Filter array with strings (default sorting) ---- 

cities = ["Vienna", "Paris", "London", "Munich", "Toronto"];
cities.sort();
cities 	// Returns: ["London", "Munich", "Paris", "Toronto", "Vienna"]


// ---- Sort Example 2 - Filter array with objects ---- 
// We are specifying a function that defines the sort order

const products = [
	{ name: "laptop", price: 800 },
	{ name: "phone", price:200},
	{ name: "tv", price: 1200}
];

// Sort ascending by the 'price' property
products.sort( (a, b) => {
	return a.price - b.price;
});

// Sort descending by the 'price' property
products.sort( (a, b) => {
	return b.price - a.price;
});


// ---- Map Example 1 - Calculate the square root ----

numericData = [1, 4, 9];
const roots = numericData.map(Math.sqrt);

roots	// Returns: [1, 2, 3]


// ---- Map Example 2 - Double the prices ---- 
/*
products = [
	{ name: "laptop", price: 800 },
	{ name: "phone", price:200},
	{ name: "tv", price: 1200}
];
*/

const expensiveProducts = products.map(doublePrice);

function doublePrice(elem){
	elem.price = elem.price * 2;
	return elem;
}

expensiveProducts // Returns: [{ name: "laptop", price: 1600 }, { name: "phone", price:400}, { name: "tv", price: 2400}]