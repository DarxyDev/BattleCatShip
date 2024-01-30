import { initScene } from "../scene-manager";
import sceneManager from "../scene-manager";
import gameState from "../game-state";

function initGameOver() {
    let scene = initScene('TEMPLATE_game-over');
    const mainTextBox = scene.querySelector("[gameOverID='main-textBox']");
    const playAgainBtn = scene.querySelector("[gameOverID='play-again-btn']");

    playAgainBtn.addEventListener('click', () => {
        sceneManager.resetScenes();
        gameState.newGame();
        sceneManager.loadScene(sceneManager.getScenes().p1.piecePlacement);
    })

    scene.sceneOnLoad = () => {
        const winnerObj = gameState.get.game.winner();
        const winner = winnerObj.get.player();
        const loser = winnerObj.get.enemyPlayer().get.player();
        mainTextBox.innerHTML = ``;

        setStats(winner);
        setStats(loser);

        function setStats(player) {
            const name = player.get.name();
            const games = player.get.games();
            const wins = player.get.wins();
            const streak = player.get.streak();
            let message = `${name} `;
            if (player.get.streak() > 0)
                message += `Won! <br><br>`
            else
                message += `Lost. <br><br>`;
            addStat('Games played', games);
            addStat('Wins', wins);
            if (streak > 0)
                addStat(`Win streak`, streak);
            message += `<br><br>---------------<br>`
            mainTextBox.innerHTML += message;
            function addStat(stat, value) {
                message += `${stat}:   ${value} <br>`;
            }
        }
    };
    return scene;
}

export default initGameOver;