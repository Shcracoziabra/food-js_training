function timer(id, deadline) {
    // calculates time intervals from the time left to final date and returnes the object of time intervals

    function makeTimeIntervals(date) {
        let now = new Date();
        let diff = date.getTime() - now.getTime();
            
        let seconds =  Math.floor(diff / 1000) % 60;
        let minutes = Math.floor(diff / (1000 * 60)) %  60;
        let hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));

        return {
            'diff': diff,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // adds caption with the right ending below each timer part

    function makeCaptions(timerPart, interval, forOne, for_2_3_4, forOthers) {
        let caption = timerPart.parentElement.querySelector('div');
        let lastDigit = interval;

        if (interval < 10 || interval > 20) {
            lastDigit = interval % 10;
        } 
        switch (lastDigit) {
            case 1:
                caption.textContent = forOne;
                break;
            case 2:
            case 3:
            case 4:
                caption.textContent = for_2_3_4;
                break;
            default: 
                caption.textContent = forOthers;
                break;
            }
    }

    // adds zero before a single digit

    function addForwardZero(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // assigns digits of a certain time interval to appropriate part of timer

    function makeDigits(timerPart, interval) {
        timerPart.textContent = addForwardZero(interval);
    }

    function setTime(id, deadline) {
        const parent = document.querySelector(id);
        const finalDate = new Date(deadline);
        const days = parent.querySelector('#days'),
              hours = parent.querySelector('#hours'),
              minutes = parent.querySelector('#minutes'),
              seconds = parent.querySelector('#seconds');
        
        // run a function first time to avoid delay due to setInterval function
        let timer;
        updateTime();

        timer = setInterval(updateTime, 1000);
        
        // runs all finctions for setting right time in timer block
        function updateTime() {
            let timeIntervals = makeTimeIntervals(finalDate);
            if (timeIntervals.diff <= 0) {

                days.innerHTML = '00';
                hours.innerHTML = '00';
                minutes.innerHTML = '00';
                seconds.innerHTML = '00';

                days.parentElement.querySelector('div').innerHTML = 'дней';
                hours.parentElement.querySelector('div').innerHTML = 'часов';
                minutes.parentElement.querySelector('div').innerHTML = 'минут';
                seconds.parentElement.querySelector('div').innerHTML = 'секунд';

                clearInterval(timer);

            } else {

                makeDigits(days, timeIntervals.days);
                makeDigits(hours, timeIntervals.hours);
                makeDigits(minutes, timeIntervals.minutes);
                makeDigits(seconds, timeIntervals.seconds);
    
                makeCaptions(days, timeIntervals.days, 'день', 'дня', 'дней');
                makeCaptions(hours, timeIntervals.hours, 'час', 'часа', 'часов');
                makeCaptions(minutes, timeIntervals.minutes, 'минута', 'минуты', 'минут');
                makeCaptions(seconds, timeIntervals.seconds, 'секунда', 'секунды', 'секунд');
            }
        }
    }
    // sets a timer in a certain parent element
    setTime(id, deadline);
}

export default timer;


