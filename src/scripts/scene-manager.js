let scenes = {};
let currentScene;
const gameWindow = document.getElementById('gameWindow');
const sceneManager = {
    initializeScenes: initializeScenes,
    getScenes: getScenes,
    loadScene: loadScene,
};

export default sceneManager;

function getScenes() {
    return scenes;
}

function loadScene(sceneNode) {
    if (currentScene) currentScene.remove();
    gameWindow.appendChild(sceneNode);
    currentScene = sceneNode;
}

function initializeScenes() {
    _initTitleScreen();
    _initPlayerSelect();
    _initPiecePlacement();
    _initMainGame();
    _initGameOver();
}



function _setScenes(){
    scenes.titleScreen = _initScene('TEMPLATE_title-screen');
    scenes.playerSelect = _initScene('TEMPLATE_player-select');
    scenes.piecePlacement1 = _initScene('TEMPLATE_piece-placement');
    scenes.piecePlacement2 = _initScene('TEMPLATE_piece-placement');
    scenes.mainGame1 = _initScene('TEMPLATE_main-game');
    scenes.mainGame2 = _initScene('TEMPLATE_main-game');
    scenes.gameOver = _initScene('TEMPLATE_game-over');
}
function _initTitleScreen(){
    let scene = _initScene('TEMPLATE_title-screen');
    scenes.titleScreen =  scene;
}
function _initPlayerSelect(){
    let scene = _initScene('TEMPLATE_player-select');
    scenes.playerSelect = scene;
}
function _initPiecePlacement(){
}
function _initMainGame(){
}
function _initGameOver(){
}

function _initScene(templateID) {
    let template = document.getElementById(templateID);
    if (!template) {
        console.log(`${templateID} is an invalid template ID.`)
        return false;
    }
    return template.content.firstElementChild.cloneNode(true);
}