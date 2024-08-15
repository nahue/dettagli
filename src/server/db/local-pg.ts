// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";

// import { env } from "@/env";
// import * as schema from "./schema";

// const client = new Pool({
//     connectionString: env.POSTGRES_URL,
// });

// // await client.connect();
// export const db = drizzle(client, { schema, logger: true });

import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

export const db = drizzle(sql, { schema, logger: true });
