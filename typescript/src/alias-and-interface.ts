const john: { id: number; name: string; isActive: boolean } = {
  id: 1,
  name: "john",
  isActive: true,
};
const susan: { id: number; name: string; isActive: boolean } = {
  id: 1,
  name: "susan",
  isActive: false,
};

function createUser(user: { id: number; name: string; isActive: boolean }): {
  id: number;
  name: string;
  isActive: boolean;
} {
  console.log(`Hello there ${user.name.toUpperCase()} !!!`);

  return user;
}

//type alias is just a new name or shorthand for existing type

export type User = {
  id: number;
  name: string;
  isActive: boolean;
}; //we also can export type alias

const newJohn: User = {
  id: 5,
  name: "new John",
  isActive: false,
}; // so newJohn is an object of a type User

function createNewUser(user: User): User {
  console.log(`Hello there ${user.name.toUpperCase()} !!!`);
  return user;
}

type StringOrNumber = string | number;

let value: StringOrNumber;
value = 123;
value = "hello";

type Theme = "light" | "dark";
let theme: Theme;
theme = "dark";
theme = "light";

function setTheme(t: Theme) {
  theme = t;
}

setTheme("dark");

/*Challenge
- Define the Employee type: Create a type Employee with properties id (number), name (string), and department (string).

- Define the Manager type: Create a type Manager with properties id (number), name (string), and employees (an array of Employee).

- Create a Union Type: Define a type Staff that is a union of Employee and Manager.

- Create the printStaffDetails function: This function should accept a parameter of type Staff. Inside the function, use a type guard to check if the 'employees' property exists in the passed object. If it does, print a message indicating that the person is a manager and the number of employees they manage. If it doesn't, print a message indicating that the person is an employee and the department they belong to.

- Create Employee and Manager objects: Create two Employee objects. One named alice and second named steve. Also create a Manager object named bob who manages alice and steve.

- Test the function: Call the printStaffDetails function with alice and bob as arguments and verify the output.*/

type Employee = {
  id: number;
  name: string;
  department: string;
};

type Manager = {
  id: number;
  name: string;
  employees: Employee[];
};

type Staff = Employee | Manager;

function printStaffDetails(staff: Staff) {
  if ("employees" in staff) {
    console.log(`${staff.name} is manager of ${staff.employees.length}`);
  } else {
    console.log(`${staff.name} is employee in the ${staff.department}`);
  }
}

const alice: Employee = { id: 1, name: "Alice", department: "Sales" };
const steve: Employee = { id: 1, name: "Steve", department: "HR" };
const bob: Manager = { id: 2, name: "Bob", employees: [alice, steve] };

printStaffDetails(alice); // Outputs: Alice is an employee in the Sales department.
printStaffDetails(bob);

//Intersection type in union, which is the way to combine multiple types into one

type Book = { id: number; name: string; price: number };

const book1: Book = {
  id: 1,
  name: "game of thrones",
  price: 200,
};

const book2: Book = {
  id: 2,
  name: "dance of dragons",
  price: 200,
};

const discountedBook: Book & { discount: number } = {
  //it uses all of the properties of Book but add extra layer with new property
  id: 3,
  name: "Lord of the rings",
  price: 250,
  discount: 0.15,
};

//or can create new type
type DiscountedBook = Book & { discount: number };
const newDiskBook: DiscountedBook = {
  id: 3,
  name: "Lord of the rings",
  price: 250,
  discount: 0.15,
};

//type alias also supports computed properties
//js
const propName = "age";
let tiger = { [propName]: 5 };

//with types
type Animal = {
  [propName]: number;
};

let dog: Animal = { [propName]: 5 };

//Interface type
// is used to describe the shape for objects (only objects)
//they are very similiar

interface OtherBook {
  readonly isbn: number;
  title: string;
  author: string;
  genre?: string;
}

const deepWork: OtherBook = {
  isbn: 123,
  title: "deep work",
  author: "cal newport",
  genre: "self-help",
};
// deepWork.isbn =  because its read only property is not allowed

//methods on interfaces
// we don't type any logic we arte just saying that there will be a method

interface someOtherBook {
  readonly isbn: number;
  title: string;
  author: string;
  genre?: string;
  printAuthor(): void;
  printTitle(message: string): string;
}

const deepWork2: someOtherBook = {
  isbn: 123,
  title: "deep work",
  author: "cal newport",
  genre: "self-help",
  printAuthor() {
    console.log(this.author);
  },
  printTitle(message) {
    return `${this.title} ${message}`;
  },
};

deepWork2.printAuthor();
console.log(deepWork2.printTitle("is an amazing book"));

//alternative way to setup methods on interfaces

interface Movie {
  id: number;
  title: string;
  //this is a syntax we are not setting up over here the arrow function
  printSmth: (someValue: number) => number;
}

