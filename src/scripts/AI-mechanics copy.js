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
    }
    const previousMoves = new function () {
        const moveArray = [];
        const hitUnitObj = new function () {
            const hitUnitArray = [];
            this.push = (coordObj) => {
                const unit = coordObj.getUnit();
                if (!unit) return;
                const hitUnitObj = getHitUnitObj(unit);
                if (hitUnitObj) hitUnitObj.addCoordObj(coordObj);
                else hitUnitArray.push(new HitUnitObj(coordObj));
            }
            function HitUnitObj(coordObj) {
                const hitCoords = [coordObj];
                this.unit = coordObj.getUnit();
                removeSelfOnSunk();
                this.addCoordObj = (coordObj) => {
                    hitCoords.push(coordObj);
                    sortHitCoords();
                    removeSelfOnSunk();
                }
                this.getFirst = () => hitCoords[0];
                this.getLast = () => hitCoords[hitCoords.length - 1];
                this.isInXAxis = () => {
                    if (hitCoords.length <= 1)
                        return undefined;
                    if (hitCoords[0].x === hitCoords[1].x)
                        return false;
                    else return true;
                }
                function getIndex() {
                    for (let i = 0; i < hitUnitArray.length; i++) {
                        let unit = hitUnitArray[i].unit;
                        if (this.unit.isEqualTo(unit)) return i;
                    }
                    console.log('Should not appear');
                }
                function removeSelfOnSunk() {
                    if (!this.unit.isSunk()) return;
                    hitUnitArray.splice(getIndex(), 1);
                }
            }
            function sortHitCoords() {
                if (hitCoords.length <= 1) return;
                hitCoords.sort((a, b) => {
                    if (this.isInXAxis()) {
                        return a.x - b.x;
                    } else {
                        return a.y - b.y;
                    }
                })
            }
            function getHitUnitObj(unit) {
                for (let i = 0; i < hitUnitArray.length; i++) {
                    let hitUnitObj = hitUnitArray[i];
                    let unit2 = hitUnitObj.unit;
                    if (unit.isEqualTo(unit2)) return hitUnitObj;
                }
                return false;
            }
        }

        this.isEmpty = () => moveArray.length === 0;
        this.push = (coordObj) => {
            moveArray.push(coordObj);
            hitUnitObj.push(coordObj);
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
    }

    const attackObj = new function () {
        this.sendAttack = () => {
            const coordObj = getAttackCoordObj();
            previousMoves.push(coordObj);
            coordObj.attack();
        }

        const directions = ['left', 'up', 'right', 'down'];
        function getAttackCoordObj() {
            if (previousMoves.isEmpty()) return getRandomAttackCoord();

            const lastCoordObj = previousMoves.getLast();
            let direction = lastCoordObj.moveDirection;
            if (direction) {
                let coordObj = getDirectionCoord(lastCoordObj, direction)
                //might change to if(coordObj.isValid)
                if (coordObj) {
                    if (coordObj.getUnit())
                        console.log(coordObj.moveDirection = direction);
                    return coordObj;
                }
                let otherDirection = directions[(directions.indexOf(direction) + 2) % 4];
                console.log(otherDirection);
                //get first hit on this row
                // coordObj = directionCoord(firsHit,otherDir)
                //if(coordObj)....
            }
            console.log('finish here');
        }
        function getRandomAttackCoord() {
            let x = Math.round(Math.random() * (BOARD_WIDTH - 1));
            let y = Math.round(Math.random() * (BOARD_HEIGHT - 1));
            let coordObj = new CoordObj(x, y);
            while (!coordObj.isValid()) {
                x++;
                if (x >= BOARD_WIDTH - 1) {
                    x = 0;
                    y++;
                }
                if (y >= BOARD_HEIGHT - 1)
                    y = 0;
                coordObj = new CoordObj(x, y);
            }
            return coordObj;
        }

        function getDirectionCoord(coordObj, direction, distance = 1) {
            let x = coordObj.x;
            let y = coordObj.y;
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
            coordObj = new CoordObj(x, y);
            if (coordObj.isValid())
                return coordObj;
            return false;
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



