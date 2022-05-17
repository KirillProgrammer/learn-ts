class Dog {
  constructor(readonly name: string) {}
  sayHello(): string {
   return "Hello";
  }
}

class Fish {
  constructor(readonly name: string) {}
  dive(howDeep: number) {
    return `now is ${howDeep}`;
  }
}

type Pet = Dog | Fish ;

const talkToPet = (pet: Pet): string | undefined => {
  if (pet instanceof Dog) {
    return pet.sayHello();
  } else if (pet instanceof Fish) {
    return "Fish cannot talk, sorry";
  }
}

const myDog = new Dog("Sammy");
const myFish = new Fish("Marry");

console.log(talkToPet(myDog));
console.log(talkToPet(myFish));