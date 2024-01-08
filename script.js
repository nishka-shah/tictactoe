function onResize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    let canvas = document.getElementById("canvas");
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
}

window.addEventListener("resize", onResize);

function onLoad() {
    onResize();
}



let playerTurn = 0;
let boardMap = new Map();
const winConditions = [['box1', 'box2', 'box3'], ['box4', 'box5', 'box6'], ['box7', 'box8', 'box9'], ['box1', 'box4', 'box7'], ['box2', 'box5', 'box8'], ['box3', 'box6', 'box9'], ['box1', 'box5', 'box9'], ['box3', 'box5', 'box7']];

function onButtonClick(boxID) {
    var box = document.getElementById(boxID);
    var cell = box.parentElement;
    cell.removeChild(box);
    let gamePiece = document.createElement("h1");
    let text;
    if (playerTurn === 0) {
        text = document.createTextNode("X");
        boardMap.set("box" + boxID, "X");

    } else if (playerTurn === 1) {
        text = document.createTextNode("O");
        boardMap.set("box" + boxID, "O");

    }
    gamePiece.appendChild(text);
    cell.style.width = "100px";
    cell.style.height = "100px";
    gamePiece.style.fontFamily = "Verdana, Geneva, Tahoma, sans-serif";
    gamePiece.style.textAlign = 'center';
    gamePiece.style.verticalAlign = 'middle';
    gamePiece.style.fontSize = '40px';
    cell.appendChild(gamePiece);


    let beepEffect = new Audio("beep.mp3");
    beepEffect.volume = 0.2;
    beepEffect.play();

    if (playerTurn === 0) {
        playerTurn = 1;
    } else {
        playerTurn = 0;
    }

    checkGame();

}

function checkGame() {
    //First check for a win
    let result = "";
    let stateX = [];
    let stateO = [];
    for (let i = 1; i <= 9; i++) {
        if (boardMap.get("box" + i) === "X") {
            stateX.push("box" + i);
        } else if (boardMap.get("box" + i) === "O") {
            stateO.push("box" + i);
        }
    }

    for (let i = 0; i < winConditions.length; i++) {
        let xCounter = 0;
        let oCounter = 0;
        for (let j = 0; j < winConditions[i].length; j++) {
            if (stateX.includes(winConditions[i][j])) {
                xCounter++;
            } else if (stateO.includes(winConditions[i][j])) {
                oCounter++;
            }
        }
        if (xCounter >= 3) {
            result = "X wins the game!";
            break;
        } else if (oCounter >= 3) {
            result = "O wins the game!";
            break;
        }
    }

    //Check for a tie
    if (result === "") {
        let isDraw = true;
        for (let i = 1; i <= 9; i++) {
            if (!boardMap.has("box" + i)) {
                isDraw = false;
            }
        }
        if (isDraw) {
            result = "It's a draw!";
        }
    }

    if (result != "") {
        let tune = new Audio("win.mp3");
        if (result === "draw") {
            tune = new Audio("tie.mp3");
        }

        tune.play();
        for (let i = 1; i <= 9; i++) {
            let btn = document.getElementById(i.toString());
            if (btn != null) btn.parentElement.removeChild(btn);
        }

        let resultDisplay = document.getElementById("results");
        resultDisplay.innerHTML = result + " " + '<a href="index.html">Click here</a> to play again!';
        resultDisplay.scrollIntoView({ behavior: 'smooth' });
    }
}