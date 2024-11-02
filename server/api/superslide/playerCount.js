let playerCount = 0;

export default function (req, res) {
  // Handle GET request to get the current player count
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ count: playerCount }));
  }

  // Handle POST request to increment player count
  else if (req.method === 'POST' && req.url === '/increment') {
    playerCount += 1;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ count: playerCount }));
  }

  // Handle POST request to decrement player count
  else if (req.method === 'POST' && req.url === '/decrement') {
    if (playerCount > 0) {
      playerCount -= 1;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ count: playerCount }));
  }

  // If the method is not allowed
  else {
    res.statusCode = 405; // Method Not Allowed
    res.end(JSON.stringify({ message: 'Method Not Allowed' }));
  }
}