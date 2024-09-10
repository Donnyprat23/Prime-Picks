import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.DATA_BASE_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dbName = "ecommerce";
export const db = client.db(dbName);
