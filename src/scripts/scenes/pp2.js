import { initScene } from "../scene-manager";
import { generateGameTiles } from "../scene-manager";
import gameState from "../game-state";


console.log('working in highlightCurrentPlacement');
//export scene to sceneManager
function initPiecePlacement() {
    const scenes = {};
    scenes.p1 = createScene('p1');
    //if (gameState.get.game.isSinglePlayer()) scenes.p2 = null;
    //else scenes.p2 = createScene('p2');
    console.log('remove after testing');
    return [scenes.p1, scenes.p2];
}
export default initPiecePlacement

//internal workings start here
const PIECE_COUNT = gameState.get.game.pieceCount();
const BOARD_WIDTH = gameState.get.game.boardWidth();
const BOARD_HEIGHT = gameState.get.game.boardHeight();

const CLASSES = {
    unit: 'tile-has-unit',
    lowHighlight: 'tile-highlight-low',
    highHighlight: 'tile-highlight-high',
    invalidHighlight: 'tile-highlight-invalid',
};

const STATES = {
    current: 1,
    pickTile: 1,
    placeUnit: 2,
}

function createScene(playerRef) {
    //generate scene node from template
    const scene = initScene('TEMPLATE_piece-placement');
    //generate gameTiles and add properties
    const gameTiles = createGameTilesObj();
    //other scoped vars
    const playerObj = gameState[playerRef];
    const unitObj = createUnitObj(playerObj.get.units());

    return scene;
    //
    function createGameTilesObj() {
        const _gameBox = scene.querySelector('[pPlacementID="gameBox"]');
        const _tileNodeArray = generateGameTiles(_gameBox);
        const tileObjs = [];

        let selectedTile;
        //tile-class object arrays
        const activeHoverTiles = [];
        // const activeUnitTiles = [];

        for (let i = 0; i < _tileNodeArray.length; i++) {
            tileObjs.push(_tileFactory(_tileNodeArray[i], i));
        }
        return tileObjs;

        //private functions
        function _tileFactory(tileNode, index) {
            let currentUnit;
            const coords = {
                x: +tileNode.getAttribute('posX'),
                y: +tileNode.getAttribute('posY')
            }
            //tile object creation
            const tile = {
                getNode: () => tileNode,
                getCoordObj: () => coords,
                getIndex: () => index,
                unit: {
                    place: (unit) => {
                        if (currentUnit) return false;
                        currentUnit = unit;
                        tile.classList.add('tile-placed-unit');
                    },
                    remove: () => {
                        currentUnit = undefined
                        tile.classList.remove('tile-placed-unit');
                    },
                    getUnit: () => currentUnit,
                },
                nextTile: {
                    up: () => tileObjs[index - BOARD_WIDTH],
                    down: () => tileObjs[index + BOARD_WIDTH],
                    left: () => {
                        if (coords.x - 1 < 0) return false;
                        return tileObjs[index - 1];
                    },
                    right: () => {
                        if (coords.x + 1 >= BOARD_WIDTH) return false;
                        return tileObjs[index + 1];
                    },
                },
                highlight: {
                    selectable: () => { addHighlight(activeHoverTiles, CLASSES.lowHighlight); },
                    invalid: () => { addHighlight(activeHoverTiles, CLASSES.invalidHighlight); },
                    validPlaceUnit: () => { addHighlight(activeHoverTiles, CLASSES.highHighlight) },
                },
                selectedTile: {
                    unSelect: () => {
                        if (!selectedTile) return console.log('no selected tile');
                        //removeHighlights(activeUnitTiles);
                        removeHighlights(activeHoverTiles);
                        selectedTile.getNode().classList.remove(CLASSES.highHighlight);
                    },
                    selectThis: () => {
                        if (selectedTile) console.log('overwriting selectedTile. was this intentional?');
                        selectedTile = tile;
                        tileNode.classList.add(CLASSES.highHighlight);

                    },
                },
            }
            //event listeners
            tileNode.addEventListener('mouseover', (e) => {
                switch (STATES.current) {
                    case STATES.pickTile:
                        highlightAllplacements();
                        break;
                    case STATES.placeUnit:
                        highlightCurrentPlacement();
                        break;
                    default: console.log(`Invalid state: ${STATES.current}.`);
                }
            });

            tileNode.addEventListener('mouseleave', (e) => {
                removeHighlights(activeHoverTiles);
            });
            tileNode.addEventListener('click', (e) => {
                switch (STATES.current) {
                    case STATES.pickTile:
                        tile.selectedTile.selectThis();
                        STATES.current = STATES.placeUnit;
                        break;
                    case STATES.placeUnit:
                        if (tile === selectedTile) {
                            tile.selectedTile.unSelect();
                            STATES.current = STATES.pickTile;
                            highlightAllplacements();
                        }
                        break;
                    default: console.log(`Invalid state: ${STATES.current}.`);
                }
            });

            //highlights in all 4 directions for a distance of the current maxLength
            function highlightAllplacements() {
                if (tile.unit.getUnit()) {
                    tile.highlight.invalid();
                    return;
                } else tile.highlight.selectable();
                const directionTiles = [
                    new DirecionTileObj('up'),
                    new DirecionTileObj('down'),
                    new DirecionTileObj('left'),
                    new DirecionTileObj('right')
                ]
                for (let i = 1; i < unitObj.getMaxLength(); i++) {
                    directionTiles.forEach(obj => { obj.highlightNext(); })
                }
                function DirecionTileObj(direction, tileObj = tile) {
                    let invalid = false;
                    this.highlightNext = () => {
                        if (!tileObj)
                            return;
                        tileObj = tileObj.nextTile[direction]();
                        if (!tileObj)
                            return;
                        if (tileObj.unit.getUnit()) {
                            invalid = true;
                            return;
                        }
                        if (!invalid)
                            tileObj.highlight.selectable();
                        else tileObj.highlight.invalid();
                    }
                }
            }
            function highlightCurrentPlacement() {
                if (selectedTile === tile) return highlightAllplacements();
                const tileArray = getTileArrayFrom(selectedTile, tile);
                let setInvalid = false;
                for (let i = 0; i < tileArray.length; i++) {
                    let tile = tileArray[i];
                    if (tile.unit.getUnit()) setInvalid = true;
                    if (setInvalid) return tile.highlight.invalid();
                    if (i >= 2 && !unitObj.getUnitOfLength(i + 1))
                        tile.highlight.invalid();
                    tile.highlight.validPlaceUnit();
                }
            }
            function getTileArrayFrom(tile1, tile2, limitByMaxLength = true) {
                if (tile1 === tile2) return [tile1];

                const startCoords = tile1.getCoordObj();
                const endCoords = tile2.getCoordObj();
                const xDif = endCoords.x - startCoords.x;
                const yDif = endCoords.y - startCoords.y;
                const inXAxis = Math.abs(yDif) <= Math.abs(xDif);

                let length;
                if (inXAxis) length = Math.abs(xDif);
                else length = Math.abs(yDif);
                if (limitByMaxLength && length >= unitObj.getMaxLength())
                    length = unitObj.getMaxLength() - 1; //-1 because starting at 0

                const tileArray = [tile1];
                let tempTile = tile1;

                for (let i = 0; i < length; i++) {
                    let direction;
                    if (!inXAxis && yDif <= 0) direction = 'up';
                    else if (!inXAxis) direction = 'down';
                    else if (xDif <= 0) direction = 'left'
                    else direction = 'right';
                    tempTile = tempTile.nextTile[direction]();
                    if (tempTile) tileArray.push(tempTile);
                }
                return tileArray;
            }

            function removeHighlights(tileClassObjArray) {
                while (tileClassObjArray.length > 0) {
                    let obj = tileClassObjArray.pop();
                    obj.tileNode.classList.remove(obj.className);
                }
            }
            function addHighlight(tileClassObjArray, className) {
                tileNode.classList.add(className);
                tileClassObjArray.push(new TileClassObj(tileNode, className))
            }
            return tile;
        }

    }

    function TileClassObj(tileNode, className) {
        this.tileNode = tileNode;
        this.className = className;
    }
    function getTileFromNode(tileNode) {
        const coords = {
            x: +tileNode.getAttribute('posX'),
            y: +tileNode.getAttribute('posY')
        };
        const index = coords.y * BOARD_WIDTH + coords.x;
        return gameTiles[index];
    }
}

