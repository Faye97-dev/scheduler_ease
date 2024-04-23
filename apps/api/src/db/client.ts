import * as schema from "./schema"
import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"
import { DATABASE_URL } from "@/config"

const client = new Client({ connectionString: DATABASE_URL })
client.connect()
const db = drizzle(client, { schema: schema });

export { db };