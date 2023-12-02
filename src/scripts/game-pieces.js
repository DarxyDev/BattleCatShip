const NUM_OF_PIECES = 5;

const gamePieces = {
};
__setDummyGamepieces()

export default gamePieces;


function _createGamePiece(name, size){
    return {
        name:name,
        size:size,
        element: document.createElement('div'),
    };
}
function __setDummyGamepieces(){
    for(let i = 1; i < NUM_OF_PIECES; i++){
        let piece = _createGamePiece(i.toString(), i);
        piece.element.classList.add('game-piece');
        gamePieces[i] = piece;
    }
}