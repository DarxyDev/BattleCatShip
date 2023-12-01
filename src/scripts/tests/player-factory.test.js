import playerFactory from "../player-factory";

test('playerFactory working',()=>{
    let player = playerFactory('player1');
    expect(player.get.games()).toBe(0);
    expect(player.get.name()).toBe('player1');
    expect(player.get.streak()).toBe(0);
    expect(player.get.wins()).toBe(0);
    expect(player.get.type()).toBe('human');
    player.addGamePlayed(true);
    player.addGamePlayed(true);
    expect(player.get.games()).toBe(2);
    expect(player.get.name()).toBe('player1');
    expect(player.get.streak()).toBe(2);
    expect(player.get.wins()).toBe(2);
    expect(player.get.type()).toBe('human');
    player.addGamePlayed(false);
    expect(player.get.games()).toBe(3);
    expect(player.get.name()).toBe('player1');
    expect(player.get.streak()).toBe(0);
    expect(player.get.wins()).toBe(2);
    expect(player.get.type()).toBe('human');
})