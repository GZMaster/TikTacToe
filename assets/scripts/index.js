// Global variables
const moves = []    // Store the moves made in an array object
const squares = document.getElementsByTagName('td')     // Stores the table elements
var squareList = Array.prototype.slice.call(squares);

// Move class called when a move is about to be made
class Move {
    // constructor that defines the objects and methods 
    constructor(sign, pos) {
        this.sign = sign
        this.pos = pos
        this.playerMove(sign, pos)
    }

    // player move method
    playerMove(sign, pos) {
        const playerSign = signSetter(sign)
        let clonedSign = playerSign.cloneNode(true)
        storeMoves(pos)     // passes the move made to the storeMoves method that handles all move made
        pos.append(clonedSign)
        clonedSign.style.visibility = "visible"

        this.computerMove(oppositeSign(this.sign))  // this calls the computer to make a move
        // checkWinner(playerSign)
    }

    // computer move method 
    computerMove(computerSign) {
        const moves = storeMoves()      // gets the moves made from the store moves method
        const compMove = squareList[Math.floor(Math.random() * squareList.length)]      // Randomly generates a player move
        const nextMove = compareMoves(moves, compMove)

        // checks to see if the move is valid and passes it if it is
        if (nextMove === false) {
            this.computerMove(computerSign)
        } else {
            let clonedSign = computerSign.cloneNode(true)
            storeMoves(compMove)
            compMove.append(clonedSign)
            clonedSign.style.visibility = "visible"

            checkWinner(computerSign)
        }

    }
}

// SquareHandler method handles the cick listener event of the table elements
class SquareHandler {
    constructor(sign, obj) {
        this.sign = sign
        this.obj = obj
        this.obj.addEventListener('click', this.addHandler.bind(this))
    }

    addHandler() {
        if (this.obj.children.length) {
            this.obj.removeEventListener('click', this.addHandler)
        } else {
            const move = new Move(this.sign, this.obj)
        }
    }

}

// Main app static class
class App {
    static init() {

        const sign = 'X'

        for (const item of squareList) {
            new SquareHandler(sign, item)
        }

    }

}

// method for checking if there is a winner
function checkWinner(sign) {
    var item = squareList
    var id = []
    var Ahori = ['A1', 'A2', 'A3']
    var Bhori = ['B1', 'B2', 'B3']
    var Chori = ['C1', 'C2', 'C3']
    var Avert = ['A1', 'B1', 'C1']
    var Bvert = ['A2', 'B2', 'C2']
    var Cvert = ['A3', 'B3', 'C3']
    var Adiag = ['A1', 'B2', 'C3']
    var Cdiag = ['A3', 'B2', 'C1']

    var pass = 0

    for (var node in item) {
        if ((item[node].children[0] !== undefined) && (item[node].children[0].id === 'cross')) {
            id.push(item[node])
        } else {
            continue
        }
    }



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
    if (inputSign.id === document.getElementById("circle").id) {
        computerSign = document.getElementById("cross")
        return computerSign
    } else {
        computerSign = document.getElementById("circle")
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
