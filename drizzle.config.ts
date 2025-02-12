
import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';


export default {
	schema: './db/schema.ts',
	out: './drizzle',
	driver: 'expo',
} satisfies Config;

// Turso - cloud DB
// config({ path: '.env' });

// export default defineConfig({
//   schema: './src/db/schema.ts',
//   out: './migrations',
//   dialect: 'turso',
//   dbCredentials: {
//     url: process.env.TURSO_CONNECTION_URL!,
//     authToken: process.env.TURSO_AUTH_TOKEN!,
//   },
// });
