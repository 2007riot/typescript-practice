console.log("ts practice:");
// we write all our logic in typescript but when build for production it's translates it to js

//TS Types
//all methods from js are available in ts as well

//type script is also has type inderence, so it can infer type of the variable (like swift), but still don't dismiss type annotations

/*Challenge 1
- Create a variable of type string and try to invoke a string method on it.
- Create a variable of type number and try to perform a mathematical operation on it.
- Create a variable of type boolean and try to perform a logical operation on it.
- Try to assign a value of a different type to each of these variables and observe the TypeScript compiler's response.
- You can use type annotation or inference
*/

let myName: string = "galina";
console.log(myName.toUpperCase());

let myNumber: number = 100;
console.log(myNumber / 2);

let myBool: boolean = true;
if (myBool) {
  console.log(`I am ${myBool}`);
}
let isEnough = myNumber >= 10;
if (isEnough) {
  console.log("I am bigger than 10");
}
console.log(myBool);

//when we're working with ts project works (run) even with the errors locally, but whenever we build it the ts errors won't pass

//union type, which allows a variable to hold a value of multiple distinct types, meaning it can be either number or a string like in this example
let tax: number | string = 10;
tax = 100;
tax = "$10";

//literal value type, it means that i can provide the literal value

let requestStatus: "pending" | "success" | "error" = "pending";
//so now requestStatus can be one of these 3 strings only, requestStatus = "random" won't work
requestStatus = "error";

//type any, !Be very careful introducing any to ts app, (this is how basically js works, so point of ts is basing losing)

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;
let random; //type here is any, it's smth that you kinda get by default

const books = ["1984", "Brave new world", "Fahrenheit 451"];

//if you don't assign any value ts will complain, because it doesn't know if there is a value until the loop
let foundBook: string | undefined;

for (let book of books) {
  if (book === "1983") {
    foundBook = book;
    foundBook = foundBook.toUpperCase();
    break;
  }
}

//ts provide optional chaining by default, if it won;t find a book in an array it will be just undefined
foundBook?.length;
console.log(foundBook?.length);

let discount: number | string = 20;
discount = "20%";
// discount = true - in this case ts will complain

let orderStatus: "processing" | "shipped" | "delivered" = "processing";
orderStatus = "shipped";
// orderStatus = "cancelled"  - this won't work

//Arrays in ts
//array of number only
let prices: number[] = [100, 75, 42];
// let prices:number[] = [100,75,"42"] - this won;t work
// prices.push("hi") this niether
prices.push(90);

let fruits: string[] = ["apple", "orange"];

//ts assums that it always will be an empty array
let randomValues: [] = []; //let randomValues:[] = ["hi"] - won;t work

let emptyValues = []; //this will be type any

//type inference allow you do this, so careful, now it's union type, better provide the type
let names = ["peter", "susan", 1];
let myArray: (string | boolean)[] = ["apple", true, "orange", false];

let temperatures: number[] = [20, 25, 30];
temperatures.push(50);
// temperatures.push("hot") it fails

let colors: string[] = ["red", "green", "blue"];
// colors.push(true) NO

let mixedArray: (number | string)[] = [1, "two", 3];

//Object

let car: { brand: string; year: number } = { brand: "toyota", year: 2020 };
//let car:{brand: string; year: number} = {brand:"toyota", year: 2020, color:"blue"} - not valid, because color is not in type anotation

// car.color = "blue"

//whatever we setup in type annotation needs to match to what we have in the object, otherwise ts won;t compile
let car1: { brand: string; year: number } = { brand: "audi", year: 2022 };

//tie array with the object

let book = { title: "book", cost: 20 };
let pen = { title: "pen", cost: 10 };
let notebook = { title: "notebook" };

//optional property
let items: { readonly title: string; cost?: number }[] = [book, pen, notebook];

//items[0].title = "foo" - we can't change this value because title is readonly property

let bike: { brand: string; year: number } = { brand: "yamaha", year: 2010 };
// bike.year = "old"

let laptop: { brand: string; year: number } = { brand: "dell", year: 2020 };
// let laptop2:{brand:string, year:number} = {brand:"HP"}

let product1 = { title: "shirt", price: 20 };
let product2 = { title: "pants" };
//type array of objects where title is of type of string and price is optional property of type number
let products: { title: string; price?: number }[] = [product1, product2];

products.push({ title: "shoes", price: 70 });
// products.push({title: "shirt", price: "expensive"}) - not possible cause price have to be a number

// Functions

function sayHi(name: string) {
  console.log(`Hello, ${name.toUpperCase()}!`); //we can only perform functionality that allowed to the specific type
}
//by default if we don't provide specific type in functions is any (like in js) and ts will complain
/*ts config :
 /* Linting 
 "strict": true, - we can assign it to false and at that point ts won;t complain about the fact that parametr by default is any, but we lose all ts benefits and all the point of using ts*/

//  sayHi(6) - won't compile
sayHi("aita");

