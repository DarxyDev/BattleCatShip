import initBlinder from "./scenes/blinder";
import initTitleScreen from "./scenes/title-screen";
import initPlayerSelect from "./scenes/player-select";
import initPiecePlacement from "./scenes/pp2"//"./scenes/piece-placement";
import gameState from "./game-state";
//import playerFactory from "./player-factory";
//import gameState from "./game-state";
//import gamePieces from "./game-pieces";

let scenes = {
    main: {},
    p1: {},
    p2: {},
};
const blinderScene = initBlinder();
let currentScene;
const gameWindow = document.getElementById('gameWindow');
const sceneManager = {
    initializeScenes: initializeScenes,
    getScenes: ()=>scenes,
    getCurrentScene: ()=>currentScene,
    loadScene,
    addBlinder,
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
    [scenes.p1.piecePlacement, scenes.p2.piecePlacement] = initPiecePlacement();
    scenes.main.game = '';
    //initMainGame();
    //initGameOver();
}
function addBlinder(){
    gameWindow.appendChild(blinderScene);
}

//exports

export { initScene, generateGameTiles };

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
    _addGridBoardProperties(parentNode);
    for (let y = 0; y < numTilesY; y++) {
        for (let x = 0; x < numTilesX; x++) {
            const tile = document.createElement('div');
            tile.classList.add('board-tile');
            tile.setAttribute('posX',x);
            tile.setAttribute('posY',y);
            parentNode.appendChild(tile);
            tileArr.push(tile);
        }
    }
    return tileArr;
}

function _addGridBoardProperties(node){
    const width = gameState.get.game.boardWidth();
    const height = gameState.get.game.boardHeight();
    node.style.display = 'grid';
    node.style.gridTemplate = `repeat(${height}, 1fr) / repeat(${width}, 1fr)`
}