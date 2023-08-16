const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector("#game-info");
const newGameBtn = document.querySelector("#new-game");

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let currentPlayer;
let gameGrid;

//initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //Initialize UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //if box was green from previous game remove color
        box.classList.remove("win");
    });

    newGameBtn.style.display = "none";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //update current player
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let winner = "";

    winningPositions.forEach((position) => {
        // 3 boxes in winning position should be non-empty and same
        if( (gameGrid[position[0]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[0]] === gameGrid[position[2]])) {

            //who is winner ?
            if(gameGrid[position[0]] === "X") 
                winner = "X";
            else 
                winner = "O";
                
            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            
            //turn winning positions green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //winner found
    if(winner !== "" ) {
        gameInfo.innerText = `Winner Player - ${winner}`;
        newGameBtn.style.display = "block";
        return;
    }

    //check if it is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is filled so game is tie
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied";
        newGameBtn.style.display = "block";
    }

}

function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);