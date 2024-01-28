import gameState from "./game-state";
import initBlinder from "./scenes/blinder";
import initTitleScreen from "./scenes/title-screen";
import initPlayerSelect from "./scenes/player-select";
import initPiecePlacement from "./scenes/piece-placement";
import initMainGameScene from "./scenes/main-game";
import initGameOver from "./scenes/game-over";

let scenes = {
    main: {},
    p1: {},
    p2: {},
};
const blinderObj = initBlinder();
let currentScene;
const gameWindow = document.getElementById('gameWindow');
const sceneManager = {
    initializeScenes: initializeScenes,
    getScenes: ()=>scenes,
    getCurrentScene: ()=>currentScene,
    loadScene,
    addBlinder,
    resetScenes,
};

export default sceneManager;


function loadScene(sceneNode) {
    if (currentScene) currentScene.remove();
    if (!sceneNode) {
        console.log(`${{ sceneNode }} is not a valid node.`);
        return;
    }
    gameWindow.appendChild(sceneNode);
    if(sceneNode.sceneOnLoad) sceneNode.sceneOnLoad();
    currentScene = sceneNode;
}

function initializeScenes() {
    scenes.main.titleScreen = initTitleScreen();
    scenes.main.playerSelect = initPlayerSelect();
    scenes.p1.piecePlacement = initPiecePlacement(); 
    scenes.main.game = initMainGameScene();
    scenes.main.gameOver = initGameOver();
}
function resetScenes(){
    // scenes.p1.piecePlacement.resetScene();
    // scenes.main.game.resetScene();
    scenes.p1.piecePlacement = initPiecePlacement();
    scenes.main.game = initMainGameScene();
}
function addBlinder(text = undefined){
    gameWindow.appendChild(blinderObj.scene);
    if(text !== undefined){
        blinderObj.setText(text);
    }
}

//exports

export { initScene, generateGameTiles, addGridBoardProperties };

function initScene(templateID) {
    let template = document.getElementById(templateID);
    if (!template) {
        console.log(`${templateID} is an invalid template ID.`)
        return false;
    }
    return template.content.firstElementChild.cloneNode(true);
}
function generateGameTiles(parentNode) {
    const tileArr = [];
    const numTilesX = gameState.get.game.boardWidth();
    const numTilesY = gameState.get.game.boardHeight();
    if(parentNode) addGridBoardProperties(parentNode);
    for (let y = 0; y < numTilesY; y++) {
        for (let x = 0; x < numTilesX; x++) {
            const tile = document.createElement('div');
            tile.classList.add('board-tile');
            tile.setAttribute('posX',x);
            tile.setAttribute('posY',y);
            if(parentNode) parentNode.appendChild(tile);
            tileArr.push(tile);
        }
    }
    return tileArr;
}

function addGridBoardProperties(node){
    const width = gameState.get.game.boardWidth();
    const height = gameState.get.game.boardHeight();
    node.style.display = 'grid';
    node.style.gridTemplate = `repeat(${height}, 1fr) / repeat(${width}, 1fr)`;
}