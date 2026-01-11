import { PrismaClient } from '../generated/prisma';
import Logger from '../helpers/logger';

class Database {
    private static _instance: PrismaClient | null = null;
    private constructor() {}

    static getInstance() {
        if (!this._instance) {
            this._instance = new PrismaClient();
            this._instance
                .$connect()
                .then(() => {
                    Logger.info('Database is up and running...');
                })
                .catch((e: Error) => {
                    Logger.error(`Could not connect to Database: ${e.message}`);
                });
        }
        return this._instance;
    }

    static async disconnect() {
        if (this._instance) {
            await this._instance.$disconnect();
        }
    }
}

export default Database;
