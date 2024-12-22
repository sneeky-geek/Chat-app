const http = require('http');
const app = require('./app');
const { connectDB } = require('./config/db');
const { Server } = require('socket.io');
const chatHandler = require('./sockets/chat');

// Connect to the database
connectDB();

const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Handle chat events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  chatHandler(socket, io);
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://192.168.29.28:${PORT}`);
});
