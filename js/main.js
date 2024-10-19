// this is so badly written how the hell does this even work LMFAO
const x = "🔵";
const o = "🟣";

const playTiles = document.getElementsByClassName("playtile");
const turnfield = document.getElementById("turnfield");

const statsDiv = document.getElementById("stats");
const gameend = document.getElementById("gameend");
const restart = document.getElementById("restart");

let currentTurn = false; // false == x, true == o

let rounds = 0;
let hasWon = false;

let cases = [
    //Horizontal Cases
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    // Vertical Cases 
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // Sideways Cases
    [2,4,6],
    [0,4,8]
];

// sounds
const sndDraw = document.getElementById("draw");
const sndPlr1 = document.getElementById("plr1");
const sndPlr2 = document.getElementById("plr2");

for(let i = 0; i < playTiles.length; i++){
    playTiles[i].onclick = function(){
        rounds += 1;
        console.log(rounds);
        if(playTiles[i].innerHTML === "🚫" && hasWon === false){
            
            let output = "";
            if(currentTurn){output = x} else{output = o};
            if(currentTurn){turnfield.innerHTML = `It is ${o}'s turn`} else{turnfield.innerHTML = `It is ${x}'s turn`}; 
            currentTurn = !currentTurn;
            playTiles[i].innerHTML = output;

            for(let loops = 0; loops < cases.length; loops++)
                // this is horrible but IT WORKS I GUESS!!
                if(playTiles[cases[loops][0]].innerHTML === playTiles[cases[loops][1]].innerHTML && playTiles[cases[loops][0]].innerHTML === playTiles[cases[loops][2]].innerHTML){
                    if(playTiles[cases[loops][0]].innerHTML !== "🚫"){
                        if(playTiles[cases[loops][0]].innerHTML === x){
                            gameend.innerHTML = "Blue has won!";
                            sndPlr1.play();
                        }
                        else{
                            gameend.innerHTML = "Purple has won!";
                            sndPlr2.play();
                        }

                        statsDiv.style.display = "inline";
                        hasWon = true;
                    }
            }

            if(hasWon == false && rounds === 9){
                gameend.innerHTML = "Draw! No one wins!";
                statsDiv.style.display = "inline";
                sndDraw.play();
            }
        }
        
    }
}

restart.onclick = function(){
    for(let i = 0; i < playTiles.length; i++){
        turnfield.innerHTML = `It is ${o}'s turn`
        playTiles[i].innerHTML = "🚫"
        rounds = 0;
        currentTurn = false;
        hasWon = false;

        statsDiv.style.display = "none";
    }
}

