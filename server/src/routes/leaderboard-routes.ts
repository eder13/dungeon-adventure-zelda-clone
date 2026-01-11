import { ServerRoute } from '../types/core';

export const leaderBoardRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/api/leaderboard',
        handler: 'LeaderBoardController.getLeaderBoard',
    },
    {
        method: 'POST',
        path: '/api/leaderboard',
        handler: 'LeaderBoardController.postLeaderBoard',
    },
];
