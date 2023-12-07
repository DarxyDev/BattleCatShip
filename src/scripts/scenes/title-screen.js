import { initScene } from "../scene-manager";
import sceneManager from "../scene-manager";

function initTitleScreen() {
    let scene = initScene('TEMPLATE_title-screen');
    document.body.addEventListener('click', _onButtonPress);
    document.body.addEventListener('keypress', _onButtonPress);

    function _onButtonPress() {
        document.body.removeEventListener('click', _onButtonPress);
        document.body.removeEventListener('keypress', _onButtonPress);
        if (sceneManager.getCurrentScene() == scene) sceneManager.loadScene(sceneManager.getScenes().main.playerSelect);
        else console.log(`Current scene is not titleScreen. Removing titleScreen event listeners and returning.`);
    }
    return scene;
}

export default initTitleScreen;