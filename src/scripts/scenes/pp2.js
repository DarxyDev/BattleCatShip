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
    removableUnit: 'tile-removable-unit',
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
        const placedUnitsObj = new PlacedUnitsObj();

        function PlacedUnitsObj() {
            const placedUnitArr = [];

            this.pushUnit = (unit, tile) => {
                let placedUnit = placedUnitArr.find((placedUnit) => placedUnit.unit === unit);
                if (!placedUnit) {
                    placedUnit = { unit, tileArr: [] };
                    placedUnitArr.push(placedUnit);
                }
                let tileArr = placedUnit.tileArr;
                if (!tileArr.includes(tile)) tileArr.push(tile);
            }
            this.removeUnit = (unit) => {
                const index = placedUnitArr.findIndex((placedUnit) => placedUnit.unit === unit);
                if (index < 0) return false;
                return placedUnitArr.splice(index, 1)[0];
            }
            this.getTileArrayFromPlaced = (unit) => {
                const placedUnit = placedUnitArr.find((placedUnit) => placedUnit.unit === unit);
                if (!placedUnit) return [];
                sortTiles(placedUnit.tileArr)
                return placedUnit.tileArr;
            }
            function sortTiles(tileArr) {
                if (tileArr.length < 2) return;
                let axis = tileArr[0].x === tileArr[1].x ? 'y' : 'x';
                tileArr.sort((a, b) => a.getCoordObj()[axis] < b.getCoordObj()[axis])
            }
        }
        //removed }  here -in case that was the wrong one

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
                        placedUnitsObj.pushUnit(unit, tile);
                        tileNode.classList.add('tile-placed-unit');
                    },
                    remove: (unit) => {
                        currentUnit = undefined
                        placedUnitsObj.removeUnit(unit);
                        tileNode.classList.remove('tile-placed-unit');
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
                    removableUnit: () => { addHighlight(activeHoverTiles, CLASSES.removableUnit); },
                },
                selectedTile: {
                    unSelect: () => {
                        if (!selectedTile) return console.log('no selected tile');
                        //removeHighlights(activeUnitTiles);
                        //removeHighlights(activeHoverTiles);
                        selectedTile.getNode().classList.remove(CLASSES.highHighlight);
                        selectedTile = undefined;
                    },
                    selectThis: () => {
                        if (selectedTile) return false;
                        if (tile.unit.getUnit()) return false;
                        selectedTile = tile;
                        tileNode.classList.add(CLASSES.highHighlight);
                        return true;
                    },
                },
            }
            //event listeners
            tileNode.addEventListener('mouseover', (e) => {
                switch (STATES.current) {
                    case STATES.pickTile:
                        if (currentUnit) {
                            highlightUnit(currentUnit);
                        } else highlightAllplacements();
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
                        if (!tile.selectedTile.selectThis())
                            break;
                        STATES.current = STATES.placeUnit;
                        break;
                    case STATES.placeUnit:
                        if (tile === selectedTile) { //clicking selectedTile removes it
                            tile.selectedTile.unSelect();
                            removeHighlights(activeHoverTiles);
                            STATES.current = STATES.pickTile;
                            highlightAllplacements();
                            break;
                        }
                        if (!placeUnit()) break;
                        tile.selectedTile.unSelect();
                        highlightAllplacements()
                        STATES.current = STATES.pickTile;

                        break;
                    default: console.log(`Invalid state: ${STATES.current}.`);
                }
            });

            //highlights in all 4 directions for a distance of the current maxLength
            function highlightAllplacements() {
                if (!unitObj.getMaxLength()) {
                    tile.highlight.invalid();
                }
                else tile.highlight.validPlaceUnit();
                if (!unitObj.getMaxLength()) return;
                const directionTiles = [
                    new DirecionTileObj('up'),
                    new DirecionTileObj('down'),
                    new DirecionTileObj('left'),
                    new DirecionTileObj('right')
                ]
                for (let i = unitObj.getMinLength(); i <= unitObj.getMaxLength(); i++) {
                    directionTiles.forEach(obj => { obj.highlightNext(i); })
                }
                function DirecionTileObj(direction, tileObj = tile) {
                    let invalid = false;
                    this.highlightNext = (length) => {
                        // if(length > unitObj.getMaxLength()) return;
                        if (!tileObj) return;
                        tileObj = tileObj.nextTile[direction]();
                        if (!tileObj) return;
                        if (tileObj.unit.getUnit()) {
                            invalid = true;
                            return;
                        }
                        if (!invalid) {
                            if (unitObj.getUnitOfLength(length))
                                tileObj.highlight.selectable();
                            else tileObj.highlight.invalid();
                        }
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
                    if (i >= 1 && !unitObj.getUnitOfLength(i + 1))
                        tile.highlight.invalid();
                    tile.highlight.validPlaceUnit();
                }
            }
            function highlightUnit(unit) {
                let tileArr = placedUnitsObj.getTileArrayFromPlaced(unit);
                tileArr.forEach(tile => {
                    tile.highlight.removableUnit();
                })
            }
            function placeUnit() {
                const tileArray = getTileArrayFrom(selectedTile, tile);
                const unit = unitObj.getUnitOfLength(tileArray.length);
                if (!unit) return;                       //check if unit of length available
                for (let i = 0; i < tileArray.length; i++) {
                    let tile = tileArray[i];
                    if (tile.unit.getUnit()) return;          //check if any of the tiles have units
                    tile.unit.place(unit);
                }
                unitObj.setUnitPlaced(unit);
                return true;
            }
            function getTileArrayFrom(tile1, tile2, limitByMaxLength = true) { //could be placed inside tile obj as getTileArrayTo
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
    // function getTileFromNode(tileNode) {
    //     const coords = {
    //         x: +tileNode.getAttribute('posX'),
    //         y: +tileNode.getAttribute('posY')
    //     };
    //     const index = coords.y * BOARD_WIDTH + coords.x;
    //     return gameTiles[index];
    // }
}

function createUnitObj(unitArray) {
    const _availableUnits = [];
    const _placedUnits = [];
    let _maxLength = 0;
    let _minLength;
    //create semi-cloned units and fill unit array
    //  and set _maxLength
    unitArray.forEach((unit) => {
        _availableUnits.push(new CloneUnit(unit));
    })
    function CloneUnit(unit) {
        const id = unit.get.id();
        const length = unit.get.length();
        this.get = {
            id: () => id,
            length: () => length,
        };
    }
    function getUnitOfLength(length) {
        for (let i = 0; i < _availableUnits.length; i++) {
            if (_availableUnits[i].get.length() === length) return _availableUnits[i];
        }
        return false;
    }
    function setUnitPlaced(unit) {
        fromArrayToArray(_availableUnits, _placedUnits, unit);
        //adjust max length
        let length = unit.get.length();
        if (length === _maxLength) setLengthBounds();
        return true;
    }
    function setUnitAvailable(unit) {
        fromArrayToArray(_placedUnits, _availableUnits, unit);
    }
    function setLengthBounds() {
        if (!_availableUnits.length) {
            _minLength = 0;
            _maxLength = 0;
            return;
        }
        _minLength = false;
        _maxLength = 0;
        for (let i = 0; i < _availableUnits.length; i++) {
            length = _availableUnits[i].get.length();
            if (_maxLength < length) _maxLength = length;
            if (!_minLength || _minLength > length) _minLength = length;
        }
    }
    function fromArrayToArray(fromArr, toArr, item) {
        const index = fromArr.indexOf(item);
        if (index < 0) return console.log('Unable to transfer item.');
        toArr.push(item);
        fromArr.splice(index, 1);
    }
    const unitObj = {
        getMinLength: () => _minLength,
        getMaxLength: () => _maxLength,
        getUnitOfLength,
        setUnitPlaced,
        setUnitAvailable,
    }
    setLengthBounds();
    return unitObj;
}