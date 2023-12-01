let _player1;
let _player2;
let _isSinglePlayer;

const gameState = {
    get: {
        player1: {
            player: () => { return _player1 },
        },
        player2: {
            player: () => { return _player2 },
        },
        game: {
            isSinglePlayer: () => { return _isSinglePlayer },
        }
    },
    set: {
        player1: {
            player: (player) => {
                if (_player1 !== undefined) return;
                _player1 = player;
            },
        },
        player2: {
            player: (player) => {
                if (_player2 !== undefined) return;
                _player2 = player;
            },
        },
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

export default gameState;