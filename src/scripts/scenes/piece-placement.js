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
let selectedTile;

let currentState = 1;
const states = {
    pickTile: 1,
    placeUnit: 2,
}

const _highlightClasses = ['tile-greenbg', 'tile-redbg'];

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

        function _mouseoverTile(e) {
            switch (currentState) {
                case states.pickTile:
                    _pickTile_tileHighlight(e.target);
                    break;
                case states.placeUnit:
                    _placeUnit_tileHighlight(e.target);
                    break;
                default: console.log(`Invalid state: ${currentState}.`);
            }
        }
        function _mouseleaveTile(e) {
            _removeHighlight();
        }
        function _onclickTile(e) {
            switch (currentState) {
                case states.pickTile:
                    _removeHighlight();
                    selectedTile = e.target;
                    selectedTile.classList.add('tile-greenbg');
                    _changeState(states.placeUnit);
                    break;
                case states.placeUnit:
                    console.log('attempt to place unit. then changestate back on success');
                    if (_placeUnit(e.target)) console.log('switch teams');
                    else console.log('invalid spot');
                    break;
                default: console.log(`Invalid state: ${currentState}.`);

            }
        }
    }
}

export default initPiecePlacement

////////////////////////////////////

function _changeState(state) {
    currentState = state;
}
function _placeUnit(tile) {

}
function _getTileCoordObj(tile) {
    const coords = {
        x: +tile.getAttribute('posX'),
        y: +tile.getAttribute('posY')
    }
    if (coords.x === undefined ||
        coords.y === undefined) console.log(`Invalid tile coords in ${tile}`);
    return coords;
}
function _placeUnit_tileHighlight(tile) {
    const selectedCoords = _getTileCoordObj(selectedTile);
    const tileCoords = _getTileCoordObj(tile);

    const xDif = tileCoords.x - selectedCoords.x;
    const yDif = selectedCoords.y - tileCoords.y; //flipped so positive y axis is upwards
    const inXAxis = Math.abs(xDif) > Math.abs(yDif);
    let positiveDir;
    if (inXAxis) positiveDir = (xDif >= 0)
    else positiveDir = (yDif >= 0);

    for (let i = 1; i <= PIECE_COUNT; i++) {
        switch (true) {
            case inXAxis && positiveDir:
                _markTile(_checkRight(i, selectedCoords));
                break;
            case inXAxis && !positiveDir:
                _markTile(_checkLeft(i, selectedCoords));
                break;
            case !inXAxis && positiveDir:
                _markTile(_checkUp(i, selectedCoords));
                break;
            case !inXAxis && !positiveDir:
                _markTile(_checkDown(i, selectedCoords));
                break;
            default: console.log('This should never appear. If it does, blame cosmic radiation.');
        }
    }
}

function _pickTile_tileHighlight(tile) {
    const coords = _getTileCoordObj(tile);
    console.log(2)
    const index = (coords.y * BOARD_WIDTH) + coords.x;
    const playerRef = gameState.get.scene.currentPlayer();

    tile.classList.add('tile-greenbg'); //todo: change to red when all pieces placed
    activeTiles.push(tile);             //  except when removing piece. 
    for (let i = 1; i <= PIECE_COUNT; i++) {
        if (ref[playerRef].placedPieces[i - 1]) {
            console.log('mark red here?');
            continue;
        }
        _checkFunctions.forEach((checkDirection) => {
            let tileIndex = checkDirection(i, coords);
            if (tileIndex !== false) _markTile(tileIndex);
        })
    }
}

const _checkFunctions = [_checkUp, _checkDown, _checkLeft, _checkRight];
function _checkUp(distance, coordObj) {
    let index = (coordObj.y * BOARD_WIDTH) + coordObj.x - (distance * BOARD_WIDTH);
    if (index < 0) return false;
    return index;
}
function _checkDown(distance, coordObj) {
    let index = (coordObj.y * BOARD_WIDTH) + coordObj.x + (distance * BOARD_WIDTH);
    if (index >= (BOARD_HEIGHT * BOARD_WIDTH)) return false;
    return index;
}
function _checkLeft(distance, coordObj) {
    let newX = coordObj.x - distance;
    if (newX < 0) return false;
    return (coordObj.y * BOARD_WIDTH) + newX;
}
function _checkRight(distance, coordObj) {
    let newX = coordObj.x + distance;
    if (newX >= BOARD_WIDTH) return false;
    return (coordObj.y * BOARD_WIDTH) + newX;
}
function _markTile(tileIndex, className = 'tile-greenbg') {
    if (!tileIndex) return;
    let playerRef = gameState.get.scene.currentPlayer();
    let activeTile = ref[playerRef].gameTiles[tileIndex];
    activeTile.classList.add(className);
    activeTiles.push(activeTile);
}
function _removeHighlight() {
    activeTiles.forEach((tile) => {
        _highlightClasses.forEach((className) => {tile.classList.remove(className)})
    });
    activeTiles = [];
}
