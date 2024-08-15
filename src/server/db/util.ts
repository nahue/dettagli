import { pgTableCreator } from "drizzle-orm/pg-core";
import { env } from "@/env";

export const createTable = pgTableCreator((name) => {
    return `dettagli_${name}`
    //return `dettagli_${env.NODE_ENV}_${name}`
});
