
import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error('Missing DATABASE_URL in .env.local');
    process.exit(1);
}

const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false } // Supabase requires SSL
});

const MIGRATIONS_DIR = path.join(__dirname, '../supabase/migrations');

async function runMigrations() {
    try {
        await client.connect();
        console.log('Connected to database.');

        const files = [
            '20251125143500_equipment_schema.sql',
            '20251125143501_psionics_schema.sql',
            '20251125143502_deities_schema.sql'
        ];

        for (const file of files) {
            console.log(`Running migration: ${file}`);
            const filePath = path.join(MIGRATIONS_DIR, file);
            if (fs.existsSync(filePath)) {
                const sql = fs.readFileSync(filePath, 'utf-8');
                await client.query(sql);
                console.log(`Success: ${file}`);
            } else {
                console.error(`File not found: ${filePath}`);
            }
        }

    } catch (err) {
        console.error('Error running migrations:', err);
    } finally {
        await client.end();
        console.log('Disconnected.');
    }
}

runMigrations();
