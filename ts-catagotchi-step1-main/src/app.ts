class Catagotchi {
  private alive : boolean;
  private mood : number;
  private energy : number;
  private hunger : number;
  private gameDom : Element;
  private displayMood : HTMLDivElement;
  private displayEnergy : HTMLDivElement;
  private displayHunger : HTMLDivElement;
  private displayStatus : HTMLDivElement;
  private lastTickTimeStamp : number;

  /**
   * Creates the Catagotchi game. Sets all of the attributes of the
   * cat (mood, hunger, sleep, aliveness) to their default states.
   * Once set, the DOM elements will be gathered and updated.
   * Finally, the cat will meow to indicate that it is indeed alive!
   *
   * @param gameDOM pass the DOM element where the game will run.
   */
  constructor(gameDOM : Element) {
    this.gameDom = gameDOM;
    this.alive = true;
    this.mood = 10;
    this.energy = 10;
    this.hunger = 0;

    this.startRunning();
    this.updateDisplays();
  }

  /**
   * Feeding the Cat
   */
  public feed() {
    this.hunger -= 3;
  }

  /**
   * Playing with the cat
   */
  public play() {
    this.mood += 3;
    this.energy -= 2;
  }

  /**
   * The cat goes to sleep
   */
  public sleep() {
    this.energy += 4;
    this.hunger += 2;
  }

  /**
   * Cat goes Meow
   */
  private meow() : void {
    console.log("Meow!");
  }

  /**
   * The cat has died...
   */
  private catDied() : void {
    this.alive = false;
    console.log("The cat has died... how could you!");
    this.displayStatus.textContent = 'The cat has died';
  }

  /**
   * Called for every game tick.
   */
  public gameTick() {
    if (this.hunger >= 10 || this.energy <= 0) {
      this.catDied();
    }
    else {
      this.meow();
    }
  }

  /**
   * Update the games displays with the cat's details
   */
  private updateDisplays() : void {
    let catStatus : string = '';
    if (this.alive = true) {
      catStatus = 'Alive';
    }
    else {
      catStatus = 'Dead';
    }
    this.displayStatus.textContent = catStatus;
    this.displayMood.textContent = String(this.mood);
    this.displayHunger.textContent = String(this.hunger);
    this.displayEnergy.textContent = String(this.energy);
  }

  /**
   * Getting elements from the DOM
   */
  private getDOMElements() : void {
    this.displayStatus = document.querySelector('#displayStatus');
    this.displayMood = document.querySelector('#displayMood');
    this.displayHunger = document.querySelector('#displayHunger');
    this.displayEnergy = document.querySelector('#displayEnergy');
    const buttonFeed = document.querySelector('#buttonFeed');
    const buttonPlay = document.querySelector('#buttonPlay');
    const buttonSleep = document.querySelector('#buttonSleep');
  }

  /**
   * Start the automatic updating process of this object
   */
  private startRunning() {
    // Set the last tick timestamp to current time
    this.lastTickTimeStamp = performance.now();
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  }

  /**
   * This MUST be an arrow method in order to keep the `this` variable working
   * correctly. It will otherwise be overwritten by another object caused by
   * javascript scoping behaviour.
   *
   * @param timestamp a `DOMHighResTimeStamp` similar to the one returned by
   *   `performance.now()`, indicating the point in time when `requestAnimationFrame()`
   *   starts to execute callback functions
   */
  private step = (timestamp: number) => {
    // Check if it is time to perform the next Tick
    if (timestamp - this.lastTickTimeStamp >= 3000) {
      // Call the method of this object that needs to be called
      this.gameTick();
      this.lastTickTimeStamp = timestamp;
    }
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  };
}

const init = () => {
  const catGame = new Catagotchi(document.querySelector('#game'));
};

window.addEventListener('load', init);
