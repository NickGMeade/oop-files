class Monster {
  private myName : string;

  private age : number;

  private ability : string;

  private strength : number;

  private category : string;

  private level : number;

  private monsterDiv : HTMLDivElement;

  /**
   * Creating a constructor for the Monster Class
   *
   * @param div Monster Div in HTML
   * @param name Monster's name
   * @param age Monster's age
   * @param level Monster's level
   */
  constructor(div : HTMLDivElement, name : string, age : number, level : number) {
    this.monsterDiv = div;
    this.myName = name;
    this.age = age;
    this.level = level;
  }

  /**
   * A function declaring when the monster fights
   *
   * @returns the fight statement
   */
  public fight() : void {
    this.monsterDiv.innerHTML = `${this.myName} fights at level ${this.level}`;
    return console.log(`${this.myName} fights at level ${this.level}!`);
  }

  /**
   * A function to level up the monster
   */
  public levelUp() : void {
    this.level += 1;
  }

  /**
   * A functions to change the monster's name
   *
   * @param name The new name
   */
  public setName(name : string) : void {
    this.myName = name;
  }

  /**
   * The monster eats, but goes down a level
   *
   * @returns Declares the monster eats and drops a level
   */
  public eat() : string {
    this.level -= 1;
    return `${this.myName} eats and drops to level ${this.level}`;
  }
}

// const dave : Monster = new Monster('Dave', 90, 1000);
// console.log(dave.fight());

// const cilly : Monster = new Monster('Cilly', 15, 1500);
// console.log(cilly.fight());
// cilly.levelUp();
// cilly.setName('Cillier');
// console.log(cilly.fight());
// console.log(cilly.eat());

const monsterDiv : HTMLDivElement = document.querySelector('#monster');

const myPaudie = new Monster(monsterDiv, 'Paudie', 25, 10);

myPaudie.fight();
myPaudie.levelUp();
myPaudie.fight();
