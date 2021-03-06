// import Swal from 'sweetalert2'

// Global variables
var moves = []; // Store the moves made in an array object
const squares = document.getElementsByTagName("td"); // Stores the table elements
var squareList = Array.prototype.slice.call(squares);

// Move class called when a move is about to be made
class Move {
    // constructor that defines the objects and methods
    constructor(sign, pos) {
        this.sign = sign;
        this.pos = pos;
        this.playerMove(sign, pos);
    }

    // player move method
    playerMove(sign, pos) {
        const playerSign = signSetter(sign);
        let clonedSign = playerSign.cloneNode(true);
        storeMoves(pos); // passes the move made to the storeMoves method that handles all move made
        pos.append(clonedSign);
        clonedSign.style.cssText = "visibility : visible; display: block;";

        setTimeout(() => {
            if (checkWinner(playerSign)) {
                endGame('player');
            } else {
                this.computerMove(oppositeSign(this.sign)); // this calls the computer to make a move
            }
        }, 200)

    }

    // computer move method
    computerMove(computerSign) {
        try {
            const moves = storeMoves(); // gets the moves made from the store moves method
        } catch (RangeError) {
            location.reload()
        }
        const compMove = squareList[Math.floor(Math.random() * squareList.length)]; // Randomly generates a player move
        const nextMove = compareMoves(moves, compMove);

        // checks to see if the move is valid and passes it if it is
        if (nextMove === false) {
            this.computerMove(computerSign);
        } else {
            let clonedSign = computerSign.cloneNode(true);
            storeMoves(compMove);
            compMove.append(clonedSign);
            clonedSign.style.cssText = "visibility : visible; display: block;";

            setTimeout(() => {
                if (checkWinner(computerSign)) {
                    endGame('computer')
                }
            }, 200);
        }
    }
}

// SquareHandler method handles the cick listener event of the table elements
class SquareHandler {
    constructor(sign, obj) {
        this.sign = sign;
        this.obj = obj;
        this.obj.addEventListener("click", this.addHandler.bind(this));
    }

    addHandler() {
        if (this.obj.children.length) {
            this.obj.removeEventListener("click", this.addHandler);
        } else {
            const move = new Move(this.sign, this.obj);
        }
    }
}

// Main app static class
class App {
    static init() {
        const resetBtn = document.getElementById('reset')
        const crossBtn = document.getElementById('crossbtn')
        const circleBtn = document.getElementById('circlebtn')

        crossBtn.addEventListener('click', startPlayerX)
        circleBtn.addEventListener('click', startPlayerO)

        resetBtn.addEventListener('click', resetGame)
    }
}

function startPlayerX() {
    const sign = 'X'
    const board = document.getElementById('board')
    const btnContainer = document.getElementById('btn-container')

    board.style.cssText = "visibility : visible; display: block;"
    btnContainer.style.cssText = "visibility : hidden; display: none;"

    for (const item of squareList) {
        new SquareHandler(sign, item)
    }
}

function startPlayerO() {
    const sign = 'O'
    const board = document.getElementById('board')
    const btnContainer = document.getElementById('btn-container')

    board.style.cssText = "visibility : visible; display: block;"
    btnContainer.style.cssText = "visibility : hidden; display: none;"

    for (const item of squareList) {
        new SquareHandler(sign, item)
    }
}

// this method rest the game 
function resetGame() {
    location.reload()
}

// this method handles the end game text
function endGameMsg(endMsg) {
    const endGameContainer = document.getElementById('endgame-container')
    const resetBtn = document.getElementById('reset')
    const board = document.getElementById('board')

    var endGameText = document.getElementById('endgame-text')
    var passingText = document.createTextNode(endMsg)

    endGameText.appendChild(passingText)
    resetBtn.style.cssText = "visibility : hidden; display: none;"
    board.style.cssText = "visibility : hidden; display: none;"
    endGameContainer.style.cssText = "visibility : visible; display: block;"
}

// this method handles the end game 
function endGame(whoWon = '') {
    const endGameresetBtn = document.getElementById('endgame-reset')

    endGameresetBtn.addEventListener('click', resetGame)

    if (whoWon === 'player') {
        endGameMsg('You Won!')
    } else if (whoWon === 'computer') {
        endGameMsg('You Lost!')
    } else {
        endGameMsg('Draw!')
    }

}

