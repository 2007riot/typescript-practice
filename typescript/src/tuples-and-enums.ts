//Tuples - it allows us to set up an array with fixed length and orderd with fixed type in other words it's super useful when we wanna group different types of values together

//fixed array, we only can add two properies and one should be of type string and other number
let person: [string, number] = ["string", 25];
console.log(person);

//or only three properties and three of them should be of type number
let date: [number, number, number] = [12, 17, 2021];
//but for ts it's ok to do this
date.push(34);
date.push(34);
date.push(34);
date.push(34);
date.push(34);

//so to avoid possibility to push to this array add readonly keyword
// let date: readonly [number, number,number] = [12,17,2021] can add readonly to avoid posibility to push

function getPerson(): [string, number] {
  return ["john", 25];
}

let randomPerson = getPerson();
console.log(randomPerson[0]);
console.log(randomPerson[1]);

//also we can add optionals
let susan: [string, number?] = ["susan"];
console.log(susan);

//Enums
//Essentially allow us to define a set of named constants

enum ServerResponseStatus {
  sucess = 200,
  error = 500,
}

// interface ServerResponse {
//   result: ServerResponseStatus;
//   data: string[];
// }

// const response: ServerResponse = getServerResponse()
// console.log(response);

//enum mapping
Object.values(ServerResponseStatus).forEach((value) => {
  if (typeof value === "number") {
    console.log(value);
  }
});

enum NumericEnum {
  Member = 1,
}

// enum StringEnum {
//   Member = "Value",
// }



let numericEnumValue: NumericEnum = 1; // This is allowed
console.log(numericEnumValue); // 1

//let stringEnumValue: StringEnum = 'Value'; // This is not allowed

enum UserRole {
  Admin,
  Manager,
  Employee,
}

type User = {
  id: number;
  name: string;
  role: UserRole;
  contact: [string, string]; // Tuple: [email, phone]
};

function createUser(user: User): User {
  return user;
}

const user: User = createUser({
  id: 1,
  name: "John Doe",
  role: UserRole.Admin,
  contact: ["john.doe@example.com", "123-456-7890"],
});

console.log(user);

//type assertion - which a way to tell the browser what type an existing variable is, is like type casting
let anyValue: any = "this is a string";
let strLength: number = (anyValue as string).length;
console.log(strLength);


type Bird = {
  name: string;
};

let birdString = '{"name": "Eagle"}';
let dogString = '{"breed": "Poodle"}';

let birdObject = JSON.parse(birdString);
let dogObject = JSON.parse(dogString);

let bird = birdObject as Bird;
let dog = dogObject as Bird;
console.log(bird.name);
console.log(dog.name); // it's not correct and we will get undefined

enum Status {
  Pending = "pending",
  Declined = "declined",
}

type User1 = {
  name: string;
  status: Status;
};
// save Status.Pending in the DB as a string
const statusValue = "pending"; //retrieve string from the DB

const user1: User1 = { name: "john", status: statusValue as Status };
console.log(user1);

//Type unknown can be anything
let unknownValue: unknown;
unknownValue = "hi";
unknownValue = [5, 6, "j"];
unknownValue = 300.989778;

//unknownValue.toFixed(2) - the method is not allowed, cause typescript not sure what type is it exactlu so it won't perform any actions

if (typeof unknownValue === "number") {
  unknownValue.toFixed(2);
}

//you'll definetily will see type unknown in try catch block

try {
  throw "string";
  throw new Error("there was an error");
  //by default error is the type unknown
} catch (e) {
  // console.log(e.message);
}

function runSomeCode() {
  const random = Math.random();
  if (random < 0.5) {
    throw new Error("Something went wrong");
  } else {
    throw "some error";
  }
}
runSomeCode()
//Type never - is a special type that represent type of value that never occur
//   let someValue: never = ""

type Theme = "light" | "dark";

function checkTheme(theme: Theme) {
  if (theme === "light") {
    console.log("light theme");
    return;
  }
  if (theme === "dark") {
    console.log("dark theme");
    return;
  }
  theme;
  // theme is of type never, because it can never have a value that is not 'light' or 'dark'.
}
checkTheme("dark")
enum Color {
  Red,
  Blue,
  Green,
}

function getColorName(color: Color) {
  switch (color) {
    case Color.Red:
      return "Red";
    case Color.Blue:
      return "Blue";
    case Color.Green:
      return "Green";
    default:
      //at build time, so every time we add some new color to our enum it will complain that we didn't handle all cases, so at a build we can see where we make errors
      let unexpectedColor: never = color;
      console.log(unexpectedColor);
      //at run time, here we can see our error only at a run time which is not best practice
      throw new Error(`Unexpected color value: ${color}`);
  }
}

console.log(getColorName(Color.Red));
console.log(getColorName(Color.Blue));

//Modules in TS

//everything by default is global scope, we can change it in config file to make it similiar to js, but can also use export import

//cannot use name because it is declared in dom already
// const name = ""

import newStudent, {sayHello,person1} from "./actions";

sayHello("Typescript")
console.log(newStudent);
console.log(person1);

// import {someValue} from './example.js' we cant export from js file, because it allows to export only from typescript
//so in order to change it we can go to our config and add allowJs: true