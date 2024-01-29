let id = 0;
function GameboardFactory(width = 10, height = 10) {
    id++;
    const _id = id;
    let _unitsRemaining = 0;
    const boardSize = width * height;
    const _boardArray = [];
    for (let i = 0; i < boardSize; i++) _boardArray.push(false);
    const _hitArray = [];
    for (let i = 0; i < boardSize; i++) _hitArray.push(false);

    const get = {
        unitsRemaining: () => { return _unitsRemaining },
        boardArray: () => { return _boardArray },
        hitArray: () => { return _hitArray },
        width: () => { return width },
        height: () => { return height },
        id: () => _id,
    }
    const placeUnit = (unit, coord, rotated) => {
        if (coord.x !== undefined) coord = [coord.x, coord.y]; //allows coord obj instead of array
        for (let i = 0; i < unit.get.length(); i++) {
            let j = rotated ?
                get2DIndex(coord[0], coord[1] + i) :
                get2DIndex(coord[0] + i, coord[1]);
            if (j === false) return false;
            if (_boardArray[j]) return false;
        }
        for (let i = 0; i < unit.get.length(); i++) {
            let j = rotated ?
                get2DIndex(coord[0], coord[1] + i) :
                get2DIndex(coord[0] + i, coord[1]);
            _boardArray[j] = unit;
        }
        _unitsRemaining++;
        return true;
    }
    const removeUnit = (unit) => {
        _boardArray.forEach(value => { if (value === unit) value = false; })
    }
    const getUnitOnCoord = (coord) => {
        const index = get2DIndex(coord);
        if (_boardArray[index]) return _boardArray[index];
        return false;
    }
    const receiveAttack = (coord) => {
        const i = get2DIndex(coord);
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
    }
    const isGameOver = () => { return _unitsRemaining <= 0 }

    function get2DIndex(x, y) {
        let a, b;
        if (x.x !== undefined) { //Allows using coordObj
            x = [x.x, x.y];
        }
        if (x[0] === undefined) {
            a = x;
            b = y;
        } else {
            a = x[0];
            b = x[1];
        }
        if (a >= width)
            return false;
        if (b >= height)
            return false
        if ((a < 0) ||
            (b < 0))
            return false;
        return a * width + b;
    }
    const obj = {
        get,
        placeUnit,
        removeUnit,
        getUnitOnCoord,
        receiveAttack,
        isGameOver,
    };
    return obj;
}

let _unitID = 1000;
function unitFactory(length) {
    const _id = _unitID++;
    const _length = length;
    let _hits = 0;

    const unit = {
        get: {
            id: () => _id,
            length: () => _length,
            health: () => _length - _hits,
        },
        hit: () => { _hits++; },
        isSunk: () => { return (_hits >= _length) },
        isEqualTo: (unit) => _id === unit.get.id(),
    }
    return unit;
}



export { GameboardFactory, unitFactory };