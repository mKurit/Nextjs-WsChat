const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket:any) => {
  console.log('A user connected');

  socket.on('message', (message:any) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = 5000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
