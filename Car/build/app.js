class Monster {
    myName;
    age;
    ability;
    strength;
    category;
    level;
    monsterDiv;
    constructor(div, name, age, level) {
        this.monsterDiv = div;
        this.myName = name;
        this.age = age;
        this.level = level;
    }
    fight() {
        this.monsterDiv.innerHTML = `${this.myName} fights at level ${this.level}`;
        return console.log(`${this.myName} fights at level ${this.level}!`);
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
const monsterDiv = document.querySelector('#monster');
const myPaudie = new Monster(monsterDiv, 'Paudie', 25, 10);
myPaudie.fight();
myPaudie.levelUp();
myPaudie.fight();
//# sourceMappingURL=app.js.map