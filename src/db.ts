import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres.yxkhjnxqdkorkhxsnfbc',
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    database: 'postgres',
    password: 'Sandbox(1234*)',
    port: 5432,
});

export default pool;