const someMovie: Movie = {
  id: 1,
  title: "string",
  //first option:
  // printSmth: function(someValue) {
  //   return someValue
  // }
  //second option: (arrow func), is going to capture the global this
  // printSmth:(someValue) => {
  //   // console.log(this);
  //   console.log(someMovie.title);
  //   return someValue
  // }
  //third option
  printSmth(someValue) {
    return someValue;
  },
};

console.log(someMovie.printSmth(34));

/*## Challenge

- Start by defining an interface Computer using the interface keyword. This will serve as a blueprint for objects that will be of this type.
- Inside the interface, define the properties that the object should have. In this case, we have id, brand, ram, and storage.
- Use the readonly keyword before the id property to indicate that it cannot be changed once it's set.
- Use the ? after the storage property to indicate that this property is optional and may not exist on all objects of this type.
- Also inside the interface, define any methods that the object should have. In this case, we have upgradeRam, which is a function that takes a number and returns a number.
- Now that we have our interface, we can create an object that adheres to this interface. This object should have all the properties defined in the interface (except for optional ones, which are... optional), and the methods should be implemented.
- Finally, we can use our object. We can call its upgradeRam method to increase its RAM.*/

interface Computer {
  readonly id: number;
  brand: string;
  ram: number;
  storage?: number;
  upgradeRam(number: number): number;
}

const myMac: Computer = {
  id: 1,
  brand: "Apple",
  ram: 8,
  upgradeRam(amount) {
    this.ram += amount;
    return this.ram;
  },
};
console.log(myMac);
console.log(myMac.upgradeRam(20));
console.log(myMac);

//interface merging, extend, typeguard

interface Person {
  name: string;
  getDetails(): string;
}

interface DogOwner {
  dogName: string;
  getDogDetails(): string;
}

//Merging (reopening) an interface in TypeScript is a process where you declare an interface with the same name more than once, and TypeScript will merge their members.
interface Person {
  age: number;
}

const person: Person = {
  name: "John",
  age: 20,
  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
};

console.log(person.getDetails());

// extending is like inheretance
interface NewEmployee extends Person {
  employeeeId: number;
}
const employee: NewEmployee = {
  name: "jane",
  age: 20,
  employeeeId: 123,
  getDetails() {
    return `Name: ${this.name}, age: ${this.age}, employee id: ${this.employeeeId}`;
  },
};

console.log(employee.getDetails());

interface newManager extends Person, DogOwner {
  managePeople(): void;
}

//multiple inheritance
const newManager: newManager = {
  name: "bob",
  age: 35,
  dogName: "rex",
  getDetails() {
    return `Name ${this.name}, age: ${this.age}`;
  },
  getDogDetails() {
    return `Name: ${this.dogName}, age: ${this.age}`;
  },
  managePeople() {
    console.log("I manage people");
  },
};

//challenge part 1

interface Person1 {
  name: string;
}

interface DogOwner1 {
  dogName: string;
}

interface Manager1 extends Person1 {
  managePeople(): void;
  delegateTasks(): void;
}

function getEmployee1(): Person1 | DogOwner1 | Manager1 {
  const random = Math.random();
  if (random < 0.33) {
    return {
      name: "daniel",
    };
  } else if (random < 0.66) {
    return {
      name: "galina",
      dogName: "yandex",
    };
  } else {
    return {
      name: "aita",
      dogName: "rex",
      managePeople() {
        console.log("Quejar");
      },
      delegateTasks() {
        console.log("Quejar even more");
      },
    };
  }
}
const employee1: Person1 | DogOwner1 | Manager1 = getEmployee1();
console.log(employee1);

// function isManager1(obj:Person1 | DogOwner1 | Manager1): boolean {
//   //we are checking if in this object exist func "managePeople" (JS is wierd lol) and because this method exists only in Manager object it will return true only in case of our object is Manager
//   return "managePeople" in obj
// }

//so better approach to use type predicate 
function isManager1(obj:Person1 | DogOwner1 | Manager1): obj is Manager1 {
 return "managePeople" in obj // so if this true we are having interface manager
}

console.log(isManager1(employee1));

if (isManager1(employee1)) {
  employee1.delegateTasks()
}


//differences between interface and typealias 
//- Type aliases can represent primitive types, union types, intersection types, tuples, etc., while interfaces are primarily used to represent the shape of an object.


// Type alias for a primitive type
type Score = number;
type NumberOrString = number | string;
// Type alias for literal types
type Direction = 'up' | 'down' | 'left' | 'right';

// Using the type aliases
let gameScore: Score = 100;
let move: Direction = 'up';
//Interfaces can be merged using declaration merging. If you define an interface with the same name more than once, TypeScript will merge their definitions. Type aliases can't be merged in this way.

//Interfaces can be implemented by classes, while type aliases cannot.
//Type aliases can use computed properties, while interfaces cannot.

