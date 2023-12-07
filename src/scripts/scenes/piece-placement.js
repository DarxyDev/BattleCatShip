import { initScene } from "../scene-manager";
import { generateGameTiles } from "../scene-manager";
import gameState from "../game-state";

const PIECE_COUNT = gameState.get.game.pieceCount();
const BOARD_WIDTH = gameState.get.game.boardWidth();
const BOARD_HEIGHT = gameState.get.game.boardHeight();

const ref = {
    p1: { gameTiles:undefined, placedPieces: [] },
    p2: { gameTiles:undefined, placedPieces: [] }
};

for (let i = 0; i < PIECE_COUNT; i++){
    ref.p1.placedPieces.push(false);
    ref.p2.placedPieces.push(false);
}

function initPiecePlacement() {
    const scenes = {};
    scenes.p1 = _getPiecePlacementScene('p1');
    if (gameState.get.game.isSinglePlayer()) scenes.p2 = null;
    else scenes.p2 = _getPiecePlacementScene('p2');
    return [scenes.p1, scenes.p2];

    ////
    function _getPiecePlacementScene(playerRef) {
        const scene = initScene('TEMPLATE_piece-placement');
        const gameBox = scene.querySelector('[pPlacementID="gameBox"]');
        const gameTiles = generateGameTiles(gameBox);
        gameTiles.forEach((tile) => {
            tile.setAttribute('playerRef',playerRef);
            tile.addEventListener('mouseover', (e) => {
                const posX = +tile.getAttribute('posX');
                const posY = +tile.getAttribute('posY');
                tile.classList.add('tile-hover');
                _highlightPossibleTiles(tile);
            })
            tile.addEventListener('mouseleave', (e) => {
                tile.classList.remove('tile-hover');
                _removeHighlight(tile);
            })
        });
        ref[playerRef].gameTiles = gameTiles;
        return scene;
    }
}
export default initPiecePlacement
let activeTiles = [];
function _highlightPossibleTiles(tile) {
    const _checkFunctions = [_checkUp,_checkDown,_checkLeft,_checkRight];
    const posX = +tile.getAttribute('posX');
    const posY = +tile.getAttribute('posY');
    const index = (posY * BOARD_WIDTH) + posX;
    const playerRef = tile.getAttribute('playerRef');
    let possibleMove = true;
    for (let i = 1; i <= PIECE_COUNT; i++) {
        if (ref[playerRef].placedPieces[i - 1]) {
            console.log('mark red here?');
            continue;
        }
        _checkFunctions.forEach((checkDirection) =>{
            let tileIndex = checkDirection(i);
            if(tileIndex)_markTile(tileIndex);
        })
    }
    //
    function _markTile(tileIndex){
        if (tileIndex !== false) {
            let activeTile = ref[playerRef].gameTiles[tileIndex];
            activeTile.classList.add('tile-greenbg');
            activeTiles.push(activeTile);
        }
    }
    function _checkUp(distance) {
        let newIndex = index - (distance * BOARD_WIDTH);
        if(newIndex < 0) return false;
        return newIndex;
    }
    function _checkDown(distance){
        let newIndex = index + (distance * BOARD_WIDTH);
        if(newIndex >= (BOARD_HEIGHT * BOARD_WIDTH)) return false;
        return newIndex;
    }
    function _checkLeft(distance){
        let newX = posX - distance;
        if(newX < 0) return false;
        return (posY * BOARD_WIDTH) + newX; 
    }
    function _checkRight(distance){
        let newX = posX + distance;
        if(newX >= BOARD_WIDTH) return false;
        return (posY * BOARD_WIDTH) + newX;
    }
}
function _removeHighlight(){
    activeTiles.forEach((tile)=>{
        tile.classList.remove('tile-greenbg');
        tile.classList.remove('tile-redbg');
    });
    activeTiles = [];
}
