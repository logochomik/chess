class Grid {
    constructor (length, height) {
        this.length = length;
        this.height = height;
    }
    render() {
        let total = this.length * this.height;
        for (let i = 1; i <= total; i++) {
            const whiteSquare = document.createElement('div');
            whiteSquare.style.cssText = 'height:50px;width:50px;background-color:#eeeed2;display:inline-block;padding:10px;';
            whiteSquare.id = `${i}`;
            const blackSquare = document.createElement('div');
            blackSquare.style.cssText = 'height:50px;width:50px;background-color:#769656;display:inline-block;padding:10px;';
            blackSquare.id = `${i}`;
            const br = document.createElement('br');
            document
                .getElementById('board')
                .appendChild(i % 2 === Math.ceil(i / this.length) % 2
                    ? whiteSquare
                    : blackSquare
                );
            if (i % this.length == 0) document.getElementById('board').appendChild(br);
        }
    }
}

class Piece {
    constructor (type, color, place) {
        this.type = type;
        this.color = color;
        this.place = place;
    }
    render() {
        document.getElementById(`${this.place}`).classList.add(`${this.color}-${this.type}`);
    }
}

class Board {
    constructor() {
        this.grid = new Grid(8, 8);
        this.grid.render();
    }
    fenPos(str) {
        for (let i = 1; i < 65; i++) {
            let e = document.getElementById(`${i}`);
            if (e.classList !== '') {
                console.log(i, e.classList)
                e.classList = '';
                console.log(i, e.classList)
            }
        }
        str.split('');
        let row = 0;
        let column = 0;
        for(let i = 0; i < str.length; i++) {
            let num = ((row * 8) + (column))
            switch (str[i]) {
                case '/':
                    row += 1;
                    column = -1;
                    break;
                case '1':
                    break;
                case '2':
                    column += 1;
                    break;
                case '3':
                    column += 2;
                    break;
                case '4':
                    column += 3
                    break;
                case '5':
                    column += 4;
                    break;
                case '6':
                    column += 5;
                    break;
                case '7':
                    column += 6;
                    break;
                case '8':
                    column += 7;
                    break;
                case 'k':
                    new Piece('king', 'black', num + 1).render();
                    break;
                case 'K':
                    new Piece('king', 'white', num + 1).render();
                    break;
                case 'q':
                    new Piece('queen', 'black', num + 1).render();
                    break;
                case 'Q':
                    new Piece('queen', 'white', num + 1).render();
                    break;
                case 'r':
                    new Piece('rook', 'black', num + 1).render();
                    break;
                case 'R':
                    new Piece('rook', 'white', num + 1).render();
                    break;
                case 'n':
                    new Piece('knight', 'black', num + 1).render();
                    break;
                case 'N':
                    new Piece('knight', 'white', num + 1).render();
                    break;
                case 'b':
                    new Piece('bishop', 'black', num + 1).render();
                    break;
                case 'B':
                    new Piece('bishop', 'white', num + 1).render();
                    break;
                case 'p':
                    new Piece('pawn', 'black', num + 1).render();
                    break;
                case 'P':
                    new Piece('pawn', 'white', num + 1).render();
                    break;
            }
            column += 1;
        }
    }
}

