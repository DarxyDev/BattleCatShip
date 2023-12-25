import { initScene } from "../scene-manager";
import { generateGameTiles } from "../scene-manager";
import gameState from "../game-state";
//export scene to sceneManager
function initPiecePlacement() {
    const scenes = {};
    scenes.p1 = createScene('p1');
    // if (gameState.get.game.isSinglePlayer()) scenes.p2 = null;
    // else scenes.p2 = createScene('p2');
    return [scenes.p1, scenes.p2];
}
export default initPiecePlacement
//internal workings start here
const PIECE_COUNT = gameState.get.game.pieceCount();
const BOARD_WIDTH = gameState.get.game.boardWidth();
const BOARD_HEIGHT = gameState.get.game.boardHeight();

function createScene(playerRef) {
    //generate scene node from template
    const scene = initScene('TEMPLATE_piece-placement');
    //generate gameTiles and add properties
    const gameBox = scene.querySelector('[pPlacementID="gameBox"]');
    const gameTiles = generateGameTiles(gameBox);
    const tileObjs = [];
    for (let i = 0; i < gameTiles.length; i++) {
        tileObjs.push(tileFactory(gameTiles[i], i));
    }
    //scoped vars
    const playerObj = gameState[playerRef];
    const allUnits = playerObj.get.units();
    const availableUnitArray = [];
    for(let i = 0; i < allUnits.length; i++){
        console.log(allUnits[i])
    };
    //
    function tileFactory(tileNode, index) {
        let currentUnit;
        const coords = {
            x: +tileNode.getAttribute('posX'),
            y: +tileNode.getAttribute('posY')
        }
        //tile object creation
        const tile = {
            getNode: () => tileNode,
            getCoordObj: () => coords,
            unit: {
                place: (unit) => {
                    if (currentUnit) return false;
                    currentUnit = unit;
                    tile.classList.add('tile-placed-unit');
                },
                remove: () => {
                    currentUnit = undefined
                    tile.classList.remove('tile-placed-unit');
                },
                isOpen: () => { if (currentUnit) return true; return false; },
            },
            nextTile: {
                up: () => tileObjs[index - BOARD_WIDTH],
                down: () => tileObjs[index + BOARD_WIDTH],
                left: () => {
                    if (coords.x - 1 < 0) return false;
                    return tileObjs[index - 1];
                },
                right: ()=>{
                    if(coords.x + 1 >= BOARD_WIDTH) return false;
                    return tileObjs[index + 1];
                },
            }
        }
        //event listeners
        tileNode.addEventListener('mouseover',(e)=>{

        });
        tileNode.addEventListener('mouseleave',(e)=>{

        });
        tileNode.addEventListener('click',(e)=>{

        });
        return tile;
    }
    return scene;
}

