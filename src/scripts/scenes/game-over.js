import { initScene } from "../scene-manager";
import sceneManager from "../scene-manager";

function initGameOver() {
    let scene = initScene('TEMPLATE_game-over');
    const mainTextBox = scene.querySelector("[gameOverID='main-textBox']");
    const playAgainBtn = scene.querySelector("[gameOverID='play-again-btn']")

    playAgainBtn.addEventListener('click',()=>{mainTextBox.textContent += ' hotdog'})

    mainTextBox.textContent = 'hotdog';
    scene.sceneOnLoad = ()=>{
        console.log('end scene loaded')
    };
    return scene;
}

export default initGameOver;