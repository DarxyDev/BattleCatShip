let _player1;
let _player2;

const gameState = {
    get: {
        player1: {
            player: () => { return _player1 },
        },
        player2: {
            player: () => { return _player2 },
        },
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
        }
    },
};

export default gameState;