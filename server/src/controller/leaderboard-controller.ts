import { Request, ResponseToolkit } from '@hapi/hapi';
import Database from '../database/database';
import { BaseController } from '../types/core';
import { TimeParser } from '../helpers/time';

export class LeaderBoardController implements BaseController {
    name = 'LeaderBoardController';

    async getLeaderBoard(_: Request, h: ResponseToolkit) {
        try {
            const data = await Database.getInstance().player.findMany();
            const dataSorted = data.sort((a, b) => {
                return TimeParser.parseTimeToMs(a.time) - TimeParser.parseTimeToMs(b.time);
            });
            return h.response(dataSorted.slice(0, 5)).code(200);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            return h.response({ error: 'Failed to fetch leaderboard' }).code(500);
        }
    }

    async postLeaderBoard(
        request: Request<{
            Payload: {
                name: string;
                finalTime: string;
            };
        }>,
        h: ResponseToolkit,
    ) {
        const { name, finalTime } = request.payload;

        if (!name || !finalTime) {
            return h.response({ error: 'Name and finalTime are required' }).code(400);
        }

        await Database.getInstance().player.create({
            data: {
                name,
                time: finalTime,
            },
        });

        return h.response().code(201);
    }
}
