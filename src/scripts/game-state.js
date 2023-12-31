import { gameboardFactory, unitFactory } from "./gameboard-manager";
import sceneManager from "./scene-manager";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 10;
const PIECE_COUNT = 5;
const PIECE_LENGTH_ARRAY = [0, 0, 1, 1, 1, 1, 1]; //index == piece length  value == piece count of said length
let _isSinglePlayer;

let _currentPlayer = 'p1';

//todo: change gamestate get/sets to individual objects with get/set and all references
const gameState = {
    get: {
        game: {
            isSinglePlayer: () => _isSinglePlayer,
            boardWidth: () => BOARD_WIDTH,
            boardHeight: () => BOARD_HEIGHT,
            pieceCount: () => PIECE_COUNT,
        },
        scene: {
            currentPlayer: () => _currentPlayer,
        },
    },
    set: {
        game: {
            isSinglePlayer: (bool) => {
                if (_isSinglePlayer !== undefined) {
                    console.log(`Can not change number of players. Returning.`);
                    return;
                }
                if ((bool !== true)
                    && bool !== false) {
                    console.log(`${bool} is not boolean. Returning.`);
                    return;
                }
                _isSinglePlayer = bool;
            }
        },
        scene: {
            swapPlayers: () => {
                if (_isSinglePlayer) return _currentPlayer;
                if (_currentPlayer === 'p1') _currentPlayer = 'p2';
                else _currentPlayer = 'p1';
                return _currentPlayer;
            },
            setCurrentPlayer: (playerRef) => {
                if (playerRef !== 'p1'
                    && playerRef !== 'p2') return console.log(`Invalid playerRef: ${playerRef}`);
                _currentPlayer = playerRef;
            }
        },
    },
    p1: _generatePlayerObj('p1'),
    p2: _generatePlayerObj('p2'),
    p0: { //here for intellisense
        get: {
            player: () => {},
            units: () => {},
            gameboard: () => {},
        },
        set: {
            player: () => {},
            gameboard: () => {},
        },
    },
};

function _generatePlayerObj(playerRef) {

    let _player;
    const _gameboard = gameboardFactory(BOARD_WIDTH, BOARD_HEIGHT);
    const _units = _createUnitArray();
    const playerObj = {
        get: {
            player: () => _player,
            units: () => _units,
            gameboard: () => _gameboard,
            playerRef: () => playerRef,
        },
        set: {
            player: (player) => {
                if (_player !== undefined) return console.log('player already set. Returning.');
                _player = player;
            },
            gameboard: (gameboard) => {
                if (_gameboard !== undefined) return console.log('gameboard already set. Returning.');
                _gameboard = gameboard;
            },
        },
    };
    return playerObj;
}

export default gameState;

function _createUnitArray() {
    const unitArray = [];
    for (let unitLength = 0; unitLength < PIECE_LENGTH_ARRAY.length; unitLength++) {
        for (let unitCount = PIECE_LENGTH_ARRAY[unitLength]; unitCount > 0; unitCount--) {
            unitArray.push(unitFactory(unitLength));
        }
    }
    return unitArray;
}

function setDummyUnits(){
    console.log('setting dummy units');
    const gameboardArray = [
        gameState.p1.get.gameboard(),
        gameState.p2.get.gameboard()
    ];
    let offset = 1;
    const units = gameState.p1.get.units();
    gameboardArray.forEach(gb =>{
        for(let i = offset; i < units.length + offset; i++){
            gb.placeUnit(units[i - offset],[0,i]);
        }
        offset++;
    })
}
export {setDummyUnits};