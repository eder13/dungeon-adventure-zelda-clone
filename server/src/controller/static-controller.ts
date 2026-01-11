import { ResponseToolkit, Request } from '@hapi/hapi';
import path from 'node:path';
import fs from 'fs';

export class StaticController {
    name = 'StaticController';

    async getStaticFile(request: Request, h: ResponseToolkit) {
        const requestedPath = request.params.param || 'index.html';
        const fullPath = path.join(__dirname, '../../dist', requestedPath);

        if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
            return h.file(requestedPath);
        }

        return h.file('index.html');
    }
}
