//in short generics allow us to write for us func with any data type, is like variables for type

//so here we always have an array but we only change the type
// let array1: string[] = ['Apple', 'Banana', 'Mango'];
// let array2: number[] = [1, 2, 3];
// let array3: boolean[] = [true, false, true];

//other ways to declare our arrays
let array1: Array<string> = ["apple","banana","mango"];
let array2: Array<number> = [1,2,3]
let array3: Array<boolean> = [true,false,true]



//Create generic func and interface
function createString(arg:string):string {
    return arg
}

function createNumber(arg:number):number {
    return arg
}
//<T> stands for our generic (any) type, we can call it as we want for example potato
function genericFunc<T>(arg:T):T{
    return arg
}

//usage, so if I need some string I can use this generic function
const someStringValue = genericFunc<string>("hi")
console.log(someStringValue)
const someBoolValue = genericFunc<boolean>(false)
console.log(someBoolValue)
const someNumberValue = genericFunc<number>(90)
console.log(someNumberValue)



//Interface
interface GenericInterface<T> {
    value:T
    getValue:() => T
}

const genericString: GenericInterface<string> = {
    value: "Hi",
    getValue() {
        return this.value
    }
}

//so it won't work because async functions in js should return promise
// async function someFunction():string {
//     return "Hi"
// }

async function someFunc():Promise<string> {
    return "hi"
}
//A Promise in JavaScript (and thus TypeScript) is an object representing the eventual completion or failure of an asynchronous operation.


//challenge

function generateStringArray(length:number,value:string):string[] {
    //declaring an empty array of strings
    let result: string[] = []
    return result = Array(length).fill(value)
}

console.log(generateStringArray(4,"aita"))

function generateNumberArray(length:number, value:number):number[] {
    let result: number[] = []
    return result = Array(length).fill(value)
}

console.log(generateNumberArray(3,100))

//now generic
function generateGenericArray<T>(length:number, value: T): T[] {
    let result: T[] = []
    return result = Array(length).fill(value)
}

console.log(generateGenericArray(3,true));
console.log(generateGenericArray(2,90));

//it also works with our own type/interface

interface Device {
    name: string;
    price: number;
    calculateDisc():number 
}

const myDevice: Device = {
    name: "phone",
    price: 10,
    calculateDisc() {
        return this.price * 0.8
    }
}

console.log(generateGenericArray(2, myDevice));

//multiple variables types (with func example)
//using t, u etc it is a convention we can call them whatever we want like a potato
// function pair<T,U>(param1:T,param2:U) : [T,U] {
//     return [param1,param2]
// }

function pair<fried,potato>(param1:fried,param2:potato) :[fried,potato] {
    return [param1,param2]
}

console.log(pair<Device,number>(myDevice,10));
//ts also can enfer the type even if don;t provide type in angle brackets, but need to be careful and better provide type to avoid mistakes
console.log(pair("hi","bye"));
console.log(pair<string,Device>("1",myDevice));

//we use typescript a lot when we use useState hook in react

//set up constraint on a type, essentially limit type options I can pass in
//in this basic type string it doesn;t make many sense to do it, can also use union type
function processValue<T extends string | number>(value: T): T {
    console.log(value);
    return value
}

processValue("hi")
processValue(3)


//more complex example
type Car2 = {
    brand: string;
    model: string;
  };
  
  const car2: Car2 = {
    brand: 'ford',
    model: 'mustang',
  };
  
  type Product3 = {
    name: string;
    price: number;
  };
  
  const product3: Product3 = {
    name: 'shoes',
    price: 1.99,
  };
  
  type Student1 = {
    name: string;
    age: number;
  };
  
  const student1: Student1 = {
    name: 'peter',
    age: 20,
  };

//we can do like this
  function printName<T extends Student1 | Product3>(input:T):void {
    console.log(input.name);
  }

  printName(student1)
  printName(product3)

  //but also we can set up the object that contains name parameter, so basically we are saying look I'm looking for an object that contains name parameter and it has to be a string

  function printOtherName<T extends {name:string}>(input: T):void {
    console.log(input.name);
  }

  printOtherName(student1)
  printOtherName(product3)
//   printOtherName(car2) it will complain because name property is missing in the car

//Set up default type
//note is not going to be super useful cause we are hard coding all of our data, the main use of it is when we don't know what will be the shape of our data
//or we can just say any here and we don't need to provideany further in the future (line 205)
interface StoreData<T = any> {
    data: T[],
}

const storeNumbers: StoreData<number> = {
    data: [1,2,3,4]
}

//but when we don't know what we will have in the array

// const randomStuff: StoreData = { it expects type
//     data:["some","random","stuff",1]
// }

// const randomStuff: StoreData<any> = { //when we are not sure what values we are going to have in this array we just implicitly says any
//     data:["some","random","stuff",1]
// }

const randomStuff: StoreData = { 
    data:["some","random","stuff",1]
}

