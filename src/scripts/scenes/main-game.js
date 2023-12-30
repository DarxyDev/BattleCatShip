import gameState from "../game-state";
import { generateGameTiles, initScene, addGridBoardProperties } from "../scene-manager";


const scene = initScene('TEMPLATE_main-game');

function initMainGameScene() {
    return scene;
}
export default initMainGameScene;

//function objects
const players = {
    p1: gameState.p1,
    p2: gameState.p2,
}
const gameWindows = {
    p1:{
        offense: new OffenseGameWindow(players.p1),
        defense: new DefenseGameWindow(players.p1)
    },
    p2:{
         offense: new OffenseGameWindow(players.p2),
         defense: new DefenseGameWindow(players.p2)
    }
}
const setDisplayObj = new SetDisplayObj();


function SetDisplayObj() {
    const gameBox1 = scene.querySelector("[gameID='gameBox-left']");
    const gameBox2 = scene.querySelector("[gameID='gameBox-right']");
    addGridBoardProperties(gameBox1);
    addGridBoardProperties(gameBox2);
    this.first = (gameWindow) => {
        const tileArray = gameWindow.getTileArray();
        replaceTilesIn(gameBox1, tileArray)
    }
    this.second = (gameWindow) => {
        const tileArray = gameWindow.getTileArray();
        replaceTilesIn(gameBox2, tileArray)
    }
    function replaceTilesIn(gameBox, tileArray){
        gameBox.textContent = '';
        tileArray.forEach(tile=>{
            gameBox.appendChild(tile);
        })
    }
}

function DefenseGameWindow(playerObj) {
    const tiles = generateGameTiles()
    this.getTileArray = () => tiles;
    this.receiveAttack = receiveAttack;

    function receiveAttack(coords) {

    }
}
function OffenseGameWindow() {
    const parentNode = scene.querySelector("[gameID='gameBox-right']");
    this.placeAttack = placeAttack;
    function placeAttack(coords) {

    }
}