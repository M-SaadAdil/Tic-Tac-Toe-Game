let buttons = document.querySelectorAll(".button");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#restart");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableButtons();
    msgContainer.classList.add("hide");
};

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log("button was clicked");
        if (turnO) {
            button.innerText = "O";
            turnO = false;
        } else {
            button.innerText = "X";
            turnO = true;
        }
        button.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableButtons();
};

const disableButtons = () => {
    for(let button of buttons){
        button.disabled = true;
    }
};
const enableButtons = () => {
    for(let button of buttons){
        button.disabled = false;
        button.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congrats, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableButtons();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
      let pos1Val = buttons[pattern[0]].innerText;
      let pos2Val = buttons[pattern[1]].innerText;
      let pos3Val = buttons[pattern[2]].innerText; 

      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log("winner", pos1Val);
            showWinner(pos1Val);
            return true;
        }
      }
    }
};
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);