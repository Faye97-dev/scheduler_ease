import * as schema from "./schema"
import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"
import { DATABASE_URL } from "@/config"

// todo fixme
// import { type PostgresJsDatabase } from "drizzle-orm/postgres-js";

// declare global { var db: PostgresJsDatabase<typeof schema> | undefined; }
// let db: PostgresJsDatabase<typeof schema>;

// if (ENV === "production") {
//     const client = new Client({ connectionString: DATABASE_URL })
//     client.connect()
//     db = drizzle(client, { schema: schema });
// } else {
//     if (!global.db) {
//         const client = new Client({ connectionString: DATABASE_URL })
//         client.connect()
//         global.db = drizzle(client, { schema: schema });
//     }
//     db = global.db;
// }

const client = new Client({ connectionString: DATABASE_URL })
client.connect()
const db = drizzle(client, { schema: schema });

export { db };