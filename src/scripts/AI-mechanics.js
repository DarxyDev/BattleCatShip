import gameState from "./game-state";

const MED_DIFF_SCALE = .5;

function aiFactory(settings) {
    let _gameboard = settings.gameboard;
    let _unitArray = settings.unitArray;
    let _difficulty = settings.difficulty;


    let _shipHunting = false;

    const _prevMoveObjs = [];
    function MoveObj(coord, result) {
        const wasHit =
            result === 'hit'
                || result === 'sunk'
                ? true : false;

        this.getCoord = () => coord;
        this.wasHit = () => wasHit;
        this.attackResult = () => result;

        const directions = ['up', 'down', 'left', 'right'];
        this.getNearCoord = (lastIndex) => {
            if (directions.length <= 0){
                if(_prevMoveObjs[lastIndex-1]) return _prevMoveObjs[lastIndex - 1].getNearCoord();
                else{
                    'Something went wrong.'
                    return _getEasyAttackCoords();
                }
            }
            let x = coord[0];
            let y = coord[1];
            let index = Math.round(Math.random() * (directions.length - 1));
            const direction = directions[index];
            switch (direction) {
                case 'up':
                    index = directions.indexOf('up');
                    directions.splice(index, 1);
                    y++;
                    break;
                case 'down':
                    index = directions.indexOf('down');
                    directions.splice(index, 1);
                    y--;
                    break;
                case 'left':
                    index = directions.indexOf('left');
                    directions.splice(index, 1);
                    x--;
                    break;
                case 'right':
                    index = directions.indexOf('right');
                    directions.splice(index, 1);
                    x++;
                    break;
                default:
                    console.log("shouldn't happen");
            }
            if(!checkValidAttackCoord([x,y])) return this.getNearCoord(lastIndex);
            return [x,y];
        };
    }

    function getAttackCoords() {
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
        return coord;
    }

    const aiObj = {
        sendAttack: (getTileFromIndex) => {
            const coords = getAttackCoords();
            const width = _gameboard.get.width();
            const index = (coords[1] * width) + coords[0];
            const tile = getTileFromIndex(index);
            const attackResult = tile.attack();
            _prevMoveObjs.push(new MoveObj(coords, attackResult));
            if (attackResult === 'hit') _shipHunting = true;
            if (attackResult === 'sunk') _shipHunting = false;

        },
        placeShips: () => {
            const boardHeight = _gameboard.get.height();
            const boardWidth = _gameboard.get.width();
            _unitArray.forEach(unit => {
                let x, y, rotated;
                do {
                    x = Math.round(Math.random() * (boardWidth - 1));
                    y = Math.round(Math.random() * (boardHeight - 1));
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

        if (_prevMoveObjs.length <= 0) return [x, y];
        if (_prevMoveObjs.length >= height * width) return false;

        while (_coordWasUsed([x, y])) { //not sure I like how this works, might make array of possible moves and 
            if (Math.random() > .5)                 // remove moves as they are used
                x = (x + 1) % width;
            else y = (y + 1) % height;
        }
        return [x, y];
    }
    function _getMediumAttackCoords() {
        if (Math.random() < MED_DIFF_SCALE)
            return _getHardAttackCoords();
        return _getEasyAttackCoords();
    }
    function _getHardAttackCoords() {
        if (!_shipHunting) return _getEasyAttackCoords();
        for(let i = _prevMoveObjs.length - 1; i >= 0; i--){
            if(_prevMoveObjs[i].wasHit()) return _prevMoveObjs[i].getNearCoord(i);
        }
    }
    function _coordWasUsed(coord) {
        let result = false;
        _prevMoveObjs.forEach(move => {
            if (!checkCoordUnique(move.getCoord(), coord))
                return result = true;
        })
        return result;
    }
    function checkValidAttackCoord(coord) {
        const width = _gameboard.get.width();
        const height = _gameboard.get.height();
        if (
            coord[0] < 0
            || coord[1] < 0
            || coord[0] >= width
            || coord[1] >= height
        ) return false;
        return !_coordWasUsed(coord);
    }
}
function checkCoordUnique(coord1, coord2) {
    if ((coord1[0] === coord2[0]) &&
        (coord1[1] === coord2[1]))
        return false;
    return true;
}


export { aiFactory, checkCoordUnique };



