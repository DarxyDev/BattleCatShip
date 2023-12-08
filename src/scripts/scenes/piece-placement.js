import { initScene } from "../scene-manager";
import { generateGameTiles } from "../scene-manager";
import gameState from "../game-state";

const PIECE_COUNT = gameState.get.game.pieceCount();
const BOARD_WIDTH = gameState.get.game.boardWidth();
const BOARD_HEIGHT = gameState.get.game.boardHeight();

const ref = {
    p1: { gameTiles: undefined, placedPieces: [] },
    p2: { gameTiles: undefined, placedPieces: [] }
};

for (let i = 0; i < PIECE_COUNT; i++) {
    ref.p1.placedPieces.push(false);
    ref.p2.placedPieces.push(false);
}

let activeTiles = [];

let currentState = 1;
const states = {
    pickTile: 1,
    placeUnit: 2,
}
////////////////////////////////
function initPiecePlacement() {
    const scenes = {};
    scenes.p1 = _getPiecePlacementScene('p1');
    if (gameState.get.game.isSinglePlayer()) scenes.p2 = null;
    else scenes.p2 = _getPiecePlacementScene('p2');
    return [scenes.p1, scenes.p2];

    function _getPiecePlacementScene(playerRef) {
        const scene = initScene('TEMPLATE_piece-placement');
        const gameBox = scene.querySelector('[pPlacementID="gameBox"]');
        const gameTiles = generateGameTiles(gameBox);
        gameTiles.forEach((tile) => {
            tile.setAttribute('playerRef', playerRef);
            tile.classList.add('pPlacement-tile');
            tile.addEventListener('mouseover', _mouseoverTile);
            tile.addEventListener('mouseleave', _mouseleaveTile);
            tile.addEventListener('click', _onclickTile);
        });
        ref[playerRef].gameTiles = gameTiles;
        return scene;
    }
}

function _mouseoverTile(e) {
    switch (currentState) {
        case states.pickTile:
            _highlightPossibleTiles(e.target);
            break;
        case states.placeUnit:
            break;
        default: console.log(`Invalid state: ${currentState}.`);
    }
}
function _mouseleaveTile(e) {
    switch (currentState) {
        case states.pickTile:
            _removeHighlight(e.target);
            break;
        case states.placeUnit:
            break;
        default: console.log(`Invalid state: ${currentState}.`);

    }
}
function _onclickTile(e) {
    switch (currentState) {
        case states.pickTile:
            _removeHighlight(e.target);
            _changeState(states.placeUnit);
            break;
        case states.placeUnit:
            break;
        default: console.log(`Invalid state: ${currentState}.`);

    }
}
export default initPiecePlacement
////////////////////////////////////
function _changeState(state) {
    currentState = state;
}
function _highlightPossibleTiles(tile) {
    const _checkFunctions = [_checkUp, _checkDown, _checkLeft, _checkRight];
    const posX = +tile.getAttribute('posX');
    const posY = +tile.getAttribute('posY');
    const index = (posY * BOARD_WIDTH) + posX;
    const playerRef = tile.getAttribute('playerRef');
    let possibleMove = true;

    tile.classList.add('tile-greenbg'); //todo: change to red when all pieces placed
    activeTiles.push(tile);             //  except when removing piece. 
    for (let i = 1; i <= PIECE_COUNT; i++) {
        if (ref[playerRef].placedPieces[i - 1]) {
            console.log('mark red here?');
            continue;
        }
        _checkFunctions.forEach((checkDirection) => {
            let tileIndex = checkDirection(i);
            if (tileIndex !== false) _markTile(tileIndex);
        })
    }
    //
    function _markTile(tileIndex) {
        if (tileIndex !== false) {
            let activeTile = ref[playerRef].gameTiles[tileIndex];
            activeTile.classList.add('tile-greenbg');
            activeTiles.push(activeTile);
        }
    }
    function _checkUp(distance) {
        let newIndex = index - (distance * BOARD_WIDTH);
        if (newIndex < 0) return false;
        return newIndex;
    }
    function _checkDown(distance) {
        let newIndex = index + (distance * BOARD_WIDTH);
        if (newIndex >= (BOARD_HEIGHT * BOARD_WIDTH)) return false;
        return newIndex;
    }
    function _checkLeft(distance) {
        let newX = posX - distance;
        if (newX < 0) return false;
        return (posY * BOARD_WIDTH) + newX;
    }
    function _checkRight(distance) {
        let newX = posX + distance;
        if (newX >= BOARD_WIDTH) return false;
        return (posY * BOARD_WIDTH) + newX;
    }
}
function _removeHighlight() {
    activeTiles.forEach((tile) => {
        tile.classList.remove('tile-greenbg');
        tile.classList.remove('tile-redbg');
    });
    activeTiles = [];
}
