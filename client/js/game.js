var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.image('sprite', 'assets/coin.png');
};

Game.create = function(){
    Game.playerMap = {};
    
    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    
    testKey.onDown.add(Client.sendTest, this);
    
    var moveUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
    var moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
    var moveDown = game.input.keyboard.addKey(Phaser.Keyboard.S);
    var moveRight = game.input.keyboard.addKey(Phaser.Keyboard.D);

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
    
    //
    //moveLeft.onHoldCallback.add(Client.sendPressLeft, this);
    //moveDown.onHoldCallback.add(Client.sendPressDown, this);
    //moveRight.onHoldCallback.add(Client.sendPressRight, this);
    
//    game.input.onTap.add(Game.getCoordinates, this);
    
    Client.askNewPlayer();
};

Game.getCoordinates = function(){
    Client.sendButtonPress();
};

Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'sprite');
};

Game.movePlayer = function(id,x,y){
    
    var player = Game.playerMap[id];
    
    player.x = x;
    player.y = y;
    
//    var distance = Phaser.Math.distance(player.x,player.y,x,y);

//    var tween = game.add.tween(player);
//    var duration = distance*4.5;
//    tween.to({x:x,y:y}, duration);
//    tween.start();
    
}



//Game.movePlayer = function(id,x,y){
//    var player = Game.playerMap[id];
//    var distance = Phaser.Math.distance(player.x,player.y,x,y);
//    var tween = game.add.tween(player);
//    var duration = distance*4.5;
//    tween.to({x:x,y:y}, duration);
//    tween.start();
//};



Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};