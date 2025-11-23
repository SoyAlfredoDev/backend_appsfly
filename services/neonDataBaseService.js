import dotenv from 'dotenv';

dotenv.config();

const NEON_API_KEY = process.env.NEON_API_KEY;
const NEON_PROJECT_ID = process.env.NEON_PROJECT_ID;
const NEON_BRANCH_ID = process.env.NEON_BRANCH_ID;

const DB_USER = process.env.NEON_DB_USER;
const DB_PASSWORD = process.env.NEON_DB_PASSWORD;
const DB_HOST = process.env.NEON_DB_HOST;

/**
 * Creates a new database in the specified Neon branch.
 * @param {string} dbName - The name of the database to create (e.g., 'business_id_123').
 * @returns {Promise<object>} Details of the created database.
 */
export async function createNeonDatabaseService(dbName) {

    if (!NEON_API_KEY || !NEON_PROJECT_ID || !NEON_BRANCH_ID) {
        throw new Error("Missing Neon environment variables.");
    }

    const apiUrl = `https://console.neon.tech/api/v2/projects/${NEON_PROJECT_ID}/branches/${NEON_BRANCH_ID}/databases`;

    const requestBody = {
        database: {
            // Name must be unique within this branch
            name: dbName,
            // Optional: owner user, defaults to the default role if not specified
            owner_name: 'neondb_owner'
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${NEON_API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle Neon API errors (e.g., duplicate name)
            console.error('Error creating the DB:', data.message || data);
            throw new Error(`Neon API Error: ${data.code || 'UNKNOWN'}`);
        }
        return data;
    } catch (error) {
        console.error('Error calling Neon API:', error);
        throw error;
    }
}

/**
 * Generates the connection URL for the new tenant DB and tests the connection.
 * @param {string} dbName - The name of the database created via the Neon API (e.g., 'business_001').
 * @returns {Promise<string | boolean>} The valid connection string if the test succeeds, otherwise false.
 */
export function getConnectionStringAndTest(dbName) {
    return `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${dbName}?sslmode=require`;
}