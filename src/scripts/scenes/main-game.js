import gameState from "../game-state";
import { generateGameTiles, initScene, addGridBoardProperties } from "../scene-manager";

////////////////////Exports///////////////////////////
const scene = initScene('TEMPLATE_main-game');

function initMainGameScene() {
    return scene;
}
export default initMainGameScene;
//////////////////////////////////////////////////////

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
        replaceTilesIn(gameBox1, tileArray)
    }
    this.second = (gameWindow) => {
        const tileArray = gameWindow.getTileNodeArray();
        replaceTilesIn(gameBox2, tileArray)
    }
    function replaceTilesIn(gameBox, tileArray) {
        gameBox.textContent = '';
        tileArray.forEach(tile => {
            gameBox.appendChild(tile);
        })
    }
}

function DefenseGameWindow(playerObj) {
    const tileNodes = generateGameTiles()
    const tiles = getTileObjArray(tileNodes);
    const gameboard = playerObj.get.gameboard();
    //public fn
    this.getTileNodeArray = () => tileNodes;
    this.receiveAttack = (coords) => {

    }
}
function OffenseGameWindow(playerObj) {
    const tileNodes = generateGameTiles();
    const gameboard = playerObj.get.gameboard();
    const tiles = [];
    this.getTileNodeArray = () => tileNodes;
    this.placeAttack = (coords) => {

    }
}
function getTileObjArray() {
    function TileObj(tileNode) {
        this.getNode = () => tileNode;

    }
}
//