import pg from 'pg';

const{pool} = pg;

const pool = new pool({
    user: 'postgres.Klghymtzqkjbarysueas',
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    database: 'postgres',
    password: 'api-de-chamados',
    port:5432,
    ssl: {
        rejectUnauthorized:false,
    },
});

export default pool;