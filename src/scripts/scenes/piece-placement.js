import sceneManager, { initScene } from "../scene-manager";
import { generateGameTiles } from "../scene-manager";
import gameState from "../game-state";
import { CLASSES } from "../class-manager";

//export scene to sceneManager
function initPiecePlacement() {
    return createScene('p1');
}
export default initPiecePlacement

//internal workings start here
const BOARD_WIDTH = gameState.get.game.boardWidth();
const BOARD_HEIGHT = gameState.get.game.boardHeight();

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
    const placedUnitsObj = PlacedUnitsObjFactory();

    scene.resetScene = () => {

    }
    return scene;
    //
    function createGameTilesObj() {
        const _submitElement = scene.querySelector('[pPlacementID="submit"]');
        const _quickPlayElement = scene.querySelector('[pPlacementID="quickPlay"]');
        const _gameBoxElement = scene.querySelector('[pPlacementID="gameBox"]');
        const _tileNodeArray = generateGameTiles(_gameBoxElement);
        const tileObjs = [];


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
                getCoordArray: () => [coords.x, coords.y],
                getIndex: () => index,
                unit: {
                    place: (unit) => {
                        if (currentUnit) return false;
                        currentUnit = unit;
                        placedUnitsObj.pushUnit(unit, tile);
                        tileNode.classList.add('tile-placed-unit');
                        unitObj.setUnitPlaced(unit);
                    },
                    removeFullUnit: (unit) => {
                        let tileArr = placedUnitsObj.getTileArrayFromPlacedUnit(unit);
                        tileArr.forEach(tile => {
                            tile.unit.removeSelfUnit();
                        });
                        placedUnitsObj.removeUnit(unit);
                    },
                    removeSelfUnit: () => {
                        currentUnit = undefined;
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
                        if (currentUnit) {
                            tile.unit.removeFullUnit(currentUnit);
                            highlightAllplacements();
                        }
                        else if (tile.selectedTile.selectThis())
                            STATES.current = STATES.placeUnit;
                        break;
                    case STATES.placeUnit:
                        if (tile.unit.getUnit()) return;
                        if (tile === selectedTile) { //clicking selectedTile removes it
                            tile.selectedTile.unSelect();
                            removeHighlights(activeHoverTiles);
                            STATES.current = STATES.pickTile;
                            highlightAllplacements();
                            break;
                        }
                        if (!placeUnit()) break;
                        tile.selectedTile.unSelect();
                        if (!tile.unit.getUnit()) highlightAllplacements()
                        STATES.current = STATES.pickTile;

                        break;
                    default: console.log(`Invalid state: ${STATES.current}.`);
                }
            });

            _submitElement.addEventListener('click', submitScene);
            _quickPlayElement.addEventListener('click', submitQuickSelect);

            //highlights in all 4 directions for a distance of the current maxLength
            function highlightAllplacements() {
                if (unitObj.noUnitsAvailable()) return;
                tile.highlight.selectable();

                const directionTiles = [
                    DirectionTileObjFactory('up'),
                    DirectionTileObjFactory('down'),
                    DirectionTileObjFactory('left'),
                    DirectionTileObjFactory('right')
                ]
                const minLength = unitObj.getMinLength();
                const maxLength = unitObj.getMaxLength();

                for (let i = 2; i <= maxLength; i++)
                    directionTiles.forEach(obj => { obj.highlightNext(i); })

                function DirectionTileObjFactory(direction) {
                    const tileArr = [tile];
                    let tileObj = tile;

                    const obj = {
                        highlightNext: (length) => {
                            if (!tileObj) return;
                            tileObj = tileObj.nextTile[direction]();

                            if (!tileObj || tileObj.unit.getUnit()) {
                                if (tileArr.length === 0) return tileObj = false;

                                for (length--; length >= minLength && !unitObj.getUnitOfLength(length); length--) {
                                    tileObj = tileArr.pop();
                                    tileObj.getNode().classList.remove(CLASSES.invalidHighlight);
                                }
                                return tileObj = false;
                            }
                            if (unitObj.getUnitOfLength(length))
                                tileObj.highlight.selectable();
                            else tileObj.highlight.invalid();
                            tileArr.push(tileObj);
                        },
                    }
                    return obj;
                }
            }
            function highlightCurrentPlacement() {
                if (selectedTile === tile) {
                    tile.highlight.removableUnit();
                    highlightAllplacements();
                    return;
                }
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
                let tileArr = placedUnitsObj.getTileArrayFromPlacedUnit(unit);
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
                tileClassObjArray.push(TileClassObjFactory(tileNode, className))
            }
            return tile;
        }

    }
    function submitScene() {
        if (!unitObj.noUnitsAvailable()) return;
        const gameboard = playerObj.get.gameboard();
        const unitArray = unitObj.getPlacedUnits();
        unitArray.forEach(unit => {
            const gameUnit = unitObj.getRealUnitFromClone(unit);
            const tileArray = placedUnitsObj.getTileArrayFromPlacedUnit(unit);
            if (unit.get.length() === 1) { //shouldn't ever have a piece of length 1, but just in case
                gameboard.placeUnit(gameUnit, tileArray[0].getCoordArray());
                console.log(`There shouldn't be any units of length 1.`);
            }
            const startCoords = tileArray[0].getCoordObj();
            const endCoords = tileArray[tileArray.length - 1].getCoordObj();
            const inXaxis = startCoords.x === endCoords.x ? false : true;
            if (!gameboard.placeUnit(gameUnit, [startCoords.x, startCoords.y], !inXaxis)) {
                console.log('Error: trying to place unit on occupied tile.');
            }
        })
        loadNextScene();
    }
    function submitQuickSelect() {
        playerObj.ai.placeShips();
        loadNextScene();
    }
    function loadNextScene() {
        const scenes = sceneManager.getScenes();
        if (gameState.get.game.isSinglePlayer()) {
            gameState.p2.ai.placeShips();
            sceneManager.loadScene(scenes.main.game);
            return;
        }
        if (playerRef === 'p2') {
            sceneManager.loadScene(scenes.main.game);
            return;
        } else {
            scenes.p2.piecePlacement = createScene('p2');
            sceneManager.loadScene(scenes.p2.piecePlacement);
            return;
        }
    }

    function TileClassObjFactory(tileNode, className) {
        return { tileNode, className };
    }

    function PlacedUnitsObjFactory() {
        const placedUnitArr = [];

        function sortTiles(tileArr) {
            if (tileArr.length < 2) return;
            let axis = tileArr[0].getCoordObj().x === tileArr[1].getCoordObj().x ? 'y' : 'x';
            tileArr.sort((a, b) => a.getCoordObj()[axis] > b.getCoordObj()[axis])
        }
        const obj = {
            pushUnit: (unit, tile) => {
                let placedUnit = placedUnitArr.find((placedUnit) => placedUnit.unit === unit);
                if (!placedUnit) {
                    placedUnit = { unit, tileArr: [] };
                    placedUnitArr.push(placedUnit);
                }
                let tileArr = placedUnit.tileArr;
                if (!tileArr.includes(tile)) tileArr.push(tile);
            },
            removeUnit: (unit) => {
                const index = placedUnitArr.findIndex((placedUnit) => placedUnit.unit === unit);
                if (index < 0) return false;
                unitObj.setUnitAvailable(unit);
                return placedUnitArr.splice(index, 1)[0];
            },
            getTileArrayFromPlacedUnit: (unit) => {
                const placedUnit = placedUnitArr.find((placedUnit) => placedUnit.unit === unit);
                if (!placedUnit) return [];
                sortTiles(placedUnit.tileArr)
                return placedUnit.tileArr;
            },
        }
        return obj;
    }
    function createUnitObj(unitArray) {
        const _availableUnits = [];
        const _placedUnits = [];
        let _maxLength = 0;
        let _minLength;
        //create semi-cloned units and fill unit array
        //  and set _maxLength
        unitArray.forEach((unit) => {
            _availableUnits.push(CloneUnitFactory(unit));
        })
        function CloneUnitFactory(unit) {
            const id = unit.get.id();
            const length = unit.get.length();
    
            const obj = {
                get: {
                    id: () => id,
                    length: () => length,
                }
            }
            return obj;
        }
        function getUnitOfLength(length) {
            for (let i = 0; i < _availableUnits.length; i++) {
                if (_availableUnits[i].get.length() === length) return _availableUnits[i];
            }
            return false;
        }
        function setUnitPlaced(unit) {
            fromArrayToArray(_availableUnits, _placedUnits, unit);
            setLengthBounds();
        }
        function setUnitAvailable(unit) {
            fromArrayToArray(_placedUnits, _availableUnits, unit);
            setLengthBounds();
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
            if (index < 0) return false;
            toArr.push(item);
            fromArr.splice(index, 1);
        }
        function getRealUnitFromClone(cloneUnit) {
            let id = cloneUnit.get.id();
            for (let i = 0; i < unitArray.length; i++) {
                if (id === unitArray[i].get.id())
                    return unitArray[i];
            }
            return false;
        }
        const unitObj = {
            getAvailableUnitCount: () => _availableUnits.length,
            noUnitsAvailable: () => _availableUnits.length === 0,
            getPlacedUnits: () => _placedUnits,
            getMinLength: () => _minLength,
            getMaxLength: () => _maxLength,
            getUnitOfLength,
            setUnitPlaced,
            setUnitAvailable,
            getRealUnitFromClone,
        }
        setLengthBounds();
        return unitObj;
    }
}

