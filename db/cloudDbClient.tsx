
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql"

// const url = process.env.TURSO_DB_URL ? process.env.TURSO_DB_URL : ''
// export const cloud_plant_db = createClient({ url: url, authToken: process.env.TURSO_AUTH_TOKEN });
// export const cloud_db = drizzle(cloud_plant_db, { logger: true });

// https://orm.drizzle.team/docs/tutorials/drizzle-with-turso
//
// Tables should be created in Turso cloud in OFFLINE, not here is application!
//

// async function saveUser(phoneNumber: string) {
//     await cloud_db.execute({
//         sql: "INSERT INTO users (id, phone_number) VALUES (?1, ?2) ON CONFLICT (phone_number) DO NOTHING;",
//         args: [phoneNumber, phoneNumber],
//     });
// }

