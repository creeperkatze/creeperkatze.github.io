let activePlayers = 0;

export default function handler(req, res)
{
    if (req.method === 'POST')
    {
        const { action } = req.body;

        if (action === 'increment')
        {
            activePlayers++;
            res.status(200).json({ count: activePlayers, message: 'Player count incremented' });
        } else if (action === 'decrement')
        {
            if (activePlayers > 0)
            {
                activePlayers--;
                res.status(200).json({ count: activePlayers, message: 'Player count decremented' });
            } else
            {
                res.status(400).json({ count: activePlayers, message: 'Player count cannot be negative' });
            }
        } else
        {
            res.status(400).json({ message: 'Invalid action' });
        }
    } else if (req.method === 'GET')
    {
        res.status(200).json({ count: activePlayers });
    } else
    {
        res.status(405).json({ message: 'Method not allowed' });
    }
}