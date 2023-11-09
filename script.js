const button = document.querySelector(".next");
const advice_number = document.querySelector(".advice_number");
const advice_text = document.querySelector(".advice");
var num = 1;

function getNotificationPerm(){
    Notification.requestPermission().then((permission) => {
        if(permission == "granted"){
            console.log("Permission granted");
        } else {
            console.log("Permission denied");
        }
    })
    
}

getNotificationPerm();

async function DailyAdvice(){
    localStorage.setItem("advice_num", num);
    let response = await fetch("https://api.adviceslip.com/advice");
    let data = await response.json();
    let adiv = data.slip.advice;
    new Notification("Daily Advice",{
        body: `${adiv}`
    })
}

setTimeout(() => {
    DailyAdvice();
}, 86400000);


if(localStorage.getItem("advice_num")){
    let advNum = localStorage.getItem("advice_num");
    num = Number.parseInt(advNum);

    advice_number.innerHTML = advNum;
}


window.onload = show;

button.addEventListener("click", async function(){
    show();
});


async function show(){
    num++;

    localStorage.setItem("advice_num", num);
    let response = await fetch("https://api.adviceslip.com/advice");
    let data = await response.json();
    

    advice_number.innerHTML = num;

    advice_text.innerHTML = data.slip.advice;
};