// Replace with the IP address of your Mac (or backend server)
const socket = io('http://192.168.29.28:3000');

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Prompt the user for their username
const username = prompt("Enter your name:") || "Anonymous";

// Scroll to the bottom of the chat
const scrollToBottom = () => {
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

// Display incoming messages
socket.on('message', (data) => {
  const { username: sender, message, timestamp } = data;

  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  if (sender === username) {
    messageElement.classList.add('you');
  }

  messageElement.innerHTML = `
    <strong>${sender}</strong> <span class="timestamp">${new Date(timestamp).toLocaleTimeString()}</span>
    <p>${message}</p>
  `;

  messagesDiv.appendChild(messageElement);
  scrollToBottom();
});

const sendMessage = () => {
  const message = messageInput.value.trim();
  if (!message) return;

  socket.emit('message', { username, message });
  messageInput.value = '';
};

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

messageInput.addEventListener('input', () => {
  socket.emit('typing', username);
});

socket.on('typing', (data) => {
  console.log(`${data.username} is typing...`);
});
