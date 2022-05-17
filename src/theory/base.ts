// Интерфейсы в js коде пропадают куда-то ХмМММмМмммМмММ а главное, в чём отличие от использования  type?? мне сказали, что у type больше каких=то возможностей, но пока не объяснили - каких возможностей

type Cloud = {
  mass: number;
  cloudName: string;
  andOther: boolean;
}

interface PersonKa {
  firstName: string;
  lastName?: string;
  age: number;
}

function savePerson(person: PersonKa): void {
  console.log("Saving ", person);
}

const pl: PersonKa = {
  firstName: "Laugh",
  age: 12
}

// Classes

class Person {
  constructor(public firstName: string, public lastName: string, public age: number) {};
}

const p: Person = new Person("Jhon", "Smith", 27); // можно явно указать тип, но он так-то определяется автоматически, так что не обязательно

class BLock {

  readonly nonce: number;
  readonly hash: string;  // readonly свойства могут быть инициализированы либо в точке объявления, либо в конструкторе, после чего их нельзя изменить. это аналогично const , но в отличии от него может быть использовано свойствами класса

  constructor (
    readonly index: number,
    readonly previousHash: string,
    readonly timestamp: number,

    readonly data: string
  ) {
    const { nonce, hash } = this.mine();
    this.nonce = nonce;
    this.hash = hash;
  }

  mine() {
    return {
      nonce: 2,
      hash: "hash",
    }
  }

}


class Toster {
  id: number;
  model: string;
}

class CoffeeMachine {
  id: number;
}

const tost: CoffeeMachine = new Toster;

// классы разные, но так как имеют одинаковые структуры типов, они совместимы между собой, интересно-интересно

// const coffec: Toster = new CoffeeMachine; выдаёт ошибку, так как у Тостера больше свойств

// ПОльзовательское объединение типов

class SearchAction {
  actionType = "SEARCH";

  constructor(readonly payload: {searchQuery: string}) {}
}

class SearchSuccessAction {
  actionType = "SEARCH_SUCCESS";

  constructor(public payload: {searchQuery: string[]}) {}
}

class SearchFailedAction {
  actionType = "SEARCH_FAILED";
}

type SearchActions = SearchAction | SearchSuccessAction | SearchFailedAction;

// или 

interface Reactangle {
  kind: "reactangle"; // дискриминант - общее свойство имеющее разные значения
  width: number;
  heigth: number;
}

interface Circle {
  kind: "circle"; // дискриминант
  radius: number;
}

type Shape = Reactangle | Circle; // объединение


function area(shape: Shape) {
  switch (shape.kind) {
    case "reactangle": return shape.heigth * shape.width;
    case "circle": return Math.PI * shape.radius ** 2;
  }
}


// Защита типа "in" - сужающее выражение для типов

interface A {a: string};
interface B {b: string};

function foo(x: A | B) {
  if ("a" in x) {
    return x.a;
  }
  return x.b;
}

// Проверяемое свойство указывается в виде строки

// Any and Unknown

type Personality = {
  address: string;
}

let person1: any;
person1 = JSON.parse('{ "adress": "25 Broadway" }');
// console.log(person1.address);

let person2: unknown;

person2 = JSON.parse('{ "adress": "25 Broadway" }');
// console.log(person2.adress);

// const isPerson = (object: any): object is Personality => "address" in object;

// or

const isPerson = (object: any): object is Personality => !!object && "address" in object;

if (isPerson(person2)) {
  console.log(person2.address);
} else {
  console.log("person2 is not a Personality");
}

// Можно также вместо множество свойств, которые надо проверять, ввести свойство дискриминантор

type Personki = {
  discriminator: 'person';
  address: string;
}

const isPersonki = (object: any): object is Personki => !!object && object.discriminator === 'person';