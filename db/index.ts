import { config } from 'dotenv';

config ({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg'

import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}


// PostgreSQL connection pool.
// SSL is enabled automatically when connectionString contains "sslmode=require" (e.g. Neon, Supabase).
// max: up to 10 concurrent connections | idleTimeout: close idle connections after 30s | connectionTimeout: fail if unable to connect within 10s.
const pool = new Pool({
    connectionString,
    ssl: connectionString.includes("sslmode=require")
        ? { rejectUnauthorized:false }
        : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
});

export const db = drizzle(pool, { schema })


