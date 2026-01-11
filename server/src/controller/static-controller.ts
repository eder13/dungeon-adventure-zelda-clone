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

    creditsPage(_: Request, h: ResponseToolkit) {
        return h.response(/*html*/ `
            <html>
                <head>
                    <title>Credits</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 20px;
                        }
                        p {
                            display: grid;
                            place-items: center;
                        }
                        h1 {
                            color: #333;
                            display: grid;
                            place-items: center;
                        }
                        h2 {
                            display: grid;
                            place-items: center;
                            margin-top: 20px;
                        }
                        ul {
                            list-style-type: none;
                            padding: 0;
                            max-width: 600px;
                            margin: 0 auto;
                        }
                        li {
                            background: #fff;
                            margin: 5px 0;
                            padding: 10px;
                            border: 1px solid #ddd;
                        }
                        a {
                            margin-top: 20px;
                            color: #007bff;
                            text-decoration: none;
                            display: grid;
                            place-items: center;
                        }
                        a:hover {
                            text-decoration: underline;
                        }
                    </style>
                </head>
                <body>
                    <h1>Assets used</h1>
                    <p>Assets that need attribution, other assets under CC0.</p>
                    <h2>Graphics</h2>
                    <ul>
                        <li><a href="https://opengameart.org/content/top-down-dungeon-tileset">Top down dungeon tileset</a></li>
                        <li><a href="https://opengameart.org/content/rp-destiny-sprites-and-tilesets">RP Destiny - Sprites and Tilesets</a></li>
                        <li><a href="https://opengameart.org/content/slime-monster-24x24">Slime monster 24x24</a></li>
                    </ul>
                    <h2>Audio</h2>
                    <ul>
                        <li><a href="https://freesound.org/people/somichev.dev/sounds/771887/">tada.mp3</a></li>
                        <li><a href="https://freesound.org/people/bubaproducer/sounds/107145/">button 26.wav</a></li>
                        <li><a href="https://freesound.org/people/fidsml/sounds/515683/">Final boss music</a></li>
                        <li><a href="https://freesound.org/people/Shumworld/sounds/753200/">Dungeon Loop</a></li>
                        <li><a href="https://freesound.org/people/Cpfcfan10/sounds/787809/">Castle Door Opening and Closing</a></li>
                        <li><a href="https://freesound.org/people/Edimar_Ramide/sounds/806593/">hurt2</a></li>
                        <li><a href="https://freesound.org/people/FullStackSound/sounds/662465/">hurt_player</a></li>
                        <li><a href="https://freesound.org/people/SilverIllusionist/sounds/411178/">Pick up Item 2.wav</a></li>
                    </ul>
                    <a href="/">Back to Game</a>
                </body>
            </html>
        `);
    }
}
