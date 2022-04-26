enum WeekDays {
  Mondey = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7
}
// код определяет новый тип — Weekdays, который имеет ограниченный набор значений

let dayOff = WeekDays.Mondey; 
// or
let dayOn = WeekDays[1];

enum Direction {
  FtoC,
  CtoF,
}

function convertTemperature(temp: number, fromTo: Direction): number {
  return (Direction.FtoC === fromTo) ?
    (temp - 32) * 5.0 / 9.0 :
    temp * 9.0 / 5.0 + 32;
}

console.log(`70F is ${convertTemperature(70, Direction.FtoC)}`);
console.log(`21C is ${convertTemperature(21, Direction.CtoF)}`);

enum strDirections {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

function move(where: strDirections) {
  if (where === strDirections.Up) {

  }
  // and other ...
}

move(strDirections.Right) //  good
// move("To the North")       error 

// Можно в качества альтернатив enum использовать объединенный тип
function moves(direction: 'Up' | 'Down' | 'Left' | 'Right') { }

// или пользовательский тип
type typeDirection = 'Up' | 'Down' | 'Left' | 'Right';



// Теперь обобщения, которые ничерта не понятны :(

let someValues: Array<number>;

class Persons {
  name: string;
}
class Employeex extends Persons {
  department: string;
}
class Anumal {
  breed: string;
}

const people = new Array<Person>(10);

const workesrs: Array<Persons> = [];

workesrs[0] = new Persons();
workesrs[1] = new Employeex();
// workesrs[2] = new Anumal();  будет ошибка так как Anumal не является подтпом Persons и не имеет схожей структуры

// но будет работать вот такой вариант
workesrs[2] = { name: 'Mary' };

// работают одинаково
const value1: string[] = ['Mary', 'Joe'];
const value2: Array<string> = ['Mary', 'Joe'];

// но если в массиве будут эллементы разных типов то лучше второй вариант

const value3: Array<string | number> = ['Mary', 123];
const value4: Array<string | number | boolean> = ['Mary', 'Joe', true, 32];


// Вариант без обобщенных типов

// interface Comparator {
//   compareTo(value: any): number;
// }

// class Rectangle implements Comparator {
//   compareTo(value: any): number {
//     // Здесь помещается алгоритм для сравнения прямоугольников.
//     return 0;
//   }
// }
// class Triangle implements Comparator {
//   compareTo(value: any): number {
//     return 0;
//   }
// }


// Вариант с ними

interface Comparator<T = Triangle> { // значение обобщенного типа по умолчанию
  compareTo(value: T): number;
}

class Rectangle implements Comparator<Rectangle> {
  compareTo(value: Rectangle): number {
    // Здесь помещается алгоритм для сравнения прямоугольников.
    return 0;
  }
}
class Triangle implements Comparator {
  compareTo(value: any): number {
    return 0;
  }
}

const rectangle1 = new Rectangle();
const rectangle2 = new Rectangle();
const triangle1 = new Triangle();

rectangle1.compareTo(rectangle2);
// rectangle1.compareTo(triangle1); error 

// Обобщенные функции


// Если бы мы реализовали функцию без обобщенных типов
// function printMe(content: any): any {
//   console.log(content);
//   return content;
// }

const a = printMe("Hello");

class Pop {
  constructor(public name: string) {}
}

const b = printMe(new Pop('Joe'));

// Если с ними

function printMe<T>(content: T): T {
  console.log(content);
  return content;
}

class Pair<K, V> {
  constructor(public key: K, public value: V) {}
}

function comparere<K, V>(pair1: Pair<K, V>, pair2: Pair<K, V>): boolean {
  return pair1.key === pair2.key &&
    pair1.value === pair2.value;
}

let p1: Pair<number, string> = new Pair(1, 'Apple');
let p2 = new Pair(1, "Orange");
console.log(comparere<number, string>(p1, p2));

let p3 = new Pair("first", "Apple");
let p4 = new Pair("first", "Apple");

console.log(comparere(p3, p4));

interface User {
  name: string;
  role: UserRole;
}

enum UserRole {
  Administrator = 'admin',
  Manager = 'manager'
}

function loadUser<T>(): T {
  return JSON.parse('{ "name": "john", "role": "admin" }');
}

const user = loadUser<User>();

switch (user.role) {
  case UserRole.Administrator: console.log("Show control panel"); break;
  case UserRole.Manager: console.log("Hide control panel"); break;
}