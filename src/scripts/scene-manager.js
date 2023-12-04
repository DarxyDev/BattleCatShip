import initTitleScreen from "./scenes/title-screen";
import initPlayerSelect from "./scenes/player-select";
import initPiecePlacement from "./scenes/piece-placement";
//import playerFactory from "./player-factory";
//import gameState from "./game-state";
//import gamePieces from "./game-pieces";

let scenes = {
    main: {},
    p1: {},
    p2: {},
};
let currentScene;
const gameWindow = document.getElementById('gameWindow');
const sceneManager = {
    initializeScenes: initializeScenes,
    getScenes: getScenes,
    loadScene: loadScene,
    getCurrentScene: getCurrentScene,
};

export default sceneManager;

function getScenes() {
    return scenes;
}

function loadScene(sceneNode) {
    if (currentScene) currentScene.remove();
    if (!sceneNode) {
        console.log(`${{ sceneNode }} is not a valid node.`);
        return;
    }
    gameWindow.appendChild(sceneNode);
    currentScene = sceneNode;
}

function getCurrentScene(){
    return currentScene;
}

function initializeScenes() {
    scenes.main.titleScreen = initTitleScreen();
    scenes.main.playerSelect = initPlayerSelect();
    const ppObject = initPiecePlacement();
    scenes.p1.piecePlacement = ppObject.p1.piecePlacement;
    scenes.p2.piecePlacement = ppObject.p2.piecePlacement;
    //initMainGame();
    //initGameOver();
}

//exports

export {initScene, generateGameTiles};

function initScene(templateID) {
    let template = document.getElementById(templateID);
    if (!template) {
        console.log(`${templateID} is an invalid template ID.`)
        return false;
    }
    return template.content.firstElementChild.cloneNode(true);
}
function generateGameTiles(parentNode, numTiles = 100) {
    for (let i = 0; i < numTiles; i++) {
        const tile = document.createElement('div');
        tile.classList.add('board-tile');
        parentNode.appendChild(tile);
    }
}