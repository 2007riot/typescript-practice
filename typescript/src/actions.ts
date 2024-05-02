// const susan = "susan" //ts is complaining because we already declared susan before in other files 

export function sayHello(name: string): void {
    console.log(`Hello ${name}!`)
  }

  export let person1 ="susan"

  type Student = {
    name: string,
    age: number,
  } 
  const newStudent: Student = {
    name: "Peter",
    age: 24
  }

  export default newStudent