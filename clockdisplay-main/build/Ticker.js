class Ticker {
    lastTickTimeStamp;
    clock;
    interval;
    constructor(clock, interval) {
        this.interval = interval;
        this.clock = clock;
        this.startRunning();
    }
    startRunning() {
        this.lastTickTimeStamp = performance.now();
        requestAnimationFrame(this.step);
    }
    step = (timestamp) => {
        if (timestamp - this.lastTickTimeStamp >= this.interval) {
            this.clock.timeTick();
            this.lastTickTimeStamp = timestamp;
        }
        requestAnimationFrame(this.step);
    };
}
//# sourceMappingURL=Ticker.js.map