import { aiFactory } from "./AI-mechanics";
import { GameboardFactory, unitFactory } from "./gameboard-manager";
import sceneManager from "./scene-manager";

const BOARD_WIDTH = 7; // must be > 2
const BOARD_HEIGHT = 7; // must be > 2
const PIECE_LENGTH_ARRAY = [0, 0, 1, 2, 0, 2, 1, 0]; //index == piece length  value == piece count of said length
const PIECE_COUNT = ((count = 0) => {
    PIECE_LENGTH_ARRAY.forEach(item => { count += item; });
    return count;
})();
const DEFAULT_DIFFICULTY = 'medium';
let _isSinglePlayer;

let _currentPlayer = 'p1';
let _isGameOver = false;
let _winner;

//todo: change gamestate get/sets to individual objects with get/set and all references
const gameState = {
    get: {
        game: {
            isSinglePlayer: () => _isSinglePlayer,
            boardWidth: () => BOARD_WIDTH,
            boardHeight: () => BOARD_HEIGHT,
            pieceCount: () => PIECE_COUNT,
            isGameOver: () => _isGameOver,
            winner: ()=> _winner,
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
            },
            isGameOver: (winner) => {
                if(winner === false){
                    _isGameOver = false;
                    _winner = undefined;
                    return;
                }
                _isGameOver = true;
                _winner = winner;
            },
        },
        scene: {
            swapPlayers: () => {
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
    newGame: () => {
        _currentPlayer = 'p1';
        gameState.set.game.isGameOver(false);
        gameState.p1.reset();
        gameState.p2.reset();
    }
};

function _generatePlayerObj(playerRef) {

    let _player;
    let _gameboard = GameboardFactory(BOARD_WIDTH, BOARD_HEIGHT);
    let _units = _createUnitArray();
    let _ai = aiFactory({ gameboard: _gameboard, unitArray: _units, difficulty: DEFAULT_DIFFICULTY, playerRef });
    const playerObj = {
        get: {
            player: () => _player !== undefined ? _player : playerRef,
            units: () => _units,
            gameboard: () => _gameboard,
            playerRef: () => playerRef,
            enemyPlayer: ()=>{
                if(playerRef === 'p1') return gameState.p2;
                else return gameState.p1;
            }
        },
        set: {
            player: (player) => {
                if (_player !== undefined) return console.log('player already set. Returning.');
                _player = player;
            },
            gameboard: (gameboard) => {
                if (_gameboard !== undefined) console.log('resetting gameboard');
                _gameboard = gameboard;
            },
        },
        ai: {
            placeShips:(x)=>{ return _ai.placeShips(x)},
            sendAttack: (x)=>{return _ai.sendAttack(x)},
            setTileArray: (x)=>{return _ai.setTileArray(x)},
            setEnemyGameboard: (x)=>{return _ai.setEnemyGameboard(x)},
        },
        reset: () => {
            _gameboard = GameboardFactory(BOARD_WIDTH, BOARD_HEIGHT);
            _units = _createUnitArray();
            _ai = aiFactory({ gameboard: _gameboard, unitArray: _units, difficulty: DEFAULT_DIFFICULTY, playerRef });
        }
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