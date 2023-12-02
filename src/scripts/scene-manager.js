import playerFactory from "./player-factory";
import gameState from "./game-state";

let scenes = {
    main:{},
    p1:{},
    p2:{},
};
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
    if (!sceneNode) {
        console.log(`${{ sceneNode }} is not a valid node.`);
        return;
    }
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

function _initTitleScreen() {
    let scene = _initScene('TEMPLATE_title-screen');
    scenes.main.titleScreen = scene;
    document.body.addEventListener('click', _onButtonPress);
    document.body.addEventListener('keypress', _onButtonPress);

    function _onButtonPress() {
        document.body.removeEventListener('click', _onButtonPress);
        document.body.removeEventListener('keypress', _onButtonPress);
        if (currentScene == scene) loadScene(scenes.main.playerSelect);
        else console.log(`Current scene is not titleScreen. Removing titleScreen event listeners and returning.`);
    }
}
function _initPlayerSelect() {
    let scene = _initScene('TEMPLATE_player-select');
    scenes.main.playerSelect = scene;

    const submitButton = scene.querySelector('[pSelectID="submit"]');
    const singlePlayerInput = scene.querySelector('[pSelectID="singlePlayer"]');
    const p1Input = scene.querySelector('[pSelectID="player1"]');
    const p2Input = scene.querySelector('[pSelectID="player2"]');


    submitButton.addEventListener('click', _onSubmit);
    function _onSubmit(){
        let singlePlayer = singlePlayerInput.checked;
        //p1
        let name = p1Input.value;
        if(name === '') name = 'Player1';
        let type = 'human';
        let player = playerFactory(name, type);
        gameState.set.player1.player(player);

        //p2
        if(singlePlayer){
            name = 'CPU';
            type = 'computer';
        }
        else{
            name = p2Input.value;
            if(name === '') name = 'Player 2';
        }
        player = playerFactory(name, type);
        gameState.set.player2.player(player);
        //
        gameState.set.game.isSinglePlayer(singlePlayer);
        loadScene(scenes.p1.piecePlacement);
    }
}
function _initPiecePlacement() {
    scenes.p1.piecePlacement = _getPiecePlacementScene();
    let gameBox = scenes.p1.piecePlacement.querySelector('[pPlacementID="rightBox"]');
    _generateGameTiles(gameBox);
    if(gameState.get.game.isSinglePlayer()){
        scenes.p2.piecePlacement = null;
        return;
    }
    scenes.p2.piecePlacement = _getPiecePlacementScene();
    
    gameBox = scenes.p2.piecePlacement.querySelector('[pPlacementID="rightBox"]');
    _generateGameTiles(gameBox);

    function _getPiecePlacementScene(){
        let scene = _initScene('TEMPLATE_piece-placement');
        return scene;
    }
}
function _initMainGame() {
}
function _initGameOver() {
}

function _initScene(templateID) {
    let template = document.getElementById(templateID);
    if (!template) {
        console.log(`${templateID} is an invalid template ID.`)
        return false;
    }
    return template.content.firstElementChild.cloneNode(true);
}
function _generateGameTiles(parentNode, numTiles = 100){
    for(let i = 0; i < numTiles; i++){
        let tile = document.createElement('div');
        tile.classList.add('board-tile');
        parentNode.appendChild(tile);
    }
}