function createUnitObj(unitArray) {
    const _availableUnits = [];
    const _placedUnits = [];
    let _maxLength = 0;
    //create semi-cloned units and fill unit array
    //  and set _maxLength
    for (let i = 0; i < unitArray.length; i++) {
        _availableUnits.push((() => {
            const unit = unitArray[i];
            const id = unit.get.id();
            const length = unit.get.length();
            if (length > _maxLength) _maxLength = length;
            const cloneUnit = {
                get: {
                    id: () => id,
                    length: () => length
                }
            }
            return cloneUnit;
        })())
    }
    function getUnitOfLength(length) {
        for (let i = 0; i < _availableUnits.length; i++) {
            if (_availableUnits[i].get.length() === length) return _availableUnits[i];
        }
        return false;
    }
    function setUnitPlaced(unit) {
        const index = _availableUnits.indexOf(unit);
        if (index < 0) { console.log('unit already placed'); return false }
        _placedUnits.push(_availableUnits[index]);
        _availableUnits.splice(index, 1);
        //adjust max length
        let length = unit.get.length();
        if (length === _maxLength) {
            _maxLength = 0;
            for (let i = 0; i < _availableUnits.length; i++) {
                length = _availableUnits[i].get.length();
                if (_maxLength < length) _maxLength = length;
            }
        }
        return true;
    }
    const unitObj = {
        getAvailable: () => _availableUnits,
        getPlaced: () => _placedUnits,
        getMaxLength: () => _maxLength,
        getUnitOfLength,
        setUnitPlaced,
    }
    return unitObj;
}

