export default defineEventHandler((event) =>
{
    const events = [
        {
            name: "easter",
            startMonth: 4,
            startDay: 15,
            endMonth: 4,
            endDay: 29,
            color: "#FFB6C1",
        },
        {
            name: "summer",
            startMonth: 7,
            startDay: 1,
            endMonth: 8,
            endDay: 1,
            color: "#FFFF00",
        },
        {
            name: "halloween",
            startMonth: 10,
            startDay: 31,
            endMonth: 11,
            endDay: 7,
            color: "#EB6123",
        },
        {
            name: "anniversary",
            startMonth: 10,
            startDay: 24,
            endMonth: 10,
            endDay: 25,
            color: "#00ff00",
        },
        {
            name: "christmas",
            startMonth: 12,
            startDay: 1,
            endMonth: 1,
            endDay: 1,
            color: "#FF0000",
        },
    ];

    // Get the current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    // Check for active events based on the current month and day
    const currentEvent = events.find(event =>
    {
        const isAfterStart = (currentMonth > event.startMonth ||
            (currentMonth === event.startMonth && currentDay >= event.startDay));
        const isBeforeEnd = (currentMonth < event.endMonth ||
            (currentMonth === event.endMonth && currentDay <= event.endDay));
        return isAfterStart && isBeforeEnd;
    });

    // Prepare the response
    if (currentEvent)
    {
        return {
            name: currentEvent.name,
            rewards: currentEvent.rewards,
            // Convert end date to timestamp, ignoring the year
            endTimestamp: new Date(currentDate.getFullYear(), currentEvent.endMonth - 1, currentEvent.endDay).getTime(),
            color: currentEvent.color
        };
    } else
    {
        return {
            name: "none"
        };
    }
});
