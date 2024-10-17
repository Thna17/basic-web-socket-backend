const express = require('express');
const http = require('http');
const { initializeWebSocket, notifySeller } = require('./websocket');

const app = express();
const server = http.createServer(app);

// Start WebSocket server
initializeWebSocket(server);

app.use(express.json());

// Simulate an order confirmation endpoint
app.post('/confirm-order', (req, res) => {
    const { sellerId, productName } = req.body;
    
    // Notify the seller using WebSocket
    notifySeller(sellerId, `New order for product: ${productName}`);
    
    res.status(200).send('Order confirmed and notification sent');
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
