/*  ----------------------------------------------
    Variables
    ---------------------------------------------- */

var action = 0;
const SPACE = 52;

var codex = { a:0, b:1, c:2, d:3, e:4, f:5, g:6, h:7, i:8, j:9, k:10, l:11, m:12,
                n:13, o:14, p:15, q:16, r:17, s:18, t:19, u:20, v:21, w:22, x:23, y:24,
                z:25};

var decodex = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
                'z'];

var encoding_matrix = [
    [1, -1, 2],
    [-2, 0, 4],
    [0, -2, 7]
];

var decoding_matrix = [
    [4, 3/2, -2],
    [7, 7/2, -4],
    [2, 1, -1]
];

/*  ----------------------------------------------
    Functions (Read README.md file to understand)
    ---------------------------------------------- */

function start() {
    var doIt = document.getElementById('do-it');
    var changeState = document.getElementById('change-state');

    doIt.addEventListener('click', state, false);
    changeState.addEventListener('click', function() {
        if(action == 0) changeOperation(1, 'Decrypt');
        else changeOperation(0, 'Encrypt');
    }, false);
}

function changeOperation(change, operation) {
    action = change;
    document.getElementById('operation').innerHTML = operation;
}

function state() {
    document.getElementById('messagef').value = '';

    switch(action) {
        case 0: encrypt(); break;
        case 1: decrypt(); break;
    }
}

function adjustMatrix(matrix) {
    matrix = deleteBlankSpaces(matrix);
    while(matrix.length%3 != 0) 
        matrix.push(SPACE);
    return matrix;
}

function deleteBlankSpaces(matrix) {
    while(true) {
        if(matrix[matrix.length-1] == '')
            matrix.pop();
        else break;
    } return matrix;
}

/*  ----------------------------------------------
    To Encrypt
    ---------------------------------------------- */
function encrypt() {
    var numMatrix = getNumMatrix();

    for(var i = 0; i < numMatrix.length; i+=3) {
        for(var j = 0; j < 3; j++) {
            document.getElementById('messagef').value += (
                numMatrix[i]   * encoding_matrix[j][0]  +
                numMatrix[i+1] * encoding_matrix[j][1]  +
                numMatrix[i+2] * encoding_matrix[j][2]  +
                ' ' 
            );
        }
    }
}

function getNumMatrix() {
    var message = document.getElementById('message');
    var numMessage = [];

    for (var i = 0; i < message.value.length; i++) 
        numMessage.push(getCode(message.value[i]));
    return adjustMatrix(numMessage);
}

function getCode(letter) {
    if(letter != ' ') {
        var digit = codex[letter.toLowerCase()];
        return digit;
    }else return SPACE;
}

/*  ----------------------------------------------
    To Decrypt
    ---------------------------------------------- */

function decrypt() {
    var messageMatrix = document.getElementById('message').value.split(' ');
    var numMatrix = adjustMatrix(messageMatrix);
    var decode_matrix = [];

    for(var i = 0; i < numMatrix.length; i+=3) {
        for(var j = 0; j < 3; j++) {
            decode_matrix.push((
                numMatrix[i]   * decoding_matrix[j][0]  +
                numMatrix[i+1] * decoding_matrix[j][1]  +
                numMatrix[i+2] * decoding_matrix[j][2]
            ));
        }
    }

    document.getElementById('messagef').value = getDecryptMatrix(decode_matrix, messageMatrix.length);
}

function getDecryptMatrix(matrix, length) {
    var mssn = '';
    for(var i = 0; i < length; i++) {
        if(matrix[i] != 52)
            mssn += decodex[matrix[i]];
        else mssn += ' ';
    } return mssn;
}

window.addEventListener('load', start, false);