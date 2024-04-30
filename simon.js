let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let btns = ["red", "yellow", "green", "purple"];

let hScore = 0;

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let idx = Math.floor(Math.random() * 3);
    let color = btns[idx];
    let btn = document.querySelector(`.${color}`);
    gameSeq.push(color);
    console.log(gameSeq);
    gameFlash(btn);

}


document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        console.log("game started");
    }
    levelUp();
});

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (gameSeq.length == userSeq.length) {
            setTimeout(levelUp, 500);
        }
    } else {
        if (hScore < level) {
            hScore = level - 1;
        }
        h2.innerHTML = `Game Over!! Your score was <b>${level}</b><br>Press Any Key To Start</br><br>Highest Score : ${hScore}</br>`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}


let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