//return function

function calculateDiscount(price: number): number {
  return price * 0.9;
  //return "Has discount" - won't compile
}

const finalPrice = calculateDiscount(200);

//any type
function addThree(number: any) {
  let anotherNumber: number = 3;
  return number + anotherNumber; // type any
}

const result = addThree(3);
const someValue = result; // is of type any

//someValue.myMethod() //eventually it'll lead to errors

//Challenge
/*- Create a new array of names.
- Write a new function that checks if a name is in your array. This function should take a name as a parameter and return a boolean.
- Use this function to check if various names are in your array and log the results. */

const newNames: string[] = ["Aleks", "Ron", "Harry"];
function checkName(name: string): boolean {
  // for (let n of newNames) {
  //     if (n === name) {
  //         return true
  //     } else {
  //         return false
  //     }
  // }
  // return false

  return newNames.includes(name);
}

console.log(checkName("aleks"));
let nameToCheck = "Ron";
if (checkName(nameToCheck)) {
  console.log(`${nameToCheck} is in the list`);
} else {
  console.log(`${nameToCheck} is not in the list`);
}

//optional and default parametres in the functions
function calculatePrice(price: number, discount?: number): number {
  return discount ? price - discount : price;

  //or with or operator
  // return price - (discount || 0)
}

let priceAfterDiscount = calculatePrice(100);
console.log(priceAfterDiscount);

//default parameter
function calculateScore(
  initialScore: number,
  penaltyPoints: number = 0
): number {
  return initialScore - penaltyPoints;
}
let scoreAfterPenalty = calculateScore(100, 20);
let scoreWithoutPenalty = calculateScore(300);

//rest parameter
function sum(message: string, ...numbers: number[]): string {
  const doubled = numbers.map((n) => n * 2);
  console.log(doubled);

  let total = numbers.reduce((previous, current) => {
    return previous + current;
  }, 0);

  return `${message} ${total}`;
}

let newResult = sum("The total is: ", 1, 2, 3, 4, 5);

//void return type, is a special type that represent the absence of the value, and when we use it as a function return type void indicates that the func doesn't return a value. It's important to note that in TypeScript, a function that is declared with a void return type can still return a value, but the value will be ignored

function logMessage(message: string): void {
  console.log(message);
}

logMessage("Hiii");

//union types as function parametres
/*Your task is to create a function named processInput that accepts a parameter of a union type string | number. The function should behave as follows:

- If the input is of type number, the function should multiply the number by 2 and log the result to the console.
- If the input is of type string, the function should convert the string to uppercase and log the result to the console. */
function processInput(input: number | string) {
  if (typeof input === "number") {
    console.log(input * 2);
  } else {
    console.log(input.toUpperCase());
  }
}
//typeof is a type guard to check the type of input at runtime
processInput("jj");

//objects parametres

function createEmployee({ id }: { id: number }): {
  id: number;
  isActive: boolean;
} {
  return { id, isActive: id % 2 === 0 };
}

const first = createEmployee({ id: 1 });
const second = createEmployee({ id: 2 });
console.log(first, second);

//alternative
function createStudent(student: { id: number; name: string }): void {
  console.log(
    `welcome to the course ${student.id} ${student.name.toUpperCase()}!!!`
  );
}
const newStudent = {
  id: 1,
  name: "galina",
  age: 20,
};
createStudent(newStudent);

//createStudent({id: 1, name: "galina", age: 20}) // but this is not allowed

//Excess Property Checks
//createStudent({id: 1, name: "bob", email: "jj@com"}) //Object literal may only specify known properties, and 'email' does not exist in type, so it doesn't allow excess properties

/*you pass newStudent to createStudent, TypeScript doesn't complain about the email property. This is because newStudent is not an object literal at the point where it's passed to createStudent. */
//so if there is like 20 extra properties but if you have an id and name we are good to go

/*## Challenge

Your task is to create a function named processData that accepts two parameters:
/*- The first parameter, input, should be a union type that can be either a string or a number.
- The second parameter, config, should be an object with a reverse property of type boolean, by default it "reverse" should be false

The function should behave as follows:

- If input is of type number, the function should return the square of the number.
- If input is of type string, the function should return the string in uppercase.
- If the reverse property on the config object is true, and input is a string, the function should return the reversed string in uppercase. */

function processData(
  input: string | number,
  config: { reverse: boolean } = { reverse: false }
): string | number {
//   if (typeof input === "string" && config.reverse) {
//     return input.split("").reverse().join("").toUpperCase();
//   } else if (typeof input === "string") {
//     return input.toUpperCase();
//   } else if (typeof input === "number") {
//     return input * input;
//   } else {
//     return input
//   }
if (typeof input === 'number') {
    return input * input;
  } else {
    return config.reverse
      ? input.toUpperCase().split('').reverse().join('')
      : input.toUpperCase();
  }
}

console.log(processData(10));
console.log(processData("Hi"));


