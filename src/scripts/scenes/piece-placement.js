import { initScene } from "../scene-manager";
import { generateGameTiles } from "../scene-manager";
import gameState from "../game-state";

const PIECE_COUNT = gameState.get.game.pieceCount();
const BOARD_WIDTH = gameState.get.game.boardWidth();
const BOARD_HEIGHT = gameState.get.game.boardHeight();

//TODO: these are duplicate variables, but neater. convert other methods to use these
let playerObj = {};
let placedUnits = [];
let units = [];
let tileArray = [];

let playerRef = '';


function _sceneOnLoad() { //added to scene as scene.sceneOnLoad
    playerRef = gameState.get.scene.currentPlayer(); //must be first
    playerObj = _getPlayerStateObj();
    placedUnits = [];
    units = playerObj.get.units();
    tileArray = ref[playerRef].gameTiles;
    tileArray[0].classList.add(tempClasses[3])
}

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

const tempClasses = ['tile-greenbg', 'tile-redbg', 'tile-selected-area']; //hardcoded indexes, removed on mouseexit tiles
const highlightClasses = ['tile-placed-unit'];

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
        ///
        scene.sceneOnLoad = _sceneOnLoad;
        ///
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
                case states.pickTile: //initial state
                    _removeHighlight();
                    _pickTile_tileHighlight(e.target);
                    selectedTile = e.target;
                    _markTile(selectedTile, tempClasses[2]);
                    _changeState(states.placeUnit);
                    break;
                case states.placeUnit: //
                    if (e.target === selectedTile) { //click second time to remove selected tile
                        //selectedTile = undefined;
                        _removeHighlight();
                        _changeState(states.pickTile);
                        _pickTile_tileHighlight(e.target);
                        break;
                    }
                    if (_placeUnit(e.target)) {
                        _changeState(states.pickTile);
                    } else console.log('invalid spot -- need visual representation');
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
    const gameboard = playerObj.get.gameboard();
    const tileCoords = _getTileCoordObj(tile);
    const originCoords = _getTileCoordObj(selectedTile);

    const xDif = tileCoords.x - originCoords.x;
    const yDif = tileCoords.y - originCoords.y;
    const rotated = xDif === 0 ? true : false;

    let startCoords;
    let endCoords;
    let length;
    if (rotated) {
        startCoords = yDif < 0 ? tileCoords : originCoords;
        length = Math.abs(yDif) + 1;
    } else {
        startCoords = xDif < 0 ? tileCoords : originCoords;
        length = Math.abs(xDif) + 1;
    }
    endCoords = startCoords === tileCoords ? originCoords : tileCoords;
    endCoords = [endCoords.x, endCoords.y];
    startCoords = [startCoords.x, startCoords.y];
    let selectedUnit;
    units.every(unit => {
        if (unit.get.length() !== length) return true;
        for (let i = 0; i < placedUnits.length; i++)
            if (unit === placedUnits[i].unit)
                return true;
        selectedUnit = unit;
        return false;
    });
    if (!selectedUnit
        || !gameboard.placeUnit(selectedUnit, startCoords, rotated))
        return false;

    const occupiedTiles = _getTileArray();
    _highlightPlacedTiles(occupiedTiles);
    placedUnits.push({ unit: selectedUnit, tiles: occupiedTiles });

    return true;

    function _highlightPlacedTiles(tileArray) {
        tileArray.forEach(tile => {
            tile.classList.add(highlightClasses[0]);
        })
    }
    function _getTileArray() {
        const tiles = [];
        let index;
        for (let i = 0; i < length; i++) {
            if (rotated) index = ((startCoords[1] + i) * BOARD_WIDTH) + startCoords[0];
            else index = (startCoords[1] * BOARD_WIDTH) + startCoords[0] + i;
            tiles.push(tileArray[index]);
        }
        return tiles
    }
}
function _removePlacedUnitHighlight(unit) {
    placedUnits.forEach(unitObj => {
        if (unitObj.unit !== unit) return;
        unitObj.tileArray.forEach(tile => {
            highlightClasses.forEach((className) => { tile.classList.remove(className) })
        })
    })
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
function _getTileCoordArr(tile) {
    const coords = [+tile.getAttribute('posX'), +tile.getAttribute('posY')];
    if (coords[0] === undefined ||
        coords[1] === undefined) console.log(`Invalid tile coords in ${tile}`);
    return coords;
}
function _placeUnit_tileHighlight(tile) {
    _markTile(selectedTile, tempClasses[2]);
    const selectedCoords = _getTileCoordObj(selectedTile);
    const tileCoords = _getTileCoordObj(tile);

    const xDif = tileCoords.x - selectedCoords.x;
    const yDif = selectedCoords.y - tileCoords.y; //flipped so positive y axis is upwards
    const inXAxis = Math.abs(xDif) > Math.abs(yDif);
    let positiveDir;
    if (inXAxis) positiveDir = (xDif >= 0)
    else positiveDir = (yDif >= 0);

    for (let i = 1; i <= PIECE_COUNT; i++) {
        let classIndex = 0;
        switch (true) {
            case inXAxis && positiveDir:
                i <= xDif ? classIndex = 2 : classIndex = 0;
                _markTile(_checkRight(i, selectedCoords), tempClasses[classIndex]);
                break;
            case inXAxis && !positiveDir:
                i <= Math.abs(xDif) ? classIndex = 2 : classIndex = 0;
                _markTile(_checkLeft(i, selectedCoords), tempClasses[classIndex]);
                break;
            case !inXAxis && positiveDir:
                i <= yDif ? classIndex = 2 : classIndex = 0;
                _markTile(_checkUp(i, selectedCoords), tempClasses[classIndex]);
                break;
            case !inXAxis && !positiveDir:
                i <= Math.abs(yDif) ? classIndex = 2 : classIndex = 0;
                _markTile(_checkDown(i, selectedCoords), tempClasses[classIndex]);
                break;
            default: console.log('This should never appear. If it does, blame cosmic radiation.');
        }
    }
}

function _pickTile_tileHighlight(tile) {
    const coords = _getTileCoordObj(tile);
    const index = (coords.y * BOARD_WIDTH) + coords.x;
    const playerRef = gameState.get.scene.currentPlayer();

    tile.classList.add(tempClasses[0]); //todo: change to red when all pieces placed
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
function _markTile(tileIndex, className = tempClasses[0]) {
    if (!tileIndex) return;
    let activeTile;
    if (typeof (tileIndex) === 'number') {//is index
        let playerRef = gameState.get.scene.currentPlayer();
        activeTile = ref[playerRef].gameTiles[tileIndex];
    } else activeTile = tileIndex;  //is element
    activeTile.classList.add(className);
    activeTiles.push(activeTile);
}
function _removeHighlight() {
    activeTiles.forEach((tile) => {
        tempClasses.forEach((className) => { tile.classList.remove(className) })
    });
    activeTiles = [];
}
function _getPlayerStateObj() {
    let playerObj = {
        get: gameState.get[playerRef],
        set: gameState.set[playerRef]
    }
    return playerObj;
}
