class Monster {
    myName;
    age;
    ability;
    strength;
    category;
    level;
    constructor(name, age, level) {
        this.myName = name;
        this.age = age;
        this.level = level;
    }
    fight() {
        return `${this.myName} fights at level ${this.level}!`;
    }
    levelUp() {
        this.level += 1;
    }
    setName(name) {
        this.myName = name;
    }
    eat() {
        this.level -= 1;
        return `${this.myName} eats and drops to level ${this.level}`;
    }
}
const dave = new Monster('Dave', 90, 1000);
console.log(dave.fight());
const cilly = new Monster('Cilly', 15, 1500);
console.log(cilly.fight());
cilly.levelUp();
cilly.setName('Cillier');
console.log(cilly.fight());
console.log(cilly.eat());
//# sourceMappingURL=app.js.map