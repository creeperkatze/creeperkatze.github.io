let playerCount = 0; // In-memory variable to keep track of player count

export default defineEventHandler((event) => {
    const { method } = event.node; // Get the HTTP method

    // Handle POST requests to modify the player count
    if (method === 'POST') {
        const body = readBody(event); // Read the body of the request

        if (body.action === 'increment') {
            playerCount += 1; // Increment player count
        } else if (body.action === 'decrement') {
            playerCount = Math.max(0, playerCount - 1); // Decrement player count, ensuring it doesn't go below 0
        }

        return { count: playerCount }; // Return the updated player count
    }

    return { count: playerCount };
});