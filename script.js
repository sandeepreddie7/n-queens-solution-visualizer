function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function initialize(board, n) {
    printList = [];
    var keys = ['queen', 'row', 'col', 'nwtose', 'swtone'];
    for (var i = 0; i < keys.length; i++) {
        board[keys[i]] = {};
    }

    for (var i = 0; i < n; i++) {
        board['queen'][i] = -1;
        board['row'][i] = 0;
        board['col'][i] = 0;
    }
    for (var i = -(n - 1); i < n; i++) {
        board['nwtose'][i] = 0;
    }
    for (var i = 0; i < 2 * n - 1; i++) {
        board['swtone'][i] = 0;
    }
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            imgc[i.toString() + j.toString()] = 0;
        }
    }
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            document.getElementById(i.toString() + j.toString()).innerHTML = "";
        }
    }
}

function isCellFree(i, j, board) {
    return (board['row'][i] == 0 && board['col'][j] == 0 && board['nwtose'][j - i] == 0 && board['swtone'][i + j] == 0);
}


async function animateBoard() {
    for (let it = 0; it < printList.length; it++) {
        var i = printList[it][1];
        var j = printList[it][2];
        if (printList[it][0] === 'a') {

            document.getElementById(i.toString() + j.toString()).innerHTML = '<p>&#9819;</p>';

            for (var r = 0; r < 8; r++) {
                for (var c = 0; c < 8; c++) {
                    if (i == r || j == c || (c - r) == (j - i) || (c + r) == (i + j)) {
                        if (imgc[r.toString() + c.toString()] == 0) {
                            imgc[r.toString() + c.toString()] = 1;
                            document.getElementById(r.toString() + c.toString()).innerHTML += '<img src="black.png" alt="">';
                        }
                        else {
                            imgc[r.toString() + c.toString()] += 1;
                        }
                    }
                }
            }
        }
        else {
            document.getElementById(i.toString() + j.toString()).innerHTML = "";
            for (var r = 0; r < 8; r++) {
                for (var c = 0; c < 8; c++) {
                    if (i == r || j == c || (c - r) == (j - i) || (c + r) == (i + j)) {
                        if (imgc[r.toString() + c.toString()] == 1) {
                            imgc[r.toString() + c.toString()] = 0;

                            document.getElementById(r.toString() + c.toString()).innerHTML = '';

                        }
                        else {
                            imgc[r.toString() + c.toString()] -= 1;
                        }
                    }
                }
            }

        }
        await sleep(simSpeed);
    }

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var temp = document.getElementById(i.toString() + j.toString()).innerHTML === '<img src="black.png" alt="">';
            if (temp) document.getElementById(i.toString() + j.toString()).innerHTML = "";
            else document.getElementById(i.toString() + j.toString()).innerHTML = '<p>&#9819;</p>';
        }
    }
}

function addQueen(i, j, board) {
    board['queen'][i] = j;
    board['row'][i] = 1;
    board['col'][j] = 1;
    board['nwtose'][j - i] = 1;
    board['swtone'][i + j] = 1;


    printList.push(['a', i, j]);



}

function removeQueen(i, j, board) {
    board['queen'][i] = -1;
    board['row'][i] = 0;
    board['col'][j] = 0;
    board['nwtose'][j - i] = 0;
    board['swtone'][i + j] = 0;

    printList.push(['r', i, j]);

}

function placeQueen(i, board) {
    for (var j = 0; j < 8; j++) {
        if (isCellFree(i, j, board)) {
            addQueen(i, j, board);

            if (i == 7) {
                return true;
            }
            else {
                var extendSoln = placeQueen(i + 1, board);
            }
            if (extendSoln) {
                return true;
            }
            else {

                removeQueen(i, j, board);


            }
        }
    }


}


document.getElementById('start-button-element').onclick = async function () {
    var n = 8;
    initialize(board, n);
    var temp = placeQueen(0, board);
    if (temp) {
        animateBoard();
    }
}

var board = {};
var imgc = {};
var printList = [];
var simSpeed = 250;

document.getElementById('very-fast').onclick = function () {
    simSpeed = 50;
}
document.getElementById('fast').onclick = function () {
    simSpeed = 150;
}
document.getElementById('normal').onclick = function () {
    simSpeed = 250;
}
document.getElementById('slow').onclick = function () {
    simSpeed = 400;
}
document.getElementById('very-slow').onclick = function () {
    simSpeed = 1000;
}
