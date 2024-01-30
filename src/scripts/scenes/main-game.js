import { CLASSES } from "../class-manager";
import gameState from "../game-state";
import { generateGameTiles, initScene, addGridBoardProperties } from "../scene-manager";
import sceneManager from "../scene-manager";

////////////////////Exports///////////////////////////
function initMainGameScene() {
    const scene = initScene('TEMPLATE_main-game');
    scene.sceneOnLoad = () => {
        gameWindows.p1 = {
            offense: OffenseGameWindowFactory(playerObjs.p1),
            defense: DefenseGameWindowFactory(playerObjs.p1)
        };
        gameWindows.p2 = {
            offense: OffenseGameWindowFactory(playerObjs.p2),
            defense: DefenseGameWindowFactory(playerObjs.p2)
        }

        gameWindows.p1.defense.displayUnits();
        gameWindows.p2.defense.displayUnits();
        gameState.set.scene.setCurrentPlayer('p1');
        textBoxObj.displayPlayerTurn();

        if (gameState.get.game.isSinglePlayer()) setDisplayObj.singplePlayer();
        else setDisplayObj.multiplayer();

        gameState.p1.ai.setTileArray(gameWindows.p1.offense.getTileArray());
        gameState.p1.ai.setEnemyGameboard(gameState.p2.get.gameboard());
        gameState.p2.ai.setTileArray(gameWindows.p2.offense.getTileArray());
        gameState.p2.ai.setEnemyGameboard(gameState.p1.get.gameboard());
    }
    //////////////////////////////////////////////////////

    //static
    const attackStates = {
        hit: 'hit',
        miss: 'miss',
        sunk: 'sunk',
        error: false,
    }

    //data objects
    const playerObjs = {
        p1: gameState.p1,
        p2: gameState.p2,
    }
    const gameWindows = {
        p1: {
            offense: OffenseGameWindowFactory(playerObjs.p1),
            defense: DefenseGameWindowFactory(playerObjs.p1)
        },
        p2: {
            offense: OffenseGameWindowFactory(playerObjs.p2),
            defense: DefenseGameWindowFactory(playerObjs.p2)
        }
    }

    // function objects
    const setDisplayObj = setDisplayObjFactory();
    function setDisplayObjFactory() {
        const gameBox1 = scene.querySelector("[gameID='gameBox-left']");
        const gameBox2 = scene.querySelector("[gameID='gameBox-right']");
        addGridBoardProperties(gameBox1);
        addGridBoardProperties(gameBox2);

        const _first = (gameWindow) => {
            const tileArray = gameWindow.getTileNodeArray();
            _replaceTilesIn(gameBox1, tileArray)
        }
        const _second = (gameWindow) => {
            const tileArray = gameWindow.getTileNodeArray();
            _replaceTilesIn(gameBox2, tileArray);
        }
        function _replaceTilesIn(gameBox, tileArray) {
            gameBox.textContent = '';
            tileArray.forEach(tile => {
                gameBox.appendChild(tile);
            })
        }
        const obj = {
            singplePlayer: () => {
                _first(gameWindows.p1.defense);
                _second(gameWindows.p1.offense);
            },
            multiplayer: () => {
                _first(gameWindows.p1.offense);
                _second(gameWindows.p2.offense);
            },
            custom: (first, second) => {
                _first(first);
                _second(second);
            },
        }
        return obj;
    }
    const textBoxObj = textBoxObjFactory();
    function textBoxObjFactory() {
        const textBox = scene.querySelector("[gameID='textBox']");
        const obj = {
            clearText: () => { textBox.textContent = '' },
            setText: (text) => { textBox.textContent = text },
            displayPlayerTurn: () => {
                const pRef = gameState.get.scene.currentPlayer();
                const name = playerObjs[pRef].get.player().get.name();
                obj.setText(`${name}'s turn.`)
            },
            turnResult: (result) => {
                obj.setText(result);
            },
            addNewLineText: (text) => {
                textBox.innerHTML += '<br>' + text;
            },
        }
        return obj;
    };
    function DefenseGameWindowFactory(playerObj) {
        //init
        const tileNodes = generateGameTiles();
        const tiles = getTileObjArray(tileNodes);
        const gameboard = playerObj.get.gameboard();
        const enemyRef = getEnemyPlayerRef(playerObj);
        const unitTileArr = [];
        //private fn
        function AttackObjFactory(attackState, affectedTiles) {
            const affectedIndexes = [];
            if (affectedTiles)
                affectedTiles.forEach(tile => {
                    affectedIndexes.push(tile.getIndex())
                })
            const obj = {
                attackState,
                affectedIndexes,
            }
            return obj;
        }
        function UnitTileObjFactory(unit, tile) {
            const tileArr = [tile];
            const obj = {
                unit: unit,
                tileArr: tileArr,
                pushTile: (tile) => { tileArr.push(tile) },
            }
            return obj;
        }
        function pushUnitTileArr(unit, tile) {
            for (let i = 0; i < unitTileArr.length; i++) {
                if (unit === unitTileArr[i].unit)
                    return unitTileArr[i].pushTile(tile);
            }
            unitTileArr.push(UnitTileObjFactory(unit, tile));
        }
        function getUnitTileArr(unit) {
            for (let i = 0; i < unitTileArr.length; i++)
                if (unitTileArr[i].unit === unit)
                    return unitTileArr[i];
            console.log('Error, unit not found');
        }
        //public 
        const obj = {
            getTileNodeArray: () => tileNodes,
            displayUnits: () => {
                tiles.forEach(tile => {
                    const coord = tile.getCoord();
                    const unit = gameboard.getUnitOnCoord(coord);
                    if (unit) tile.addClass(CLASSES.unit);
                })
            },
            receiveAttack: (coord) => {
                const unit = gameboard.getUnitOnCoord(coord);
                const attackState = gameboard.receiveAttack(coord);
                const index = getIndexFromCoord(coord);
                const tile = tiles[index];

                switch (attackState) {
                    case attackStates.hit:
                        tile.addClass(CLASSES.unitHit);
                        pushUnitTileArr(unit, tile)
                        break;
                    case attackStates.miss:
                        tile.addClass(CLASSES.unitMiss);
                        break;
                    case attackStates.sunk:
                        tile.addClass(CLASSES.unitSunk);
                        const tileArr = getUnitTileArr(unit).tileArr;
                        tileArr.forEach(tile => { tile.addClass(CLASSES.unitSunk); });
                        return AttackObjFactory(attackState, tileArr);
                        ///
                        break;
                    case attackStates.error:
                        break;
                    default:
                        console.log(`Attack state ${attackState} was unexpected.`);
                }
                return AttackObjFactory(attackState);
            },
        }
        return obj;
    }
    function OffenseGameWindowFactory(playerObj) {
        //init
        const tileNodes = generateGameTiles();
        const tiles = getTileObjArray(tileNodes);
        const gameboard = playerObj.get.gameboard();
        const enemyRef = getEnemyPlayerRef(playerObj);
        const enemyGameboard = gameState[enemyRef].get.gameboard();
        //event listeners
        tiles.forEach(tile => {
            const node = tile.getNode();
            node.addEventListener('click', tileOnClick);
            tile.attack = tileOnClick;

            function tileOnClick(e) {
                if (gameState.get.scene.currentPlayer() == enemyRef
                    || gameState.get.game.isGameOver()) return;

                const coord = tile.getCoord();
                const attackObj = sendAttack(coord);

                switch (attackObj.attackState) {
                    case attackStates.hit:
                        tile.addClass(CLASSES.tileHit);
                        break;
                    case attackStates.miss:
                        tile.addClass(CLASSES.tileMiss);
                        break;
                    case attackStates.sunk:
                        tile.addClass(CLASSES.tileSunk);
                        attackObj.affectedIndexes.forEach(index => {
                            tiles[index].addClass(CLASSES.tileSunk);
                        });
                        break;
                    case attackStates.error:
                        return;
                        break;
                    default:
                        console.log(`Attack state ${attackState} was unexpected.`);
                }
                if (enemyGameboard.isGameOver()) {
                    gameState.set.game.isGameOver(playerObj);
                    gameState[enemyRef].get.player().addGamePlayed(false);
                    playerObj.get.player().addGamePlayed(true);
                    let gameOverScene = sceneManager.getScenes().main.gameOver;
                    sceneManager.loadScene(gameOverScene);
                }
                else {
                    textBoxObj.turnResult(attackObj.attackState);
                    nextTurn();
                }
                return attackObj.attackState;
            }
        })
        //private fn
        const sendAttack = (coords) => {
            return gameWindows[enemyRef].defense.receiveAttack(coords);
        }
        //public fn
        const obj = {

            getTileNodeArray: () => tileNodes,
            getTileFromIndex: (index) => tiles[index],
            getTileArray: () => tiles,
        }
        return obj;
    }
    function getTileObjArray(tileNodeArray) {
        const tileObjArray = [];

        for (let i = 0; i < tileNodeArray.length; i++)
            tileObjArray.push(TileObjFactory(tileNodeArray[i], i));

        return tileObjArray;
        //private
        function TileObjFactory(tileNode, index) {
            const coordObj = {
                x: +tileNode.getAttribute('posX'),
                y: +tileNode.getAttribute('posY')
            }

            const tempClasses = [];
            const obj = {
                getNode: () => tileNode,
                getCoord: () => coordObj,
                getIndex: () => index,
                addTempClass: (className) => {
                    tempClasses.push(className);
                    tileNode.classList.add(className);
                },
                removeTempClasses: () => {
                    while (tempClasses.length > 0)
                        tileNode.classList.remove(tempClasses.pop());
                },
                addClass: (className) => tileNode.classList.add(className),
            }
            return obj;
        }
    }
    //
    function getEnemyPlayerRef(playerObj) {
        let playerRef = playerObj.get.playerRef();
        return playerRef === 'p1' ? 'p2' : 'p1';
    }
    function getPlayerName(playerObj) {
        if (playerObj === 'p1') playerObj = gameState.p1;
        if (playerObj === 'p2') playerObj = gameState.p2;
        return playerObj.get.player().get.name();
    }
    function getIndexFromCoord(coord) {
        return coord.x + (coord.y * gameState.get.game.boardWidth());
    }
    //
    function nextTurn() {
        const playerRef = gameState.set.scene.swapPlayers();
        if (gameState.get.game.isSinglePlayer()) {
            if (playerRef === 'p2') {
                gameState.p2.ai.sendAttack();
            } else {

            }
        }
        textBoxObj.addNewLineText(`${gameState[playerRef].get.player().get.name()}'s turn.`)
    }
    return scene;
}

export default initMainGameScene;