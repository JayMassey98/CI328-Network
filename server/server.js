const PORT = 55000;

var server = require('http').createServer();
var io = require('socket.io')(server);

var existingDotsID = [];
var existingDotsX = [];
var existingDotsY = [];

var dotLimit = 50;
var playersOnline = 0;

for (var i = 0; i < dotLimit; i++) {

    existingDotsID.push(i);
    existingDotsX.push(randomInt(32, 1280 - 32));
    existingDotsY.push(randomInt(32, 1280 - 32));

}

server.dot = 0;

io.on('connection', function(client) {
    
    client.on('existingdots',function() {
        
        for (var i = 0; i < existingDotsID.length; i++) {
            
            client.dot = {

                id: existingDotsID[i],
                x: existingDotsX[i],
                y: existingDotsY[i]

            }
            
            io.emit('loaddot',client.dot);
        }
            
    });
    
    client.on('newplayer',function() {
        
        client.player = {
            
            id: server.lastPlayerID++,
            x: randomInt(64, 1280 - 64),
            y: randomInt(64, 720 - 64),
            colour: randomInt(1, 12),
            size: 1,
            speed: 4,
            playerScore: 0,
            bestScore: 0,
            bestScoreId: 0
            
        };
        
        playersOnline += 1;
        
        client.emit('allplayers',getAllPlayers());
        client.broadcast.emit('newplayer',client.player);
        
        client.on('playerpos',function() {
        
            for (var i = 0; i < existingDotsID.length; i++) {
                
                // Is the player within 16 pixels of a dot on the x axis?
                
                if (client.player.x - existingDotsX[i] < 16) {
                    
                    if (existingDotsX[i] - client.player.x < 16) {
                        
                        // Is the player within 16 pixels of a dot on the x axis?
                        
                        if (client.player.y - existingDotsY[i] < 16) {
                            
                            if (existingDotsY[i] - client.player.y < 16) {
                                
                                // Update the dot to a new location
                                
                                client.dot = {

                                    id: existingDotsID[i],
                                    x: existingDotsX[i],
                                    y: existingDotsY[i]

                                }
                                
                                io.emit('removedot', client.dot);
                                
                                existingDotsX[i] = randomInt(64, 1280 - 64),
                                existingDotsY[i] = randomInt(64, 720 - 64),
                                    
                                client.dot = {
                                   
                                    id: client.dot.id,
                                    x: existingDotsX[i],
                                    y: existingDotsY[i]
                                    
                                }
                                
                                io.emit('movedot', client.dot);
                                
                                console.log(client.dot.id);
                                
                                playerList = getAllPlayers();
                                var bestScore = client.player.bestScore;
                                
                                for (var i = 0; i < playersOnline; i++) {
                
                                    if (playerList[i].playerScore + 1 > bestScore) {
                    
                                        bestScore = playerList[i].playerScore;
                                        bestScoreId = playerList[i].id;
                                    }
                                }
                                
                                client.player = {
                                    
                                    id: client.player.id,
                                    x: client.player.x,
                                    y: client.player.y,
                                    size: client.player.size + 0.1,
                                    speed: client.player.speed * 0.99,
                                    playerScore: client.player.playerScore + 1,
                                    bestScore: bestScore,
                                    bestScoreId: bestScoreId
                                    
                                }
                                
                                io.emit('changesize', client.player);
                                break;
                            }
                        }
                    }
                }
            }
        });
        
        client.on('pressup',function() {
            
            client.player.y -= client.player.speed;
            io.emit('move',client.player);
        });
        
        client.on('pressleft',function() {
            
            client.player.x -= client.player.speed;
            io.emit('move',client.player);
        });
        
        client.on('pressdown',function() {
            
            client.player.y += client.player.speed;
            io.emit('move',client.player);
        });
        
        client.on('pressright',function() {
            
            client.player.x += client.player.speed;
            io.emit('move',client.player);
        });
        
        client.on('getbigger',function() {
            
            io.emit('changesize',client.player);
        });
        
        client.on('resetsize',function() {
            
            client.player.size = 1;
            client.player.speed = 4;
            client.player.playerScore = 0;
            io.emit('changesize',client.player);
        });
        

        client.on('disconnect',function() {
            
            io.emit('remove', client.player.id);
            console.log('disconnecting: ' + client.player.id);
            playersOnline -= 1; 
        });
        
    });
    
});

// The remaining code is all from the original CI328 base server code.

server.listen(PORT, function() {
    
    console.log('Listening on ' + server.address().port);
});

server.lastPlayerID = 0;

function getAllPlayers() {
    
    var players = [];
    
    Object.keys(io.sockets.connected).forEach(function(socketID) {
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    
    return players;
}

function randomInt(low, high) {
    
    return Math.floor(Math.random() * (high - low) + low);
}
