// Node server which will handel socket io connection

//const { Socket } = require('socket.io');

const io=require('socket.io')(8000)

const users ={};

io.on('connection',socket =>{
     // or yaha pr socket.emit() ka bheja hua lestine kr raha h
     socket.on('new-user-joined',ename =>{
        console.log("new user :",ename); 
        users[socket.id] = ename;
        socket.broadcast.emit('user-joined',ename);
     });

     socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message, ename: users[socket.id]});
     });
     socket.on('disconnect',message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
     });
});

