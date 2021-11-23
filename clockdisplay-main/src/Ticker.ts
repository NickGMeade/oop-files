class Ticker {
  private lastTickTimeStamp : number;

  private clock: ClockDisplay;

  private interval : number;

  /**
   * Constructor for the Ticket
   *
   * @param clock - The Clock object
   * @param interval - The interval between ticks
   */
  constructor(clock : ClockDisplay, interval : number) {
    this.interval = interval;
    this.clock = clock;
    this.startRunning();
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
    if (timestamp - this.lastTickTimeStamp >= this.interval) {
      // Call the method of this object that needs to be called
      this.clock.timeTick();
      this.lastTickTimeStamp = timestamp;
    }
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  };
}
