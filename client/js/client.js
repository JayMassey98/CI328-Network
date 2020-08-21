// Initialisation

var Client = {};
Client.socket = io('http://localhost:55000');

var dotsOnScreen = 0;

// Joining Player

    Client.askNewPlayer = function(data){
        
        Client.socket.emit('newplayer');
    };

// WASD Movement

    Client.sendPressUp = function(){
        Client.socket.emit('pressup');
    };

    Client.sendPressRight = function(){
        Client.socket.emit('pressright');
    };

    Client.sendPressDown = function(){
        Client.socket.emit('pressdown');
    };

    Client.sendPressLeft = function(){
        Client.socket.emit('pressleft');
    };

    Client.checkPlayerPos = function(){
        Client.socket.emit('playerpos');
    };

// Edible Dots

    Client.sendExistingDots = function(){
        Client.socket.emit('existingdots');
    };

// Player Size

    Client.sendGetBigger = function(){
        Client.socket.emit('getbigger');
    };

    Client.sendResetSize = function(){
        Client.socket.emit('resetsize');
    };

// New Players and Dots

    Client.socket.on('newplayer',function(data){
        Game.addNewPlayer(data.id,data.x,data.y);
    });

    Client.socket.on('loaddot',function(data){
        Game.loadDot(data.id,data.x,data.y);
    });

    Client.socket.on('allplayers',function(data){
        
        for(var i = 0; i < data.length; i++){
            Game.addNewPlayer(data[i].id,data[i].x,data[i].y,data[i].size);
        }

        Client.socket.on('move',function(data){
            Game.movePlayer(data.id,data.x,data.y,data.size);
        });

        Client.socket.on('changesize',function(data){
            Game.changeSizePlayer(data.id,data.x,data.y,data.size,data.playerScore,data.bestScore);
        });

        Client.socket.on('remove',function(id){
            Game.removePlayer(id);
        });
        
        Client.socket.on('loaddot',function(data){
            Game.loadDot(data.id,data.x,data.y);
        });
        
        Client.socket.on('removedot',function(data){
            Game.removeDot(data.id, data.x, data.y);
        });
        
    });