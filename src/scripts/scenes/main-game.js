import { CLASSES } from "../class-manager";
import gameState from "../game-state";
import { generateGameTiles, initScene, addGridBoardProperties } from "../scene-manager";

////////////////////Exports///////////////////////////
const scene = initScene('TEMPLATE_main-game');
scene.sceneOnLoad = ()=>{
    gameWindows.p1.defense.displayUnits();
}
function initMainGameScene() {
    return scene;
}
export default initMainGameScene;
//////////////////////////////////////////////////////

//static


//data objects
const players = {
    p1: gameState.p1,
    p2: gameState.p2,
}
const gameWindows = {
    p1: {
        offense: new OffenseGameWindow(players.p1),
        defense: new DefenseGameWindow(players.p1)
    },
    p2: {
        offense: new OffenseGameWindow(players.p2),
        defense: new DefenseGameWindow(players.p2)
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
        _replaceTilesIn(gameBox2, tileArray)
    }
    function _replaceTilesIn(gameBox, tileArray) {
        gameBox.textContent = '';
        tileArray.forEach(tile => {
            gameBox.appendChild(tile);
        })
    }
}
/// 
setDisplayObj.first(gameWindows.p1.defense); //for testing purposes
setDisplayObj.second(gameWindows.p1.offense);
console.log('remove later');
///
function DefenseGameWindow(playerObj) {
    //init
    const tileNodes = generateGameTiles();
    const tiles = getTileObjArray(tileNodes);
    const gameboard = playerObj.get.gameboard();

    //public fn
    this.getTileNodeArray = () => tileNodes;
    this.receiveAttack = (gameWindow, coords) => {

    }
    this.displayUnits = () => {
        tiles.forEach(tile =>{
            const coord = tile.getCoord();
            const unit = gameboard.getUnitOnCoord(coord);
            if(unit) tile.addClass(CLASSES.unit);
        })
    }
}
function OffenseGameWindow(playerObj) {
    const tileNodes = generateGameTiles();
    const tiles = [];
    const gameboard = playerObj.get.gameboard();
    this.getTileNodeArray = () => tileNodes;
    this.sendAttack = (coords) => {

    }
}
function getTileObjArray(tileNodeArray) {
    const tileObjArray = [];
    tileNodeArray.forEach(tileNode => {
        tileObjArray.push(new TileObj(tileNode));
    })
    function TileObj(tileNode) {
        const coordObj = {
            x: +tileNode.getAttribute('posX'),
            y: +tileNode.getAttribute('posY')
        }
        this.getNode = () => tileNode;
        this.getCoord = () => coordObj;
        const tempClasses = [];
        this.addTempClass = (className) => {
            tempClasses.push(className);
            tileNode.classList.add(className);
        }
        this.addClass = (className) => tileNode.classList.add(className);
        this.removeTempClasses = () => {
            while (tempClasses.length > 0)
                tileNode.classList.remove(tempClasses.pop());
        }
    }
    return tileObjArray;
}
//