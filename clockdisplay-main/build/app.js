console.log('Javascript is working!');
window.addEventListener('load', () => {
    console.log('Handling the Load event');
    const outputHTMLElement = document.getElementById('output');
    const hoursInput = document.getElementById('hoursInput');
    const minutesInput = document.getElementById('minutesInput');
    const secondsInput = document.getElementById('secondsInput');
    const clock = new ClockDisplay(outputHTMLElement);
    document.getElementById('tickerButton').addEventListener('click', () => {
        console.log('User clicked ticker button');
        clock.timeTick();
    });
    document.getElementById('setTime').addEventListener('click', () => {
        console.log('User clicked setTime button');
        clock.setTime(hoursInput.value, minutesInput.value, secondsInput.value);
    });
});
//# sourceMappingURL=app.js.map