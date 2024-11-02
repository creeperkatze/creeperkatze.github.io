export default defineEventHandler((event) =>
{
    const settings = {
        leaderboardKillswitch: false,
        feedbackLeaderboardKillswitch: false,
        leaderboardMinimumBadWordListFormat: 6
    };

    return settings;
});