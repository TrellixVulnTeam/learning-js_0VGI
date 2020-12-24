class Clock {
    constructor() {
        this.wakeup = 6;
        this.noon = 12;
        this.lunchtime = 12;
        this.naptime = this.lunchtime +2;
        this.evening = 18;
        this.dinner = 18;
    }

    showCurrentTime(){
        clock = document.getElementById("clock");

        let timeOfDay;
        let time = new Date();
        let hour = time.getHours();
        let minute = time.getMinutes();
        let seconds = time.getSeconds();
    
        if (hour >= this.evening){
            timeOfDay = "evening";
        }
        else if (hour >= this.noon){
            timeOfDay = "noon";
        }
        else if (hour > this.wakeup){
            timeOfDay = "morning";
        }

        if (minute < 10){
            minute = "0" + minute;
        }

        if (seconds < 10){
            seconds = "0" + seconds;
        }
    
        const concatTime = "Its " + timeOfDay + " and time is: " + hour + ":" + minute + ":" + seconds;
    
        clock.innerHTML = concatTime;
    }

}

const newClock = new Clock();
setInterval(function (){
    newClock.showCurrentTime();
}, 1);
