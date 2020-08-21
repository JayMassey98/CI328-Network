var Loading = {};

Loading.preload = function() {

    game.load.image('loading', 'assets/loading.png');
    
}

Loading.create = function() {
    
    game.stage.background = game.add.sprite(game.config.width / 2, game.config.height / 2, 'loading');
    game.state.start('Game');

}