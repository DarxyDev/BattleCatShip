import { aiFactory } from "./AI-mechanics";

function playerFactory(name, type = 'human') {
    let _games = 0;
    let _wins = 0;
    let _streak = 0;
    const player = {
        get: {
            name: () => { return name; },
            type: () => { return type; },
            games: () => {return _games},
            wins: ()=>{return _wins},
            streak: ()=>{return _streak},
        },
        addGamePlayed:(wasWon)=>{
            _games++;
            if(wasWon){
                _wins++;
                _streak++;
            }
            else _streak = 0;
        }
    }
    if(type === 'computer'){
        const ai = aiFactory();
        player.get.moveCoords = ()=>{ai.get.attackCoords()};
    }

    return player;
}

export default playerFactory;