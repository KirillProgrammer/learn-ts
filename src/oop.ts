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