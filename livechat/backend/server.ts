import * as express from "express";
import * as http from "http";
import * as axios from 'axios';
import * as socketIO from "socket.io";


const app = express();

const server = http.createServer(app);

const io = socketIO(server);

var clients = [];

io.on('connection', socket => {
  clients.push(socket.id)
  console.log('User connected');

  socket.on('switchroom', (newroom) => {
    console.log(`Room created: ${newroom}`)
    socket.join(newroom);
    io.sockets.in(newroom).emit("message", {text: "Welcome!", sender: "server"})
  })

  socket.on('join', (roomId) => {
    socket.join(roomId);
    io.sockets.in(roomId).emit("message", {text: "New user joined!", sender: "server"})
  })

  socket.on('newword', async (request) => {
    var word: string;
    await axios.default.post("http://watchout4snakes.com/wo4snakes/Random/RandomWord").then((res) => {
      word = res.data;
    })

    io.sockets.connected[socket.id].emit("newword", word);
  })

  socket.on('draw', (body: any) => {
    const drawing = body;
    io.sockets.in(drawing.roomId).emit("draw", drawing.lines)
  })

  socket.on('message', (body: any) => {
      const message = body
      io.sockets.in(message.room).emit('message', { text: message.text, sender: message.sender});
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3001, () => 
  console.log(`Server started, listening on port 3001...`)
);