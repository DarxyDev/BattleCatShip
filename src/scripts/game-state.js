import { gameboardFactory } from "./gameboard-manager";
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 10;
const PIECE_COUNT = 5;
let _isSinglePlayer;


const gameState = {
    get: {
        game: {
            isSinglePlayer: () => _isSinglePlayer,
            boardWidth: () => BOARD_WIDTH,
            boardHeight: () => BOARD_HEIGHT,
            pieceCount: () => PIECE_COUNT,
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
        }
    },
};

(() => {
    _generatePlayerObj(1);
    _generatePlayerObj(2);

    function _generatePlayerObj(playerNum) {
        const pString = `player${playerNum}`;
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
        const _gameBoard = gameboardFactory(BOARD_WIDTH, BOARD_HEIGHT);
        get.gameBoard = () => _gameBoard;
        set.gameBoard = (gameBoard) => {
            if (_gameBoard !== undefined) return console.log('gameBoard already set. Returning.');
            _gameBoard = gameBoard;
        }
    }
})()

export default gameState;