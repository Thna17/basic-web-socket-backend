const WebSocket = require('ws');
const clients = new Map(); // Store connected clients


// Initialize WebSocket server
const initializeWebSocket = (server) => {
    console.log(clients);
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected');
        
        ws.on('message', (message) => {
            const data = JSON.parse(message);
            console.log(`Received message: ${message}`);

            if (data.sellerId) {
                clients.set(data.sellerId, ws); // Store client based on sellerId
                console.log(`Seller ${data.sellerId} connected`);
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
};

// Notify seller with WebSocket
const notifySeller = (sellerId, message) => {
    const sellerSocket = clients.get(sellerId);

    
    if (sellerSocket) {
        sellerSocket.send(JSON.stringify({ message })); // Send notification
    } else {
        console.error(`Seller ${sellerId} is not connected`);
    }
};

module.exports = { initializeWebSocket, notifySeller };
