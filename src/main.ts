// Classes

class Person {
  constructor(public firstName: string, private lastName: string, public age: number) {};
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