class Personme {
  // firstName = ''
  // lastName = ''
  // age = 0

  // constructor(firstName: string, lastName: string, age: number) {
  //   this.firstName = firstName
  //   this.lastName = lastName
  //   this.age = age
  // }

  constructor(                  // как вариант вместо многословного
    public firstName: string,   // варианта выше, но выглядит отчасти
    public lastName: string,    // менее разборчиво - дело вкуса
    private age: number         //
  ) {}

  protected sayHello(): string {
    return `My name is ${this.firstName} and ${this.lastName}`
  }

  sellStock(symbol: string, numberOfShares: number) {
    console.log(`Selling ${numberOfShares} of ${symbol}`)
  }
}

class Employee extends Personme {
  constructor(firstName: string, lastName: string, age: number, public department: string) {
    super(firstName, lastName, age)
  }
  reviewPerformance(): void {
    this.sayHello()
    this.increasePay(5)
  }
  increasePay(percent: number): void { }

  sellStock(symbol: string, shares: number) {
    super.sellStock(symbol, shares)
    this.reportToCompilance(symbol, shares)
  }
  private reportToCompilance(symbol: string, shares: number) {
    console.log(`${this.lastName} from ${this.department} sold ${shares} shares of ${symbol}`)
  }
}

const empl = new Employee("Jhon", "Smith", 48, "Google Inc")
empl.sellStock("Google", 2312)

class SuperGangsta {
  static totalBullets = 100

  shoot() {
    SuperGangsta.totalBullets--
    console.log(`Bullets left: ${SuperGangsta.totalBullets}`)
  }
}

class Gangsta extends SuperGangsta {// Получает собственную копию
                                    // totalBullets и поэтому
  shoot() {                         // у каждого будет отдельный
    Gangsta.totalBullets--          // отсчёт
    console.log(`Bullets left: ${Gangsta.totalBullets}`)
  }
}

const g1 = new Gangsta()
g1.shoot()

const g2 = new SuperGangsta()
g2.shoot()
/*
  Если понадобиться написать десяток функций для проверки пользовательского
  ввода в различных полях UI. Вместо создания раздельных функций можно 
  сгруппировать их в класс с десятком static-методов.
*/

// Паттерн одиночки

class AppState {
  counter = 0
  private static instanceRef: AppState

  private constructor() { }
  static getInstance(): AppState {
    if (AppState.instanceRef === undefined) {
      AppState.instanceRef = new AppState
    }
    return AppState.instanceRef
  }
}

const appState = AppState.getInstance() // создание одиночки без конструктора

// Абстрактные классы

abstract class Personmes {
  constructor(public name: string) { }

  changeAddr(newAddr: string) {
    console.log(`Change Addr: ${newAddr}`)
  }
  giveDayOff() {
    console.log(`Give Day Off to${this.name}`)
  }
  promote(percent: number) {
    this.giveDayOff();
    this.increasePay(percent)
  }

  protected abstract increasePay(percent: number) : void
}

class Employees extends Personmes {
  protected increasePay(percent: number) {
    console.log(`Increasing the salary of ${this.name} by ${percent}%`);
  }
}
class Contractor extends Personmes {
  protected increasePay(percent: number) {
    console.log(`Increasing the hourly rate of ${this.name} by ${percent}%`)
  }
}

const workers: Personmes[] = []
workers[0] = new Employees("Jhon")
workers[1] = new Contractor("Morph")

workers.forEach(worker => worker.promote(5))

interface Product {
  id: number
  description: string
}

interface ProductProperties {
  id?: number
  description?: string
}

class ProductService {
// для перегрузки методов мы сначала их просто объявляем а только потом реализуем. Bопросительный знак объявляет, что аргумент опционален
  
  id: number
  description: string

  constructor()
  constructor(id: number)
  constructor(id: number, description: string)
  constructor(id?: number, description?: string) {

  }
  // или 
  // constructor(properties?: ProductProperties) {}
  
  getProducts(description: string): Product[]
  // getProducts(): void
  getProducts(id: number): Product

  getProducts(product: number | string): Product[] | Product {
    if (typeof product === "number") {
      console.log(`Getting the product info for id ${product}`)
      return { id: product, description: 'greet product' }
    } else if (typeof product === "string") {
      console.log(`Getting product with description ${product}`)
      return [{ id: 123, description: 'blue jeans' },
              { id: 789, description: 'blue jeans' }]
    } else {
      return { id: -1, description: 'Error: getProducts() accept only number or string as args' }
    }
  }
}

const prodService = new ProductService()
prodService.getProducts(123)
prodService.getProducts('blue jeans')

// Интерфейсы


// Объявляет сигнатуру метода,
// который должен быть реализован
// классом
// интерфейс обеспечивает выполнение определенного контракта
// то есть класс обязан объявить методы из интерфейса
// а дальше может и своего чего-нибудь сделать
interface MotorVehicle {
  startEngine(): boolean
  stopEngine(): boolean
  brake(): boolean
  accelerate(speed: number): void
  honk(howLong: number): void
}

// Bond... James Bond

interface Flyable {
  fly(howHigh: number)
  land()
}
interface Swimmable {
  swim(howFar: number)
}

class Car implements MotorVehicle {
  startEngine(): boolean {
    return true;
  }
  stopEngine(): boolean{
    return true;
  }
  brake(): boolean {
    return true;
  }
  accelerate(speed: number): void {
    console.log(`Driving faster`);
  }
  honk(howLong: number): void {
    console.log(`Beep beep yeah!`);
  }
}

class SecretServiceCar extends Car implements Flyable, Swimmable {
  fly(howHigh: number) {
    console.log(`Go to ${howHigh}`)
  }
  land() {
    console.log('Fly to..')
  }
  swim(howFar: number) {
    console.log(`Deeper to ${howFar}`)
  }
}

/*
можно также использовать расширение интерфейсов

interface Flyable extends MotorVehicle {
  fly(howHigh: number)
  land()
}

даже если Swimmable также будет расширять MotorVehicle, компи-
лятор TypeScript не станет ругаться

class SecretServiceCar implements Flyable, Swimmable {

  Реализует метод из MotorVehicle

  startEngine(): boolean {
    return true
  }
  stopEngine(): boolean {
    return true
  }
  brake(): boolean {
    return true
  }
  accelerate(speed: number) {
    console.log(`Driving faster`)
  }

  honk(howLong: number): void {
    console.log(`Beep beep yeah!`)
  }

  Реализует метод из Flyable

  fly(howHigh: number) {
    console.log(`Flying ${howHigh} feet high`)
  }

  land() { 
    console.log(`Landing. Fasten your belts.`);
  }

  Реализует метод из Swimmable

  swim(howFar: number) {
    console.log(`Swimming ${howFar} feet`);
  }
}
*/

const car = new Car()
car.startEngine()