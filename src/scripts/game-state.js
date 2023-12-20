import { gameboardFactory, unitFactory } from "./gameboard-manager";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 10;
const PIECE_COUNT = 5;
const PIECE_LENGTH_ARRAY = [0,0,1,1,1,1,1]; //index == piece length  value == piece count of said length
let _isSinglePlayer;

let _currentPlayer = 'p1';


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
        }
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
        }
    },
};


_generatePlayerObj(1);
_generatePlayerObj(2);

function _generatePlayerObj(playerNum) {
    const pString = `p${playerNum}`;
    const get = {};
    const set = {};
    gameState.set[pString] = set;
    gameState.get[pString] = get;

    let _player;
    get.player = () => _player;
    set.player = (player) => {
        if (_player !== undefined) return console.log('player already set. Returning.');
        _player = player
    };
    const _gameboard = gameboardFactory(BOARD_WIDTH, BOARD_HEIGHT);
    const _units = _createUnitArray();
     get.units = () => _units;
    get.gameboard = () => _gameboard;
    set.gameboard = (gameboard) => {
        if (_gameboard !== undefined) return console.log('gameboard already set. Returning.');
        _gameboard = gameboard;
    }
}

export default gameState;

function _createUnitArray(){
    const unitArray = [];
    for(let unitLength = 0; unitLength < PIECE_LENGTH_ARRAY.length; unitLength++){
        for (let unitCount = PIECE_LENGTH_ARRAY[unitLength]; unitCount > 0; unitCount--){
            unitArray.push(unitFactory(unitLength));
        }
    }
    return unitArray;
}