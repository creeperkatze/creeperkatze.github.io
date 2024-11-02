let playerCount = 0; // In-memory variable to keep track of player count

export default defineEventHandler((event) =>
{
    if (event.method === 'GET')
    {
        return playerCount;
    }
    if (event.method === 'POST')
    {
        const body = event.node.req.body; // Assuming you're using a framework that allows access to the request body

        if (body.action === 'increment')
        {
            playerCount++; // Increment the player count
            return { playerCount }; // Return the new player count
        }

        if (body.action === 'decrement')
        {
            playerCount--; // Decrement the player count
            return { playerCount }; // Return the new player count
        }
    }
});