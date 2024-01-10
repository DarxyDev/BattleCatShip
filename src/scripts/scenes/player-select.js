import { initScene } from "../scene-manager";
import sceneManager from "../scene-manager";
import playerFactory from "../player-factory";
import gameState from "../game-state";

function initPlayerSelect() {
    let scene = initScene('TEMPLATE_player-select');
    const submitButton = scene.querySelector('[pSelectID="submit"]');
    const singlePlayerInput = scene.querySelector('[pSelectID="singlePlayer"]');
    const p1Input = scene.querySelector('[pSelectID="player1"]');
    const p2Input = scene.querySelector('[pSelectID="player2"]');


    submitButton.addEventListener('click', _onSubmit);
    function _onSubmit() {
        let singlePlayer = singlePlayerInput.checked;
        //p1
        let name = p1Input.value;
        if (name === '') name = 'Player1';
        let type = 'human';
        let player = playerFactory(name, type);
        gameState.p1.set.player(player);

        //p2
        if (singlePlayer) {
            name = 'CPU';
            type = 'computer';
        }
        else {
            name = p2Input.value;
            if (name === '') name = 'Player 2';
        }
        player = playerFactory(name, type);
        gameState.p2.set.player(player)
        //
        gameState.set.game.isSinglePlayer(singlePlayer);
        sceneManager.loadScene(sceneManager.getScenes().p1.piecePlacement);
    }
    return scene;
}

export default initPlayerSelect;