function gameboardFactory(width = 10, height = 10) {
    let _unitsRemaining = 0;
    const boardSize = width * height;
    const _boardArray = [];
    for (let i = 0; i < boardSize; i++) _boardArray.push(false);
    const _hitArray = [];
    for (let i = 0; i < boardSize; i++) _hitArray.push(false);

    const gameboard = {
        get: {
            unitsRemaining: () => { return _unitsRemaining },
            boardArray: () => { return _boardArray },
            hitArray: () => { return _hitArray },
            width: () => { return width },
            height: () => { return height },
        },
        placeUnit: (unit, coord, rotated) => {
            if(coord.x && coord.y) coord = [coord.x, coord.y]; //allows coord obj instead of array
            for (let i = 0; i < unit.get.length(); i++) {
                let j = rotated ?
                    get2DIndex(width, coord[0], coord[1] + i) :
                    get2DIndex(width, coord[0] + i, coord[1]);
                if (j instanceof Error ||
                    _boardArray[j])
                    return false;
            }
            for (let i = 0; i < unit.get.length(); i++) {
                let j = rotated ?
                    get2DIndex(width, coord[0], coord[1] + i) :
                    get2DIndex(width, coord[0] + i, coord[1]);
                _boardArray[j] = unit;
            }

            _unitsRemaining++;
            return true;
        },
        removeUnit: (unit) => {
            _boardArray.forEach(value => { if (value === unit) value = false; })
        },
        getUnitOnCoord: (coord) => {
            const index = get2DIndex(width, coord);
            if (_boardArray[index]) return _boardArray[index];
            return false;
        },
        receiveAttack: (coord) => {
            const i = get2DIndex(width, coord);

            if (_hitArray[i]) return false;
            _hitArray[i] = true;

            const unit = _boardArray[i];
            if (!unit) return 'miss';
            unit.hit();
            if (unit.isSunk()) {
                _unitsRemaining--;
                return 'sunk';
            }
            return 'hit';
        },
        isGameOver: () => { return _unitsRemaining <= 0 },
    }
    return gameboard;
}

let _unitID = 1000;
function unitFactory(length) {
    const _id = _unitID++;
    const _length = length;
    let _hits = 0;

    const unit = {
        get: {
            id: () => { return _id },
            length: () => { return _length }
        },
        hit: () => { _hits++; },
        isSunk: () => { return (_hits >= _length) }
    }
    return unit;
}

function get2DIndex(rowLength, x, y) {
    let a, b;
    if(x.x && x.y){ //Allows using coordObj
        x = [x.x,x.y];
    }
    if (x[0] === undefined) {
        a = x;
        b = y;
    } else {
        a = x[0];
        b = x[1];
    }
    if (a >= rowLength)
        return new Error('Index out of bounds of rowLength.');
    if ((a < 0) ||
        (b < 0))
        return new Error('Index can not be negative.');
    return a * rowLength + b;
}

export { gameboardFactory, unitFactory, get2DIndex };