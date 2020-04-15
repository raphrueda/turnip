import { config } from 'dotenv';
import { Pool } from 'pg';

const getPool = () => {
    config();
    return new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
    });
};

class DBService {
    private pool: Pool;

    constructor() {
        this.pool = getPool();
    }

    public query = (queryText: string, values: string[]) => {
        return this.pool.query(queryText, values);
    };
}

export const dbService = new DBService();
