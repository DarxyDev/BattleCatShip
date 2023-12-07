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

function unitFactory(name, length) {
    const _name = name;
    const _length = length;
    let _hits = 0;

    const unit = {
        get: {
            name: () => { return _name },
            length: () => { return _length }
        },
        hit: () => { _hits++; },
        isSunk: () => { return (_hits >= _length) }
    }
    return unit;
}

function get2DIndex(rowLength, x, y) {
    let a, b;
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

export {gameboardFactory, unitFactory, get2DIndex};