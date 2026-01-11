import Hapi from '@hapi/hapi';
import path from 'path';
import Inert from '@hapi/inert';
import { ServerHelper } from './server-helper';
import { leaderBoardRoutes } from '../routes/leaderboard-routes';
import { staticRoutes } from '../routes/static-routes';
import { LeaderBoardController } from '../controller/leaderboard-controller';
import { StaticController } from '../controller/static-controller';
import Logger from '../helpers/logger';
import Database from '../database/database';

const port = process.env.PORT ?? 3100;
const server = new Hapi.Server({
    port: port,
    host: '0.0.0.0',
    routes: {
        files: {
            relativeTo: path.join(__dirname, '../../dist'),
        },
    },
});

(async () => {
    await ServerHelper.registerPlugins(server, [
        {
            plugin: Inert,
        },
    ]);
    ServerHelper.registerRoutes([...leaderBoardRoutes, ...staticRoutes]);
    ServerHelper.registerControllers([new LeaderBoardController(), new StaticController()]);
    ServerHelper.registerHandlers(server);

    server
        .start()
        .then(() => {
            Logger.info(`Server running at ${server.info.uri}...`);
        })
        .catch((e) => {
            Logger.error('Could not start server, reason: ' + e.message);
            Database.disconnect();
            process.exit(1);
        });
})();