// method for checking if there is a winner
function checkWinner(sign) {
    var item = squareList
    var id = []
    var pass = false

    for (var i in item) {

        if (
            ((item[0].children[0] !== undefined) && (item[0].id === 'A1') && (item[0].children[0].id === sign.id)) &&
            ((item[1].children[0] !== undefined) && (item[1].id === 'A2') && (item[1].children[0].id === sign.id)) &&
            ((item[2].children[0] !== undefined) && (item[2].id === 'A3') && (item[2].children[0].id === sign.id))
        ) {
            pass = true
            break
        } else if (
            ((item[3].children[0] !== undefined) && (item[3].id === 'B1') && (item[3].children[0].id === sign.id)) &&
            ((item[4].children[0] !== undefined) && (item[4].id === 'B2') && (item[4].children[0].id === sign.id)) &&
            ((item[5].children[0] !== undefined) && (item[5].id === 'B3') && (item[5].children[0].id === sign.id))
        ) {
            pass = true
            break
        } else if (
            ((item[6].children[0] !== undefined) && item[6].id === 'C1' && item[6].children[0].id === sign.id) &&
            ((item[7].children[0] !== undefined) && item[7].id === 'C2' && item[7].children[0].id === sign.id) &&
            ((item[8].children[0] !== undefined) && item[8].id === 'C3' && item[8].children[0].id === sign.id)
        ) {
            pass = true
            break
        } else if (
            ((item[0].children[0] !== undefined) && item[0].id === 'A1' && item[0].children[0].id === sign.id) &&
            ((item[3].children[0] !== undefined) && item[3].id === 'B1' && item[3].children[0].id === sign.id) &&
            ((item[6].children[0] !== undefined) && item[6].id === 'C1' && item[6].children[0].id === sign.id)
        ) {
            pass = true
            break
        } else if (
            ((item[1].children[0] !== undefined) && item[1].id === 'A2' && item[1].children[0].id === sign.id) &&
            ((item[4].children[0] !== undefined) && item[4].id === 'B2' && item[4].children[0].id === sign.id) &&
            ((item[7].children[0] !== undefined) && item[7].id === 'C2' && item[7].children[0].id === sign.id)
        ) {
            pass = true
            break
        } else if (
            ((item[2].children[0] !== undefined) && item[2].id === 'A3' && item[2].children[0].id === sign.id) &&
            ((item[5].children[0] !== undefined) && item[5].id === 'B3' && item[5].children[0].id === sign.id) &&
            ((item[8].children[0] !== undefined) && item[8].id === 'C3' && item[8].children[0].id === sign.id)
        ) {
            pass = true
            break
        } else if (
            ((item[0].children[0] !== undefined) && item[0].id === 'A1' && item[0].children[0].id === sign.id) &&
            ((item[4].children[0] !== undefined) && item[4].id === 'B2' && (item[4].children[0].id === sign.id)) &&
            ((item[8].children[0] !== undefined) && item[8].id === 'C3' && (item[8].children[0].id === sign.id))
        ) {
            pass = true
            break
        } else if (
            ((item[2].children[0] !== undefined) && (item[2].id === 'A3') && (item[2].children[0].id === sign.id)) &&
            ((item[4].children[0] !== undefined) && (item[4].id === 'B2') && (item[4].children[0].id === sign.id)) &&
            ((item[6].children[0] !== undefined) && (item[6].id === 'C1') && (item[6].children[0].id === sign.id))
        ) {
            pass = true
            break
        } else {
            pass = false
        }

    }

    return pass
}

// compares the next move if it is valid
function compareMoves(moves, nextMove) {
    let isConfirm = false
    for (i in moves) {
        if (moves[i] === nextMove) {
            isConfirm = false
            break
        } else {
            isConfirm = true
            i++
        }
    }
    return isConfirm
}

// stores every move made by player or computer
function storeMoves(playerMoves = null) {
    if (playerMoves === null) {
        return moves
    } else {
        moves.push(playerMoves)
        return playerMoves
    }
}

// returns the opposite sign of the player sign
function oppositeSign(inputSign) {
    var computerSign
    if (inputSign === 'O') {
        computerSign = document.getElementById("cross")
        console.log(computerSign)
        return computerSign
    } else if (inputSign === 'X') {
        computerSign = document.getElementById("circle")
        console.log(computerSign)
        return computerSign
    }
}

// this sets the sign of the player
function signSetter(inputSign) {
    var playerSign
    if (inputSign === 'X') {
        playerSign = document.getElementById("cross")
        return playerSign
    } else if (inputSign === 'O') {
        playerSign = document.getElementById("circle")
        return playerSign
    } else {
        playerSign = document.getElementById("cross")
        return playerSign
    }
}


// initialises the static app class
App.init()
