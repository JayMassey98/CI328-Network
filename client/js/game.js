var Game = {};

Game.init = function() {
    
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    
    // Load in the possible player character sprites
    
    game.load.image('spriteRed', 'assets/colours/red.png');
    game.load.image('spriteOrange', 'assets/colours/orange.png');
    game.load.image('spriteYellow', 'assets/colours/yellow.png');
    game.load.image('spriteLime', 'assets/colours/lime.png');
    game.load.image('spriteGreen', 'assets/colours/green.png');
    game.load.image('spriteMint', 'assets/colours/mint.png');
    game.load.image('spriteCyan', 'assets/colours/cyan.png');
    game.load.image('spriteTeal', 'assets/colours/teal.png');
    game.load.image('spriteBlue', 'assets/colours/blue.png');
    game.load.image('spritePurple', 'assets/colours/purple.png');
    game.load.image('spriteMargenta', 'assets/colours/margenta.png');
    game.load.image('spritePink', 'assets/colours/pink.png');
    game.load.image('spriteBase', 'assets/colours/base.png');
    
    // Load in the remaining assets
    
    game.load.image('dot', 'assets/colours/dot.png');
    game.load.image('background', 'assets/background.png');
    
};

Game.create = function() {
    
    Game.screenWidth = config.width;
    Game.screenHeight = config.height;
    
    Game.playerMap = {};
    Game.dotMap = {};
    
    game.stage.background = game.add.sprite(0, 0, 'background');
    game.add.text(290, Game.screenHeight - 50, "W = UP   A = LEFT   S = DOWN   D = RIGHT   R = RESET");
    
    // Load a series of edible dots
    
    Client.sendExistingDots();
    
    // Initialise player functions
    
    var moveUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
    var moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
    var moveDown = game.input.keyboard.addKey(Phaser.Keyboard.S);
    var moveRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
    var resetSize = game.input.keyboard.addKey(Phaser.Keyboard.R);
    
    // Callback functions
    
    moveUp.onHoldCallback = function() {
        Client.sendPressUp();
    };
    
    moveLeft.onHoldCallback = function() {
        Client.sendPressLeft();
    };
    
    moveDown.onHoldCallback = function() {
        Client.sendPressDown();
    };
    
    moveRight.onHoldCallback = function() {
        Client.sendPressRight();
    };
    
    resetSize.onHoldCallback  = function() {
        Client.sendResetSize();
    };
    
    Client.askNewPlayer();

};

Game.addNewPlayer = function(id, x, y) {
        
    // Selecting a player character sprite
    
    switch (id % 12) {
            
        case 0: sprite = 'spriteRed'; break;
        case 1: sprite = 'spriteCyan'; break;
        case 2: sprite = 'spriteOrange'; break;
        case 3: sprite = 'spriteTeal'; break;
        case 4: sprite = 'spriteYellow'; break;
        case 5: sprite = 'spriteBlue'; break;
        case 6: sprite = 'spriteLime'; break;
        case 7: sprite = 'spritePurple'; break;
        case 8: sprite = 'spriteGreen'; break;
        case 9: sprite = 'spriteMargenta'; break;
        case 10: sprite = 'spriteMint'; break;
        case 11: sprite = 'spritePink'; break;
        default: sprite = 'spriteBase';

    }
    
    Game.playerMap[id] = game.add.sprite(x - 16, y - 16, sprite);
    Game.bestScore = game.add.text(110, 20, "BEST SCORE:");
    Game.bestScoreId = game.add.text(Game.screenWidth - 320, 20, "BEST PLAYER:");
    
};

Game.loadDot = function(id, x, y) {
    
    Game.dotMap[id] = game.add.sprite(x, y, 'dot');
    Game.dotMap[id].x = x;
    Game.dotMap[id].y = y;
    
};

Game.moveDot = function(id, x, y) {
    
    Game.dotMap[id].x = x;
    Game.dotMap[id].y = y;
    Game.dotMap[id] = game.add.sprite(x, y, 'dot');
};

Game.removeDot = function(id) {
    
    Game.dotMap[id].scale.setTo(0, 0);
};

Game.changeSizePlayer = function(id, x, y, size, playerScore, bestScore, bestScoreId) {
    
    Game.playerMap[id].x = x - (16 * size);
    Game.playerMap[id].y = y - (16 * size);
    Game.playerMap[id].bestScore = bestScore;
    Game.playerMap[id].bestScoreId = bestScoreId;
    Game.playerMap[id].scale.setTo(size, size);
    Game.bestScore.destroy();
    Game.bestScoreId.destroy();
    Game.bestScore = game.add.text(110, 20, "BEST SCORE: " + bestScore);
    Game.bestScoreId = game.add.text(Game.screenWidth - 320, 20, "BEST PLAYER: " + bestScoreId);
    
};

Game.movePlayer = function(id, x, y, size) {
    
    Game.playerMap[id].x = x - (16 * size);
    Game.playerMap[id].y = y - (16 * size);
    Client.checkPlayerPos();
};

Game.removePlayer = function(id) {
    
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};
