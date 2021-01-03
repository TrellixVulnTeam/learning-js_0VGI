class Clock {
    constructor() {
        this.partytime = 0;
        this.timeOfDay;

        this.wakeup = 6;
        this.morning = 7;
        this.noon = 12;
        this.lunchtime = 12;
        this.naptime = this.lunchtime +2;
        this.evening = 18;
    }

    showCurrentTime(){
        clock = document.getElementById("clock");
        
        let time = new Date();
        let hour = time.getHours();
        let minute = time.getMinutes();
        let seconds = time.getSeconds();

        if (minute < 10){
            minute = "0" + minute;
        }

        if (seconds < 10){
            seconds = "0" + seconds;
        }
    
        const concatTime = hour + ":" + minute + ":" + seconds;
    
        clock.innerHTML =  concatTime ;
    }

    updateClock(){
        let timeImage = document.getElementById("timeImage");
        let timeMessage = document.getElementById("clockMessage");
        let time = new Date().getHours();
        let message;
        let image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/normalTime.jpg";
        
        if (time == this.partytime){
            image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/partyTime.jpg";
            console.log("It is now partytime");
            message = "PARTYTIME";
        }
        else if (time == this.wakeup){
            image = "https://vetstreet-brightspot.s3.amazonaws.com/8f/e2/f39c0f3741849b404692aaf33735/cat-on-bed-istock-86906259-large-335.jpg";
            console.log("it is now time to wakeup");
            message = "Wake up!";
        }
        else if (time == this.lunchtime){
            image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat2.jpg";
            console.log("It is now time to eat some lunch");
            message = "Time to eat some lunch!";
        }
        else if (time == this.naptime){
            image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat3.jpg";
            console.log("It is now time to take a nap");
            message = "Let's take a nap...";
        }
        else if (time < this.noon){
            image = "https://news3lv.com/resources/media/6ecd9a16-896b-45db-a687-75919fad4065-large16x9_CatCafe.jpg?1565220634335"
            console.log("It is morning now");
            message = "Good morning!";
        }
        else if (time < this.evening){
            image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/normalTime.jpg";
            console.log("It is now evening");
            message = "Good evening.";
        }
        else {
            image = "https://cdn.pixabay.com/photo/2017/05/31/09/54/cat-2359779_960_720.jpg"
            console.log("it is now afternoon");
            message = "Good afternoon.";
        }
        console.log(time + ""+ this.naptime);
        timeImage.src = image;
        timeMessage.innerHTML = message;
        this.showCurrentTime();
    }
    partyEvent (partyButton){
        if (this.partytime < 0){
            this.partytime = new Date().getHours();
            partyButton.innerText = "Party is over!"
            partyButton.style.backgroundColor = "#0A8DAB";
        } else{
            this.partytime = -1;
            partyButton.innerText = "Party!"
            partyButton.style.backgroundColor = "#222";
        }
    }

}

const newClock = new Clock();
newClock.updateClock();

let partyTimeButton = document.getElementById("partyTimeButton");
partyTimeButton.addEventListener("click", function(){newClock.partyEvent(partyTimeButton)});

let wakeUpTimeSelector = document.getElementById("wakeUpTimeSelector");
let wakeUpEvent = function(){
    newClock.wakeup = wakeUpTimeSelector.value;
    console.log("wakeUp time has changed to" + wakeUpTimeSelector.value);
}
wakeUpTimeSelector.addEventListener("change", wakeUpEvent);

let lunchTimeSelector = document.getElementById("lunchTimeSelector");
let lunchEvent = function(){
    newClock.lunchtime = lunchTimeSelector.value;
    console.log("lunchTime time has changed to" + lunchTimeSelector.value);
}
lunchTimeSelector.addEventListener("change", lunchEvent);

let napTimeSelector = document.getElementById("napTimeSelector");
let napTimeEvent = function(){
    newClock.naptime = napTimeSelector.value;
    console.log("napTime time has changed to" + napTimeSelector.value);
}
napTimeSelector.addEventListener("change", napTimeEvent);

setInterval(function (){
    newClock.updateClock();
}, 1000);