import { initScene } from "../scene-manager";
import sceneManager from "../scene-manager";

function initGameOver() {
    let scene = initScene('TEMPLATE_game-over');
    const mainTextBox = scene.querySelector("[gameOverID='main-textBox']");
    const playAgainBtn = scene.querySelector("[gameOverID='play-again-btn']")

    playAgainBtn.addEventListener('click',()=>{
        sceneManager.resetScenes();
        gameState.newGame();
        sceneManager.loadScene(sceneManager.getScenes().p1.piecePlacement);
    })

    mainTextBox.textContent = 'hotdog';
    scene.sceneOnLoad = ()=>{

    };
    return scene;
}

export default initGameOver;