function posFen() {
    let arr = [];
    let num = 0;
    for (let i = 1; i < 65; i++) {
        let e = document.getElementById(`${i}`);
        switch (e.classList[0]) {
            case 'white-king':
                if (num != 0) arr.push(`${num}`);
                arr.push('K');
                num = 0;
                break;
            case 'black-king':
                if (num != 0) arr.push(`${num}`);
                arr.push('k');
                num = 0;
                break;
            case 'white-queen':
                if (num != 0) arr.push(`${num}`);
                arr.push('Q');
                num = 0;
                break;
            case 'black-queen':
                if (num != 0) arr.push(`${num}`);
                arr.push('q');
                num = 0;
                break;
            case 'white-rook':
                if (num != 0) arr.push(`${num}`);
                arr.push('R');
                num = 0;
                break;
            case 'black-rook':
                if (num != 0) arr.push(`${num}`);
                arr.push('r');
                num = 0;
                break;
            case 'white-knight':
                if (num != 0) arr.push(`${num}`);
                arr.push('N');
                num = 0;
                break;
            case 'black-knight':
                if (num != 0) arr.push(`${num}`);
                arr.push('n');
                num = 0;
                break;
            case 'white-bishop':
                if (num != 0) arr.push(`${num}`);
                arr.push('B');
                num = 0;
                break;
            case 'black-bishop':
                if (num != 0) arr.push(`${num}`);
                arr.push('b');
                num = 0;
                break;
            case 'white-pawn':
                if (num != 0) arr.push(`${num}`);
                arr.push('P');
                num = 0;
                break;
            case 'black-pawn':
                if (num != 0) arr.push(`${num}`);
                arr.push('p');
                num = 0;
                break;
            default:
                num += 1;
                break;
        }
        if (i % 8 == 0) {
            if (i != 0 && i != 64) {
                if (num != 0) arr.push(`${num}`);
                arr.push('/');
                num = 0;
            }
        }
    }
    return arr.join('');
}

let selectedPiece = 0;
let turnAmt = 0;
let turn = 1;
let turnFromEnPassant = 0;
let switchTurn = true;
let currentPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
let lastPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
const piecedict = {
    'black-pawn': 0,
    'black-king': 0,
    'black-queen': 0,
    'black-knight': 0,
    'black-bishop': 0,
    'black-rook': 0,
    'white-pawn': 1,
    'white-king': 1,
    'white-queen': 1,
    'white-knight': 1,
    'white-bishop': 1,
    'white-rook': 1
}
const directionOffsets = [8, -8, -1, 1, 7, -7, 9, -9];

const startPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
const board = new Board();
board.fenPos(startPosition);
document.addEventListener('keydown', (event) => undo(event))

for (let i = 1; i < 65; i++) {
    let e = document.getElementById(`${i}`);
    e.addEventListener('click', (x) => movePiece(i));
}

function undo(e) {
    if (e.key == 'r') {
        currentPosition = lastPosition;
        board.fenPos(currentPosition);
        document.getElementById('pos').innerHTML = currentPosition;
        if (switchTurn == true) {
            if (turnAmt > 0) {
                turn == 0 ? turn = 1 : turn = 0;
                turn == 0 ? document.getElementById('turn').innerHTML = 'black' : document.getElementById('turn').innerHTML = 'white';
                turnAmt -= 1;
                document.getElementById('turnamt').innerHTML = turnAmt;
            }
        }
        switchTurn = false;
        document.getElementById('winner').innerHTML = 'none';
    }
}

