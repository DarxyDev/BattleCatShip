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
    function CoordObjFactory(xCoord, yCoord) {
        const index = xCoord + (yCoord * BOARD_WIDTH);
        const tile = tileArray[index];
        let explored = false;
        const exploredDirections = [];

        const obj = {
            coords: [xCoord, yCoord],
            x: xCoord,
            y: yCoord,
            index,
            attack: () => tile.attack(),
            getUnit: () => enemyGameboard.getUnitOnCoord(obj.coords),
            isEqualTo: (coordObj) => {
                if (
                    obj.x !== coordObj.x
                    || obj.y !== coordObj.y
                ) return false;
                else return true;
            },
            isValid: () => {
                if (
                    obj.x < 0
                    || obj.y < 0
                    || obj.x >= BOARD_WIDTH
                    || obj.y >= BOARD_HEIGHT
                    || previousMoves.isCoordUsed(obj)
                ) return false;
                return true;
            },
            isExplored: () => explored,
            markDirectionExplored: (direction) => {
                if (!exploredDirections.includes(direction))
                    exploredDirections.push(direction);
                if (
                    exploredDirections.includes('up')
                    && exploredDirections.includes('down')
                    && exploredDirections.includes('left')
                    && exploredDirections.includes('right')
                ) explored = true;
            },
            getCoordInDirection: (direction, markExplored = true, distance = 1) => {
                let x = obj.x;
                let y = obj.y;
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
                    obj.markDirectionExplored(direction);
                return CoordObjFactory(x, y);
            }
        }
        return obj;
    }
    const previousMoves = (function () {
        const moveArray = [];
        const obj = {//&&&//
            isEmpty: () => moveArray.length === 0,
            push: (coordObj) => {
                moveArray.push(coordObj);
                hitUnitsObj.push(coordObj);
            },
            pop: () => moveArray.pop(),
            getLast: () => {
                if (!obj.isEmpty())
                    return moveArray[moveArray.length - 1];
            },
            isCoordUsed: (coordObj) => {
                for (let i = 0; i < moveArray.length; i++) {
                    let move = moveArray[i];
                    if (coordObj.isEqualTo(move)) {
                        return true
                    }
                }
                return false;
            },

            noUnitsFound: () => hitUnitsObj.isEmpty(),
            getLastHitUnitObj: () => hitUnitsObj.getLast(),
            getHitUnitObjOf: (unit) => hitUnitsObj.getObjOf(unit),
        }
        //&&&//
        const hitUnitsObj = (function () {
            const hitUnitArray = [];

            // hitObj priv

            function getHitUnitObj(unit) {
                for (let i = 0; i < hitUnitArray.length; i++) {
                    let hitUnitObj = hitUnitArray[i];
                    let unit2 = hitUnitObj.unit;
                    if (unit.isEqualTo(unit2)) return hitUnitObj;
                }
                return false;
            }
            //public
            const obj = {
                push: (coordObj) => {
                    const unit = coordObj.getUnit();
                    if (!unit) return;
                    const hitUnitObj = getHitUnitObj(unit);
                    if (hitUnitObj) hitUnitObj.addCoordObj(coordObj);
                    else hitUnitArray.push(HitUnitObjFactory(coordObj));
                },
                isEmpty: () => hitUnitArray.length <= 0,
                getLast: () => hitUnitArray[hitUnitArray.length - 1],
                getObjOf: (unit) => obj.getHitUnitObjOf(unit),
                //
            }
            //&&&//
            function HitUnitObjFactory(coordObj) {
                const hitCoords = [coordObj];
                let lastAddedCoord = coordObj;
                removeSelfOnSunk();

                //HitUnitObj priv
                const getIndex = () => {
                    for (let i = 0; i < hitUnitArray.length; i++) {
                        let unit = hitUnitArray[i].unit;
                        if (obj.unit.isEqualTo(unit)) return i;
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
                        if (obj.isInXAxis()) {
                            return a.x - b.x;
                        } else {
                            return a.y - b.y;
                        }
                    })
                }
                const obj = {
                    unit: coordObj.getUnit(),
                    getPreviousCoord: () => lastAddedCoord,
                    isInXAxis: () => {
                        if (hitCoords.length <= 1)
                            return undefined;
                        if (hitCoords[0].x === hitCoords[1].x)
                            return false;
                        else return true;
                    },
                    addCoordObj: (coordObj) => {
                        hitCoords.push(coordObj);
                        lastAddedCoord = coordObj;
                        sortHitCoords();
                        removeSelfOnSunk();
                    },
                    getFirstCoord: () => hitCoords[0],
                    getLastCoord: () => hitCoords[hitCoords.length - 1],
                }
                return obj;
            }
            return obj;
        })()
        return obj;

    })()

    const attackObj = attackObjFactory();
    function attackObjFactory() {
        //&&&//
        function getAttackCoordObj() {
            const hitUnitObj = previousMoves.getLastHitUnitObj();

            switch (difficulty) {
                case 'easy':
                    return getRandomAttackCoord();
                    break;
                case 'medium':
                    if (previousMoves.noUnitsFound())
                        return getRandomAttackCoord();
                    return getUnitCoordGuess();
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
            function getUnitCoordGuess(startCoordObj = hitUnitObj.getFirstCoord()) {
                let nextCoordObj = CoordObjFactory(-1, -1);
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
                return getUnitCoordGuess(hitUnitObj.getLastCoord());
            }
        }

        function getRandomAttackCoord() {
            let x = Math.round(Math.random() * (BOARD_WIDTH - 1));
            let y = Math.round(Math.random() * (BOARD_HEIGHT - 1));
            let coordObj = CoordObjFactory(x, y);
            while (!coordObj.isValid()) {
                x++;
                if (x >= BOARD_WIDTH) {
                    x = 0;
                    y++;
                }
                if (y >= BOARD_HEIGHT)
                    y = 0;
                coordObj = CoordObjFactory(x, y);
            }
            return coordObj;
        }
        const obj = {
            sendAttack: () => {
                const coordObj = getAttackCoordObj();
                previousMoves.push(coordObj);
                coordObj.attack();
            },
        }
        return obj;
    };
    //&&&//
    const directionObj = directionObjFactory();
    function directionObjFactory() {
        const directions = ['left', 'up', 'right', 'down'];
        const obj = {
            getRandom: (inXAxis = undefined) => {
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
            },
            getReverseOf: (direction) => {
                const index = (directions.indexOf(direction) + 2) % 4;
                return directions[index];
            },
            getNext: (direction, distance = 1) => {
                if (distance === 0)
                    return direction;
                let index = directions.indexOf(direction);
                if (index < 0)
                    return false;
                index = (index + distance) % 4;
                return directions[index];
            },
            isValid: (direction) => {
                return directions.includes(direction);
            },
        }
        return obj;
    };


    //return object
    const aiObj = {
        sendAttack: () => {
            if (tileArray && enemyGameboard)
                attackObj.sendAttack();
            else console.log('Please set tileArray and enemyGameboard.');
        },
        placeShips: () => {
            console.log(gameboard.get.id())
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