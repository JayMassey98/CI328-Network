var Client = {};
Client.socket = io('http://localhost:55000');

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

//Client.sendClick = function(x,y){
//  Client.socket.emit('click',{x:x,y:y});
//};

Client.sendButtonPress = function(){
    console.log("button pressed");
    Client.socket.emit('buttonpress');
};

Client.sendPressUp = function(){
    console.log("w pressed");
    Client.socket.emit('pressup');
};

Client.sendPressLeft = function(){
    console.log("a pressed");
    Client.socket.emit('pressleft');
};

Client.sendPressDown = function(){
    console.log("s pressed");
    Client.socket.emit('pressdown');
};

Client.sendPressRight = function(){
    console.log("d pressed");
    Client.socket.emit('pressright');
};

Client.sendMovement = function(){
    console.log("movement sent");
    Client.socket.emit('move');
};

Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }

    Client.socket.on('move',function(data){
        Game.movePlayer(data.id,data.x,data.y);
    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
    });
});


