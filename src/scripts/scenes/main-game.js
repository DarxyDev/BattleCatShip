import { CLASSES } from "../class-manager";
import gameState from "../game-state";
import { generateGameTiles, initScene, addGridBoardProperties } from "../scene-manager";

////////////////////Exports///////////////////////////
const scene = initScene('TEMPLATE_main-game');
scene.sceneOnLoad = () => {
    gameWindows.p1.defense.displayUnits();
    gameWindows.p2.defense.displayUnits();
}
function initMainGameScene() {
    return scene;
}
export default initMainGameScene;
//////////////////////////////////////////////////////

//static
const attackStates = {
    hit: 'hit',
    miss: 'miss',
    sunk: 'sunk',
    error: false,
}

//data objects
const playerObjs = {
    p1: gameState.p1,
    p2: gameState.p2,
}
const gameWindows = {
    p1: {
        offense: new OffenseGameWindow(playerObjs.p1),
        defense: new DefenseGameWindow(playerObjs.p1)
    },
    p2: {
        offense: new OffenseGameWindow(playerObjs.p2),
        defense: new DefenseGameWindow(playerObjs.p2)
    }
}

// function objects
const setDisplayObj = new function () {
    const gameBox1 = scene.querySelector("[gameID='gameBox-left']");
    const gameBox2 = scene.querySelector("[gameID='gameBox-right']");
    addGridBoardProperties(gameBox1);
    addGridBoardProperties(gameBox2);
    this.first = (gameWindow) => {
        const tileArray = gameWindow.getTileNodeArray();
        _replaceTilesIn(gameBox1, tileArray)
    }
    this.second = (gameWindow) => {
        const tileArray = gameWindow.getTileNodeArray();
        _replaceTilesIn(gameBox2, tileArray);
    }
    function _replaceTilesIn(gameBox, tileArray) {
        gameBox.textContent = '';
        tileArray.forEach(tile => {
            gameBox.appendChild(tile);
        })
    }
}
/// 
setDisplayObj.first(gameWindows.p2.defense); //for testing purposes
setDisplayObj.second(gameWindows.p1.offense);
console.log('change layouts here later');
///
function DefenseGameWindow(playerObj) {
    //init
    const tileNodes = generateGameTiles();
    const tiles = getTileObjArray(tileNodes);
    const gameboard = playerObj.get.gameboard();
    const enemyRef = getEnemyPlayerRef(playerObj);
    const unitTileArr = [];
    //event listeners
    // tileNodes.forEach(node =>{
    //     node.addEventListener('click', (e)=>{
    //         //may not be needed
    //     })
    // })
    //public fn
    this.getTileNodeArray = () => tileNodes;
    this.displayUnits = () => {
        tiles.forEach(tile => {
            const coord = tile.getCoord();
            const unit = gameboard.getUnitOnCoord(coord);
            if (unit) tile.addClass(CLASSES.unit);
        })
    }
    this.receiveAttack = (coord) => {
        const unit = gameboard.getUnitOnCoord(coord);
        const attackState = gameboard.receiveAttack(coord);
        const index = getIndexFromCoord(coord);
        const tile = tiles[index];

        switch (attackState) {
            case attackStates.hit:
                tile.addClass(CLASSES.unitHit);
                pushUnitTileArr(unit, tile)
                break;
            case attackStates.miss:
                tile.addClass(CLASSES.unitMiss);
                break;
            case attackStates.sunk:
                tile.addClass(CLASSES.unitSunk);
                const tileArr = getUnitTileArr(unit).tileArr;
                tileArr.forEach(tile => { tile.addClass(CLASSES.unitSunk); });
                console.log(unitTileArr)
                return new AttackObj(attackState, tileArr);
                ///
                break;
            case attackStates.error:
                console.log('Error attackState');
                break;
            default:
                console.log(`Attack state ${attackState} was unexpected.`);
        }
        return new AttackObj(attackState);
    }
    //private fn
    function AttackObj(attackState, affectedTiles) {
        const affectedIndexes = [];
        if (affectedTiles)
            affectedTiles.forEach(tile => {
                affectedIndexes.push(tile.getIndex())
            })
        this.attackState = attackState;
        this.affectedIndexes = affectedIndexes;
    }
    function UnitTileObj(unit, tile) {
        const tileArr = [tile];
        this.unit = unit;
        this.tileArr = tileArr;
        this.pushTile = (tile) => { tileArr.push(tile) };
    }
    function pushUnitTileArr(unit, tile) {
        for (let i = 0; i < unitTileArr.length; i++)
            if (unit === unitTileArr[i].unit)
                return unitTileArr[i].pushTile(tile);
        unitTileArr.push(new UnitTileObj(unit, tile));
    }
    function getUnitTileArr(unit) {
        for (let i = 0; i < unitTileArr.length; i++)
            if (unitTileArr[i].unit === unit)
                return unitTileArr[i];
    }
}
function OffenseGameWindow(playerObj) {
    //init
    const tileNodes = generateGameTiles();
    const tiles = getTileObjArray(tileNodes);
    const gameboard = playerObj.get.gameboard();
    const enemyRef = getEnemyPlayerRef(playerObj);
    //event listeners
    tiles.forEach(tile => {
        const node = tile.getNode();
        const coord = tile.getCoord();
        node.addEventListener('click', (e) => {
            const attackObj = sendAttack(coord);

            switch (attackObj.attackState) {
                case attackStates.hit:
                    tile.addClass(CLASSES.tileHit);
                    break;
                case attackStates.miss:
                    tile.addClass(CLASSES.tileMiss);
                    break;
                case attackStates.sunk:
                    tile.addClass(CLASSES.tileSunk);
                    console.log(attackObj)
                    attackObj.affectedIndexes.forEach(index => {
                        const tile = tiles[index];
                        tile.addClass(CLASSES.tileSunk)
                    })
                    console.log('gets wrong tiles, might need to change to indexes')
                    console.log('need to do more after sunk');
                    break;
                case attackStates.error:
                    console.log('Error attackState');
                    break;
                default:
                    console.log(`Attack state ${attackState} was unexpected.`);
            }
        })
    })

    //public fn
    this.getTileNodeArray = () => tileNodes;
    //private fn
    const sendAttack = (coords) => {
        return gameWindows[enemyRef].defense.receiveAttack(coords);
    }
}
function getTileObjArray(tileNodeArray) {
    const tileObjArray = [];

    for (let i = 0; i < tileNodeArray.length; i++)
        tileObjArray.push(new TileObj(tileNodeArray[i], i));

    return tileObjArray;
    //private
    function TileObj(tileNode, index) {
        const coordObj = {
            x: +tileNode.getAttribute('posX'),
            y: +tileNode.getAttribute('posY')
        }
        this.getNode = () => tileNode;
        this.getCoord = () => coordObj;
        this.getIndex = () => index;
        const tempClasses = [];
        this.addTempClass = (className) => {
            tempClasses.push(className);
            tileNode.classList.add(className);
        }
        this.removeTempClasses = () => {
            while (tempClasses.length > 0)
                tileNode.classList.remove(tempClasses.pop());
        }
        this.addClass = (className) => tileNode.classList.add(className);
    }
}
//
function getEnemyPlayerRef(playerObj) {
    let playerRef = playerObj.get.playerRef();
    return playerRef === 'p1' ? 'p2' : 'p1';
}
function getIndexFromCoord(coord) {
    return coord.x + (coord.y * gameState.get.game.boardWidth());
}
//