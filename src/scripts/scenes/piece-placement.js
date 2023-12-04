import { initScene } from "../scene-manager";
import { generateGameTiles } from "../scene-manager";
import gamePieces from "../game-pieces";
import gameState from "../game-state";


function initPiecePlacement() {
    const scenes = {
        p1:{},
        p2:{}
    };
    scenes.p1.piecePlacement = _getPiecePlacementScene();


    if (gameState.get.game.isSinglePlayer()) {
        scenes.p2.piecePlacement = null;
    }
    else scenes.p2.piecePlacement = _getPiecePlacementScene();

    function _getPiecePlacementScene() {
        const scene = initScene('TEMPLATE_piece-placement');

        const gameBox = scene.querySelector('[pPlacementID="rightBox"]');
        generateGameTiles(gameBox);
        const pieceBox = scene.querySelector('[pPlacementID="leftBox"]');
        _generateGamePieces(pieceBox);

        return scene;

        function _generateGamePieces(parentNode) {
            for (const item in gamePieces) {
                const piece = gamePieces[item].element.cloneNode(true);
                parentNode.appendChild(piece);
            }

            console.log(parentNode);
        }
    }
    return scenes;
}

export default initPiecePlacement