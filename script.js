let x_points = 0;
let o_points = 0;
let count = 0;
let turn = "X";
let round = 1;

let resetBtn = document.getElementById("reset");
let boxes = document.querySelectorAll(".spot");
let r = document.getElementById("round");
let t = document.getElementById("turn");
let p1 = document.getElementById("plyr1");
let p2 = document.getElementById("plyr2");

r.innerText = "Round " + round;
t.innerText = "Turn: " + turn;
p1.innerText = "Plyr1(X): " + x_points;
p2.innerText = "Plyr2(O): " + o_points;

let win = {flag: false, who: ""};
const patterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function initialize() {
    round++;
    turn = "X";
    count = 0;
    win = {flag: false, who: ""};
    r.innerText = "Round " + round;
    t.innerText = "Turn: " + turn;
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.classList.remove("win");
    });
}

function check() {
    for(let values of patterns) {
        if(
            boxes[values[0]].innerHTML === turn &&
            boxes[values[1]].innerHTML === turn &&
            boxes[values[2]].innerHTML === turn
        ) {
            win.flag = true;
            win.who = turn;
            if(turn === "X") x_points++;
            else o_points++;
            p1.innerText = "Plyr1(X): " + x_points;
            p2.innerText = "Plyr2(O): " + o_points;
            boxes[values[0]].classList.add("win");
            boxes[values[1]].classList.add("win");
            boxes[values[2]].classList.add("win");
            setTimeout(initialize, 3000);
            return;
        }
    }
    if(!win.flag && count === 9) {
        alert("Draw!");
        setTimeout(initialize, 3000);
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(box.innerHTML === "" && !win.flag) {
            count++;
            box.innerHTML = turn;
            check();
            if(!win.flag) {
                turn = turn === "X" ? "O" : "X";
                t.innerText = "Turn: " + turn;
            }
        }
    });
});

resetBtn.addEventListener("click", () => {
    x_points = 0;
    o_points = 0;
    count = 0;
    turn = "X";
    round = 1;
    win = {flag: false, who: ""};
    t.innerText = "Turn: " + turn;
    r.innerText = "Round " + round;
    p1.innerText = "Plyr1(X): " + x_points;
    p2.innerText = "Plyr2(O): " + o_points;
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.classList.remove("win");
    });
});
