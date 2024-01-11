import gameState from "./game-state";

function aiFactory(settings) {
    let _gameboard = settings.gameboard;
    let _unitArray = settings.unitArray;
    let _difficulty = settings.difficulty;
    const _prevMoves = [];
    const aiObj = {
        getAttackCoords: () => {
            let coord;
            switch (_difficulty) {
                case 'easy':
                    coord = _getEasyAttackCoords();
                    break;
                case 'medium':
                    coord = _getMediumAttackCoords();
                    break;
                case 'hard':
                    coord = _getHardAttackCoords();
                    break;
                default:
                    return console.log(`${_difficulty} is invalid.`)
            }
            _prevMoves.push(coord);
            return coord;
        },
        getAttackIndex:()=>{
            const coords = aiObj.getAttackCoords();
            const width = _gameboard.get.width();
            return (coords[1] * width) + coords[0];
        },
        placeShips: () => {
            const boardHeight = _gameboard.get.height();
            const boardWidth = _gameboard.get.width();
            _unitArray.forEach(unit => {
                let x, y, rotated;
                do {
                    x = Math.round(Math.random() * boardWidth);
                    y = Math.round(Math.random() * boardHeight);
                    rotated = Math.random() < .5;
                } while (!_gameboard.placeUnit(unit, [x, y], rotated))
            })

        }
    }

    return aiObj;

    function _getEasyAttackCoords() {
        const width = _gameboard.get.width();
        const height = _gameboard.get.height();
        let x = Math.round(Math.random() * (width - 1));
        let y = Math.round(Math.random() * (height - 1));

        if (_prevMoves.length <= 0) return [x, y];
        if (_prevMoves.length >= height * width) return false;

        while (_coordWasUsed([x, y], _prevMoves)) { //not sure I like how this works, might make array of possible moves and 
            if (Math.random() > .5)                 // remove moves as they are used
                x = (x + 1) % width;
            else y = (y + 1) % height;
        }
        return [x, y];
    }
    function _getMediumAttackCoords() {
        alert('implement hard ai first'); return;
        // if (Math.random() < config.get.mediumDifficultyScale())
        //     return _getHardAttackCoords();
        // return _getEasyAttackCoords();
    }
    function _getHardAttackCoords() {
        alert('hard ai not implemented');
    }
}

function checkCoordUnique(coord1, coord2) {
    if ((coord1[0] === coord2[0]) &&
        (coord1[1] === coord2[1]))
        return false;
    return true;
}

export { aiFactory, checkCoordUnique };

function _coordWasUsed(coord, prevCoordArr) {
    let result = false;
    prevCoordArr.forEach(cArr => {
        if (!checkCoordUnique(cArr, coord))
            return result = true;
    })
    return result;
}
