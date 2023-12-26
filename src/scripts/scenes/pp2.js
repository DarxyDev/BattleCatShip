import { initScene } from "../scene-manager";
import { generateGameTiles } from "../scene-manager";
import gameState from "../game-state";

//export scene to sceneManager
function initPiecePlacement() {
    const scenes = {};
    scenes.p1 = createScene('p1');
    // if (gameState.get.game.isSinglePlayer()) scenes.p2 = null;
    // else scenes.p2 = createScene('p2');
    return [scenes.p1, scenes.p2];
}
export default initPiecePlacement

//internal workings start here
const PIECE_COUNT = gameState.get.game.pieceCount();
const BOARD_WIDTH = gameState.get.game.boardWidth();
const BOARD_HEIGHT = gameState.get.game.boardHeight();
console.log('add color classes, then on upTile etc.. mark them as needed');
const CLASSES = {
    unit:'tile-has-unit',
    lowHighlight:'tile-highlight-low',
    highHighlight: 'tile-highlight-high',
    invalidHighlight:'tile-highlight-invalid',
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
        for (let i = 0; i < _tileNodeArray.length; i++) {
            tileObjs.push(_tileFactory(_tileNodeArray[i], i));
        }
        const tileObj = {

        }

        return tileObj;

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
                highLightTile: (highlightClass) => {

                },
            }
            //event listeners
            tileNode.addEventListener('mouseover', (e) => {
                switch (STATES.current) {
                    case STATES.pickTile:
                        highlightPossiblePlacements(e.target);
                        break;
                    case STATES.placeUnit:
                        highlightUnitPlacements(e.target);
                        break;
                    default: console.log(`Invalid state: ${STATES.current}.`);
                }
            });

            tileNode.addEventListener('mouseleave', (e) => {

            });
            tileNode.addEventListener('click', (e) => {

            });

            //highlights in all 4 directions for a distance of the current maxLength
            function highlightPossiblePlacements(_tileNode) {
                const _coords = {
                    x: +_tileNode.getAttribute('posX'),
                    y: +_tileNode.getAttribute('posY')
                }
                const _index = (_coords.y * BOARD_WIDTH) + _coords.x;
                const _tile = tileObjs[_index];
                let upTile = _tile;
                let downTile = _tile;
                let leftTile = _tile;
                let rightTile = _tile;
                for (let i = 0; i < unitObj.getMaxLength(); i++) {
                    if (upTile) {
                        upTile = upTile.nextTile.up();
                    }
                    if (downTile) {
                        downTile = downTile.nextTile.down();
                    }
                    if (leftTile) {
                        leftTile = leftTile.nextTile.left();
                    }
                    if (rightTile) {
                        rightTile = rightTile.nextTile.right();
                    }
                }
            }
            function highlightUnitPlacements() {

            }

            return tile;
        }
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

