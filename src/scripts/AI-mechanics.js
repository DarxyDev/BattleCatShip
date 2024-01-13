import gameState from "./game-state";

const MED_DIFF_SCALE = .5;

function aiFactory(settings) {
    let _gameboard = settings.gameboard;
    let _unitArray = settings.unitArray;
    let _difficulty = settings.difficulty;


    let _shipHunting = false;
    const directions = ['left', 'down', 'right', 'up'];
    let lastMoveDirection = false;
    let nextMoveDirection = false;

    const _prevMoveObjs = [];
    const _hitMoveObjs = [];

    function MoveObj(coord, result) {
        const wasHit = result === 'hit' || result === 'sunk' ? true : false;

        this.getCoord = () => coord;
        this.wasHit = () => wasHit;
        this.attackResult = () => result;
        let clearedNear = false;
        this.clearedNear = () => clearedNear;

        const directions = ['up', 'down', 'left', 'right'];
        this.getNearCoord = (lastIndex) => {
            if (directions.length <= 0) {
                clearedNear = true;
                if (_prevMoveObjs[lastIndex - 1]) return _prevMoveObjs[lastIndex - 1].getNearCoord();
                else {
                    'Something went wrong.'
                    return _getRandomAttackCoords();
                }
            }
            let newCoord;
            let index = Math.round(Math.random() * (directions.length - 1));
            const direction = directions[index];
            switch (direction) {
                case 'up': newCoord = this.getUpCoord();
                    break;
                case 'down': newCoord = this.getDownCoord();
                    break;
                case 'left': newCoord = this.getLeftCoord();
                    break;
                case 'right': newCoord = this.getRightCoord();
                    break;
                default:
                    console.log("shouldn't happen");
                    newCoord = false;
            }
            index = directions.indexOf(direction);
            if (index >= 0)
                directions.splice(index, 1);
            if (newCoord === false) return this.getNearCoord(lastIndex);
            return newCoord;
        };
        this.getLeftCoord = (distance = 1) => getModCoord(-distance, 0);
        this.getRightCoord = (distance = 1) => getModCoord(distance, 0);
        this.getUpCoord = (distance = 1) => getModCoord(0, distance);
        this.getDownCoord = (distance = 1) => getModCoord(0, -distance);
        function getModCoord(modX, modY) {
            let x = coord[0] + modX;
            let y = coord[1] + modY;
            if (checkValidAttackCoord([x, y])) return [x, y];
            return false;
        }
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
            console.log(coords);
            const width = _gameboard.get.width();
            const index = (coords[1] * width) + coords[0];
            const tile = getTileFromIndex(index);
            const attackResult = tile.attack();
            _prevMoveObjs.push(new MoveObj(coords, attackResult));
            if (attackResult && attackResult !== 'miss') _hitMoveObjs.push(new MoveObj(coords, attackResult));
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

    function _getRandomAttackCoords() {
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
    function _getEasyAttackCoords() {
        if (!_shipHunting) return _getRandomAttackCoords();
        for (let i = _prevMoveObjs.length - 1; i >= 0; i--) {
            if (_prevMoveObjs[i].wasHit()) return _prevMoveObjs[i].getNearCoord(i);
        }
    }
    function _getMediumAttackCoords() {
        if (_hitMoveObjs.length <= 0) return _getRandomAttackCoords();
        const lastMoveObj = _prevMoveObjs[_prevMoveObjs.length - 1];
        if (!lastMoveObj.wasHit()) {
            if (lastMoveDirection) lastMoveDirection = false;
            else nextMoveDirection = false;
        }
        if (lastMoveDirection) {
            let newCoord;
            switch (lastMoveDirection) {
                case 'left': newCoord = lastMoveObj.getLeftCoord();
                    break;
                case 'right': newCoord = lastMoveObj.getRightCoord();
                    break;
                case 'up': newCoord = lastMoveObj.getUpCoord();
                    break;
                case 'down': newCoord = lastMoveObj.getDownCoord();
                    break;
                default:
            }
            if (newCoord) return newCoord;
            else lastMoveDirection = false;
        }
        if (nextMoveDirection) {
            let newCoord;
            let i = 0;
            do {
                i++;
                switch (nextMoveDirection) {
                    case 'left': newCoord = lastMoveObj.getLeftCoord(i);
                        break;
                    case 'right': newCoord = lastMoveObj.getRightCoord(i);
                        break;
                    case 'up': newCoord = lastMoveObj.getUpCoord(i);
                        break;
                    case 'down': newCoord = lastMoveObj.getDownCoord(i);
                        break;
                    default:
                }
            } while (newCoord && _coordWasUsed(newCoord));
            if(newCoord) return newCoord;
            else nextMoveDirection = false;
        }
        let moveObj;
        do {
            moveObj = _hitMoveObjs[_hitMoveObjs.length - 1];
            if (moveObj.clearedNear()) _hitMoveObjs.pop();
        } while (moveObj.clearedNear() && _hitMoveObjs.length)
        if (!_hitMoveObjs.length) return _getRandomAttackCoords();
        const moves = [
            moveObj.getLeftCoord,
            moveObj.getDownCoord,
            moveObj.getRightCoord,
            moveObj.getUpCoord
        ];
        const index = Math.round(Math.random() * 3);
        for (let i = 0; i < 4; i++) {
            let tempIndex = (index + i) % 4;
            let tempCoord = moves[tempIndex]();
            if (checkValidAttackCoord(tempCoord)) {
                lastMoveDirection = directions[tempIndex];
                nextMoveDirection = directions[(tempIndex + 2) % 4]
                console.log({ tempCoord, a: 'aa' })
                return tempCoord;
            }
        }
        return _getRandomAttackCoords();
    }
    function _getHardAttackCoords(){
        
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
        if (!coord) return false;
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



