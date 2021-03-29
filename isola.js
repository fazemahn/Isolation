//Player and DOM Setup
document.title="Isola";
let css = document.createElement("link");
css.rel="stylesheet";
css.href="styles.css";
document.head.appendChild(css);
let outerdiv = document.createElement("div");
outerdiv.id="board";
outerdiv.classList.add("gameBoard");
document.body.appendChild(outerdiv);
let rules = document.createElement("div");
rules.id="panel";
rules.innerText="Player 1 Starts to Move. Click on any adjacent tiles. Surround your opponent so they have no squares left.";
document.body.appendChild(rules);
let grid = [];
let turnNumber = -1;
let available = [];
let playerOne = {"id": "player1", square: null};
let playerTwo = {"id": "player2", square: null};
let active=()=>turnNumber%2==0?playerTwo:playerOne;
//Board Setup
let generateBoard= ()=>{
    let board = document.getElementById("board");
    for (let i = 0; i<7; i++){
        let row = [];
        for (let j = 0; j<7; j++){
            let cell = document.createElement("div");
            cell.row = i;
            cell.col = j;
            cell.addEventListener("click", e=>{
                if(available.includes(cell)){move(cell)} 
                else console.log("noentry")});
            cell.classList.add("cell");
            (i+j)%2==0?cell.classList.add("cell-light")
            :cell.classList.add("cell-dark");
            board.appendChild(cell);
            row.push(cell);
        }
        grid.push(row);
    }
    //Place players in starting position.
    playerOne.square=grid[0][3];
    playerTwo.square=grid[6][3];
    move(grid[0][3]);
    move(grid[6][3]);
}
//Update legal moves.
let refreshAvailable = position=>{
    let nlist = [];
    let indices = [-1,0,1];
    for(let di=0; di<3; di++){
        let i = position.row+indices[di];
        if (i<0|i>6) continue;
        for(let dj = 0; dj<3; dj++){
            let j = position.col+indices[dj];
            if(j<0|j>6|grid[i][j]==null) continue;
            nlist.push(grid[i][j]);
        }
    }
    available = nlist;
}
//Code for player movement
let move = (position)=>{
    //Deactivate old square and activate new.
    active().square.classList.remove("cell-"+active().id);
    grid[active().square.row][active().square.col] = null;
    active().square=position;
    active().square.classList
    .add("cell-removed", ("cell-"+active().id));
    grid[active().square.row][active().square.col] = null;
    //Switch players, refresh and check for a win!
    turnNumber++;
    refreshAvailable(active().square);
    if(available.length==0) declareLost(active());
}
let declareLost = player=>{
    alert(player.id + " lost!");
    location.reload();
}
//Bootstrap the Game
generateBoard();