import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import app from './app.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables manually as a fallback
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && (valueParts.length > 0)) {
            const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
            if (key.trim()) process.env[key.trim()] = value;
        }
    });
}






process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});



// console.log("port",process.env.PORT)

app.listen(process.env.PORT || 4000, async () => {
    try {
        const pkg = await import('pg');
        const { Client } = pkg.default || pkg;
        const client = new Client({ connectionString: process.env.DATABASE_URL });
        await client.connect();
        console.log("database connect successful");
        await client.end();
    } catch (error) {
        console.error("database connection failed:", error.message);
    }
    console.log(`server is running on port ${process.env.PORT || 4000}`);
})





