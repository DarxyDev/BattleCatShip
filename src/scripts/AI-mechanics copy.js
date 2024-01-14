import gameState from "./game-state";

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
        this.getTile = () => tileArray[this.index];
        this.sendAttack = () => {
            const coordObj = this.getTile().attack();
            previousMoves.push(this);
        }
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
        this.isEmpty = () => moveArray.length === 0;
        this.push = (coordObj) => moveArray.push(coordObj);
        this.pop = () => moveArray.pop();
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
            coordObj.sendAttack();
        }

        function getAttackCoordObj() {
            if (previousMoves.isEmpty) return getRandomAttackCoord();
            return getRandomAttackCoord();
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
    }



    //return object
    const aiObj = {
        sendAttack: attackObj.sendAttack,
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



