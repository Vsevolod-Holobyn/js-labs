//car1
let car1 = new Object();
car1.color = "black";
car1.maxSpeed = 220;
car1.driver = new Object();
car1.driver.name = "Vsevolod Holobyn";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";
car1.tuning = true;
car1["number of accidents"] = 0;

car1.drive = function(){
    console.log("I am not driving at night")
}

console.log(car1);
car1.drive();

//car2
let car2 = {
    color: "white",
    maxSpeed: 221,
    driver: {
        name: "Vsevolod Holobyn",
        category: "B",
        "personal limitations": null
    },
    tuning: false,
    "number of accidents": 2  
}

car2.drive = function(){
    console.log("I can drive anytime")
}

console.log(car2);
car2.drive();

//Truck
function Truck(color, weight, avgSpeed, brand, model){
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;
    this.driver = null;

    this.trip = function(){
        if (this.driver == null){
            console.log("No driver assigned")
        } else{ 
            let message = "Driver " + this.driver.name;
            if (this.driver.nightDriving == true){
                message += " drives at night ";

            } else{
                message += " does not drive at night ";
            }
            message += "and has " + this.driver.experience + " years of experience.";
            console.log(message);
        }
    };
}

Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

let Truck1 = new Truck("grey", 1000, 10.0, "Porsche", "v1");
Truck1.AssignDriver("Vsevolod Holobyn", true, 10);
console.log(Truck1);
Truck1.trip();

let Truck2 = new Truck("grey", 1000, 10.0, "Porsche", "v1");
Truck2.AssignDriver("Vsevolod Holobyn", false, 10);
console.log(Truck2);
Truck2.trip();

//Square
class Square{
    a;

    constructor(a){
        this.a = a;
    }

    static help(){
        console.log("This is a regular quadrilateral with all sides equal..");
        console.log("All interior angles are right angles (90°).");
        console.log("The perimeter is calculated as P = 4a.");
    }

    length() {
        console.log("The length of the sides of the square: " + (this.a * 4));
    }

    square(){
        console.log("The area of the square: " + (this.a * this.a));
    }

    info(){
        console.log("The length of all 4 sides is " + this.a);
        console.log("The measure of all 4 angles is 90°");
        this.length();
        this.square();
    }
}

Square.help();
let firstSquare = new Square(10);
console.log(firstSquare);
firstSquare.info();

//Rectangle
class Rectangle extends Square{
    b;

    constructor(a, b){
        super(a);
        this.b = b;
    }

    get a() {
        return this._a;
    }
    set a(value) {
        if (value > 0) this._a = value;
        else console.log("Side a must be > 0");
    }

    get b() {
        return this._b;
    }
    set b(value) {
        if (value > 0) this._b = value;
        else console.log("Side b must be > 0");
    }

    static help(){
        console.log("Has two pairs of equal sides.");
    }

    length(){
        console.log("The length of the sides of the rectangle: " + (2 * (this.a + this.b)));
    }

    square(){
        console.log("The area of the rectangle: " + (this.a * this.b))
    }

    info(){
        console.log("Rectangle with sides a =" + this.a + " and b = " + this.b);
        console.log("The measure of all 4 angles is 90°");
        this.length();
        this.square();
    }
}

Rectangle.help();
let firstRectangle = new Rectangle(4, 5);
console.log(firstRectangle);
firstRectangle.info()

//Rhombus
class Rhombus extends Square{
    alpha;
    beta;

    constructor(a, alpha, beta){
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help(){
        console.log("All sides are equal, opposite sides are parallel");
        console.log("Opposite angles are equal, and the sum of adjacent angles is 180°");
    }

    length(){
        console.log("The length of the sides of the rhombus: " + (this.a * 4));
    }

    square() {
        console.log("The area of the rhombus is: " + (this.a ** 2) * Math.sin(this.alpha * Math.PI / 180));
    }

    info(){
        console.log("The length of all 4 sides is " + this.a);
        console.log("Angles alpha: " + this.alpha + " degrees. Angles beta: " + this.beta + " degrees.");
        this.length();
        this.square();
    }
}

Rhombus.help();
let firstRhombus = new Rhombus(5, 140, 40);
console.log(firstRhombus);
firstRhombus.info();

//Parallelogram
class Parallelogram extends Rhombus {
    b;

    constructor(a, b, alpha, beta) {
        super(a, alpha, beta);
        this.b = b;
    }

    static help() {
        console.log("Opposite sides are parallel and equal in length.");
        console.log("Opposite angles are equal, and the sum of adjacent angles is 180°.");
    }

    length() {
        console.log("The length of the sides of the parallelogram: " + (2 * (this.a + this.b)));
    }

    square() {
        console.log("The area of the parallelogram is: " + (this.a * this.b * Math.sin(this.alpha * Math.PI / 180)));
    }

    info() {
        console.log("The length of sides are: a = " + this.a + ", b = " + this.b); 
        console.log("Angles alpha: " + this.alpha + " degrees. Angles beta: " + this.beta + " degrees."); 
        this.length(); 
        this.square(); 
    }
}

Parallelogram.help();
let firstParallelogram = new Parallelogram(10, 5, 140, 40);
console.log(firstParallelogram);
firstParallelogram.info();

//Triangular
function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

const tri1 = Triangular();
const tri2 = Triangular(6, 8, 10);
const tri3 = Triangular(10, 10, 12);

console.log(tri1, tri2, tri3);

//PiMultiplier
function PiMultiplier(multiplier) {
    return function() {
        return Math.PI * multiplier;
    };
}

const multiplyBy2 = PiMultiplier(2);
const multiplyByTwoThirds = PiMultiplier(2/3);
const divideBy2 = PiMultiplier(1/2);

console.log("PI * 2 = " + multiplyBy2());
console.log("PI * 2/3 = " + multiplyByTwoThirds());
console.log("PI / 2 = " + divideBy2());

// Painter
function Painter(color) {
    return function(obj) {
        if (obj.type) {
            console.log("Color: " + color + ", Type: " + obj.type);
        } else {
            console.log("No 'type' property occurred!");
        }
    };
}

let PaintBlue = Painter("Blue");
let PaintRed = Painter("Red");
let PaintYellow = Painter("Yellow");

const obj1 = {
    maxSpeed: 280,
    type: "Sportcar",
    color: "magenta"
};

const obj2 = {
    type: "Truck",
    "avg speed": 90,
    "load capacity": 2400
};

const obj3 = {
    maxSpeed: 180,
    color: "purple",
    isCar: true
};

console.log("Testing PaintBlue");
PaintBlue(obj1);
PaintBlue(obj2); 
PaintBlue(obj3); 

console.log("Testing PaintRed");
PaintRed(obj1);  
PaintRed(obj2);  
PaintRed(obj3); 

console.log("Testing PaintYellow");
PaintYellow(obj1);
PaintYellow(obj2); 
PaintYellow(obj3); 