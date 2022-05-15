const moves = []
const squares = document.getElementsByTagName('td')


class Move {
    constructor(sign, pos) {
        this.sign = sign
        this.pos = pos
        this.playerMove(sign, pos)
    }

    playerMove(sign, pos) {
        const playerSign = signSetter(sign)
        let clonedSign = playerSign.cloneNode(true)
        storeMoves(pos)
        pos.append(clonedSign)
        clonedSign.style.visibility = "visible"

        this.computerMove(oppositeSign(this.sign))
        checkWinner(playerSign)
    }

    computerMove(computerSign) {
        const moves = storeMoves()
        const compMove = squares[Math.floor(Math.random() * squares.length)]
        const nextMove = compareMoves(moves, compMove)

        if (nextMove === false) {
            this.computerMove(computerSign)
        } else {
            let clonedSign = computerSign.cloneNode(true)
            storeMoves(compMove)
            compMove.append(clonedSign)
            clonedSign.style.visibility = "visible"
            // checkWinner(computerSign)
        }

    }
}

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

class App {
    static init() {

        const sign = 'X'

        for (const item of squares) {
            new SquareHandler(sign, item)
        }

    }

}

function checkWinner(sign) {
    console.log(squares.childNode)
    let item = []
    item = [squares]
    console.log(item)

    for (const node of item) {
        console.log(node)
        if (item.childNode.length > 0) {
            console.log(node.childNode.id)
        }
    }

}

function compareMoves(moves, nextMove) {
    let isConfirm = false
    for (i in moves) {
        if (item.childNodes[0] === sign) {
            console.log(item.id)
        }
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


function storeMoves(playerMoves = null) {
    if (playerMoves === null) {
        return moves
    } else {
        moves.push(playerMoves)
        return playerMoves
    }
}

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



App.init()
