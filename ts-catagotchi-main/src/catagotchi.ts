import Ticker from './Ticker.js';
import Cat from './Cat.js';
import KeyListener from './KeyListener.js';

export default class Catagotchi {
  private readonly canvas : HTMLCanvasElement;

  private readonly ctx : CanvasRenderingContext2D;

  private background : HTMLImageElement;

  private cat : Cat;

  private keyListener : KeyListener;

  private ticker : Ticker;

  /**
   * Creates the Catagotchi game. Sets all of the attributes of the
   * cat (mood, hunger, sleep, aliveness) to their default states.
   * Once set, the DOM elements will be gathered and updated.
   * Finally, the cat will meow to indicate that it is indeed alive!
   *
   * @param canvas pass the DOM element where the game will run.
   */
  constructor(canvas : HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.background = this.loadNewImage('img/HAPPY_CAT.png');

    // Setting the canvas size
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    this.cat = new Cat(); // Assign properties/objects/variables next
    this.ticker = new Ticker(this, 1000, this.cat);
    this.keyListener = new KeyListener();

    this.updateDisplays();
    this.ticker.startRunning();
  }

  /**
   * Called for every game tick. Updates attributes.
   * TODO: currently called from outside the current class. Make the game tick internal?
   * TODO: move the update of attributes to its own function.
   */
  public gameTick() : void {
    if (this.cat.isAlive()) {
      this.ticker.setTickCounter(1);
      console.log(`Tick Counter: ${this.ticker.getTickCounter()}`);
      if (this.ticker.getTickCounter() % 3 === 0 || this.ticker.getTickCounter() === 0) {
        this.cat.ignore();
        this.executeUserAction();
        this.updateDisplays();
        // Changes the cat's appearance based off their mood, energy and hunger levels
        // Uses a function to return the correct file name and appends it to the image link
        this.background = this.loadNewImage(`img/${this.catAppearance()}.png`);
      }
    }
  }

  private executeUserAction() {
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
  }

  private updateDisplays() {
    let catStatus = 'The cat is ';
    const alignment: CanvasTextAlign = 'center';
    let color = 'blue';
    this.clearScreen();

    this.ctx.drawImage(this.background, 120, 150, this.background.width / 2,
      this.background.height / 2);

    if (this.cat.isAlive()) {
      catStatus += 'Alive';
    } else {
      catStatus += 'Dead';
      color = 'red';
    }

    this.writeTextToCanvas(catStatus, 260, 60, 50, color, alignment);
    this.writeTextToCanvas(`Mood: ${this.cat.getMood()}`, 100, 110, 20, color, alignment);
    this.writeTextToCanvas(`Energy: ${this.cat.getEnergy()}`, 270, 110, 20, color, alignment);
    this.writeTextToCanvas(`Hunger: ${this.cat.getHunger()}`, 420, 110, 20, color, alignment);
  }

  private clearScreen() {
    console.log('Clearing the screen');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private writeTextToCanvas(
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    fontSize = 20,
    color = 'red',
    alignment: CanvasTextAlign = 'center',
  ) {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

  // eslint-disable-next-line class-methods-use-this
  private loadNewImage(source: string) : HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

  /**
   * Change the cat's appearance based on their mood, hunger and energy values
   *
   * @returns the cat's appearance, via the image's file name
   */
  private catAppearance = () : string => {
    let appearance = '';
    if (this.cat.getHunger() >= 10 || this.cat.getEnergy() <= 0) {
      appearance = 'DEAD_CAT';
      console.log('DEAD CAT!!!');
    } else if (this.cat.getEnergy() <= 5) {
      appearance = 'SLEEPY_CAT';
    } else if (this.cat.getMood() <= 4
    || (this.cat.getHunger() >= 5 || this.cat.getEnergy() <= 4)) {
      appearance = 'GRUMPY_CAT';
    } else if (this.cat.getMood() >= 8 && this.cat.getEnergy() >= 8 && this.cat.getHunger() < 4) {
      appearance = 'HAPPY_CAT';
    } else {
      appearance = 'NORMAL_CAT';
    }
    return appearance;
  };
}

const init = () => new Catagotchi(document.querySelector('#canvas'));

// The canvas is replacing the DOM elements
window.addEventListener('load', init);
