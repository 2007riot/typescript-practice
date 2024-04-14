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
} //we also can export type alias

const newJohn: User = {
  id: 5,
  name: "new John",
  isActive: false,
}; // so newJohn is an object of a type User

function createNewUser(user: User): User {
  console.log(`Hello there ${user.name.toUpperCase()} !!!`);
  return user;
}


type StringOrNumber = string | number

let value: StringOrNumber
value = 123
value = "hello"

type Theme = 'light' | 'dark'
let theme: Theme
theme = 'dark'
theme = 'light'

function setTheme(t:Theme) {
    theme = t
}

setTheme('dark')

