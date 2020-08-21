var config = {

    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {default: "arcade"},
    pixelArt: true
    
}

var game = new Phaser.Game(config);

game.state.add('Loading', Loading);
game.state.add('Game', Game);
game.state.start('Loading');