function movePiece(id) {
    let e = document.getElementById(`${id}`);
    if (selectedPiece == 0) {
        if (piecedict[e.classList[0]] == turn) {
            selectedPiece = id;
            document.getElementById('selected').innerHTML = `${e.classList[0]} at square ${id}`;
        }
    }
    else if (selectedPiece !== 0) {
        let p = document.getElementById(`${selectedPiece}`);
        let peicetype = p.classList;
        let peicetypeUse = peicetype[0];
        let pasttype = e.classList;
        let pasttypeUse = pasttype[0];
        if (piecedict[peicetypeUse] === piecedict[pasttypeUse]) {
            selectedPiece = 0;
            document.getElementById('selected').innerHTML = `none`;
        }
        else if (piecedict[peicetypeUse] != turn) {
            selectedPiece = 0;
            document.getElementById('selected').innerHTML = `none`;
        }
        else {
            let one = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            let two = [56, 57, 58, 59, 60, 61, 62, 63, 64]
            let inOne = false;
            let inTwo = false;
            for (let i in one) {if (id == one[i]) {inOne = true;}}
            for (let i in two) {if (id == two[i]) {inTwo = true;}}

            let legalMove = true;
            if (peicetypeUse == 'white-pawn') {
                if (document.getElementById(`${selectedPiece}`).classList[1] == 'en-passantable') {
                    document.getElementById(`${selectedPiece}`).classList.remove('en-passantable');
                }
                let test = selectedPiece - id;
                let isInInitialRow = false;
                for (let i = 48; i < 57; i++) {
                    if (selectedPiece == i) {
                        isInInitialRow = true;
                    }
                }
                if (test == 16 && isInInitialRow) {
                    if (document.getElementById(`${selectedPiece - 8}`).classList == '') {
                        legalMove = true;
                        document.getElementById(`${selectedPiece}`).classList.add('en-passantable');
                        turnFromEnPassant = turnAmt + 1;
                    }
                    else {
                        console.log(document.getElementById(`${selectedPiece - 8}`).classList)
                        legalMove = false;
                    }
                }
                else if (test == 8) {
                    if (document.getElementById(`${id}`).classList.value != '') {
                        legalMove = false;
                    }
                }
                else if (test != 8 && test != 7 && test != 9) {
                    legalMove = false;
                }
                else if (test == 7 || test == 9) {
                    if (document.getElementById(`${id}`).classList == '') {
                        legalMove = false;
                    }
                    if (turnFromEnPassant > 0) {
                        let test1 = document.getElementById(`${selectedPiece + 1}`).classList[1];
                        let test2 = document.getElementById(`${selectedPiece - 1}`).classList[1];
                        if (test1 == 'en-passantable' || test2 == 'en-passantable') {
                            console.log('en passant');
                            if (test1 == 'en-passantable') {
                                document.getElementById(`${id + 8}`).classList = '';
                            }
                            if (test2 == 'en-passantable') {
                                document.getElementById(`${id + 8}`).classList = '';
                            }
                            legalMove = true;
                        }
                    }
                }
            }
            else if (peicetypeUse == 'black-pawn') {
                if (document.getElementById(`${selectedPiece}`).classList[1] == 'en-passantable') {
                    document.getElementById(`${selectedPiece}`).classList.remove('en-passantable');
                }
                let test = selectedPiece - id;
                let isInInitialRow = false;
                for (let i = 9; i < 17; i++) {
                    if (selectedPiece == i) {
                        isInInitialRow = true;
                    }
                }
                if (test == -16 && isInInitialRow) {
                    if (document.getElementById(`${selectedPiece + 8}`).classList == '') {
                        legalMove = true;
                        document.getElementById(`${selectedPiece}`).classList.add('en-passantable');
                        turnFromEnPassant = turnAmt + 1;
                    }
                    else {
                        console.log(document.getElementById(`${selectedPiece + 8}`).classList)
                        legalMove = false;
                    }
                }
                else if (test == -8) {
                    if (document.getElementById(`${id}`).classList.value != '') {
                        legalMove = false;
                    }
                }
                else if (test != -8 && test != -7 && test != -9) {
                    legalMove = false;
                }
                else if (test == -7 || test == -9) {
                    let test1 = document.getElementById(`${selectedPiece + 1}`).classList[1];
                    let test2 = document.getElementById(`${selectedPiece - 1}`).classList[1];
                    console.log(document.getElementById(`${selectedPiece + 1}`).classList, document.getElementById(`${selectedPiece - 1}`).classList)
                    if (test1 == 'en-passantable' || test2 == 'en-passantable') {
                        if (turnFromEnPassant > 0) {
                            console.log('en passant');
                            if (test1 == 'en-passantable') {
                                document.getElementById(`${id - 8}`).classList = '';
                            }
                            if (test2 == 'en-passantable') {
                                document.getElementById(`${id - 8}`).classList = '';
                            }
                            legalMove = true;
                        }
                    }
                    else {
                        if (document.getElementById(`${id}`).classList == '') {
                            legalMove = false;
                        }
                    }
                }
            }
            else if (peicetypeUse == 'white-king' || peicetypeUse == 'black-king') {
                let test = selectedPiece - id;
                if (test != -1 && test != 1 && test != -8 && test != 8 && test != -7 && test != 7 && test != -9 && test != 9) {
                    legalMove = false;
                }
            }
            else if (peicetypeUse == 'white-knight' || peicetypeUse == 'black-knight') {
                let test = selectedPiece - id;
                if (test != 6 && test != -6 && test != 10 && test != -10 && test != 15 && test != -15 && test != 17 && test != -17) {
                    legalMove = false;
                }
            }
            else if (peicetypeUse == 'white-bishop' || peicetypeUse == 'black-bishop') {
                let test = id - selectedPiece;
                console.log(test)
                if (test > 0) {
                    if (test % 9 == 0 || test % 9 == -0) {
                        let isSomethingThere = false;
                        for (let i = 9; i < test; i+=9) {
                            if (document.getElementById(`${selectedPiece + i}`).classList != '') {
                                isSomethingThere = true;
                            }
                            if (isSomethingThere == true) {
                                legalMove = false;
                                break;
                            }
                        }
                        if (test == 9) legalMove = true;
                    }
                    else {
                        let isSomethingThere = false;
                        for (let i = 7; i < test; i+=7) {
                            if (document.getElementById(`${selectedPiece + i}`).classList != '') {
                                isSomethingThere = true;
                            }
                            if (isSomethingThere == true) {
                                legalMove = false;
                                break;
                            }
                        }
                        if (test == 7) legalMove = true;
                    }
                }
                else if (test < 0) {
                    if (test % 9 == 0 || test % 9 == -0) {
                        let isSomethingThere = false;
                        for (let i = -9; i > test; i-=9) {
                            if (document.getElementById(`${selectedPiece + i}`).classList != '') {
                                isSomethingThere = true;
                            }
                            if (isSomethingThere == true) {
                                legalMove = false;
                                break;
                            }
                        }
                        if (test == -9) legalMove = true;
                    }
                    else {
                        let isSomethingThere = false;
                        for (let i = -7; i > test; i-=7) {
                            if (document.getElementById(`${selectedPiece + i}`).classList != '') {
                                isSomethingThere = true;
                            }
                            if (isSomethingThere == true) {
                                legalMove = false;
                                break;
                            }
                        }
                        if (test == -7) legalMove = true;
                    }
                    if (test > id % 7 || test > id % 9) {
                        legalMove = false;
                    }
                }
                if (test != 7 && test != -7 && test != 9 && test != -9 && test != 14 && test != -14 && test != 18 && test != -18 && test != 21 && test != -21 && test != -27 && test != 27 && test != 28 && test != -28 && test != 36 && test != -36 && test != 35 && test != -35 && test != 45 && test != -45 && test != 42 && test != -42 && test != 54 && test != -54 && test != 49 && test != -49 && test != 63 && test != -63) {
                    legalMove = false;
                }
            }
            else if (peicetypeUse == 'white-rook' || peicetypeUse == 'black-rook') {
                let test = id - selectedPiece;
                if (test > 0) {
                    if (test % 8 == 0 || test % 8 == -0) {
                        let isSomethingThere = false;
                        for (let i = 8; i < test; i += 8) {
                            if (document.getElementById(`${selectedPiece + i}`).classList != '') {
                                isSomethingThere = true;
                            }
                            if (isSomethingThere == true) {
                                legalMove = false;
                                break;
                            }
                        }
                    }
                    else {
                        let isSomethingThere = false;
                        if (test == 1) {
                            legalMove = true;
                        }
                        else {
                            for (let i = 1; i < test; i += 1) {
                                if (document.getElementById(`${selectedPiece + i}`).classList != '') {
                                    isSomethingThere = true;
                                }
                                if (isSomethingThere == true) {
                                    legalMove = false;
                                    break;
                                }
                            }
                        }
                        if (test > id % 8) {
                            legalMove = false;
                        }
                    }
                }
                else if (test < 0) {
                    if (test % 8 == 0 || test % 8 == -0) {
                        let isSomethingThere = false;
                        for (let i = -8; i > test; i -= 8) {
                            if (document.getElementById(`${selectedPiece + i}`).classList != '') {
                                isSomethingThere = true;
                            }
                            if (isSomethingThere == true) {
                                legalMove = false;
                                break;
                            }
                        }
                    }
                    else {
                        let isSomethingThere = false;
                        if (test == -1) {
                            console.log(test % 8)
                            legalMove = true;
                        }
                        else {
                            for (let i = -1; i > test; i -= 1) {
                                if (document.getElementById(`${selectedPiece + i}`).classList != '') {
                                    isSomethingThere = true;
                                }
                                if (isSomethingThere == true) {
                                    legalMove = false;
                                    break;
                                }
                            }
                        }
                        if (test > id % 8) {
                            legalMove = false;
                        }
                    }
                }
                if (test != -8 && test != 8 && test != -16 && test != 16 && test != -24 && test != 24 && test != -32 && test != 32 && test != -40 && test != 40 && test != -48 && test != 48 && test != -56 && test != 56 && test != -1 && test != 1 && test != -2 && test != 2 && test != -3 && test != 3 && test != -4 && test != 4 && test != -5 && test != 5 && test != -6 && test != 6 && test != -7 && test != 7) {
                    legalMove = false;
                }
            }

            if (legalMove == true) {
                if (inOne == true && peicetypeUse == 'white-pawn') {
                    inOne = false;
                    let loop = true;
                    while (loop == true) {
                        let x = prompt('What do you want to pronote this pawn to? [q] = queen, [k] = knight, [r] = rook, [b] = bishop');
                        switch(x) {
                            case 'q':
                                peicetype = 'white-queen';
                                loop = false;
                                break;
                            case 'k':
                                peicetype = 'white-knight';
                                loop = false;
                                break;
                            case 'r':
                                peicetype = 'white-rook';
                                loop = false;
                                break;
                            case 'b':
                                peicetype = 'white-bishop';
                                loop = false;
                                break;
                        };
                    }
                }
                if (inTwo == true && peicetypeUse == 'black-pawn') {
                    inTwo = false;
                    let loop = true;
                    while (loop == true) {
                        let x = prompt('What do you want to pronote this pawn to? [q] = queen, [k] = knight, [r] = rook, [b] = bishop');
                        switch(x) {
                            case 'q':
                                peicetype = 'black-queen';
                                loop = false;
                                break;
                            case 'k':
                                peicetype = 'black-knight';
                                loop = false;
                                break;
                            case 'r':
                                peicetype = 'black-rook';
                                loop = false;
                                break;
                            case 'b':
                                peicetype = 'black-bishop';
                                loop = false;
                                break;
                        }
                    }
                }
                turnAmt += 1;
                document.getElementById('turnamt').innerHTML = turnAmt;
                if (turnFromEnPassant < turnAmt) {
                    turnFromEnPassant = 0;
                }
                inOne = false;
                inTwo = false;
                e.classList = peicetype;
                p.classList = '';
                selectedPiece = 0;
                turn == 1 ? turn = 0 : turn = 1;
                turn == 1 ? document.getElementById('turn').innerHTML = 'white' : document.getElementById('turn').innerHTML = 'black';
                document.getElementById('selected').innerHTML = `none`;
                let x = posFen();
                lastPosition = currentPosition;
                currentPosition = x;
                document.getElementById('pos').innerHTML = x;
                switchTurn = true;
                isWhiteKing = false;
                isBlackKing = false;
                for (let i = 1; i < 65; i++) {
                    let e = document.getElementById(`${i}`).classList;
                    if (e[0] == 'white-king') {
                        isWhiteKing = true;
                    }
                    if (e[0] == 'black-king') {
                        isBlackKing = true;
                    }
                }
                if (isWhiteKing == false) {
                    board.fenPos('');
                    document.getElementById('winner').innerHTML = 'black'
                }
                if (isBlackKing == false) {
                    board.fenPos('');
                    document.getElementById('winner').innerHTML = 'white'
                }
            }
        }
    }
}