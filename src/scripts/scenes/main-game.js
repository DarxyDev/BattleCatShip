import gameState from "../game-state";
import { generateGameTiles, initScene } from "../scene-manager";

function initMainGameScene(){
    return createScene();
}
export default initMainGameScene;

const moves = {
    p1:{
        recieveAttack:()=>{},
    },
    p2:{
        recieveAttack:()=>{},
    }
}

function createScene(){
    const scene = initScene('TEMPLATE_main-game');

    const defenseObj = new DefenseGameWindow();
    const offenseObj = new OffenseGameWindow();

    //draw tiles + tile behavior
    //place ships
    return scene;

    function DefenseGameWindow(){
        const parentNode = scene.querySelector("[gameID='gameBox-left']");
        const tiles = generateGameTiles(parentNode);

        this.receiveAttack = receiveAttack;

        function receiveAttack(coords){

        }
    }
    function OffenseGameWindow(){
        const parentNode = scene.querySelector("[gameID='gameBox-right']");

        function placeAttack(coords){
            
        }
    }
}