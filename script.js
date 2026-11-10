function updateClock(){

     const date=new Date();

    document.getElementById("currtime").innerHTML=date.toLocaleTimeString();

     document.getElementById("currdate").innerHTML=date.toLocaleDateString();


    //  document.getElementById("currtime").innerHTML=date.toTimeString();

    //  document.getElementById("currdate").innerHTML=date.toDateString();

}

setInterval(updateClock,1000);



//STOPWATCH


function helper(seconds){

    const h=Math.floor(seconds/3600);

    const m=Math.floor((seconds%3600)/60);

    const s=seconds%60;

    //padStart- adds anything at the start

    //padEnd- adds anything at the end

    return String(h).padStart(2,"0")+":"+String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");

}


let swSeconds=0;

let swId=null;//for id

function startStopwatch(){

    if(swId!==null)

        return;

    swId=setInterval(function(){

        swSeconds++;

        document.getElementById("stopwatch").textContent=helper(swSeconds);

    },1000);

}


function stopStopwatch(){

    clearInterval(swId);

    swId=null;

}


function resetStopwatch(){

    stopStopwatch();

    swSeconds=0;

    document.getElementById("stopwatch").innerHTML="00:00:00";

}

let timerSeconds=0;

let timerId=null;

function startTimer(){

    clearInterval(timerId);

    timerSeconds = Number(document.getElementById("timerInput").value);

    if(!Number.isInteger(timerSeconds) || timerSeconds <= 0){
        alert("Please enter a valid positive number of seconds.");
        return;
    }

    document.getElementById("timer").textContent = helper(timerSeconds);

    timerId = setInterval(function(){

        timerSeconds--;

        document.getElementById("timer").textContent = helper(timerSeconds);

        if(timerSeconds === 0){

            clearInterval(timerId);

            alert("Time's Up");

        }

    }, 1000);

}


//ALARM

let alarmTime;
let alarmSound;

function setAlarm() {
    const input = document.getElementById("alarmInput");
    const status = document.getElementById("alarmStatus");

    if (input.value === "") {
        status.textContent = "Please select a time!";
        return;
    }

    alarmTime = input.value;

    status.textContent = `Alarm set for ${alarmTime}`;
}

function checkAlarm() {
    if (!alarmTime) return;

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const currentTime = `${hours}:${minutes}`;

    if (currentTime === alarmTime) {
        alarmTime = null;

        document.getElementById("alarmStatus").textContent =
            "⏰ Alarm ringing!";

        alarmSound = new Audio(
            "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
        );

        alarmSound.loop = true;
        alarmSound.play().catch(() => {
            alert("Alarm ringing! Audio playback was blocked.");
        });
    }
}

setInterval(checkAlarm, 1000);

function stopAlarm() {
    if (alarmSound) {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        alarmSound = null;
    }

    alarmTime = null;

    document.getElementById("alarmStatus").textContent =
        "Alarm stopped.";
}
