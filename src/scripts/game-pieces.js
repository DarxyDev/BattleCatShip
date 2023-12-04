const NUM_OF_PIECES = 5;

const gamePieces = {
};
__setDummyGamepieces()

export default gamePieces;


function _createGamePiece(name, size){
    const piece = document.createElement('div');
    piece.classList.add('game-piece');
    return {
        name:name,
        size:size,
        element: piece,
    };
}
function __setDummyGamepieces(){
    for(let i = 1; i <= NUM_OF_PIECES; i++){
        let piece = _createGamePiece(i.toString(), i);
        gamePieces[i] = piece;
    }
}