import { gameboardFactory } from "./gameboard-manager";
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 10;
const PIECE_COUNT = 5;
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
        scene:{
            swapPlayers:()=>{
                if(_isSinglePlayer) return _currentPlayer;
                if(_currentPlayer === 'p1') _currentPlayer = 'p2';
                else _currentPlayer = 'p1';
                return _currentPlayer; 
            },
            setCurrentPlayer:(playerRef)=>{
                if(playerRef !== 'p1' 
                && playerRef !== 'p2') return console.log(`Invalid playerRef: ${playerRef}`);
                _currentPlayer = playerRef;
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
        const _gameboard = gameboardFactory(BOARD_WIDTH, BOARD_HEIGHT);
        get.gameboard = () => _gameboard;
        set.gameboard = (gameboard) => {
            if (_gameboard !== undefined) return console.log('gameboard already set. Returning.');
            _gameboard = gameboard;
        }
    }
})()

export default gameState;