console.log('game on');

const firstDice = document.querySelector("#first-dice");
const secondDice = document.querySelector("#second-dice");

const startBtn = document.querySelector("#start-btn");
const rollBtn = document.querySelector("#roll-btn");
const individualBtn = document.querySelector("#individual-btn");
const sumBtn = document.querySelector("#sum-btn");
const endBtn = document.querySelector("#end-btn");
const resetBtn = document.querySelector("#reset-btn");

const p1Name = document.querySelector("#p1name")
const p2Name = document.querySelector("#p2name")
const player1= document.getElementById("user1-input");
const player2= document.getElementById("user2-input");
const battle = document.querySelector("#vs");

const board = document.querySelector("#game");
const names = document.querySelector("#names");
const dice = document.querySelector("#dice");
const buttons = document.querySelector("#buttons");
const score = document.querySelector("#scorecard");
const result = document.querySelector("#result");
const winner = document.querySelector("#winner");
const loser = document.querySelector("#loser");

let pTurn = document.querySelector("#turn");

let rounds = 1;
let value1 = player1.value.trim();
let value2 = player2.value.trim();
let p1Total = 0;
let p2Total = 0;
let points = 0;


//console.log(pTurn);
//the boxes for the game-board
const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// index 0 --> hold points for the given round

rollBtn.disabled = true;
individualBtn.disabled = true;
sumBtn.disabled = true;
endBtn.disabled = true;
result.style.display = 'none';
winner.style.display = 'none';
loser.style.display = 'none';


//clicking the start button
startBtn.addEventListener('click', function(){
   let value1 = player1.value.trim();
    let value2 = player2.value.trim();
    if (value1 === "" || value2 === ""){
        alert("One of the names are empty.");
    } else {
        battle.textContent = (value1 + " vs " + value2);
        turn.textContent = (value1 + "'s Turn");

    }
    p1Name.textContent = value1;
    p2Name.textContent = value2;



    names.style.display = 'none';
    board.style.display = 'block';
    dice.style.display = 'flex';
    buttons.style.display = 'flex';
    rollBtn.disabled = false;
    score.style.display = 'block';
    result.style.display = 'none';
    winner.style.display = 'none';
    loser.style.display = 'none';

    console.log(value1);
    console.log(value2);
});



//rolling the dice
rollBtn.addEventListener("click", function(){
    individualBtn.disabled = false;
    sumBtn.disabled = false;
    //generate new random numbers
    dice1 = rollDice();
    dice2 = rollDice();

    //update the icon picture to match the numbers
    firstDice.className = `bi bi-dice-${dice1}`;
    secondDice.className = `bi bi-dice-${dice2}`;

    //when the roll button is clicked, enabling and disabling other buttons
        if((boxes.at(dice1) === "X" || boxes.at(dice2) === "X") || dice1 === dice2)
            {
            individualBtn.disabled = true;
            rollBtn.disabled = true;
            //console.log ("indiv");
            }
        if(((dice1 + dice2) <= 9 && boxes.at(dice1 + dice2) === "X") || (dice1+dice2)>9)
            {
            sumBtn.disabled = true;
            rollBtn.disabled = true;
            //console.log("sum");
            }
        if(individualBtn.disabled === true && sumBtn.disabled===true)
            {
            individualBtn.disabled = true;
            sumBtn.disabled = true;
            endBtn.disabled = false;
            rollBtn.disabled = true;
            //console.log("end");
            }
        else
            {
           //console.log("hi");
            rollBtn.disabled = true;
            }
    //}
});

//Clicking the sum Button
sumBtn.addEventListener('click', function(){
    boxes[dice1 + dice2] = "X";
    boxes[0] = boxes[0] + (dice1 + dice2);
    shut(dice1 + dice2);
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;

});

//Clicking the individual Button
individualBtn.addEventListener('click', function(){
    boxes[dice1] = "X";
    boxes[dice2] = "X";
    boxes[0] = boxes[0] + (dice1 + dice2);
    shut(dice1);
    shut(dice2);
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
});

