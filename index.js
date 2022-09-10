let countdown;
let timerDisplay = document.querySelector('.display__time-left');
let endTime = document.querySelector('.display__end-time');
let buttons = document.querySelectorAll('[data-time]');
console.log(buttons);

function timer(seconds){
    clearInterval(countdown);
    document.body.style.backgroundImage = 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)';
    const now= Date.now();
    const then = now + seconds * 1000;
    // initial
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(()=>{
        const secondsLeft = Math.round((then - Date.now())/1000);
        
        if(secondsLeft<0){
            clearInterval(countdown);
            endTime.textContent="Time Over";
            document.body.style.backgroundImage = 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)';
            playAudio();
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds){
    const hours = Math.floor(seconds/(60*60));
    const minutes = Math.floor(seconds/60)-(hours*60);
    const remainderSeconds = seconds%60;

    const adjustHours= hours<10? '0':'';
    const adjustMinutes= minutes<10? '0':'';
    const adjustSeconds= remainderSeconds<10? '0':'';

    const display = `${adjustHours}${hours}:${adjustMinutes}${minutes}:${adjustSeconds}${remainderSeconds}`;
    
    timerDisplay.textContent=display;
    document.title=display;
    
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    const seconds = end.getSeconds();

    const adjustHours= hours>12 ? hours-12 : hours;
    const adjustMinutes = minutes<10 ? '0' : '';
    const adjustSeconds = seconds<10 ? '0' : '' ;

    endTime.textContent= `Be Back At ${adjustHours}:${adjustMinutes}${minutes}:${adjustSeconds}${seconds}`;

}


function playAudio(){
    var x = document.getElementById("myAudio"); 
    x.play(); 
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins*60);
    this.reset();
})

buttons.forEach(button=>{
    button.addEventListener('click', startTimer);
})


// timer(12300);


