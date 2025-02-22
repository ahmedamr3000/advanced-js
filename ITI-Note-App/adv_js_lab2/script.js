//* Task 1

class Person {
  constructor(name) {
    this.name = name;
  }
}

class Teacher extends Person {
  teach(subject) {
    console.log(`${this.name} is now teaching ${subject}`);
  }
}

var ahmed = new Teacher('Ahmed');

ahmed.teach('English');

// * Task 2

class Vehicle {
  constructor(wheels, speed) {
    this.wheels = wheels;
    this.speed = speed;
  }
}

class Bike extends Vehicle {
  constructor() {
    super(2, 'fast enough');
    Bike.IncrementCount();
  }

  static callCount = 0;

  static IncrementCount() {
    Bike.callCount++;
  }

  static getCount() {
    return Bike.callCount;
  }
}

var bike1 = new Bike();
var bike2 = new Bike();
console.log(Bike.getCount());
