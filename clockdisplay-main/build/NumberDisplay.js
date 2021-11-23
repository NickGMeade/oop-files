class NumberDisplay {
    limit;
    value;
    constructor(rollOverLimit) {
        this.limit = rollOverLimit;
        this.value = 0;
    }
    getValue() {
        return this.value;
    }
    setValue(replacementValue) {
        if ((replacementValue >= 0) && (replacementValue < this.limit)) {
            this.value = replacementValue;
        }
    }
    getStringValue() {
        if (this.value < 10) {
            return `0${this.value}`;
        }
        else {
            return `${this.value}`;
        }
    }
    setStringValue(newValue) {
        this.setValue(Number(newValue));
    }
    increment() {
        this.value = (this.value + 1) % this.limit;
    }
}
//# sourceMappingURL=NumberDisplay.js.map