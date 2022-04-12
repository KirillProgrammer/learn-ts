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
//# sourceMappingURL=main.js.map