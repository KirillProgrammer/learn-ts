// Декораторы классов

function whoAmI(target: Function): void { // декоратор должен принимать функцию как аргумент, чтобы быть Декоратором
  console.log(`You are \n ${target}`)
}

@whoAmI // простой декоратор 
class Friend {
  constructor(
    private name: string,
    private age: number
  ) {}
}

// Декоратор, который делает своё, а потом обращается к декорируемому объекту
function UIComponent(html: string) {
  console.log(`The decorator received ${html}`)
  return (target: Function) => {
    console.log(`Someone wants to create a UI component from \n ${target}`)
  }
}

@UIComponent('<h1>Hellof</h1>')
class Shoper {
  constructor(private name: string) {}
}

//Примеси-конструкторы - непонятная вещь, но ладно
function Component(id: number) {
  console.log('init component')
  return (target: Function) => {
    console.log('run component')
    target.prototype.id = id;
  }
}

function Logger() {
  console.log('init logger')
  return (target: Function) => {
    console.log('run logger')
  }
}

function Method(
  target: Object,
  propertyKey: string,
  propertyDescriptor: PropertyDescriptor
) {
 console.log(target, propertyKey, propertyDescriptor)
 propertyDescriptor.value = function(...args: any[]) {
   return args[0] * 10
 }
}

function Prop(
  target: Object,
  propertyKey: string,
) {
  let value: number
  const getter = () => {
    console.log('Get')
    return value
  }
  const setter = (newValue: number) => {
    console.log('Set')
    value = newValue
  }

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter
  })
}

function Param(
  target: Object,
  propertyKey: string,
  index: number,
) {
  console.log(propertyKey, index)
}

@Logger()
@Component(1)
class User {
  @Prop id: number

  @Method
  updateId(@Param newId: number) {
    this.id = newId
    return this.id
  }
}

console.log(new User().id)
console.log(new User().updateId(2))