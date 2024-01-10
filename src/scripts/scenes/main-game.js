import { CLASSES } from "../class-manager";
import gameState from "../game-state";
import { generateGameTiles, initScene, addGridBoardProperties } from "../scene-manager";
import sceneManager from "../scene-manager";

////////////////////Exports///////////////////////////
const scene = initScene('TEMPLATE_main-game');
scene.sceneOnLoad = () => {
    gameWindows.p1.defense.displayUnits();
    gameWindows.p2.defense.displayUnits();
    gameState.set.scene.setCurrentPlayer('p1');
    textBoxObj.displayPlayerTurn();
    setDisplayObj.p1();
}
function initMainGameScene() {
    return scene;
}
export default initMainGameScene;
//////////////////////////////////////////////////////
//boolean state
let waiting = false; //flag for between turns. waits for click to end turn.
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
    this.p1 = () => {
        _first(gameWindows.p1.defense);
        _second(gameWindows.p1.offense);
    }
    this.p2 = () => {
        _first(gameWindows.p2.defense);
        _second(gameWindows.p2.offense);
    }
    this.custom = (first, second) => {
        _first(first);
        _second(second);
    }
    const _first = (gameWindow) => {
        const tileArray = gameWindow.getTileNodeArray();
        _replaceTilesIn(gameBox1, tileArray)
    }
    const _second = (gameWindow) => {
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
const textBoxObj = new function () {
    const textBox = scene.querySelector("[gameID='textBox']");
    this.clearText = () => { textBox.textContent = '' };
    this.setText = (text) => { textBox.textContent = text };
    this.displayPlayerTurn = () => {
        const pRef = gameState.get.scene.currentPlayer();
        const name = playerObjs[pRef].get.player().get.name();
        this.setText(`${name}'s turn.`)
    }
    this.turnResult = (result) => {
        this.setText(result);
    }
    this.addNewLineText = (text) => {
        textBox.innerHTML += '<br>' + text;
    }
}
function DefenseGameWindow(playerObj) {
    //init
    const tileNodes = generateGameTiles();
    const tiles = getTileObjArray(tileNodes);
    const gameboard = playerObj.get.gameboard();
    const enemyRef = getEnemyPlayerRef(playerObj);
    const unitTileArr = [];

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
    const enemyGameboard = gameState[enemyRef].get.gameboard();
    //event listeners
    tiles.forEach(tile => {
        const node = tile.getNode();
        const coord = tile.getCoord();
        node.addEventListener('click', (e) => {
            if (waiting) return;
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
                    attackObj.affectedIndexes.forEach(index => {
                        const tile = tiles[index];
                        tile.addClass(CLASSES.tileSunk)
                    });
                    break;
                case attackStates.error:
                    console.log('Error attackState');
                    return;
                    break;
                default:
                    console.log(`Attack state ${attackState} was unexpected.`);
            }
            if (enemyGameboard.isGameOver()) {
                gameState[enemyRef].get.player().addGamePlayed(false);
                playerObj.get.player().addGamePlayed(true); //untested
                textBoxObj.setText('You win!');
            }
            else {
                textBoxObj.turnResult(attackObj.attackState);
                nextTurn();
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
function nextTurn() {
    const playerRef = gameState.set.scene.swapPlayers();
    console.log(playerRef)
    if (gameState.get.game.isSinglePlayer()) {
        if (playerRef === 'p2') {
            const index = gameState.p2.ai.getAttackIndex();
            const tileNode = gameWindows.p2.offense.getTileNodeArray()[index];
            tileNode.click();
        }else {
            console.log('my turn?');
        }
        return;
    }
    textBoxObj.addNewLineText('Click anywhere to continue.')
    waiting = true;
    setTimeout(() => { //without timeout it fires immediately
        document.addEventListener('click', _continue, { once: true });
    }, 1);
    function _continue() {
        const name = playerObjs[playerRef].get.player().get.name();
        sceneManager.addBlinder(`${name} click to start your turn.`);
        setDisplayObj[playerRef]();
        waiting = false;
        textBoxObj.displayPlayerTurn();
    }
}