/*Type guarding is a term in TypeScript that refers to the ability to narrow down the type of an object within a certain scope. This is usually done using conditional statements that check the type of an object.

In the context of TypeScript, a type guard is some expression that performs a runtime check that guarantees the type in some scope.*/

//Challenge typeof

type ValueType = string | number | boolean;

let value: ValueType;
const newRandom = Math.random();
value = newRandom < 0.33 ? "Hello" : newRandom < 0.66 ? 123.456 : true;

function checkValue(value: ValueType): ValueType {
  if (typeof value === "string") {
    console.log(value.toLowerCase());
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));
  } else {
    console.log(`it is a boolean: ${value}`);
  }
  return value;
}
checkValue(value);

//Challenge Equality Narrowing
type Dog = { type: "dog"; name: string; bark: () => void };
type Cat = { type: "cat"; name: string; meow: () => void };
type Animal = Dog | Cat;

function makeSound(animal: Animal) {
  animal.type === "dog" ? animal.bark() : animal.meow();
}
const cat: Cat = {
  type: "cat",
  name: "Chica",
  meow: () => {
    console.log("Meow");
  },
};
const dog: Dog = {
  type: "dog",
  name: "Yandex",
  bark: () => {
    console.log("Bark");
  },
};
makeSound(cat);
makeSound(dog);

//Check for property
function makeOtherSound(animal: Animal) {
    'bark' in animal ? animal.bark() : animal.meow()
    /* or 
    if ("bark" in animal) {animal.bark()}
    else {animal.meow()} */
}
makeOtherSound(cat)
makeOtherSound(dog)

//"Truthy"/"Falsy" guard
/*
In TypeScript, "Truthy"/"Falsy" guard is a simple check for a truthy or falsy value

- Define a function named printLength that takes one parameter str which can be of type string, null, or undefined.
- Inside the function, use an if statement to check if str is truthy. In JavaScript and TypeScript, a truthy value is a value that is considered true when encountered in a Boolean context. All values are truthy unless they are defined as falsy (i.e., except for false, 0, -0, 0n, "", null, undefined, and NaN).
- If str is truthy, it means it's a string (since null and undefined are falsy). In this case, log the length of str using the length property of the string.
- If str is not truthy (i.e., it's either null or undefined), log the string 'No string provided'.

- Now you can call the printLength function with a string, null, or undefined as the argument. The function will print the length of the string if a string is provided, or 'No string provided' otherwise.
*/
function printLength(str: string | null | undefined) {
    if (str) { console.log(str.length);
    } else {console.log("No string provided");
    }
}

printLength("Galina")
printLength(null)
printLength(undefined)

//instanceOf

/*The instanceof type guard is a way in TypeScript to check the specific class or constructor function of an object at runtime. It returns true if the object is an instance of the class or created by the constructor function, and false otherwise.*/

//this type guard works well with unknown type, like with errors
try {
  // Some code that may throw an error
  throw new Error('This is an error');
} catch (error) {
  if (error instanceof Error) {
    console.log('Caught an Error object: ' + error.message);
  } else {
    console.log('Caught an unknown error');
  }
}

function checkInput(input: Date | string) : string {
    return input instanceof Date ? input.getFullYear().toString() : input
}

const year = checkInput(new Date());
const randomYear = checkInput('2020-05-05');
console.log(year);
console.log(randomYear)

// Challenge type predicate
/* A type predicate is a function whose return type is a special kind of type that can be used to narrow down types within conditional blocks. */

type Student = {
    name: string;
    study: () => void;
  };
  
  type User = {
    name: string;
    login: () => void;
  };
  
  type Person = Student | User;
  
  const randomPerson = (): Person => {
    return Math.random() > 0.5
      ? { name: 'john', study: () => console.log('Studying') }
      : { name: 'mary', login: () => console.log('Logging in') };
  };
  
  const person = randomPerson();

  
 
  function isStudent(person: Person):person is Person {
    // return (person as Student).study !== undefined
    // return "study" in person
    return (person as Student).study !== undefined
  }


//Discriminated Unions and exhaustive check using the never type
//A discriminated union in TypeScript is a type that can be one of several different types, each identified by a unique literal property (the discriminator), allowing for type-safe handling of each possible variant.

type IncrementAction = {
    amount: number;
    timestamp: number;
    user: string;
  };
  
  type DecrementAction = {
    amount: number;
    timestamp: number;
    user: string;
  };
  
  type Action = IncrementAction | DecrementAction;

  