endBtn.addEventListener('click', function(){
    //subtract the points from previous player from 45, then change the player's turn, finally update boxes array
    let playerTurn = pTurn.textContent;
    let value1 = player1.value.trim();
    console.log(value1);
    let value2 = player2.value.trim();
    let points = (45-boxes[0]);

    if(playerTurn === (value1 + "'s Turn")){
        console.log("hi");
        pTurn.textContent = (value2 + "'s Turn");
        p1Total = p1Total + points;
        const row = buildRow(rounds, points);
        document.querySelector("tbody").insertAdjacentElement("beforeend", row);
    } else {
        console.log("sup");
        pTurn.textContent = (value1 + "'s Turn");
        p2Total = p2Total + points;
        document.querySelector(`#round${rounds} .p2Pts`).textContent = points;
        playerTurn = "Player 2";
        rounds = rounds + 1;
    }


    rollBtn.disabled = false;
    endBtn.disabled = true;

    resetBoard();

    if(rounds>5){
        console.log("Game Over");
        rollBtn.disabled = true;
        dice.style.display = "none";
        buttons.style.display = "none";
        board.style.display = "none";
        score.style.display = "none";
        result.style.display = "block"
        winner.style.display = "block";
        loser.style.display = "block";
        if(p1Total < p2Total){
            console.log("Player 1 Won");
            winner.textContent = `${value1} won with a total of ${p1Total} points!`;
            loser.textContent = `${value2} only had ${p2Total} points.`;
            resetBtn.style.display = "block";
        } else if(p2Total < p1Total){
            console.log("Player 2 Won");
            winner.textContent = `${value2} won with a total of ${p2Total} points!`;
            loser.textContent = `${value1} had ${p1Total} points.`;
            resetBtn.style.display = "block";
        } else{
            console.log("Tied");
            winner.textContent = `${value1} and ${value2} tied with a total of ${p1Total} apiece`;
            loser.style.display = "none";
            resetBtn.style.display = "block";
        }
    }


});

resetBtn.addEventListener('click', function(){
    //reset the board to the start game board
    result.style.display = "none";
    resetBtn.style.display = "none";
    names.style.display = "block";
    p1Total = 0;
    p2Total = 0;
    value1.textContent = "";
    value2.textContent = "";
    rounds = 1;
    document.querySelector("tbody").innerHTML = "";

});






function rollDice(){
    const diceNumber = Math.floor(Math.random() * 6) +1;
    return diceNumber;
}


function shut(boxNumber){
    //Change to this icon ---> <i class="bi bi-x-square"></i>
            const card = document.querySelector(`#box${boxNumber}`);
            card.className = "bi bi-x-square";
}

function resetBoard(){
    boxes.fill(0);
    const cards = document.querySelectorAll(".numbers i");
    cards [0].className = "bi bi-1-square";
    cards [1].className = "bi bi-2-square";
    cards [2].className = "bi bi-3-square";
    cards [3].className = "bi bi-4-square";
    cards [4].className = "bi bi-5-square";
    cards [5].className = "bi bi-6-square";
    cards [6].className = "bi bi-7-square";
    cards [7].className = "bi bi-8-square";
    cards [8].className = "bi bi-9-square";
}

function buildRow(roundNumber, pts){
    const newRow = document.createElement("tr");
    const rowH = document.createElement("th");
    const p1td = document.createElement("td");
    const p2td = document.createElement("td");

    newRow.id = `round${rounds}`;
    rowH.textContent = `Round ${rounds}`;
    p1td.className = "p1Pts";
    p1td.textContent = pts;
    p2td.className = "p2Pts";
    //p2td.textContent = p2Total;

    newRow.insertAdjacentElement("beforeend", rowH);
    newRow.insertAdjacentElement("beforeend", p1td);
    newRow.insertAdjacentElement("beforeend", p2td);

    return newRow;
};
