import { initScene } from "../scene-manager";

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
        gameState.set.player1.player(player);

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
        gameState.set.player2.player(player);
        //
        gameState.set.game.isSinglePlayer(singlePlayer);
        loadScene(scenes.p1.piecePlacement);
    }
    return scene;
}

export default initPlayerSelect;