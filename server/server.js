const PORT = 55000;

var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(client) {
    
    client.on('test', function() {
        console.log('test received');
    });
    
    client.on('newplayer',function() {
        client.player = {
            id: server.lastPlayerID++,
            x: randomInt(100,400),
            y: randomInt(100,400)
        };
        client.emit('allplayers',getAllPlayers());
        client.broadcast.emit('newplayer',client.player);
        
        client.on('buttonpress',function() {
            console.log('buttonpress received, function executed');
            client.player.x += 10;
            client.player.y += 0;
            io.emit('move',client.player);
        });
        
        client.on('pressup',function() {
            console.log('w pressed');
            client.player.y -= 10;
            io.emit('move',client.player);
        });
        
        client.on('pressleft',function() {
            console.log('a pressed');
            client.player.x -= 10;
            io.emit('move',client.player);
        });
        
        client.on('pressdown',function() {
            console.log('s pressed');
            client.player.y += 10;
            io.emit('move',client.player);
        });
        
        client.on('pressright',function() {
            console.log('d pressed');
            client.player.x += 10;
            io.emit('move',client.player);
        });

//        client.on('click',function(data) {
//            console.log('click to '+data.x+', '+data.y);
//            client.player.x = data.x;
//            client.player.y = data.y;
//            io.emit('move',client.player);
//        });

        client.on('disconnect',function() {
            io.emit('remove', client.player.id);
            console.log('disconnecting: ' + client.player.id);
        });
    });
    
});

server.listen(PORT, function(){
    console.log('Listening on ' + server.address().port);
});

server.lastPlayerID = 0;

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}