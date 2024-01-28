import { aiFactory } from "./AI-mechanics";
import { Gameboard, unitFactory } from "./gameboard-manager";
import sceneManager from "./scene-manager";

const BOARD_WIDTH = 3; // must be > 2
const BOARD_HEIGHT = 3; // must be > 2
const PIECE_LENGTH_ARRAY = [0, 0, 0, 1, 0, 0, 0, 0]; //index == piece length  value == piece count of said length
const PIECE_COUNT = ((count = 0) => {
    PIECE_LENGTH_ARRAY.forEach(item => { count += item; });
    return count;
})();
console.log(PIECE_COUNT)
console.log('temp: set units to a single 4-slot')
const DEFAULT_DIFFICULTY = 'medium';
let _isSinglePlayer;

let _currentPlayer = 'p1';
let _isGameOver = false;

//todo: change gamestate get/sets to individual objects with get/set and all references
const gameState = {
    get: {
        game: {
            isSinglePlayer: () => _isSinglePlayer,
            boardWidth: () => BOARD_WIDTH,
            boardHeight: () => BOARD_HEIGHT,
            pieceCount: () => PIECE_COUNT,
            isGameOver: () => _isGameOver,
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
            isGameOver: (bool) => { _isGameOver = bool },
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
        _isGameOver = false;
        gameState.p1.reset();
        gameState.p2.reset();
    }
};

function _generatePlayerObj(playerRef) {

    let _player;
    let _gameboard = new Gameboard(BOARD_WIDTH, BOARD_HEIGHT);
    let _units = _createUnitArray();
    let _ai = aiFactory({ gameboard: _gameboard, unitArray: _units, difficulty: DEFAULT_DIFFICULTY });
    const playerObj = {
        get: {
            player: () => _player !== undefined ? _player : playerRef,
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
        ai: {
            placeShips: _ai.placeShips,
            sendAttack: _ai.sendAttack,
            setTileArray: _ai.setTileArray,
            setEnemyGameboard: _ai.setEnemyGameboard,
        },
        reset: () => {
            _gameboard = new Gameboard(BOARD_WIDTH, BOARD_HEIGHT);
            _units = _createUnitArray();
            aiFactory({ gameboard: _gameboard, unitArray: _units, difficulty: DEFAULT_DIFFICULTY });
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

function setDummyUnits() {
    console.log('setting dummy units');
    const gameboardArray = [
        gameState.p1.get.gameboard(),
        gameState.p2.get.gameboard()
    ];
    let offset = 1;
    let units = gameState.p1.get.units();
    gameboardArray.forEach(gb => {
        if (gb === gameState.p1.get.gameboard()) {
            units = gameState.p1.get.units()
        } else {
            units = gameState.p2.get.units()
        }
        for (let i = offset; i < units.length + offset; i++) {
            gb.placeUnit(units[i - offset], [0, i]);
        }
        offset++;
    })
}
export { setDummyUnits };