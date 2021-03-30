//DOM Setup
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

//State Setup
let state = {};
let available = [];
let genStartState = ()=>{
    let grid = [];
    for (let i = 0; i<7; i++){
        let row = [];   
        for (let j = 0; j<7; j++){
            let cell = {col: i, row: j, active: true};
            row.push(cell);
        }
        grid.push(row);
    }
    grid[0][3].active = false; 
    grid[6][3].active = false;
    state["one"] = [0,3];
    state["two"] = [6,3];
    state["board"] = grid;
    state["turn"] = 0;
}
let actions = state=>{
    let neighbors = [];
    let indices = [-1,0,1];
    let position = currPlayer(state).position;
    for(let di=0; di<3; di++){
        let i = position[0]+indices[di];
        if (i<0|i>6) continue;
        for(let dj = 0; dj<3; dj++){
            let j = position[1]+indices[dj];
            if(j<0|j>6|!state["board"][i][j].active) continue;
            neighbors.push(state["board"][i][j]);
        }
    }
    return neighbors;
}
let currPlayer = state=>{
    if(state.turn%2==0) return {"player": "one", "position": state.one};
    else return {"player": "two", "position": state.two};
}
let isEndState = state=>{
    let validMoves = actions(state);
    if (validMoves.length == 0) return true;
    else return false;
}
let successor = (state, move)=>{
    let player = currPlayer(state).player;
    state[player] = move;
    state["turn"] += 1;
    state["board"][move.col][move.row].active = false;
    return state;
}
let utility = (state)=>{
    if(currPlayer(state).player == "one") return +1000;
    else return -1000;
}


// let renderBoard = ()=>{
//     let board = document.getElementById("board");
//     grid.forEach(row => {
//         row.forEach(cell => {
//             cell = document.createElement("div");
//             cell.addEventListener("click", e=>{
//                 if(available.includes(cell)){move(cell)} 
//                 else console.log("noentry")});
//             cell.classList.add("cell");
//             (i+j)%2==0?cell.classList.add("cell-light")
//             :cell.classList.add("cell-dark");
//             board.appendChild(cell);
//         });
//     });
//     move(grid[0][3]);
//     move(grid[6][3]);
// }
// let clearBoard = () =>{

// }
// //Update legal moves.
// let refreshAvailable = position=>{
//     let nlist = [];
//     let indices = [-1,0,1];
//     for(let di=0; di<3; di++){
//         let i = position.row+indices[di];
//         if (i<0|i>6) continue;
//         for(let dj = 0; dj<3; dj++){
//             let j = position.col+indices[dj];
//             if(j<0|j>6|grid[i][j]==null) continue;
//             nlist.push(grid[i][j]);
//         }
//     }
//     available = nlist;
// }
// //Code for player movement
// let move = (position)=>{
//     //Deactivate old square and activate new.
//     active().square.classList.remove("cell-"+active().id);
//     grid[active().square.row][active().square.col] = null;
//     active().square=position;
//     active().square.classList
//     .add("cell-removed", ("cell-"+active().id));
//     grid[active().square.row][active().square.col] = null;
//     //Switch players, refresh and check for a win!
//     turnNumber++;
//     refreshAvailable(active().square);
//     if(available.length==0) declareLost(active());
// }
// let declareLost = player=>{
//     alert(player.id + " lost!");
//     location.reload();
// }
//Bootstrap the Game
genStartState();
