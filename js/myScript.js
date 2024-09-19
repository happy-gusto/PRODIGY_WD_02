let startTime, updatedTime, difference, tInterval;
let running = false;

document.getElementById('start').onclick = function() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1000);
        running = true;
    }
};

document.getElementById('pause').onclick = function() {
    clearInterval(tInterval);
    running = false;
};

document.getElementById('reset').onclick = function() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    resetDisplay();
    document.getElementById('laps').innerHTML = "";
};

document.getElementById('lap').onclick = function() {
    if (running) {
        const lapTime = new Date().getTime() - startTime;
        const formattedLapTime = formatTime(lapTime);
        const lapEntry = document.createElement('div');
        lapEntry.className = 'lap';
        lapEntry.innerText = formattedLapTime;
        document.getElementById('laps').appendChild(lapEntry);
    }
};

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    updateDisplay('hoursTens', Math.floor(hours / 10));
    updateDisplay('hoursUnits', hours % 10);
    updateDisplay('minutesTens', Math.floor(minutes / 10));
    updateDisplay('minutesUnits', minutes % 10);
    updateDisplay('secondsTens', Math.floor(seconds / 10));
    updateDisplay('secondsUnits', seconds % 10);
}

function updateDisplay(id, value) {
    const element = document.getElementById(id);
    const formattedValue = value.toString();
    if (element.innerHTML !== formattedValue) {
        element.classList.add('fold');
        setTimeout(() => {
            element.innerHTML = formattedValue;
            element.classList.remove('fold');
        }, 250);
    }
}

function resetDisplay() {
    const digits = ['hoursTens', 'hoursUnits', 'minutesTens', 'minutesUnits', 'secondsTens', 'secondsUnits'];
    digits.forEach(id => document.getElementById(id).innerHTML = "0");
}

function formatTime(time) {
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds
    );
}

