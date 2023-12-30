import gameState from "../game-state";
import { generateGameTiles, initScene } from "../scene-manager";

function initMainGameScene(){
    return scene;
}
export default initMainGameScene;

const scene = initScene('TEMPLATE_main-game');
const gameWindows = {
    p1: {
        defense: new DefenseGameWindow(),
        offense: new OffenseGameWindow(),
    },
    p2: {
        defense: new DefenseGameWindow(),
        offense: new OffenseGameWindow(),
    }
}
function DefenseGameWindow(){
    const parentNode = scene.querySelector("[gameID='gameBox-left']");
    const tiles = generateGameTiles();

    this.receiveAttack = receiveAttack;

    function receiveAttack(coords){

    }
}
function OffenseGameWindow(){
    const parentNode = scene.querySelector("[gameID='gameBox-right']");
    this.placeAttack = placeAttack;
    function placeAttack(coords){

    }
}