import Cat from './Cat.js';
import KeyListener from './KeyListener.js';

class Catagotchi {
  private cat : Cat;

  private keyListener : KeyListener;

  private gameDOM : Element;

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
    this.gameDOM = gameDOM; // Assign Parameters first
    this.cat = new Cat(); // Assign properties/objects/variables next
    this.keyListener = new KeyListener();
    this.getDOMElements(); // Implement any functions/methods required last
    this.updateDisplays();
    this.startRunning();
  }

  /**
   * Update the displays on the DOM with current state of attributes.
   */
  private updateDisplays() {
    this.displayMood.innerHTML = String(this.cat.getMood());
    this.displayHunger.innerHTML = String(this.cat.getHunger());
    this.displayEnergy.innerHTML = String(this.cat.getEnergy());
    this.displayStatus.innerHTML = (this.cat.isAlive() === true ? 'Alive' : 'Dead');
  }

  /**
   * Called for every game tick. Updates attributes.
   * TODO: currently called from outside the current class. Make the game tick internal?
   * TODO: move the update of attributes to its own function.
   */
  private gameTick() {
    if (this.keyListener.isKeyDown(KeyListener.KEY_P) === true) {
      this.cat.play();
      console.log('The cat plays with the ball of yarn!');
    } else if (this.keyListener.isKeyDown(KeyListener.KEY_S) === true) {
      this.cat.sleep();
      console.log('The cat takes a nap... zzzzz');
    } else if (this.keyListener.isKeyDown(KeyListener.KEY_F) === true) {
      this.cat.feed();
      console.log('The cat scoffs down the bowl of food!');
    }
    if (this.cat.isAlive()) {
      this.cat.ignore();
      this.updateDisplays();
    }
  }

  private getDOMElements() {
    this.displayHunger = this.gameDOM.querySelector('#displayHunger');
    this.displayMood = this.gameDOM.querySelector('#displayMood');
    this.displayEnergy = this.gameDOM.querySelector('#displayEnergy');
    this.displayStatus = this.gameDOM.querySelector('#displayStatus');
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

const init = () => new Catagotchi(document.querySelector('#game'));

window.addEventListener('load', init);
