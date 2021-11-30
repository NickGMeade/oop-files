import catagotchi from 'catagotchi.js';

import Cat from './Cat';

export default class Ticker {
  private lastTickTimeStamp: number;

  private clock: catagotchi;

  private cat: Cat;

  private interval: number;

  private tickCounter: number;

  /**
   * Constructor for the Ticket
   *
   * @param clock - The catagotchi class
   * @param interval - The interval between ticks
   * @param cat - The cat class
   */
  constructor(clock: catagotchi, interval: number, cat: Cat) {
    this.interval = interval;
    this.clock = clock;
    this.cat = cat;
    this.tickCounter = 0;
    // this.startRunning();
  }

  /**
   * Start the automatic updating process of this object
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public startRunning() {
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
    if (timestamp - this.lastTickTimeStamp >= this.interval) {
      // Call the method of this object that needs to be called
      this.clock.gameTick();
      this.lastTickTimeStamp = timestamp;
    }
    // Request the browser to call the step method on next animation frame
    if (this.cat.isAlive()) {
      requestAnimationFrame(this.step);
    }
  };

  /**
   * Getter to return the Tick counter value
   *
   * @returns the current tick counter value
   */
  public getTickCounter() : number {
    return this.tickCounter;
  }

  /**
   * Setting the new Tick Counter value
   *
   * @param increment the tick increment
   */
  public setTickCounter(increment: number) : void {
    this.tickCounter += increment;
  }
}
