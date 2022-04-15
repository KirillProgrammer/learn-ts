// Интерфейсы в js коде пропадают куда-то ХмМММмМмммМмММ а главное, в чём отличие от использования  type?? мне сказали, что у type больше каких=то возможностей, но пока не объяснили - каких возможностей
function savePerson(person) {
    console.log("Saving ", person);
}
const pl = {
    firstName: "Laugh",
    age: 12
};
// Classes
class Person {
    firstName;
    lastName;
    age;
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    ;
}
const p = new Person("Jhon", "Smith", 27); // можно явно указать тип, но он так-то определяется автоматически, так что не обязательно
class BLock {
    index;
    previousHash;
    timestamp;
    data;
    nonce;
    hash; // readonly свойства могут быть инициализированы либо в точке объявления, либо в конструкторе, после чего их нельзя изменить. это аналогично const , но в отличии от него может быть использовано свойствами класса
    constructor(index, previousHash, timestamp, data) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        const { nonce, hash } = this.mine();
        this.nonce = nonce;
        this.hash = hash;
    }
    mine() {
        return {
            nonce: 2,
            hash: "hash",
        };
    }
}
class Toster {
    id;
    model;
}
class CoffeeMachine {
    id;
}
const tost = new Toster;
// классы разные, но так как имеют одинаковые структуры типов, они совместимы между собой, интересно-интересно
// const coffec: Toster = new CoffeeMachine; выдаёт ошибку, так как у Тостера больше свойств
// ПОльзовательское объединение типов
class SearchAction {
    payload;
    actionType = "SEARCH";
    constructor(payload) {
        this.payload = payload;
    }
}
class SearchSuccessAction {
    payload;
    actionType = "SEARCH_SUCCESS";
    constructor(payload) {
        this.payload = payload;
    }
}
class SearchFailedAction {
    actionType = "SEARCH_FAILED";
}
function area(shape) {
    switch (shape.kind) {
        case "reactangle": return shape.heigth * shape.width;
        case "circle": return Math.PI * shape.radius ** 2;
    }
}
;
;
function foo(x) {
    if ("a" in x) {
        return x.a;
    }
    return x.b;
}
let person1;
person1 = JSON.parse('{ "adress": "25 Broadway" }');
// console.log(person1.address);
let person2;
person2 = JSON.parse('{ "adress": "25 Broadway" }');
// console.log(person2.adress);
// const isPerson = (object: any): object is Personality => "address" in object;
// or
const isPerson = (object) => !!object && "address" in object;
if (isPerson(person2)) {
    console.log(person2.address);
}
else {
    console.log("person2 is not a Personality");
}
const isPersonki = (object) => !!object && object.discriminator === 'person';
//# sourceMappingURL=main.js.map