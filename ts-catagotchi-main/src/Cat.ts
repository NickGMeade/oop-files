export default class Cat {
  private alive: boolean;

  private mood: number;

  private energy: number;

  private hunger: number;

  /**
   * Constructing the Cat
   */
  constructor() {
    this.alive = true;

    this.mood = 10;
    this.energy = 10;
    this.hunger = 0;

    this.meow();
  }

  /**
   * Meow says the cat.
   * Not accessible directly, but is used as a response by certain actions.
   * TODO: Add some sound effects
   */
  private meow(): void {
    if (!this.alive) {
      throw new Error('Dead catagotchi cannot meow. Something is wrong.');
    }
    console.log('meow!');
  }

  /**
   * Poor catagotchi died.
   */
  private catDied(): void {
    this.alive = false;
  }

  /**
   * Feed the Catagotchi. Will improve mood and reduce hunger.
   */
  public feed = (): void => {
    this.hunger -= 2;
    this.mood += 1;
    this.meow();
  };

  /**
   * Play with the Catagotchi. It does make Catagotchi sleepy, though.
   */
  public play = (): void => {
    this.mood += 1;
    this.energy -= 2;
    this.hunger += 1;
  };

  /**
   * Ask Catagotchi to sleeeeep. Improved mood and energy, but makes it hungry too.
   */
  public sleep = (): void => {
    this.energy += 2;
    this.hunger += 1;
    this.mood += 1;
  };

  /**
   * When the cat is ignored, decrease it's health values.
   */
  public ignore = (): void => {
    if (this.hunger >= 10 || this.energy < 0) {
      this.catDied();
    }
    this.energy -= (Math.random() > 0.7 ? 1 : 0);
    this.mood -= (Math.random() > 0.4 ? 1 : 0);
    this.hunger += (Math.random() > 0.2 ? 1 : 0);
  };

  /**
   * Checking if the cat is still alive
   *
   * @returns Is the cat alive - True/False
   */
  public isAlive(): boolean {
    return this.alive;
  }

  /**
   * Changing the "Alive" status of the cat
   *
   * @param alive the "Alive status of the cat"
   */
  public setAlive(alive: boolean): void {
    this.alive = alive;
  }

  /**
   * Getting the Mood parameter value for the cat
   *
   * @returns the Mood parameter value
   */
  public getMood(): number {
    return this.mood;
  }

  /**
   * Setting a new value for the Mood parameter
   *
   * @param mood the mood value of the cat
   */
  public setMood(mood: number): void {
    this.mood = mood;
  }

  /**
   * Get the energy property's value
   *
   * @returns the energy propperty's value
   */
  public getEnergy(): number {
    return this.energy;
  }

  /**
   * Set the energy property's value to a new value
   *
   * @param energy the energy property
   */
  public setEnergy(energy: number): void {
    this.energy = energy;
  }

  /**
   * Getting the Hunger value of the cat
   *
   * @returns the hunger property value
   */
  public getHunger(): number {
    return this.hunger;
  }

  /**
   * Set the hunger property's value to a new value
   *
   * @param hunger the hunger property
   */
  public setHunger(hunger: number): void {
    this.hunger = hunger;
  }
}
