const Message = require('../models/Message');

module.exports = (socket, io) => {
  console.log(`User connected: ${socket.id}`);

  // Notify all clients when a user connects
  io.emit('notification', { message: `User ${socket.id} has joined the chat.` });

  // Handle incoming chat messages
  socket.on('message', async (data) => {
    try {
      if (!data.username || !data.message) {
        console.error('Invalid message data:', data);
        return;
      }

      const newMessage = new Message({
        username: data.username,
        message: data.message,
      });
      await newMessage.save();

      io.emit('message', {
        username: data.username,
        message: data.message,
        timestamp: new Date(),
      });
    } catch (err) {
      console.error('Error handling message:', err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    io.emit('notification', { message: `User ${socket.id} has left the chat.` });
  });

  socket.on('typing', (username) => {
    socket.broadcast.emit('typing', { username });
  });
};
