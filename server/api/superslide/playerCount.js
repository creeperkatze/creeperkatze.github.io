// In-memory variable to keep track of player count
let playerCount = 0;

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // Respond with the current player count
      res.status(200).json({ count: playerCount });
      break;

    case 'POST':
      if (req.body.action === 'increment') {
        playerCount += 1;
        res.status(200).json({ count: playerCount });
      } else if (req.body.action === 'decrement') {
        if (playerCount > 0) {
          playerCount -= 1;
        }
        res.status(200).json({ count: playerCount });
      } else {
        res.status(400).json({ message: 'Invalid action' });
      }
      break;

    default:
      // Handle method not allowed
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
