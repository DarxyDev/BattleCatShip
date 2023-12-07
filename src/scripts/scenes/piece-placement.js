import { initScene } from "../scene-manager";
import { generateGameTiles } from "../scene-manager";
import gameState from "../game-state";

let gameTiles;

function initPiecePlacement() {
    const scenes = {};
    scenes.p1 = _getPiecePlacementScene();
    if (gameState.get.game.isSinglePlayer()) scenes.p2 = null;
    else scenes.p2 = _getPiecePlacementScene();
    return [scenes.p1, scenes.p2];

    ////
    function _getPiecePlacementScene() {
        const scene = initScene('TEMPLATE_piece-placement');
        const gameBox = scene.querySelector('[pPlacementID="gameBox"]');
        gameTiles = generateGameTiles(gameBox);
        gameTiles.forEach((tile)=>{
            tile.addEventListener('mouseover',(e)=>{
                const posX = tile.getAttribute('posX');
                const posY = tile.getAttribute('posY');
                tile.classList.add('tile-hover');
            })
            tile.addEventListener('mouseleave',()=>{
                tile.classList.remove('tile-hover');
            })
        });
        return scene;
    }
}
export default initPiecePlacement