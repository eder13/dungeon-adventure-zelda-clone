import path from 'node:path';
import { ServerRoute } from '../types/core';

export const staticRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/{param*}',
        options: {
            files: {
                relativeTo: path.join(__dirname, '../../dist'),
            },
        },
        handler: 'StaticController.getStaticFile',
    },
];
