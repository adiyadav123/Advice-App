const button = document.querySelector(".next");
const advice_number = document.querySelector(".advice_number");
const advice_text = document.querySelector(".advice");
var num = 1;


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