const MED_DIFF_SCALE = .5;

function aiFactory(settings) {
    //settings
    const gameboard = settings.gameboard;
    const unitArray = settings.unitArray;
    const difficulty = settings.difficulty;

    //init
    let tileArray;
    let enemyGameboard;

    const BOARD_WIDTH = gameboard.get.width();
    const BOARD_HEIGHT = gameboard.get.height();

    //objects
    function CoordObj(xCoord, yCoord) {
        this.coords = [xCoord, yCoord];
        this.x = xCoord;
        this.y = yCoord;
        this.index = xCoord + (yCoord * BOARD_WIDTH);
        const tile = tileArray[this.index];
        this.attack = () => tile.attack();
        this.getUnit = () => enemyGameboard.getUnitOnCoord(this.coords);
        this.isEqualTo = (coordObj) => {
            if (
                this.x !== coordObj.x
                || this.y !== coordObj.y
            ) return false;
            else return true;
        };
        this.isValid = () => {
            if (
                this.x < 0
                || this.y < 0
                || this.x >= BOARD_WIDTH
                || this.y >= BOARD_HEIGHT
                || previousMoves.isCoordUsed(this)
            ) return false;
            return true;
        };

        let explored = false;
        this.isExplored = () => explored;
        const exploredDirections = [];
        this.markDirectionExplored = (direction) => {
            if (!exploredDirections.includes(direction))
                exploredDirections.push(direction);
            if (
                exploredDirections.includes('up')
                && exploredDirections.includes('down')
                && exploredDirections.includes('left')
                && exploredDirections.includes('right')
            ) explored = true;
        }
        this.getCoordInDirection = (direction, markExplored = true, distance = 1) => {
            let x = this.x;
            let y = this.y;
            switch (direction) {
                case 'left': x -= distance;
                    break;
                case 'right': x += distance;
                    break;
                case 'up': y += distance;
                    break;
                case 'down': y -= distance;
                    break;
                default:
                    console.log(`${direction} is invalid.`);
                    return getRandomAttackCoord();
            }
            if (markExplored)
                this.markDirectionExplored(direction);
            return new CoordObj(x, y);
        }
    }
    const previousMoves = new function () {
        const moveArray = [];

        this.isEmpty = () => moveArray.length === 0;
        this.push = (coordObj) => {
            moveArray.push(coordObj);
            hitUnitsObj.push(coordObj);
        };
        this.pop = () => moveArray.pop();
        this.getLast = () => {
            if (!this.isEmpty())
                return moveArray[moveArray.length - 1];
        }
        this.isCoordUsed = (coordObj) => {
            for (let i = 0; i < moveArray.length; i++) {
                let move = moveArray[i];
                if (coordObj.isEqualTo(move)) {
                    return true
                }
            }
            return false;
        }


        this.noUnitsFound = () => hitUnitsObj.isEmpty();
        this.getLastHitUnitObj = () => hitUnitsObj.getLast();
        this.getHitUnitObjOf = (unit) => hitUnitsObj.getObjOf(unit);

        const hitUnitsObj = new function () {
            const hitUnitArray = [];
            //public
            this.push = (coordObj) => {
                const unit = coordObj.getUnit();
                if (!unit) return;
                const hitUnitObj = getHitUnitObj(unit);
                if (hitUnitObj) hitUnitObj.addCoordObj(coordObj);
                else hitUnitArray.push(new HitUnitObj(coordObj));
            }
            this.isEmpty = () => hitUnitArray.length <= 0;
            this.getLast = () => hitUnitArray[hitUnitArray.length - 1];
            this.getObjOf = (unit) => this.getHitUnitObjOf(unit);
            //
            function HitUnitObj(coordObj) {
                const hitCoords = [coordObj];
                let lastAddedCoord = coordObj;
                this.unit = coordObj.getUnit();
                removeSelfOnSunk();
                //public methods
                this.getPreviousCoord = () => lastAddedCoord;
                this.isInXAxis = () => {
                    if (hitCoords.length <= 1)
                        return undefined;
                    if (hitCoords[0].x === hitCoords[1].x)
                        return false;
                    else return true;
                }
                this.addCoordObj = (coordObj) => {
                    hitCoords.push(coordObj);
                    lastAddedCoord = coordObj;
                    sortHitCoords();
                    removeSelfOnSunk();
                }
                this.getFirstCoord = () => hitCoords[0];
                this.getLastCoord = () => hitCoords[hitCoords.length - 1];
                //HitUnitObj priv
                const getIndex = () => {
                    for (let i = 0; i < hitUnitArray.length; i++) {
                        let unit = hitUnitArray[i].unit;
                        if (this.unit.isEqualTo(unit)) return i;
                    }
                    console.log('Should not appear');
                }
                function removeSelfOnSunk() {
                    if (coordObj.getUnit().get.health() <= 1)
                        hitUnitArray.splice(getIndex(), 1);
                }
                const sortHitCoords = () => {
                    if (hitCoords.length <= 1) return;
                    hitCoords.sort((a, b) => {
                        if (this.isInXAxis()) {
                            return a.x - b.x;
                        } else {
                            return a.y - b.y;
                        }
                    })
                }
            }
            // hitObj priv

            function getHitUnitObj(unit) {
                for (let i = 0; i < hitUnitArray.length; i++) {
                    let hitUnitObj = hitUnitArray[i];
                    let unit2 = hitUnitObj.unit;
                    if (unit.isEqualTo(unit2)) return hitUnitObj;
                }
                return false;
            }
        }
    }

    const attackObj = new function () {
        this.sendAttack = () => {
            const coordObj = getAttackCoordObj();
            previousMoves.push(coordObj);
            coordObj.attack();
        }

        function getAttackCoordObj() {
            const hitUnitObj = previousMoves.getLastHitUnitObj();
            const firstCoord = hitUnitObj.getFirstCoord();
            const lastCoord = hitUnitObj.getLastCoord();

            switch (difficulty) {
                case 'easy':
                    return getRandomAttackCoord();
                    break;
                case 'medium':
                    if (previousMoves.noUnitsFound())
                        return getRandomAttackCoord();
                    return getUnitCoordGuess;
                    break;
                case 'hard': //could add to check space around randomCoord to see if valid for unit lengths
                    if (previousMoves.noUnitsFound()) {
                        let nextGuess = getRandomAttackCoord();
                        if (!nextGuess.getUnit())
                            nextGuess = getRandomAttackCoord();
                        return getRandomAttackCoord();
                    }
                    let nextGuess = getUnitCoordGuess();
                    if (!nextGuess.getUnit())
                        nextGuess = getUnitCoordGuess();
                    return nextGuess;
                    break;
                default:
                    console.log(`Invalid difficulty: ${difficulty}`);
                    return getRandomAttackCoord();
            }
            function getUnitCoordGuess(startCoordObj = firstCoord) {
                let nextCoordObj = new CoordObj(-1, -1);
                let inXAxis = hitUnitObj.isInXAxis();
                if (inXAxis === undefined) {
                    let direction = directionObj.getRandom();
                    for (let i = 0; i < 4; i++) {
                        direction = directionObj.getNext(direction, i);
                        nextCoordObj = startCoordObj.getCoordInDirection(direction);
                        if (nextCoordObj.isValid()) return nextCoordObj;
                    }
                }
                let direction = directionObj.getRandom(inXAxis);
                nextCoordObj = startCoordObj.getCoordInDirection(direction);
                if (nextCoordObj.isValid()) return nextCoordObj;
                direction = directionObj.getReverseOf(direction);
                nextCoordObj = startCoordObj.getCoordInDirection(direction);
                if (nextCoordObj.isValid()) return nextCoordObj;
                return getUnitCoordGuess(lastCoord);
            }
        }

        function getRandomAttackCoord() {
            let x = Math.round(Math.random() * (BOARD_WIDTH - 1));
            let y = Math.round(Math.random() * (BOARD_HEIGHT - 1));
            let coordObj = new CoordObj(x, y);
            while (!coordObj.isValid()) {
                x++;
                if (x >= BOARD_WIDTH) {
                    x = 0;
                    y++;
                }
                if (y >= BOARD_HEIGHT)
                    y = 0;
                coordObj = new CoordObj(x, y);
            }
            return coordObj;
        }
    }
    const directionObj = new function () {
        const directions = ['left', 'up', 'right', 'down'];
        this.getRandom = (inXAxis = undefined) => {
            let index;
            const rand = Math.random();
            switch (inXAxis) {
                case undefined:
                    index = Math.round(rand * 3);
                    break;
                case true: //0 or 2
                    index = Math.round(rand) * 2;
                    break;
                case false: // 1 or 3
                    index = (Math.round(rand) * 2) + 1
                    break;
            }
            return directions[index];
        }
        this.getReverseOf = (direction) => {
            const index = (directions.indexOf(direction) + 2) % 4;
            return directions[index];
        }
        this.getNext = (direction, distance = 1) => {
            if (distance === 0)
                return direction;
            let index = directions.indexOf(direction);
            if (index < 0)
                return false;
            index = (index + distance) % 4;
            return directions[index];
        }
        this.isValid = (direction) => {
            return directions.includes(direction);
        }
    }


    //return object
    const aiObj = {
        sendAttack: () => {
            if (tileArray && enemyGameboard)
                attackObj.sendAttack();
            else console.log('Please set tileArray and enemyGameboard.');
        },
        placeShips: () => {
            const boardHeight = gameboard.get.height();
            const boardWidth = gameboard.get.width();
            unitArray.forEach(unit => {
                let x, y, rotated;
                do {
                    x = Math.round(Math.random() * (boardWidth - 1));
                    y = Math.round(Math.random() * (boardHeight - 1));
                    rotated = Math.random() < .5;
                } while (!gameboard.placeUnit(unit, [x, y], rotated))
            })

        },
        setTileArray: (tileArr) => tileArray = tileArr,
        setEnemyGameboard: (enemyGB) => enemyGameboard = enemyGB,
    }

    return aiObj;
}

export { aiFactory };



