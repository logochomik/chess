class Grid {
    constructor (length, height) {
        this.length = length;
        this.height = height;
    }
    render() {
        let total = this.length * this.height;
        for (let i = 1; i <= total; i++) {
            const whiteSquare = document.createElement('div');
            whiteSquare.style.cssText = 'height:50px;width:50px;background-color:#ff9c9c;display:inline-block;padding:10px;';
            whiteSquare.id = `${i}`;
            const blackSquare = document.createElement('div');
            blackSquare.style.cssText = 'height:50px;width:50px;background-color:#fa6666;display:inline-block;padding:10px;';
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
let turn = 1;
let currentPosition = '';
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

const startPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

const board = new Board().fenPos(startPosition);

for (let i = 1; i < 65; i++) {
    let e = document.getElementById(`${i}`);
    e.addEventListener('click', (x) => movePiece(i));
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
            e.classList = peicetype;
            p.classList = '';
            selectedPiece = 0;
            turn == 1 ? turn = 0 : turn = 1;
            turn == 1 ? document.getElementById('turn').innerHTML = 'white' : document.getElementById('turn').innerHTML = 'black';
            document.getElementById('selected').innerHTML = `none`;
            let x = posFen();
            currentPosition = x;
            document.getElementById('pos').innerHTML = x;
        }
    }
}