var express = require('express');
var app = express();
const server = require('http').createServer(app);


const io = require('socket.io')(server);
global.users=[];
io.on('connection', client => {
  console.log("event connection",client.id)
  client.on('event', data => { 
    io.emit('touch', data)
   })

   client.on('colourChange', data =>{
    io.emit('changeColour', data)
   })

   client.on('brushChange', data =>{
    io.emit('changeBrush', data)
   })

   client.on('paintClear', data =>{
    io.emit('changePaint', data)
   })

  client.on('disconnect', () => {
    
  });
  client.on('conn',({user},cb)=>{
    global.users.push({})
    cb("Connected");
  });
});


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3214, () => {
  console.log('listening on *:3214');
});
